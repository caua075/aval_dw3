# Projeto Banco

Este é um projeto simples de simulação de banco utilizando apenas uma tabela chamada **`conta`**. O sistema foi desenvolvido utilizando **JavaScript** tanto no **back-end** quanto no **front-end**. O objetivo é fornecer uma plataforma simples para gerenciar informações bancárias, como saldo, transferências e exibição de contas.

## Tecnologias Utilizadas

- **Back-end**: Node.js (com Express)
- **Front-end**: 
- **Banco de Dados**: Simulado (sem banco real, dados mantidos na memória)

## Estrutura do Projeto
/ProjetoBanco
│
├── /backend            # Código do servidor (Node.js + Express)
│   ├── app.js       # Arquivo principal do servidor
│   ├── routes.js       # Roteamento da API
│   └── data.js         # Armazenamento de dados (simulado)
│
├── /frontend           # Arquivos do front-end (HTML, CSS, JS)
│   ├── index.html      # Interface do usuário
│   ├── style.css       # Estilos da página
│   └── script.js       # Lógica de interação com a API
│
└── README.md           # Este arquivo

## Como Rodar o Projeto

### Pré-requisitos

- **Node.js** (recomenda-se a versão 14 ou superior)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/caua075/aval_dw3.git
   cd ProjetoBanco

1. Este é um comentário em Markdown
   ```bash
   cd backend
   npm install

2. Para o front-end (Nunjucks)
   ```bash
   cd ../frontend
   npm install

### Rodando o Back-end (e servindo o Front-end)
 - Após a instalação das dependências, inicie o servidor no diretório backend:
   
   ```bash
   node app.js

