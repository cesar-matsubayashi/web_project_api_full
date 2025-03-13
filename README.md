# Web Project Around Express

Este projeto é uma aplicação web completa composta por um backend desenvolvido em Node.js com Express e um frontend construído com React e Vite. Ele permite que os usuários cadastrem-se, façam login, adicionem, excluam e curtam imagens em uma galeria interativa. O backend utiliza MongoDB para armazenar usuários e cartões, enquanto o frontend gerencia a interface e a experiência do usuário.

## Tecnologias Utilizadas

### Backend
- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express:** Framework para criação de servidores.
- **MongoDB:** Banco de dados NoSQL.

### Frontend
- **React:** Biblioteca JavaScript para construção de interfaces.
- **React Router:** Gerenciamento de rotas no frontend.
- **React Context API:** Gerenciamento de estado global.
- **Vite:** Ferramenta para construção e otimização do frontend.

### Autenticação e Segurança
- **JWT (JSON Web Tokens):** Gerenciamento de autenticação segura.
- **ESLint:** Ferramenta para padronização e qualidade do código.

## Funcionalidades

### Backend
- **Usuários:**
  - `GET /users`: Retorna uma lista de usuários.
  - `POST /users`: Adiciona um novo usuário.
  - `GET /users/:id`: Retorna dados de um usuário específico.
  - `PATCH /users/me`: Atualiza dados do usuário atual.
  - `PATCH /users/me/avatar`: Atualiza avatar do usuário atual.
- **Cartões:**
  - `GET /cards`: Retorna uma lista de locais.
  - `POST /cards`: Adiciona um novo cartão.
  - `DELETE /cards/:id`: Remove um cartão específico.
  - `PUT /cards/:id/likes`: Adiciona uma curtida a um cartão.
  - `DELETE /cards/:id/likes`: Remove uma curtida de um cartão.

### Frontend
- **Cadastro e Login:**
  - Rota `/signin`: Tela de login.
  - Rota `/signup`: Tela de cadastro.
  - Armazena o token de sessão para evitar reautenticação constante.
- **Galeria de Imagens:**
  - Rota `/`: Página inicial com exibição de imagens.
  - Possibilidade de adicionar e excluir suas próprias imagens.
  - Opção de curtir e descurtir imagens postadas por outros usuários.

## Uso

### Backend
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. O backend estará disponível em [http://localhost:3000](http://localhost:3000).

### Frontend
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o frontend:
   ```bash
   npm run dev
   ```
3. O frontend estará disponível em [http://localhost:3001](http://localhost:3001).

### Nome Domínio
https://around.ignorelist.com/
