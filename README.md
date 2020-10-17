# api-example

API structure example

-   Primeiro foi criado o repositório no github
-   Depois foi clonado o repositório
-   Então foi criado o index.js na pasta raiz
-   Foi instalado o koa, koa-bodyparser e o koa-router
    -   npm install koa koa-bodyparser koa-router
-   O Koa e o body-parser foram importados no index.js
    const Koa = require('koa')
    const bodyParser = require("koa-bodyparser")
-   foi criado uma nova instância do Koa a constante nomeada de server
    const server = new Koa();
-   foi adicionado o bodyParser ao server.use
    server.use(bodyParser());
-   Adicionou um ouvinte a porta 8081
    server.listen(8081, () => console.log("Rodando!"));
-   criamos uma pasta src na raiz do projeto
-   criamos um js chamado de routes.js que é onde ficará todos as informações de rotas dentro da pasta src
-   criamos uma pasta controllers que fica dentro da pasta src, que é onde ficará todos os arquivos que constará os métodos de controle de cada feature
-   criamos uma pasta chamada utils dentro de src, que é onde ficará todos os métodos que podem ser utilizados por todas as dependências do projeto
-   adicionamos em router.js a importação do router, criamos uma nova instância do router e exportamos a instância do router criada
-   importamos o router exportado no passo anterior no arquivo index.js
-   utilizamos o router com o serve.use
-   adicionamos a dependência dotenv ao projeto
    -   npm add dotenv
-   importamos o dotenv no index.js
    -   require('dotenv').config();
-   adicionamos o .env ao projeto para colocar dados sensíveis e configuráveis do projeto
    -   para pegar os dados é só utilizar process.env.{nome_da_variavel_de_ambiente} ex: process.env.PORT
-   Definimos uma constate dentro de index.js para receber a porta que deve ser usada e definimos uma porta padrão, caso não tenha o .env adicionado a raiz da pasta, e passamos para o server listen
-   Devemos colocar o .env no .gitignore, em situações de enviar para cliente, é só adicionar o .env-example (como consta na nossa pasta raiz, mas para utiliza-lo, precisa renomear para .env, entretanto ela nunca subirá devido o gitignore)
-   adicionamos o eslint globalmente
    -   npm install -g eslint
-   adicionamos a dependência do eslint ao vscode
    -   https://github.com/Microsoft/vscode-eslint
-   iniciamos o eslint no projeto com as configurações a seguir
    -   codigo para iniciar: eslint --init
    -   configurações:
        -   how to use: to check syntax and find problems
        -   type of modules: CommonJS
        -   framework: None of these
        -   typescript: No
        -   where does code run: node
        -   format your config file: javascript
        -   would like to install eslint in your project: yes
-   alteramos o "browser" para "node" no .eslintrc.js
-   instalamos a dependência padrão da Airbnb do eslint
    -   npm install -D eslint-config-airbnb-base
-   alteramos o extends do eslintrc.js para "airbnb-base"
-   adicionamos a dependência de importação
    -   npm install -D eslint-plugin-import
-   rodamos o codigo para o eslint consertar os erros de todos os arquivos (se fosse de um arquivo só, era só trocar o "." pelo nome do arquivo)
    -   eslint . --fix
-   adicionamos uma regra de permitir plusplus no for, adicionaod no arquivo eslintrc.js em "rules"
    -   'no-plusplus': [2, { allowForLoopAfterthoughts: true }]
-   adicionamos uma regra para permitir o console.log
    -   'no-console': 0
-   adicionamos error caso nãos seja dado tab para identar
    -   indent: ["error", "tab"]
-   adicionamos a permissão de tab de identação
    -   'no-tabs': [2, { allowIndentationTabs: true }]
-   configurando vscode
    -   File>preferences>settings
    -   search settings: indent
        -   Editor - Detect Indentation: disable
        -   Editor - Insert Spaces: disable
-   instalamos a dependencia do prettier e as dependências de suporte do prettier no eslint
    -   npm install -D prettier eslint-config-prettier eslint-plugin-prettier
-   instalamos uma extensão do vscode chamada prettier
-   fomos em preferências novamente para ajustar o prettier
    -   File>preferences>settings
    -   search settings: format
    -   Editor - Format on save: enable
    -   Editor - Default Formatter: esbenp-prettier-vscode
-   adicionamos o arquivo .prettierrc.js na raiz do projeto
-   modificamos o extends do .eslintrc.js para:
    -   ["airbnb-base", "prettier"]
-   adicionamos ao .eslintrc.js a linha:
    -   plugins: ["prettier"],
-   adicionamis mais uma regra ao .eslintrc.js para gerar erro toda vez que for algo relacionado a prettier:
    -   "prettier/prettier": ["error"],
-   adicionamos informações ao .prettierrc.js
    -   module.exports = {
        trailingComma: 'es5',
        tabWidth: 4,
        semi: true,
        singleQuote: true,
        useTabs: true,
        }
