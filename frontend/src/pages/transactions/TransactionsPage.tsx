import { ChevronLeft, ChevronRight, Plus, SquarePen, Trash } from 'lucide-react'
import { IconButton } from '@/components/custom/IconButton'
import { PaginationButton } from '@/components/custom/PaginationButton'
import { Tag } from '@/components/custom/Tag'
import { TransactionTypeIndicator } from '@/components/domains/transaction/TransactionType'
import { TransactionsFilters } from '@/components/domains/transaction/TransactionsFilters'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LIST_CATEGORIES_SELECT } from '@/lib/graphql/queries/ListCategories'
import { LIST_TRANSACTIONS } from '@/lib/graphql/queries/ListTransactions'
import { TransactionType, type Transaction } from '@/types'
import { useMutation, useQuery } from '@apollo/client/react'
import { useEffect, useMemo, useState } from 'react'
import { TransactionDialog } from '@/components/domains/transaction'
import { DELETE_TRANSACTION } from '@/lib/graphql/mutations/DeleteTransaction'
import { GET_SUMMARY } from '@/lib/graphql/queries/GetSummary'
import { formatCurrency } from '@/utils/currencyFormatter'
import { CategoryIconBadge } from '@/components/domains/category'

const ITEMS_PER_PAGE = 10

const getPeriodDates = (period: string) => {
  if (!period) return { start: undefined, end: undefined }

  // Format: "nov_2025" or similar
  const [monthStr, yearStr] = period.split('_')
  if (!monthStr || !yearStr) return { start: undefined, end: undefined }

  const months: Record<string, number> = {
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11
  }

  const month = months[monthStr.toLowerCase()]
  const year = parseInt(yearStr, 10)

  if (month === undefined || isNaN(year)) return { start: undefined, end: undefined }

  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0, 23, 59, 59, 999)

  return { start, end }
}

const TransactionsPage = () => {
  /* ... inside TransactionsPage ... */
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<TransactionType | 'all'>('all')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all')
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all')

  // Reset page on filter change
  // biome-ignore lint/correctness/useExhaustiveDependencies: it needs to react when any filter changes
  useEffect(() => {
    setPage(1)
  }, [searchTerm, selectedType, selectedCategoryId, selectedPeriod])

  const { data: categoriesData } = useQuery(LIST_CATEGORIES_SELECT)
  const categories = categoriesData?.listCategories || []

  const { data, loading } = useQuery(LIST_TRANSACTIONS, {
    fetchPolicy: 'cache-and-network'
  })

  const allTransactions = data?.listTransactions || []

  const filteredTransactions = useMemo(() => {
    let result = allTransactions

    // Filter by search
    if (searchTerm) {
      result = result.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by type
    if (selectedType !== 'all') {
      result = result.filter(t => t.type === selectedType)
    }

    // Filter by category
    if (selectedCategoryId !== 'all') {
      result = result.filter(t => t.categoryId === selectedCategoryId)
    }

    // Filter by period
    if (selectedPeriod && selectedPeriod !== 'all') {
      const { start, end } = getPeriodDates(selectedPeriod)
      if (start && end) {
        result = result.filter(t => {
          const date = new Date(t.date)
          return date >= start && date <= end
        })
      }
    }

    return result
  }, [allTransactions, searchTerm, selectedType, selectedCategoryId, selectedPeriod])

  const months = useMemo(() => {
    const _months: Set<string> = new Set()
    allTransactions.forEach(t => {
      const date = new Date(t.date)
      const month = date.getMonth()
      const year = date.getFullYear()
      _months.add(`${month}_${year}`)
    })
    return Array.from(_months).map(m => {
      const [month, year] = m.split('_')
      const date = new Date(parseInt(year), parseInt(month))
      return { value: m, label: date.toLocaleString('pt-BR', { month: 'short', year: 'numeric' }) }
    })
  }, [allTransactions])

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE) || 1
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  )

  const hasMore = page < totalPages

  const [deleteTransaction] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [LIST_TRANSACTIONS, GET_SUMMARY]
  })

  const handleDelete = (id: string) => {
    deleteTransaction({ variables: { id } })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transações</h1>
          <p className="text-gray-500">Gerencie todas as suas transações financeiras</p>
        </div>
        <TransactionDialog>
          <Button size="sm" className="font-semibold">
            <Plus className="mr-2 h-4 w-4" />
            Nova transação
          </Button>
        </TransactionDialog>
      </div>

      <TransactionsFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={val => setSelectedType(val as TransactionType | 'all')}
        selectedCategoryId={selectedCategoryId}
        onCategoryChange={setSelectedCategoryId}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        months={months}
        categories={categories}
      />

      <Card className="p-0 pt-1">
        <CardContent className="p-0">
          <table className="w-full">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Descrição
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Data
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Categoria
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Tipo
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Valor
                </th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading && allTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Carregando...
                  </td>
                </tr>
              ) : paginatedTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    Nenhuma transação encontrada
                  </td>
                </tr>
              ) : (
                paginatedTransactions.map(transaction => (
                  <tr key={transaction.id} className="hover:bg-gray-50/50">
                    <td className="whitespace-nowrap px-6 py-4 text-md font-medium text-gray-800">
                      <div className="flex items-center gap-4">
                        <CategoryIconBadge
                          color={transaction.category?.color}
                          icon={transaction.category?.icon}
                        />
                        {transaction.description}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString('pt-BR')}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {transaction.category && (
                        <Tag color={transaction.category.color}>{transaction.category.title}</Tag>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <TransactionTypeIndicator type={transaction.type} />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-800">
                      {transaction.type === TransactionType.EXPENSE ? '-' : '+'}{' '}
                      {formatCurrency(transaction.amount)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <IconButton
                          className="text-feedback-danger"
                          onClick={() => handleDelete(transaction.id)}
                          icon={<Trash />}
                        />
                        <TransactionDialog transaction={transaction as Transaction}>
                          <IconButton icon={<SquarePen />} />
                        </TransactionDialog>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
            {/* Left: current range + total */}
            <span className="text-sm text-gray-500">
              {filteredTransactions.length === 0
                ? '0 resultados'
                : `${(page - 1) * ITEMS_PER_PAGE + 1} a ${Math.min(page * ITEMS_PER_PAGE, filteredTransactions.length)} | ${filteredTransactions.length} resultados`}
            </span>

            {/* Right: prev / page buttons / next */}
            <div className="flex items-center gap-1">
              <PaginationButton
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || loading}
              >
                <ChevronLeft className="size-4" />
              </PaginationButton>

              {(() => {
                // Always show up to 3 consecutive pages centred on current page
                let start = Math.max(1, page - 1)
                const end = Math.min(totalPages, start + 2)
                start = Math.max(1, end - 2)
                return Array.from({ length: end - start + 1 }, (_, i) => start + i).map(p => (
                  <PaginationButton key={p} isActive={p === page} onClick={() => setPage(p)}>
                    {p}
                  </PaginationButton>
                ))
              })()}

              <PaginationButton
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={!hasMore || loading}
              >
                <ChevronRight className="size-4" />
              </PaginationButton>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage
