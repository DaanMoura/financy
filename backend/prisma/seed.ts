import 'dotenv/config'
import { PrismaClient, TransactionType, CategoryIcon } from '@prisma/client'
import { hashPassword } from '../src/utils/hash'

const prisma = new PrismaClient()

async function main() {
  const email = 'test@test.com'
  const password = 'password123'

  console.log(`Start seeding...`)

  // 1. Create User
  const hashedPassword = await hashPassword(password)

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Test User',
      password: hashedPassword
    }
  })

  console.log(`Created user with id: ${user.id}`)

  // 2. Create Categories with descriptions
  // Amounts are integers where the last 2 digits represent cents
  // e.g. 45000 = $450.00, 650 = $6.50
  const categoriesData = [
    {
      title: 'Salário',
      type: TransactionType.INCOME,
      icon: CategoryIcon.WALLET,
      color: 'green',
      descriptions: [
        { label: 'Salário mensal', min: 500000, max: 800000 },
        { label: 'Bônus de desempenho', min: 100000, max: 300000 },
        { label: 'Décimo terceiro salário', min: 200000, max: 600000 },
        { label: 'Pagamento de projeto freelance', min: 80000, max: 250000 }
      ]
    },
    {
      title: 'Freelance',
      type: TransactionType.INCOME,
      icon: CategoryIcon.BRIEFCASE,
      color: 'yellow',
      descriptions: [
        { label: 'Redesign de site', min: 150000, max: 500000 },
        { label: 'Consultoria técnica', min: 50000, max: 200000 },
        { label: 'Criação de logotipo', min: 30000, max: 100000 },
        { label: 'Desenvolvimento de aplicativo', min: 300000, max: 800000 },
        { label: 'Auditoria de SEO', min: 20000, max: 80000 }
      ]
    },
    {
      title: 'Alimentação',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.FOOD,
      color: 'orange',
      descriptions: [
        { label: 'Compras no supermercado', min: 3000, max: 25000 },
        { label: 'Jantar em restaurante', min: 5000, max: 15000 },
        { label: 'Almoço com colegas de trabalho', min: 2500, max: 8000 },
        { label: 'Delivery de pizza', min: 2000, max: 6000 },
        { label: 'Cafeteria', min: 500, max: 2000 },
        { label: 'Petiscos para noite de filme', min: 800, max: 3000 },
        { label: 'Feira semanal', min: 8000, max: 30000 },
        { label: 'Rodízio de sushi', min: 6000, max: 18000 }
      ]
    },
    {
      title: 'Transporte',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.CAR,
      color: 'blue',
      descriptions: [
        { label: 'Corrida de Uber para o trabalho', min: 1500, max: 5000 },
        { label: 'Abastecimento no posto', min: 4000, max: 10000 },
        { label: 'Passe mensal de ônibus', min: 5000, max: 9000 },
        { label: 'Passagem de metrô', min: 200, max: 800 },
        { label: 'Manutenção do carro', min: 15000, max: 80000 },
        { label: 'Taxa de estacionamento', min: 500, max: 3000 }
      ]
    },
    {
      title: 'Lazer',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.TICKET,
      color: 'purple',
      descriptions: [
        { label: 'Ingresso de cinema', min: 1500, max: 4000 },
        { label: 'Ingressos para show', min: 10000, max: 50000 },
        { label: 'Assinatura da Netflix', min: 1500, max: 2200 },
        { label: 'Spotify Premium', min: 999, max: 1499 },
        { label: 'Compra de videogame', min: 2999, max: 7999 },
        { label: 'Entrada para museu', min: 1000, max: 3500 },
        { label: 'Boliche com amigos', min: 2000, max: 5000 }
      ]
    },
    {
      title: 'Compras',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.SHOPPING_CART,
      color: 'pink',
      descriptions: [
        { label: 'Camiseta nova', min: 2000, max: 8000 },
        { label: 'Presente para a mãe', min: 3000, max: 15000 },
        { label: 'Decoração para casa', min: 5000, max: 30000 },
        { label: 'Eletrônicos', min: 20000, max: 200000 },
        { label: 'Livros', min: 1500, max: 5000 },
        { label: 'Jaqueta de inverno', min: 10000, max: 50000 },
        { label: 'Promoção de tênis', min: 5000, max: 25000 },
        { label: 'Fone de ouvido Bluetooth', min: 15000, max: 80000 }
      ]
    },
    {
      title: 'Moradia',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.HOME,
      color: 'red',
      descriptions: [
        { label: 'Aluguel', min: 80000, max: 300000 },
        { label: 'Conta de internet', min: 5000, max: 15000 },
        { label: 'Conta de luz', min: 8000, max: 25000 },
        { label: 'Conta de água', min: 3000, max: 10000 },
        { label: 'Produtos de limpeza', min: 1500, max: 6000 },
        { label: 'Móveis', min: 20000, max: 150000 }
      ]
    },
    {
      title: 'Saúde',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.HEALTH,
      color: 'blue',
      descriptions: [
        { label: 'Academia', min: 5000, max: 15000 },
        { label: 'Farmácia', min: 800, max: 10000 },
        { label: 'Consulta médica', min: 10000, max: 40000 },
        { label: 'Vitaminas e suplementos', min: 2000, max: 8000 },
        { label: 'Consulta odontológica', min: 15000, max: 60000 }
      ]
    }
  ]

  const categories = []

  for (const cat of categoriesData) {
    let category = await prisma.category.findFirst({
      where: {
        userId: user.id,
        title: cat.title
      }
    })

    if (!category) {
      category = await prisma.category.create({
        data: {
          title: cat.title,
          icon: cat.icon,
          color: cat.color,
          userId: user.id
        }
      })
    }
    // Attach type and descriptions for transaction generation
    categories.push({ ...category, type: cat.type, descriptions: cat.descriptions })
  }

  console.log(`Created ${categories.length} categories`)

  // 3. Create Transactions
  const totalTransactions = 55
  const currentMonthTransactionsTarget = 20
  let currentMonthCount = 0

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  console.log(`Generating transactions...`)

  for (let i = 0; i < totalTransactions; i++) {
    let date: Date

    // Ensure at least 20 in current month
    if (currentMonthCount < currentMonthTransactionsTarget) {
      // Random day from 1 up to today (day 22) — never a future date
      const day = Math.floor(Math.random() * now.getDate()) + 1
      date = new Date(currentYear, currentMonth, day)
      currentMonthCount++
    } else {
      // Random date in previous 3 months (full months, so up to day 28 is safe)
      const randomMonthOffset = Math.floor(Math.random() * 3) + 1 // 1 to 3 months ago
      let targetMonth = currentMonth - randomMonthOffset
      let targetYear = currentYear

      // Adjust year if month becomes negative
      if (targetMonth < 0) {
        targetMonth += 12
        targetYear -= 1
      }

      const day = Math.floor(Math.random() * 28) + 1
      date = new Date(targetYear, targetMonth, day)
    }

    // Pick random category
    const category = categories[Math.floor(Math.random() * categories.length)]

    // Pick random description object from category
    const descObj = category.descriptions[Math.floor(Math.random() * category.descriptions.length)]

    // Amount: random integer within this description's min–max range (cents-included integer)
    const amount = Math.floor(Math.random() * (descObj.max - descObj.min + 1)) + descObj.min
    const description = descObj.label

    await prisma.transaction.create({
      data: {
        description,
        amount,
        type: category.type,
        date,
        categoryId: category.id,
        userId: user.id
      }
    })
  }

  console.log(`Seeding finished. Generated ${totalTransactions} transactions.`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
