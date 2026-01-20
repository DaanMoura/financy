import { ArrowDownCircle, ArrowUpCircle, ChevronRight, Plus, Wallet } from 'lucide-react'
import { Chip } from '@/components/custom/Chip'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const DashboardPage = () => {
  return (
    <div className="space-y-6 p-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="flex flex-col gap-2 px-6 ">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Wallet className="h-4 w-4 text-purple-500" />
              SALDO TOTAL
            </div>
            <div className="text-3xl font-bold text-gray-900">R$ 12.847,32</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2 px-6">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <ArrowUpCircle className="h-4 w-4 text-green-500" />
              RECEITAS DO MÊS
            </div>
            <div className="text-3xl font-bold text-gray-900">R$ 4.250,00</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col gap-2 px-6">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <ArrowDownCircle className="h-4 w-4 text-red-500" />
              DESPESAS DO MÊS
            </div>
            <div className="text-3xl font-bold text-gray-900">R$ 2.180,45</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
              <CardTitle className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                Transações Recentes
              </CardTitle>
              <Button variant="link" className="h-auto p-0 text-sm font-medium text-green-600 hover:no-underline">
                Ver todas <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {[
                  {
                    title: 'Pagamento de Salário',
                    date: '01/12/25',
                    amount: '+ R$ 4.250,00',
                    category: 'Receita',
                    categoryColor: 'bg-green-100 text-green-700',
                    icon: Wallet,
                    iconColor: 'bg-green-100 text-green-600',
                    isIncome: true,
                  },
                  {
                    title: 'Jantar no Restaurante',
                    date: '30/11/25',
                    amount: '- R$ 89,50',
                    category: 'Alimentação',
                    categoryColor: 'bg-blue-100 text-blue-700',
                    icon: Wallet, // Using Wallet as placeholder for Utensils
                    iconColor: 'bg-blue-100 text-blue-600',
                    isIncome: false,
                  },
                  {
                    title: 'Posto de Gasolina',
                    date: '29/11/25',
                    amount: '- R$ 100,00',
                    category: 'Transporte',
                    categoryColor: 'bg-purple-100 text-purple-700',
                    icon: Wallet, // Placeholder
                    iconColor: 'bg-purple-100 text-purple-600',
                    isIncome: false,
                  },
                  {
                    title: 'Compras no Mercado',
                    date: '28/11/25',
                    amount: '- R$ 156,80',
                    category: 'Mercado',
                    categoryColor: 'bg-orange-100 text-orange-700',
                    icon: Wallet, // Placeholder
                    iconColor: 'bg-orange-100 text-orange-600',
                    isIncome: false,
                  },
                  {
                    title: 'Retorno de Investimento',
                    date: '26/11/25',
                    amount: '+ R$ 340,25',
                    category: 'Investimento',
                    categoryColor: 'bg-green-100 text-green-700',
                    icon: Wallet, // Placeholder
                    iconColor: 'bg-green-100 text-green-600',
                    isIncome: true,
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.iconColor}`}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Chip color={item.categoryColor}>
                        {item.category}
                      </Chip>
                      <div className="flex items-center gap-2 font-medium">
                        <span className={item.isIncome ? 'text-gray-900' : 'text-gray-900'}>
                          {item.amount}
                        </span>
                        {item.isIncome ? (
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
                <Button variant="ghost" className="w-full justify-center text-green-600 hover:bg-green-50 hover:text-green-700">
                  <Plus className="mr-2 h-4 w-4" /> Nova transação
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <div>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 pb-4">
              <CardTitle className="text-xs font-bold tracking-wider text-gray-500 uppercase">
                Categorias
              </CardTitle>
              <Button variant="link" className="h-auto p-0 text-sm font-medium text-green-600 hover:no-underline">
                Gerenciar <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-100">
                {[
                  { name: 'Alimentação', items: 12, amount: 'R$ 542,30', color: 'bg-blue-100 text-blue-700' },
                  { name: 'Transporte', items: 8, amount: 'R$ 385,50', color: 'bg-purple-100 text-purple-700' },
                  { name: 'Mercado', items: 3, amount: 'R$ 298,75', color: 'bg-orange-100 text-orange-700' },
                  { name: 'Entretenimento', items: 2, amount: 'R$ 186,20', color: 'bg-pink-100 text-pink-700' },
                  { name: 'Utilidades', items: 7, amount: 'R$ 245,80', color: 'bg-yellow-100 text-yellow-700' },
                ].map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50">
                    <Chip color={category.color}>
                      {category.name}
                    </Chip>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">{category.items} itens</span>
                      <span className="font-medium text-gray-900">{category.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
