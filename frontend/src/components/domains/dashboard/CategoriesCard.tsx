import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tag } from '@/components/custom/Tag'
import { ChevronRight } from 'lucide-react'
import type { Category } from '@/types'
import { formatCurrency } from '@/utils/currencyFormatter'
import { Link } from 'react-router-dom'

type Props = {
  categories: Category[]
}

export const CategoriesCard = ({ categories }: Props) => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
        <CardTitle className="text-xs font-bold tracking-wider text-gray-500 uppercase">
          Categorias
        </CardTitle>
        <Link to="/categories">
          <Button
            variant="link"
            className="h-auto p-0 text-sm font-medium text-green-600 hover:no-underline"
          >
            Gerenciar <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {categories.map((category, index) => (
            <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
              <Tag color={category.color}>{category.title}</Tag>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">{category.transactions.length} itens</span>
                <span className="font-medium text-gray-900">
                  {formatCurrency(category.transactionsBalance ?? 0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
