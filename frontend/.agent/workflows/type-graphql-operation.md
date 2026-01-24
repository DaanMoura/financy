---
description: How to type GraphQL queries and mutations using TypedDocumentNode
---

This workflow describes how to add TypeScript types to GraphQL operations (queries and mutations) using `TypedDocumentNode`.

1.  **Analyze the GraphQL Operation**:
    -   Identify the query or mutation in the `.ts` file.
    -   Note the fields being selected.
    -   Identify any variables required.

2.  **Locate Existing Types**:
    -   Check `src/types/index.ts` (or similar shared types files) for existing interfaces that match the data being fetched (e.g., `Category`, `Transaction`, `User`).

3.  **Construct the Operation Types**:
    -   **Import `TypedDocumentNode`**:
        ```typescript
        import { gql, type TypedDocumentNode } from '@apollo/client'
        ```
    -   **Import Shared Types**:
        ```typescript
        import type { Category } from '../../../types' // Adjust path as needed
        ```
    -   **Define the Result Type**:
        -   Create an interface named `<OperationName>Query` or `<OperationName>Mutation`.
        -   Use `Pick<Type, 'field1' | 'field2'>` to select only the fields requested in the query from the shared type.
        -   Handle nested objects and arrays appropriately.
        ```typescript
        export interface ListCategoriesQuery {
          listCategories: Pick<Category, 'id' | 'title' | 'description'>[]
        }
        ```
    -   **Define the Variables Type**:
        -   Create a type named `<OperationName>Variables`.
        -   If no variables, use `Record<string, never>`.
        ```typescript
        export type ListCategoriesQueryVariables = Record<string, never>
        ```

4.  **Apply to the Document Node**:
    -   Annotate the `gql` tag with the created types.
    ```typescript
    export const LIST_CATEGORIES: TypedDocumentNode<ListCategoriesQuery, ListCategoriesQueryVariables> = gql`
      query ListCategories {
        ...
      }
    `
    ```

5.  **Verify Imports**:
    -   Ensure you are using **type-only imports** (`import type { ... }`) for types to avoid build errors with `verbatimModuleSyntax` or similar settings.

6.  **Verify Build**:
    -   Run `npm run build` (or `tsc`) to ensure no type errors were introduced.
