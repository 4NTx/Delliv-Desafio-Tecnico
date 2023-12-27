# Delliv Fullstack Pleno Coding Challenge

# Instruções de Configuração e Instalação

Este documento fornece um guia passo a passo para configurar e iniciar as aplicações 'delliv' e 'delliv-front' em seu ambiente de desenvolvimento.

## Configurando e Iniciando a Aplicação Backend 'delliv'

### 1. Instalação do NestJS

Execute o comando abaixo para instalar o NestJS globalmente:

```bash
npm i -g @nestjs/cli
```

### 2. Configuração do Projeto 'delliv'

Navegue até a pasta do projeto 'delliv' e instale as dependências:

```bash
cd caminho/para/delliv
npm i
```

### 3. Configuração do Banco de Dados

- Instale o PostgreSQL em sua máquina.
- (Opcional) Instale o pgAdmin4, se desejar (não necessário para Prisma).
- Altere `DATABASE_URL` no arquivo `.env` para corresponder às suas configurações de banco de dados PostgreSQL.

### 4. Iniciando a Aplicação

Após configurar o banco de dados, inicie a aplicação:

```bash
npm run start
```

Você verá no console a URL de acesso, geralmente `http://localhost:3000`.

## Configurando e Iniciando a Aplicação Frontend 'delliv-front'

### 1. Configuração do Projeto 'delliv-front'

Navegue até a pasta do projeto 'delliv-front' e instale as dependências:

```bash
cd caminho/para/delliv-front
npm i
```

### 2. Configuração da Conexão com o Backend

- Após a instalação, altere as informações de URL da API no arquivo `.env.local` da aplicação 'delliv-front'.
- Use a porta informada pelo backend para atualizar a URL da API.

Após concluir estes passos, tanto o backend quanto o frontend estarão configurados e prontos para uso. Lembre-se de que as portas podem variar, sendo `http://localhost:3000` para o backend e `http://localhost:3001` para o frontend (a porta do frontend pode variar).


## Checklist do Desafio

Desenvolver um aplicativo de rastreamento de entregas para usuários autenticados, que permite visualizar e atualizar a lista de pedidos, com ênfase em autenticação e segurança.
Tempo definido para o teste: 5 DIAS
Haverá atualizações regulares neste repositório até eu finalizar o projeto.

## Requisitos Técnicos

### Geral

- Entrega em um repositório GitHub (monorepo). ✅
- Instruções claras para execução local. ✅

### Frontend

- Desenvolvimento com React e Redux. ✅
- Uso de TypeScript. ✅

### Backend

- NestJS com Prisma. ✅
- API RESTful: operações de listagem e atualização de pedidos. ✅
- Autenticação e autorização de usuário. ✅

### Banco de Dados

- PostgreSQL para persistência de dados. ✅

### Princípios de Desenvolvimento

- Aplicação dos princípios SOLID. ✅
- Atomic Design na estruturação dos componentes do frontend.

### Testes

- Desenvolvimento de testes unitários para frontend e backend.

### Docker

- Configuração para execução do aplicativo via Docker.

## Tarefas

### 1. Configuração do Ambiente de Desenvolvimento

- Configurar React com Redux e TypeScript. ✅
- Configurar NestJS com Prisma para o backend. ✅
- Preparar Docker para execução da aplicação.

### 2. Modelagem de Dados

- Pedido: ID, nome do cliente, endereço, status. ✅
- Usuário: ID, nome, e-mail, senha criptografada. ✅

### 3. Implementação do Backend

- Controlador NestJS para pedidos. ✅
- Endpoints para operações com pedidos. ✅
- Autenticação e autorização de usuário. ✅

### 4. Implementação do Frontend

- Estrutura de componentes com Atomic Design.
- Página de login e autenticação. ✅
- Exibição de lista de pedidos.
- Funcionalidade de atualização de status dos pedidos.

### 5. Testes Unitários

- Implementação de testes para as principais funcionalidades.
- Utilização de Jest para testes.

### 6. Dockerfile

- Criação e configuração do Dockerfile para o aplicativo React.

### 7. Docker Compose

- Elaboração do arquivo docker-compose.yml para serviços relacionados.

## Recomendações

- Seguir as melhores práticas de codificação e organização. ✅
- Documentação clara para execução local com Docker.
- Testes unitários abrangentes para garantir a qualidade.
