# Clima Agora

Aplicação web simples para consultar o clima de uma cidade usando a API da OpenWeatherMap.

## Tecnologias

- HTML
- CSS
- JavaScript
- Fetch API / Axios

## Estrutura do projeto

- [index.html](index.html) — estrutura da página
- [styles.css](styles.css) — estilos da interface
- [app.js](app.js) — lógica da aplicação e integração com a API

## Pré-requisitos

- Navegador moderno
- Acesso à internet
- Chave da API da OpenWeatherMap

## Como iniciar

1. Abra a pasta do projeto no VS Code.
2. No arquivo [app.js](app.js), substitua a chave atual pela sua chave da OpenWeatherMap:

```js
const API_KEY = "SUA_CHAVE_AQUI";
```

3. Inicie um servidor local na pasta do projeto. No terminal, execute:

```bash
cd "c:\Users\ventu\OneDrive\Área de Trabalho\VSCODE\front2109"
python -m http.server 8000
```

4. Abra no navegador:

```text
http://localhost:8000
```

## Como gerar a chave da API

1. Acesse: https://openweathermap.org/api
2. Crie uma conta ou faça login
3. Gere uma chave de API gratuita
4. Copie a chave e cole no arquivo [app.js](app.js)

## Como usar

- Digite o nome de uma cidade
- Escolha o método de requisição: Fetch API ou Axios
- Clique em "Buscar clima"
- A aplicação exibirá temperatura, sensação térmica, umidade, pressão e vento

## Observações

- A API da OpenWeatherMap exige uma chave válida para funcionar
- Caso a chave esteja vazia ou inválida, a aplicação exibe uma mensagem de erro
- O projeto é estático, então não há dependências de Node.js ou npm para rodar localmente

## Dicas

Se preferir, você também pode abrir o projeto usando a extensão Live Server do VS Code, que facilita o carregamento do app em ambiente local.
