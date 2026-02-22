import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/custom/Tag'
import { ArrowDownCircle, ArrowUpCircle, ChevronRight, Plus } from 'lucide-react'
import { TransactionType, type Transaction } from '@/types'
import { DynamicIcon } from 'lucide-react/dynamic'
import { getCategoryIconName } from '@/utils/categoryIcons'
import { getCategoryColor } from '@/utils/categoryColors'
import { formatCurrency } from '@/utils/currencyFormatter'
import { TransactionDialog } from '../transaction'
import { Link } from 'react-router-dom'

type Props = {
  transactions: Transaction[]
}

export const RecentTransactions = ({ transactions }: Props) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
        <CardTitle className="text-xs font-bold tracking-wider text-gray-500 uppercase">
          Transações Recentes
        </CardTitle>
        <Link to="/transactions">
          <Button
            variant="link"
            className="h-auto p-0 text-sm font-medium text-green-600 hover:no-underline"
          >
            Ver todas <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {transactions.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${getCategoryColor(item.category?.color).bgLight} ${getCategoryColor(item.category?.color).text}`}
                >
                  <DynamicIcon name={getCategoryIconName(item.category?.icon)} />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{item.description}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Tag color={item.category?.color}>{item.category?.title}</Tag>
                <div className="flex items-center gap-2 font-medium">
                  <span
                    className={
                      item.type === TransactionType.INCOME ? 'text-gray-900' : 'text-gray-900'
                    }
                  >
                    {formatCurrency(item.amount)}
                  </span>
                  {item.type === TransactionType.INCOME ? (
                    <ArrowUpCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 p-4">
          <TransactionDialog>
            <Button
              variant="ghost"
              className="w-full justify-center text-green-600 hover:bg-green-50 hover:text-green-700"
            >
              <Plus className="mr-2 h-4 w-4" /> Nova transação
            </Button>
          </TransactionDialog>
        </div>
      </CardContent>
    </Card>
  )
}
