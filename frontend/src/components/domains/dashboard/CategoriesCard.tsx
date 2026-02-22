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
    <Card className="gap-0 pb-0">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-200 pb-4 h-12">
        <CardTitle className="text-xs font-medium tracking-wider text-gray-500 uppercase">
          Categorias
        </CardTitle>
        <Link to="/categories">
          <Button
            variant="link"
            className="h-auto p-0 text-sm font-medium text-brand-base hover:underline"
          >
            Gerenciar <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent className="py-2 px-1">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between px-4 py-3">
            <Tag color={category.color}>{category.title}</Tag>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{category.transactions.length} itens</span>
              <span className="font-medium text-gray-900">
                {formatCurrency(category.transactionsBalance ?? 0)}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
