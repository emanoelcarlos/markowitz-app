# markowitz-app
Este projeto é fruto do meu TCC no MBA em Investimento em Ações e Mercado de Capitais da Universidade Católica de Pernambuco.

Seu objetivo geral foi propor uma ferramenta intuitiva para auxiliar investidores, analistas ou estudantes, sem base técnica matemática ou ferramental, a executarem análises baseadas na Teoria Moderna de Portfólios de Markowitz.
O trabalho teve os objetivos específicos:
- Desenvolver um sistema computacional fácil, intuitivo com os seguintes requisitos:
-	Seja baseado em navegador de internet;
-	Permita ao usuário escolher seus próprios ativos;
-	Permita ao usuário configurar parâmetros, tais como: tamanho do histórico de preços dos ativos e quantidade de portfolios gerados;
- Exibição de gráficos de volatilidade, rentabilidade acumulada e fronteira eficiente;

## Instalação e execução

O projeto está dividido em dois módulos: frontend e backend.

### Instalação do Node.js
Antes de mais nada é necessário instalar o Node.js. Seu download pode ser obtivo através [deste link](https://nodejs.org/en/download/).

### Execução do backend
Após a instalação do Node.js, é necessário entrar no diretório markowitz-app/backend (através do prompt de comando) e digitar os seguintes comandos:

```
npm install
npm start
```

O primeiro comando instalará as dependências do backend. O segundo comando executará o módulo backend.
Após a primeira execução não é necessário executar o comando `npm install`, pois as dependências já estarão instaladas. 

### Execução do frontend
Após a instalação do Node.js, é necessário entrar no diretório markowitz-app/frontend (através do prompt de comando) e digitar os seguintes comandos:

```
npm install
npm start
```

O primeiro comando instalará as dependências do frontend. O segundo comando executará o módulo frontend.
Após a primeira execução não é necessário executar o comando `npm install`, pois as dependências já estarão instaladas. 

### Uso do sistema
Após executar o frontend e o backend com os comandos acima, abra um navegador e acesse o endereço `http://localhost:3000`

### Print screen do sistema em execução

![print screen do sistema](https://github.com/emanoelcarlos/markowitz-app/blob/main/misc/printscreen.png?raw=true)
