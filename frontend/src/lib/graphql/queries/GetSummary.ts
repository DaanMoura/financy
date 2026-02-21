import { gql, type TypedDocumentNode } from "@apollo/client";
import type { Summary } from "@/types";

export interface GetSummaryQuery {
  getSummary: Pick<Summary, 'balance' | 'monthIncome' | 'monthExpense'>
}

export type GetSummaryQueryVariables = Record<string, never>

export const GET_SUMMARY: TypedDocumentNode<GetSummaryQuery, GetSummaryQueryVariables> = gql`
  query GetSummary {
    getSummary {
      balance
      monthIncome
      monthExpense
    }
  }
`