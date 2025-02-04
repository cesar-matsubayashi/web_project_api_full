# Web project Around Express

Este projeto é um servidor construído com Node.js e Express que utiliza o sistema de rotas do Express Router. Ele utiliza o MongoDB como banco de dados para retornar e gravar dados e usuários e cartões por meio de requisições HTTP. É possível acessar todos os usuários e locais, bem como consultar dados de um usuário específico pelo seu ID.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript no servidor.
- **Express:** Framework para criação de servidores.
- **MongoDB:** Banco de datos NoSQL

## Funcionalidades

- **Listagem de usuários:** Retorna dados de usuários em `/users`.
- **Criação de usuário:** Cria um novo usuário em `/users`.
- **Detalhes de um usuário específico:** Retorna dados de um usuário específico através de `/users/:id`.
- **Atualização de perfil:** Atualiza dados de perfil do usuário em `/users/me`.
- **Atualização de avatar:** Atualiza link de avatar do usuário em `/users/me/avatar`.
- **Listagem de cartões:** Retorna dados de locais em `/cards`.
- **Criação de cartões:** Cria um novo cartão em `/cards`.
- **Delecão de cartões:** Remove dados de um cartão específico em `/cards/:id`.
- **Curtida de cartões:** Adiciona dados de curtida de um cartão específico em `/cards/:cardId/likes`.
- **Descurtida de cartões:** Remove dados de curtida de um cartão específico em `/cards/:cardId/likes`.

## Uso

1. Inicie o servidor:

   ```bash
   npm start
   ```

2. O servidor estará disponível em [http://localhost:3000].

3. Rotas disponíveis:
   - `GET /users`: Retorna uma lista de usuários.
   - `POST /users`: Adiciona um novo usuário.
   - `GET /users/:id`: Retorna dados de um usuário específico.
   - `PATCH /users/me`: Atualiza dados do usuário atual.
   - `PATCH /users/me/avatar`: Atualiza dados de avatar do usuário atual.
   - `GET /cards`: Retorna uma lista de locais.
   - `POST /cards`: Adiciona dados de um novo cartão.
   - `DELETE /cards/:id`: Remove dados de um cartão específico.
   - `PUT /cards/:id/likes`: Atualiza dados de curtida de um cartão específico.
   - `DELETE /cards/:id/likes`: Remove dados de curtida de um cartão específico.

## Exemplos de Requisição

### Criar Usuário

**Requisição:**

```bash
POST http://localhost:3000/users
```

Body

```json
{
  "name": "Test User",
  "about": "About Test User",
  "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg"
}
```

**Resposta:**

```json
{
  "name": "Test User",
  "about": "About Test User",
  "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
  "_id": "676f1a734c0f35eb75b814be",
  "__v": 0
}
```

### Listar Usuários

**Requisição:**

```bash
GET http://localhost:3000/users
```

**Resposta:**

```json
[
  {
    "name": "Ada Lovelace",
    "about": "Mathematician, writer",
    "avatar": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
    "_id": "dbfe53c3c4d568240378b0c6"
  },
  {
    "name": "Tim Berners-Lee",
    "about": "Inventor, scientist",
    "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
    "_id": "d285e3dceed844f902650f40"
  }
]
```

### Consultar Usuário por ID

**Requisição:**

```bash
GET http://localhost:3000/users/8340d0ec33270a25f2413b69
```

**Resposta:**

```json
{
  "name": "Katherine Johnson",
  "about": "Mathematician",
  "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/800px-Katherine_Johnson_1983.jpg",
  "_id": "8340d0ec33270a25f2413b69"
}
```

### Listar Locais

**Requisição:**

```bash
GET http://localhost:3000/cards
```

**Resposta:**

```json
[
  {
    "likes": [
      {
        "name": "Tim Berners-Lee",
        "about": "Inventor, scientist",
        "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
        "_id": "d285e3dceed844f902650f40"
      }
    ],
    "_id": "5d208fb50fdbbf001ffdf72a",
    "name": "White Sulphur Springs, WV",
    "link": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/2008-0831-TheGreenbrier-North.jpg/1024px-2008-0831-TheGreenbrier-North.jpg",
    "owner": {
      "name": "Katherine Johnson",
      "about": "Mathematician",
      "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/800px-Katherine_Johnson_1983.jpg",
      "_id": "8340d0ec33270a25f2413b69"
    },
    "createdAt": "2019-07-06T12:10:29.149Z"
  },
  {
    "likes": [
      {
        "name": "Katherine Johnson",
        "about": "Mathematician",
        "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/800px-Katherine_Johnson_1983.jpg",
        "_id": "8340d0ec33270a25f2413b69"
      },
      {
        "name": "Tim Berners-Lee",
        "about": "Inventor, scientist",
        "avatar": "https://media.wired.com/photos/5c86f3dd67bf5c2d3c382474/4:3/w_2400,h_1800,c_limit/TBL-RTX6HE9J-(1).jpg",
        "_id": "d285e3dceed844f902650f40"
      },
      {
        "name": "Ada Lovelace",
        "about": "Mathematician, writer",
        "avatar": "https://www.biography.com/.image/t_share/MTE4MDAzNDEwODQwOTQ2MTkw/ada-lovelace-20825279-1-402.jpg",
        "_id": "dbfe53c3c4d568240378b0c6"
      }
    ],
    "_id": "5d208fe20fdbbf001ffdf72b",
    "name": "West Virginia State University",
    "link": "https://upload.wikimedia.org/wikipedia/en/4/42/West_Virginia_State_University_seal.png",
    "owner": {
      "name": "Katherine Johnson",
      "about": "Mathematician",
      "avatar": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Katherine_Johnson_1983.jpg/800px-Katherine_Johnson_1983.jpg",
      "_id": "8340d0ec33270a25f2413b69"
    },
    "createdAt": "2019-07-06T12:11:14.149Z"
  }
]
```
