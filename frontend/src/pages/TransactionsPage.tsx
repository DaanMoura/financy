import { ChevronLeft, ChevronRight, Pencil, Plus, Search, Trash } from 'lucide-react'
import { IconButton } from '@/components/custom/IconButton'
import { PaginationButton } from '@/components/custom/PaginationButton'
import { Tag } from '@/components/custom/Tag'
import { TransactionType } from '@/components/custom/TransactionType'
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

const TransactionsPage = () => {
  const transactions = [
    {
      title: 'Desenvolvimento de Site',
      date: '12/07/2024',
      amount: 'R$ 12.000,00',
      tag: 'Venda',
      tagColor: 'bg-pink-100 text-pink-700',
      type: 'income' as const
    },
    {
      title: 'Hamburguer',
      date: '11/07/2024',
      amount: 'R$ 50,00',
      tag: 'Alimentação',
      tagColor: 'bg-blue-100 text-blue-700',
      type: 'outcome' as const
    },
    {
      title: 'Aluguel do Apartamento',
      date: '10/07/2024',
      amount: 'R$ 1.200,00',
      tag: 'Casa',
      tagColor: 'bg-yellow-100 text-yellow-700',
      type: 'outcome' as const
    },
    {
      title: 'Computador',
      date: '09/07/2024',
      amount: 'R$ 5.000,00',
      tag: 'Exemplo',
      tagColor: 'bg-neutral-gray-100 text-gray-700',
      type: 'outcome' as const
    }
  ]

  return (
    <div className="space-y-6 pt-12 px-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
          <p className="text-gray-500">Gerencie todas as suas transações financeiras</p>
        </div>
        <Button className="font-semibold">
          <Plus className="mr-2 h-4 w-4" />
          Nova transação
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardContent className="flex gap-4 p-4">
            <div className="w-full space-y-2">
              <span className="text-sm font-medium text-gray-700">Buscar</span>
              <InputGroup>
                <InputGroupAddon>
                  <Search className="text-gray-400" />
                </InputGroupAddon>
                <InputGroupInput placeholder="Buscar por descrição" />
              </InputGroup>
            </div>

            <div className="w-full max-w-[200px] space-y-2">
              <span className="text-sm font-medium text-gray-700">Tipo</span>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="income">Entrada</SelectItem>
                  <SelectItem value="outcome">Saída</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full max-w-[200px] space-y-2">
              <span className="text-sm font-medium text-gray-700">Categoria</span>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="w-full max-w-[200px] space-y-2">
              <span className="text-sm font-medium text-gray-700">Período</span>
              <Select defaultValue="nov_2025">
                <SelectTrigger>
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
                  Título
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Valor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Tipo
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Data
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50/50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {transaction.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {transaction.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <TransactionType type={transaction.type} />
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <Tag color={transaction.tagColor}>{transaction.tag}</Tag>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {transaction.date}
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
