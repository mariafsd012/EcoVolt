# 𖣘 EcoVolt

O **EcoVolt** é um sistema corporativo desenvolvido para uma **empresa fictícia do setor de energia eólica**, com o objetivo de centralizar e otimizar os processos internos da organização.

A plataforma reúne diferentes setores da empresa em um único ambiente, oferecendo ferramentas para gestão de colaboradores, controle operacional e acompanhamento de informações estratégicas.

O principal módulo do sistema é o **Controle de Ponto**, permitindo o registro, manutenção e edição dos pontos dos colaboradores. Além disso, o EcoVolt conta com diversos módulos administrativos que simulam as necessidades reais de uma empresa do ramo de energia renovável.

---

## 🎯 Objetivo do Projeto

O EcoVolt foi desenvolvido como um projeto acadêmico com o objetivo de simular um sistema corporativo utilizado por uma empresa do setor de energia eólica, aplicando conceitos de:

- Desenvolvimento Full Stack
- Arquitetura em Camadas
- APIs REST
- Autenticação e Autorização
- Integração Front-End e Back-End
- Persistência de Dados
- Controle de Versionamento com Git

---

## 👨‍💻 Equipe

Projeto desenvolvido para fins acadêmicos, simulando um ambiente corporativo real e aplicando boas práticas de desenvolvimento de software.

## ✨ Funcionalidades

### 🕒 Controle de Ponto
- Registro de ponto
- Consulta de registros
- Edição de pontos
- Manutenção dos registros
- Controle de jornada dos colaboradores

### 👥 DHO (Desenvolvimento Humano e Organizacional)
- Gestão de benefícios
- Controle de desempenho
- Administração de colaboradores

### 🏠 Moradia
- Gerenciamento das moradias disponibilizadas pela empresa

### 🚗 Frota
- Controle e administração da frota de veículos

### 🦺 EHS
(Environment, Health and Safety

- Gestão de Equipe e Campo
- Segurança do Trabalho

### 💻 TI
- Gerenciamento de recursos tecnológicos
- Controle de demandas da área de tecnologia

### 🎧 Suporte
- Acompanhamento de solicitações dos usuários
- Gestão de atendimentos internos

### 📊 Relatórios
- Visualização de indicadores
- Emissão de relatórios gerenciais
- Acompanhamento de informações dos módulos do sistema

---

## 🚀 Tecnologias Utilizadas

### Back-End
- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Hibernate
- JWT (JSON Web Token)
- Lombok
- Maven

### Front-End
- Next.js
- Tailwind CSS
- CSS Modules
- Axios
- Lucide React

### Banco de Dados
- PostgreSQL
- Docker

### Ferramentas de Desenvolvimento
- VS Code
- Git
- GitHub
- Postman
- Figma

---

## 📁 Estrutura do Projeto

```text
ECOVOLT/
├── backend/             
├── frontend/             
├── node_modules/
```

---

## ⚙️ Como Executar o Projeto

### Pré-requisitos

Certifique-se de possuir instalado:

- Docker Desktop
- Java 17
- Node.js
- npm
- Git

---

### 1. Clone o repositório

```bash
git clone https://github.com/mariafsd012/EcoVolt.git
cd EcoVolt
```

---

### 2. Inicie o Banco de Dados

Acesse a pasta do backend:

```bash
cd backend
```

Execute:

```bash
docker-compose up -d
```

Esse comando iniciará os containers necessários para o funcionamento da aplicação.

---

### 3. Execute o Back-End

Ainda na pasta `backend`, execute:

```bash
mvnw spring-boot:run
```

O servidor Spring Boot será iniciado.

---

### 4. Execute o Front-End

Abra um novo terminal e acesse a pasta do frontend:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Inicie a aplicação:

```bash
npm run dev
```

---

### 5. Acesse o Sistema

Após iniciar todos os serviços, abra o navegador e acesse:

```text
http://localhost:3000/home
```

---

### 6. Encerrar o Banco de Dados

Para finalizar os containers:

```bash
docker-compose down
```

---

## 🔒 Segurança

O sistema utiliza autenticação baseada em **JWT (JSON Web Token)** integrada ao **Spring Security**, garantindo controle de acesso e proteção das rotas da aplicação.

---

