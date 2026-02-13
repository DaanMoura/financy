import { Summary, RecentTransactions, CategoriesCard } from '@/components/domains/dashboard'

const DashboardPage = () => {
  return (
    <div className="space-y-6 p-6">
      <Summary balance={12847.32} monthIncome={4250.0} monthExpense={2180.45} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={[]} />
        </div>

        <div>
          <CategoriesCard categories={[]} />
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
