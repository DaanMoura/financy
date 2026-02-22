import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { CategoryIcon, type CategoryColorName } from '@/types'
import { getCategoryIconName } from '@/utils/categoryIcons'
import { CATEGORY_COLOR_NAMES } from '@/constants/colors'
import { DynamicIcon } from 'lucide-react/dynamic'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { useMutation } from '@apollo/client/react'
import { CREATE_CATEGORY } from '@/lib/graphql/mutations/CreateCategory'
import { DialogClose } from '@radix-ui/react-dialog'
import { LIST_CATEGORIES, LIST_CATEGORIES_SELECT } from '@/lib/graphql/queries/ListCategories'
import { GET_SUMMARY } from '@/lib/graphql/queries/GetSummary'
import { type Category } from '@/types'
import { UPDATE_CATEGORY } from '@/lib/graphql/mutations/UpdateCategory'
import { getCategoryColor } from '@/utils/categoryColors'

type CategoryDialogProps = {
  children: React.ReactNode
  category?: Category
}

const CategoryDialog = ({ children, category }: CategoryDialogProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>(CategoryIcon.BRIEFCASE)
  const [selectedColor, setSelectedColor] = useState<CategoryColorName>('green')

  useEffect(() => {
    if (category) {
      setTitle(category.title)
      setDescription(category.description ?? '')
      setSelectedIcon(category.icon ?? CategoryIcon.BRIEFCASE)
      setSelectedColor(category.color ?? 'green')
    }
  }, [category])

  const icons = Object.values(CategoryIcon)

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [LIST_CATEGORIES, LIST_CATEGORIES_SELECT, GET_SUMMARY]
  })

  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [LIST_CATEGORIES, LIST_CATEGORIES_SELECT, GET_SUMMARY]
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (category) {
      updateCategory({
        variables: {
          id: category.id,
          data: {
            title,
            description,
            icon: selectedIcon,
            color: selectedColor
          }
        }
      })
      return
    }

    createCategory({
      variables: {
        data: {
          title,
          description,
          icon: selectedIcon,
          color: selectedColor
        }
      }
    })
  }

  const dialogTitle = category ? 'Editar categoria' : 'Nova categoria'

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>Organize suas transações com categorias</DialogDescription>
        </DialogHeader>

        <form className="space-y-6 py-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Ex. Alimentação"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descrição da categoria"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Opcional</p>
          </div>

          <div className="space-y-2">
            <Label>Ícone</Label>
            <div className="grid grid-cols-8 gap-2">
              {icons.map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-md border cursor-pointer',
                    'text-gray-500',
                    selectedIcon === icon
                      ? 'border-brand-base bg-gray-100 text-gray-600'
                      : 'border-gray-300',
                    'transition-all duration-200',
                    'hover:border-brand-base hover:bg-gray-100 hover:text-gray-600'
                  )}
                >
                  <DynamicIcon name={getCategoryIconName(icon)} className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cor</Label>
            <div className="flex gap-4">
              {CATEGORY_COLOR_NAMES.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    'h-5 w-10 rounded transition-all cursor-pointer',
                    getCategoryColor(color).bg,
                    `ring-1 ring-offset-4 ${selectedColor === color ? `ring-brand-base` : 'ring-gray-300'}`,
                    `hover:ring-brand-base`
                  )}
                />
              ))}
            </div>
          </div>

          <DialogClose asChild>
            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CategoryDialog
