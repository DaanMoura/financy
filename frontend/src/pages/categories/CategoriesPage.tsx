import { IconButton } from '@/components/custom/IconButton'
import { Tag } from '@/components/custom/Tag'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { LIST_CATEGORIES, LIST_CATEGORIES_SELECT } from '@/lib/graphql/queries/ListCategories'
import { getCategoryIconName } from '@/utils/categoryIcons'
import { useMutation, useQuery } from '@apollo/client/react'
import { ArrowUpDown, SquarePen, TagIcon, Trash, Plus } from 'lucide-react'
import { useMemo } from 'react'
import CategoryDialog from '@/components/domains/category/CategoryDialog'
import { CategoryIconBadge } from '@/components/domains/category'

import { Button } from '@/components/ui/button'
import { DELETE_CATEGORY } from '@/lib/graphql/mutations/DeleteCategory'
import { GET_SUMMARY } from '@/lib/graphql/queries/GetSummary'
import { getCategoryColor } from '@/utils/categoryColors'
import { DynamicIcon } from 'lucide-react/dynamic'

const CategoriesPage = () => {
  const { data } = useQuery(LIST_CATEGORIES)

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

  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [LIST_CATEGORIES, LIST_CATEGORIES_SELECT, GET_SUMMARY]
  })

  const handleDelete = (id: string) => {
    deleteCategory({ variables: { id } })
  }

  return (
    <div className="space-y-6">
      <div className="flex w-full items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Categorias</h1>
          <p className="text-muted-foreground text-sm">Organize suas transações por categorias</p>
        </div>
        <CategoryDialog>
          <Button size="sm">
            <Plus />
            Nova categoria
          </Button>
        </CategoryDialog>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card className="flex flex-row gap-4 p-6">
          <div className="p-1">
            <TagIcon size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{categoriesCount}</h2>
            <p className="text-muted-foreground text-xs font-medium uppercase">
              Total de categorias
            </p>
          </div>
        </Card>
        <Card className="flex flex-row gap-4 p-6">
          <div className="p-1 text-purple-600">
            <ArrowUpDown size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{transactionsCount}</h2>
            <p className="text-muted-foreground text-xs font-medium uppercase">
              Total de transações
            </p>
          </div>
        </Card>
        <Card className="flex flex-row gap-4 p-6">
          <div className={`p-1 ${getCategoryColor(mostUsedCategory?.color).text}`}>
            <DynamicIcon name={getCategoryIconName(mostUsedCategory?.icon)} size={24} />
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
          return (
            <Card key={category.id}>
              <CardHeader>
                <CategoryIconBadge color={category.color} icon={category.icon} />
                <CardAction className="flex gap-2">
                  <IconButton
                    onClick={() => handleDelete(category.id)}
                    icon={<Trash className="text-destructive h-4 w-4" />}
                  />
                  <CategoryDialog category={category}>
                    <IconButton icon={<SquarePen className="h-4 w-4" />} />
                  </CategoryDialog>
                </CardAction>
              </CardHeader>
              <CardContent className="h-24">
                <CardTitle className="mb-2 text-base">{category.title}</CardTitle>
                <CardDescription className="line-clamp-2">{category.description}</CardDescription>
              </CardContent>
              <CardFooter className="justify-between">
                <Tag color={category.color}>{category.title}</Tag>
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
