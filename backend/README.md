# Financy — Backend

API GraphQL do **Financy**, uma aplicação de controle financeiro pessoal. O backend é responsável por autenticação de usuários, gerenciamento de categorias e transações, e cálculo de resumo financeiro.

## Tecnologias

| Tecnologia | Descrição |
|---|---|
| [Node.js](https://nodejs.org) + [TypeScript](https://www.typescriptlang.org) | Linguagem e runtime |
| [Express 5](https://expressjs.com) | Servidor HTTP |
| [Apollo Server](https://www.apollographql.com/docs/apollo-server) | Servidor GraphQL |
| [TypeGraphQL](https://typegraphql.com) | Geração de schema GraphQL com decorators |
| [Prisma](https://www.prisma.io) | ORM para acesso ao banco de dados |
| [JWT](https://jwt.io) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js) | Autenticação e hash de senhas |
| [Biome](https://biomejs.dev) | Linter e formatter |

## Funcionalidades

- **Autenticação**: registro, login, refresh token (JWT com access token e refresh token)
- **Usuários**: criação e atualização de perfil
- **Categorias**: CRUD completo com ícone, cor e saldo calculado
- **Transações**: CRUD completo com tipo (receita/despesa), data e categoria
- **Resumo financeiro**: saldo total, receitas e despesas do mês atual

## Pré-requisitos

- [Node.js](https://nodejs.org) >= 14
- [pnpm](https://pnpm.io)
- Banco de dados SQLite

## Configuração do ambiente

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `DATABASE_URL` | URL de conexão com o banco de dados |
| `JWT_SECRET` | Chave secreta para assinar os tokens JWT |

**Exemplo com SQLite:**
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="sua-chave-secreta-aqui"
```

> Com SQLite não é necessário instalar nenhum servidor de banco de dados — o arquivo `dev.db` será criado automaticamente na pasta `prisma/` ao rodar `pnpm db:push`.

## Instalação e execução

### Primeira vez (banco de dados novo)

```bash
# 1. Instalar dependências
pnpm install

# 2. Gerar o cliente Prisma
pnpm db:generate

# 3. Criar as tabelas no banco de dados
pnpm db:push

# 4. Popular o banco com dados de exemplo
pnpm db:seed

# 5. Iniciar o servidor em modo desenvolvimento
pnpm dev
```

### Banco de dados já configurado

```bash
pnpm install
pnpm db:generate
pnpm dev
```

O servidor estará disponível em `http://localhost:4000` com o playground GraphQL acessível em `http://localhost:4000/graphql`.

## Scripts disponíveis

| Script | Descrição |
|---|---|
| `pnpm dev` | Inicia o servidor em modo desenvolvimento com hot reload |
| `pnpm build` | Compila o TypeScript para JavaScript |
| `pnpm start` | Inicia o servidor a partir do build compilado |
| `pnpm db:generate` | Gera o cliente Prisma a partir do schema |
| `pnpm db:push` | Aplica o schema do Prisma no banco de dados |
| `pnpm db:seed` | Popula o banco com dados de exemplo |
| `pnpm check` | Executa o linter e formatter (Biome) |
| `pnpm check-types` | Verifica os tipos TypeScript sem compilar |

## Estrutura do projeto

```
src/
├── client/        # Instância do Prisma Client
├── dtos/          # Data Transfer Objects (inputs GraphQL)
├── graphql/       # Configuração do servidor Apollo/GraphQL
├── middlewares/   # Middlewares (ex: autenticação)
├── models/        # Modelos GraphQL (types de retorno)
├── resolvers/     # Resolvers GraphQL (queries e mutations)
├── services/      # Lógica de negócio
├── utils/         # Utilitários
└── index.ts       # Ponto de entrada da aplicação
prisma/
├── schema.prisma  # Schema do banco de dados
└── seed.ts        # Script de seed
```
