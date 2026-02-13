import { ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { formatCurrency } from '@/utils/currencyFormatter'

type Props = {
  balance: number
  monthIncome: number
  monthExpense: number
}

export const Summary = ({ balance, monthIncome, monthExpense }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card>
        <CardContent className="flex flex-col gap-2 px-6">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <Wallet className="h-4 w-4 text-purple-500" />
            SALDO TOTAL
          </div>
          <div className="text-3xl font-bold text-gray-900">{formatCurrency(balance)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-2 px-6">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <ArrowUpCircle className="h-4 w-4 text-green-500" />
            RECEITAS DO MÊS
          </div>
          <div className="text-3xl font-bold text-gray-900">{formatCurrency(monthIncome)}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex flex-col gap-2 px-6">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <ArrowDownCircle className="h-4 w-4 text-red-500" />
            DESPESAS DO MÊS
          </div>
          <div className="text-3xl font-bold text-gray-900">{formatCurrency(monthExpense)}</div>
        </CardContent>
      </Card>
    </div>
  )
}
