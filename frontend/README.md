# Financy — Frontend

Interface web do **Financy**, uma aplicação de controle financeiro pessoal. Desenvolvida com React + Vite e se comunica com o backend via GraphQL.

## Tecnologias

| Tecnologia | Descrição |
|---|---|
| [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) | UI e tipagem |
| [Vite](https://vite.dev) | Bundler e dev server |
| [Apollo Client](https://www.apollographql.com/docs/react) | Cliente GraphQL |
| [TailwindCSS 4](https://tailwindcss.com) + [Radix UI](https://www.radix-ui.com) | Estilização e componentes |
| [React Router](https://reactrouter.com) | Roteamento |
| [Zustand](https://zustand-demo.pmnd.rs) | Gerenciamento de estado |
| [TanStack Query](https://tanstack.com/query) | Cache e sincronização de dados |

## Pré-requisitos

- [Node.js](https://nodejs.org) >= 14
- [pnpm](https://pnpm.io)
- Backend do Financy rodando (ver `../backend/README.md`)

## Configuração do ambiente

Copie o arquivo de exemplo e preencha as variáveis:

```bash
cp .env.example .env
```

| Variável | Descrição |
|---|---|
| `VITE_BACKEND_URL` | URL da API GraphQL do backend |

**Exemplo:**
```env
VITE_BACKEND_URL="http://localhost:4000"
```

## Instalação e execução

```bash
# 1. Instalar dependências
pnpm install

# 2. Iniciar o servidor de desenvolvimento
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`.

## Scripts disponíveis

| Script | Descrição |
|---|---|
| `pnpm dev` | Inicia o servidor de desenvolvimento |
| `pnpm build` | Gera o bundle de produção |
| `pnpm preview` | Pré-visualiza o build de produção localmente |
| `pnpm lint` | Executa o linter (Biome) |
