const API_KEY = "0393dc3117ced3f0922b22d470874095";
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city");
const methodInput = document.getElementById("method");
const searchButton = document.getElementById("search-button");
const message = document.getElementById("message");
const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    showMessage("Digite o nome de uma cidade para continuar.");
    return;
  }

  if (!API_KEY.trim()) {
    showMessage("Adicione sua chave da OpenWeatherMap no arquivo app.js.");
    return;
  }

  setLoading(true);
  result.innerHTML = "";
  showMessage(`Buscando o clima de ${city}...`, true);

  try {
    const weather = methodInput.value === "axios"
      ? await axiosWeather(city)
      : await fetchWeather(city);
    displayWeather(weather);
    showMessage("");
  } catch (error) {
    showMessage(getErrorMessage(error));
  } finally {
    setLoading(false);
  }
});

function getWeatherUrl(city) {
  const params = new URLSearchParams({
    q: city,
    appid: API_KEY,
    units: "metric",
    lang: "pt_br"
  });
  return `https://api.openweathermap.org/data/2.5/weather?${params}`;
}

async function fetchWeather(city) {
  const response = await fetch(getWeatherUrl(city));
  const data = await response.json();

  if (!response.ok) {
    const error = new Error("Falha na requisição");
    error.status = response.status;
    error.detail = data.message;
    throw error;
  }

  return data;
}

async function axiosWeather(city) {
  const response = await axios.get(getWeatherUrl(city));
  return response.data;
}

function displayWeather(weather) {
  const temperature = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const description = weather.weather[0]?.description || "Sem descrição";
  const wind = Math.round((weather.wind.speed || 0) * 3.6);

  result.innerHTML = `
    <article class="weather-card">
      <div>
        <p class="location">${escapeHtml(weather.name)}</p>
        <span class="country">${escapeHtml(weather.sys.country)}</span>
        <p class="temperature">${temperature}<sup>°C</sup></p>
        <p class="description">${escapeHtml(description)}</p>
      </div>
      <div class="details">
        <div class="detail"><small>Sensação térmica</small><strong>${feelsLike}°C</strong></div>
        <div class="detail"><small>Umidade</small><strong>${weather.main.humidity}%</strong></div>
        <div class="detail"><small>Pressão</small><strong>${weather.main.pressure} hPa</strong></div>
        <div class="detail"><small>Vento</small><strong>${wind} km/h</strong></div>
      </div>
    </article>
  `;
}

function getErrorMessage(error) {
  if (!navigator.onLine || error instanceof TypeError) {
    return "Não foi possível conectar à API. Verifique sua internet e tente novamente.";
  }

  if (error.detail) {
    return error.detail;
  }

  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  switch (error.status || error.response?.status) {
    case 401:
      return "A chave da OpenWeatherMap é inválida ou ainda não foi ativada.";
    case 404:
      return "Cidade não encontrada. Confira a grafia e tente novamente.";
    case 429:
      return "Limite de requisições excedido. Tente novamente mais tarde.";
    default:
      return "Não foi possível consultar o clima agora. Tente novamente.";
  }
}

function showMessage(text, loading = false) {
  message.textContent = text;
  message.className = loading ? "message loading" : "message";
}

function setLoading(isLoading) {
  searchButton.disabled = isLoading;
  searchButton.querySelector("span").textContent = isLoading ? "Consultando..." : "Buscar clima";
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;"
  }[character]));
}
