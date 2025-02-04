# Web project Around US

Este é um projeto de galeria de imagens responsivo, desenvolvido com as tecnologias React, Vite e ESLint. O site permite que os usuários adicionem e excluam suas imagens, bem como curtam ou descurtam imagens postadas por outros usuários.

O sistema utiliza React Context para o gerenciamento de estado global, implementa rotas protegidas para áreas específicas e utiliza JWT para autenticação e autorização. Todas as informações são armazenadas e recuperadas de uma API.

## Funcionalidades

**Cadastro e Login**

- Rota /signin: Tela de login.
- Rota /signup: Tela de cadastro.
- O token de sessão é salvo localmente para evitar a necessidade de autenticação repetida.

**Galeria de Imagens**

- Rota /: Página inicial onde as imagens são exibidas.
- Adicionar e excluir suas próprias imagens.
- Curtir e descurtir imagens postadas por outros usuários.

## Tecnologias Utilizadas

**Frontend**

- React
- React Router
- React Context API
- Vite

**Linting e Padrões de Código**

- ESLint

**Autenticação e Autorização**

- JWT (JSON Web Tokens)

**Backend**

- Autorização e autenticação: https://se-register-api.en.tripleten-services.com/v1
- Imagens: https://around.nomoreparties.co/v1/web-ptbr-cohort-14
