# Routes

## Auth Routes

### Login

> Rota para login de usuário.

-   **URL:** `/auth/login`
-   **Método HTTP:** `POST`
-   **Parâmetros:**
    -   `login` (obrigatório): O login do usuário.
    -   `password` (obrigatório): A senha do usuário.
-   **Respostas:**
    -   `200 OK`: Objeto de autenticação bem-sucedido.
    -   `401 Unauthorized`: Não autorizado.
    -   `400 Bad Request`: Requisição inválida.

### Register

> Rota para registro de novo usuário.

-   **URL:** `/auth/register`
-   **Método HTTP:** `POST`
-   **Parâmetros:**
    -   `name` (obrigatório): O nome do usuário.
    -   `login` (obrigatório): O login do usuário.
    -   `password` (obrigatório): A senha do usuário.
    -   `departments_id` (opcional): O ID do departamento ao qual o usuário está associado.
-   **Respostas:**
    -   `201 Created`: Objeto de autenticação bem-sucedido.
    -   `400 Bad Request`: Falha no registro.

## Requests Routes

### Get All Requests

> Rota para obter todas as solicitações.

-   **URL:** `/requests/requests`
-   **Método HTTP:** `GET`
-   **Respostas:**
    -   `200 OK`: Array contendo todas as solicitações.
    -   `204 No Content`: Sem conteúdo encontrado.

### Get Request by ID

> Rota para obter uma solicitação por ID.

-   **URL:** `/requests/request/:id`
-   **Método HTTP:** `GET`
-   **Parâmetros:**
    -   `id` (path, obrigatório): O ID da solicitação a ser obtida.
-   **Respostas:**
    -   `200 OK`: Objeto representando a solicitação.
    -   `204 No Content`: Sem conteúdo encontrado.

### Create Request

> Rota para criar uma nova solicitação.

-   **URL:** `/requests/request`
-   **Método HTTP:** `POST`
-   **Corpo da Solicitação:**
    -   `user_id` (obrigatório): ID do usuário associado à requisição.
    -   `department_id` (obrigatório): ID do departamento associado à requisição.
    -   `enterprise_id` (obrigatório): ID da empresa associada à requisição.
    -   `status_id` (obrigatório): ID do status inicial da requisição.
    -   `description` (opcional): Descrição da requisição.
-   **Respostas:**
    -   `201 Created`: Objeto representando a nova solicitação criada.
    -   `400 Bad Request`: Requisição inválida.

### Delete Request by ID

> Rota para excluir uma solicitação por ID.

-   **URL:** `/requests/request/:id`
-   **Método HTTP:** `DELETE`
-   **Parâmetros:**
    -   `id` (path, obrigatório): O ID da solicitação a ser excluída.
-   **Respostas:**
    -   `200 OK`: Objeto representando a solicitação excluída.
    -   `400 Bad Request`: Requisição inválida.

## Utils Routes

### Get All Rows From Table

> Rota para obter todas as linhas de uma tabela.

-   **URL:** `/utils/:table`
-   **Método HTTP:** `GET`
-   **Parâmetros:**
    -   `table` (obrigatório): O nome da tabela.
-   **Respostas:**
    -   `200 OK`: Array contendo todas as linhas da tabela.
    -   `204 No Content`: Sem conteúdo encontrado.

### Get Row By ID From Table

> Rota para obter uma linha de uma tabela por ID.

-   **URL:** `/utils/:table/:id`
-   **Método HTTP:** `GET`
-   **Parâmetros:**
    -   `table` (obrigatório): O nome da tabela.
    -   `id` (obrigatório): O ID da linha a ser obtida.
-   **Respostas:**
    -   `200 OK`: Objeto representando a linha da tabela.
    -   `204 No Content`: Sem conteúdo encontrado.

### Create Row In Table

> Rota para criar uma nova linha em uma tabela.

-   **URL:** `/utils/:table`
-   **Método HTTP:** `POST`
-   **Parâmetros:**
    -   `table` (obrigatório): O nome da tabela.
    -   `body` (obrigatório): Objeto contendo os dados da nova linha.
-   **Respostas:**
    -   `201 Created`: Objeto representando a nova linha criada.
    -   `400 Bad Request`: Requisição inválida.

### Delete Row By ID From Table

> Rota para excluir uma linha de uma tabela por ID.

-   **URL:** `/utils/:table/:id`
-   **Método HTTP:** `DELETE`
-   **Parâmetros:**
    -   `table` (obrigatório): O nome da tabela.
    -   `id` (obrigatório): O ID da linha a ser excluída.
-   **Respostas:**
    -   `200 OK`: Objeto representando a linha excluída.
    -   `400 Bad Request`: Requisição inválida.
