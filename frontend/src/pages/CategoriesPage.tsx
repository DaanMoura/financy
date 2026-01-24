import { IconButton } from '@/components/custom/IconButton'
import { Tag } from '@/components/custom/Tag'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { LIST_CATEGORIES } from '@/lib/graphql/queries/ListCategories'
import { CategoryIcon } from '@/types'
import { getCategoryIconName } from '@/utils/categoryIcons'
import { useQuery } from '@apollo/client/react'
import { ArrowUpDown, Pencil, Plus, Tag as TagIcon, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'

const CategoriesPage = () => {
  // const {data: categories} = useQuery({
  //   queryKey: ['categories'],
  //   queryFn: async () => {
  //     const response = await listCategories()
  //     return response.data
  //   }
  // })
  const { data } = useQuery(LIST_CATEGORIES)

  console.log('CategoriesPage', { data })

  const categories = data?.listCategories ?? []
  const categoriesCount = categories.length
  const transactionsCount = useMemo(
    () => categories.reduce((acc, category) => acc + category.transactions.length, 0),
    [categories]
  )
  const mostUsedCategory = useMemo(() => {
    if (categories.length === 0) return null
    return categories.reduce((prev, current) => {
      return prev.transactions.length > current.transactions.length ? prev : current
    })
  }, [categories])

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-muted-foreground text-sm">Organize suas transações por categorias</p>
        </div>
        <Button>
          <Plus />
          Nova categoria
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="flex flex-row items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-white p-2.5">
            <TagIcon className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{categoriesCount}</h2>
            <p className="text-muted-foreground text-xs font-medium uppercase">
              Total de categorias
            </p>
          </div>
        </Card>
        <Card className="flex flex-row items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 p-2.5 text-purple-600">
            <ArrowUpDown className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{transactionsCount}</h2>
            <p className="text-muted-foreground text-xs font-medium uppercase">
              Total de transações
            </p>
          </div>
        </Card>
        <Card className="flex flex-row items-center gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 p-2.5 text-blue-600">
            <DynamicIcon name={getCategoryIconName(mostUsedCategory?.icon ?? CategoryIcon.HOME)} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{mostUsedCategory?.title}</h2>
            <p className="text-muted-foreground text-xs font-medium uppercase">
              Categoria mais utilizada
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {categories.map(category => {
          // const Icon = getCategoryIcon(category.icon)
          return (
            <Card key={category.id}>
              <CardHeader>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${category.color}`}
                >
                  {/* <Icon className="h-5 w-5" /> */}
                  <DynamicIcon name={getCategoryIconName(category.icon)} />
                </div>
                <CardAction className="flex gap-2">
                  <IconButton icon={<Trash2 className="text-destructive h-4 w-4" />} />
                  <IconButton icon={<Pencil className="h-4 w-4" />} />
                </CardAction>
              </CardHeader>
              <CardContent className="h-24">
                <CardTitle className="mb-2 text-base">{category.title}</CardTitle>
                <CardDescription className="line-clamp-2">{category.description}</CardDescription>
              </CardContent>
              <CardFooter className="justify-between">
                <Tag className={category.color}>{category.title}</Tag>
                <span className="text-muted-foreground text-sm">
                  {category.transactions.length} items
                </span>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default CategoriesPage
