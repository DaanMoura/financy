import { Summary, RecentTransactions, CategoriesCard } from '@/components/domains/dashboard'
import { GET_SUMMARY } from '@/lib/graphql/queries/GetSummary'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/ListTransactions'
import { LIST_CATEGORIES_FOR_DASHBOARD } from '@/lib/graphql/queries/ListCategories'
import type { Category, Transaction } from '@/types'

import { useQuery } from '@apollo/client/react'

const DashboardPage = () => {
  const { data: summaryData } = useQuery(GET_SUMMARY)

  const balance = summaryData?.getSummary.totalBalance ?? 0
  const monthIncome = summaryData?.getSummary.monthlyIncome ?? 0
  const monthExpense = summaryData?.getSummary.monthlyExpense ?? 0

  const { data: transactionsData } = useQuery(LIST_TRANSACTIONS)
  const recentTransactions = (transactionsData?.listTransactions.slice(0, 5) as Transaction[]) ?? []

  const { data: categoriesData } = useQuery(LIST_CATEGORIES_FOR_DASHBOARD)
  const categories = categoriesData?.listCategories ?? []

  return (
    <div className="space-y-6">
      <Summary balance={balance} monthIncome={monthIncome} monthExpense={monthExpense} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={recentTransactions} />
        </div>

        <div>
          <CategoriesCard categories={categories as Category[]} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
