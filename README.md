<h1>Vídeo de demonstração</h1>
<!-- 
local do vídeo 
-->

# 📁 Estrutura do Projeto

🌐 **Root Directory**  
│
├─ 📂 **api/** - _Backend da aplicação contendo toda a lógica e processamento._
│
├─ 📂 **frontend/** - _Frontend da aplicação com a interface do usuário._
│
├─ 📜 **docker_postgres_init.sql** - _Dump do banco de dados PostgreSQL contendo a estrutura e dados iniciais._
│
├─ 📜 **docker-compose.yml** - _Arquivo de configuração do Docker Compose para orquestrar os contêineres._
│
└─ 📜 **README.md** - _Documentação e informações gerais sobre o projeto._

# 🐳 Containers

Essa aplicação foi construída utilizando o Docker Compose para orquestrar os contêineres. Há 3 contêineres:

- **api** - _Backend da aplicação._
- **frontend** - _Frontend da aplicação._
- **db** - _Banco de dados PostgreSQL._

Os containers da api e do frontend foram construídos em Dockerfile separadamente, os quais podem ser encontrados nos seguintes links do dockerhub:

- [api](https://hub.docker.com/repository/docker/lemos12/backend-crud-avaliada-m7/general)
- [frontend](https://hub.docker.com/repository/docker/lemos12/frontend-crud-avaliada-m7)

# 🚀 Como rodar o projeto

Para rodar o projeto é necessário ter o Docker e o Docker Compose instalados na máquina. Após isso, basta clonar o projeto para a sua máquina e executar o seguinte comando na raiz do projeto:

```bash
docker compose up
```

Pronto! Agora você pode acessar os seguintes serviços nos seguintes endereços:

- **api** - _http://localhost:3001_
- **frontend** - _http://localhost:3000_
- **db** - _http://localhost:3002_

# 🔒 Segurança

Toda a `api` e `frontend` estão envolvidos por uma segurança mediada por um token JWT.  
Para acessar os serviços da `api` é necessário passar o token no header `Authorization` com o seguinte valor `Bearer ${seu_token}`. O token JWT é emitido no momento do login e tem validade de 2 horas. Para gerar um novo token é necessário fazer login novamente. Em todas as rotas que são protegidas é possível de identificar um decorador `@Roles` que recebe como argumento os papéis que podem acessar aquela rota. Caso não haja o decorador, significa que não há restrição de acesso a rota. Esse decorador é responsável por definir nos metadados da requisição um valor para `roles`. Foi criado um `guard` para ser executado antes de todas as requisições, o qual verifica se existe algum role nos metadados. Caso exista, seja extraído dos headers o JWT que contém o id e os acessos que o usuário possuí. Caso o usuário tenha o acesso, a requisição continua, caso contrário, a request é encerrada.  
Já para acessar os serviços do `frontend` foi utilizado a biblioteca `next-auth`. Essa biblioteca permite um gerenciamento de sessão de usuário de forma simples e segura através de cookies criptografados. Para acessar qualquer rota do `frontend` é necessário estar logado, caso não esteja você sempre será redirecionado para o login. O login é feito através de um form que coletará o email e a senha do usuário, e enviará um `POST` para a rota de `login` da `api`. Caso a api retorne status 200, ele coletará os dados da resposta (que no caso é o token JWT do usuário) e o armazenará nos cookies geridos pela biblioteca `next-auth`. Em todas as chamadas que requerem autenticação, é utilizado as funções da biblioteca `next-auth` para coletar o JWT armazenado e passar nos headers da requisição. Todas as páginas do `frontend` estão envolvidas por um `middleware` que verifica `server side` se o usuário possui uma sessão vigente, caso não esteja, ele redireciona para a página de login, ou seja, nenhuma página é gerada a não ser que o usuário passe por um login bem sucedida.
