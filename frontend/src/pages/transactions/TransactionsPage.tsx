import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash } from 'lucide-react'
import { IconButton } from '@/components/custom/IconButton'
import { PaginationButton } from '@/components/custom/PaginationButton'
import { Tag } from '@/components/custom/Tag'
import { TransactionTypeIndicator } from '@/components/domains/transaction/TransactionType'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/ListTransactions'
import { useQuery } from '@apollo/client/react'
import NewTransactionDialog from '@/components/domains/transaction/NewTransactionDialog'

const TransactionsPage = () => {
  const { data } = useQuery(LIST_TRANSACTIONS)

  const transactions = data?.listTransactions || []

  return (
    <div className="space-y-6 pt-12 px-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
          <p className="text-gray-500">Gerencie todas as suas transações financeiras</p>
        </div>
        <NewTransactionDialog>
          <Button size="sm" className="font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Nova transação
          </Button>
        </NewTransactionDialog>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="flex gap-4 p-4">
            <div className="w-full space-y-2">
              <span className="text-sm font-medium text-gray-700">Buscar</span>
              <InputGroup className="w-full">
                <InputGroupAddon>
                  <Search className="text-gray-400" />
                </InputGroupAddon>
                <InputGroupInput placeholder="Buscar por descrição" />
              </InputGroup>
            </div>

            <div className="w-full space-y-2">
              <span className="text-sm font-medium text-gray-700">Tipo</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="income">Entrada</SelectItem>
                  <SelectItem value="outcome">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full space-y-2">
              <span className="text-sm font-medium text-gray-700">Categoria</span>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full space-y-2">
              <span className="text-sm font-medium text-gray-700">Período</span>
              <Select defaultValue="nov_2025">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nov_2025">Novembro / 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="border-b border-gray-100 bg-gray-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Descrição
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Valor
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map(transaction => (
                <tr key={transaction.id} className="hover:bg-gray-50/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {transaction.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Tag color={transaction.category?.color}>{transaction.category?.title}</Tag>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <TransactionTypeIndicator type={transaction.type} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {transaction.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <IconButton icon={<Pencil />} />
                      <IconButton icon={<Trash />} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <Button variant="outline" className="gap-2" disabled>
              <ChevronLeft className="size-4" />
              Anterior
            </Button>
            <div className="flex items-center gap-2">
              <PaginationButton isActive>1</PaginationButton>
              <PaginationButton>2</PaginationButton>
              <PaginationButton>3</PaginationButton>
            </div>
            <Button variant="outline" className="gap-2">
              Próxima
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage
