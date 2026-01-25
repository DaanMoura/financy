import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useState } from 'react'
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { TransactionType } from '@/types'
import { useMutation, useQuery } from '@apollo/client/react'
import { LIST_CATEGORIES_SELECT } from '@/lib/graphql/queries/ListCategories'
import { CREATE_TRANSACTION } from '@/lib/graphql/mutations/CreateTransaction'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/ListTransactions'

type NewTransactionDialogProps = {
  children: React.ReactNode
}

const NewTransactionDialog = ({ children }: NewTransactionDialogProps) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE)
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState('')
  const [categoryId, setCategoryId] = useState('')

  const { data, loading } = useQuery(LIST_CATEGORIES_SELECT)
  const categoryOptions = data?.listCategories ?? []

  const [createTransaction] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [LIST_TRANSACTIONS]
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    createTransaction({
      variables: {
        data: {
          type,
          description,
          amount: parseFloat(amount) * 100,
          date: new Date(date).toISOString(),
          categoryId
        }
      }
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova transação</DialogTitle>
          <DialogDescription>Registre sua despesa ou receita</DialogDescription>
        </DialogHeader>

        <form className="space-y-6 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setType(TransactionType.EXPENSE)}
              className={cn(
                'flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors',
                type === TransactionType.EXPENSE
                  ? 'border-red-500 bg-red-50 text-red-600'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              )}
            >
              <ArrowDownCircle className="h-4 w-4" />
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setType(TransactionType.INCOME)}
              className={cn(
                'flex items-center justify-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors',
                type === TransactionType.INCOME
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-600'
                  : 'border-slate-200 text-slate-500 hover:bg-slate-50'
              )}
            >
              <ArrowUpCircle className="h-4 w-4" />
              Receita
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex. Almoço no restaurante"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Data</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full text-slate-500"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Valor</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-sm font-medium text-slate-500">
                  R$
                </span>
                <Input
                  id="amount"
                  placeholder="0,00"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select disabled={loading} value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map(category => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogClose>
            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default NewTransactionDialog
