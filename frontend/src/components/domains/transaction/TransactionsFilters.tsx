import { Card, CardContent } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { TransactionType } from '@/types'
import { Search } from 'lucide-react'

interface TransactionsFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  selectedType: TransactionType | 'all'
  onTypeChange: (value: TransactionType | 'all') => void
  selectedCategoryId: string
  onCategoryChange: (value: string) => void
  selectedPeriod: string | undefined
  onPeriodChange: (value: string) => void
  categories: { id: string; title: string }[]
  months: { value: string; label: string }[]
}

export const TransactionsFilters = ({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedCategoryId,
  onCategoryChange,
  selectedPeriod,
  onPeriodChange,
  categories,
  months
}: TransactionsFiltersProps) => {
  return (
    <div className="grid gap-6">
      <Card className="pt-4">
        <CardContent className="flex gap-4">
          <div className="w-full space-y-2">
            <span className="text-sm font-medium text-gray-700">Buscar</span>
            <InputGroup className="w-full mt-2">
              <InputGroupAddon>
                <Search className="text-gray-400" />
              </InputGroupAddon>
              <InputGroupInput
                placeholder="Buscar por descrição"
                value={searchTerm}
                onChange={e => onSearchChange(e.target.value)}
              />
            </InputGroup>
          </div>

          <div className="w-full space-y-2">
            <span className="text-sm font-medium text-gray-700">Tipo</span>
            <Select
              value={selectedType}
              onValueChange={val => onTypeChange(val as TransactionType | 'all')}
            >
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value={TransactionType.INCOME}>Entrada</SelectItem>
                <SelectItem value={TransactionType.EXPENSE}>Saída</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-2">
            <span className="text-sm font-medium text-gray-700">Categoria</span>
            <Select value={selectedCategoryId} onValueChange={onCategoryChange}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-2">
            <span className="text-sm font-medium text-gray-700">Período</span>
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
