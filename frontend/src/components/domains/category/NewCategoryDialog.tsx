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
import { CATEGORY_COLOR_NAMES, categoryColors } from '@/constants/colors'
import { DynamicIcon } from 'lucide-react/dynamic'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useMutation } from '@apollo/client/react'
import { CREATE_CATEGORY } from '@/lib/graphql/mutations/CreateCategory'
import { DialogClose } from '@radix-ui/react-dialog'
import { LIST_CATEGORIES, LIST_CATEGORIES_SELECT } from '@/lib/graphql/queries/ListCategories'

type NewCategoryDialogProps = {
  children: React.ReactNode
}

const NewCategoryDialog = ({ children }: NewCategoryDialogProps) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [selectedIcon, setSelectedIcon] = useState<CategoryIcon>(CategoryIcon.BRIEFCASE)
  const [selectedColor, setSelectedColor] = useState<CategoryColorName>('green')

  const icons = Object.values(CategoryIcon)

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [LIST_CATEGORIES, LIST_CATEGORIES_SELECT]
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Nova categoria</DialogTitle>
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
            <Label>Cor {categoryColors[selectedColor].base}</Label>
            <div className="flex gap-4">
              {CATEGORY_COLOR_NAMES.map(color => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    'h-5 w-10 rounded transition-all cursor-pointer',
                    `ring-1 ring-offset-4 ${selectedColor === color ? `ring-brand-base` : 'ring-gray-300'}`,
                    `hover:ring-brand-base`
                  )}
                  style={{ backgroundColor: `var(--color-${categoryColors[color].base})` }}
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

export default NewCategoryDialog
