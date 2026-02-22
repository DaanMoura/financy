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
    <Card className="gap-0 pb-0">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200">
        <CardTitle className="text-xs font-medium tracking-wider text-gray-500 uppercase">
          Transações Recentes
        </CardTitle>
        <Link to="/transactions">
          <Button
            variant="link"
            className="h-auto p-0 text-sm font-medium text-brand-base hover:underline"
          >
            Ver todas <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0 m-0">
        <div className="divide-y divide-gray-200">
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
                  <span className="text-gray-900">
                    {item.type === TransactionType.EXPENSE ? '-' : '+'}{' '}
                    {formatCurrency(item.amount)}
                  </span>
                  {item.type === TransactionType.INCOME ? (
                    <ArrowUpCircle className="h-4 w-4 text-brand-base" />
                  ) : (
                    <ArrowDownCircle className="h-4 w-4 text-red-base" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 p-1">
          <TransactionDialog>
            <Button
              variant="ghost"
              className="w-full justify-center text-brand-base hover:underline hover:text-brand-base hover:bg-transparent"
            >
              <Plus className="h-4 w-4" /> Nova transação
            </Button>
          </TransactionDialog>
        </div>
      </CardContent>
    </Card>
  )
}
