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
      password: hashedPassword,
    },
  })

  console.log(`Created user with id: ${user.id}`)

  // 2. Create Categories with descriptions
  const categoriesData = [
    { 
      title: 'Salary', 
      type: TransactionType.INCOME, 
      icon: CategoryIcon.WALLET, 
      color: '#4CAF50',
      descriptions: ['Monthly Salary', 'Performance Bonus', 'Yearly Bonus', 'Freelance Project Payment'] 
    },
    { 
      title: 'Freelance', 
      type: TransactionType.INCOME, 
      icon: CategoryIcon.BRIEFCASE, 
      color: '#8BC34A',
      descriptions: ['Website Redesign', 'Consulting Fee', 'Logo Design', 'Mobile App Development', 'SEO Audit']
    },
    { 
      title: 'Food', 
      type: TransactionType.EXPENSE, 
      icon: CategoryIcon.FOOD, 
      color: '#F44336',
      descriptions: ['Groceries at Supermarket', 'Dinner at Italian Restaurant', 'Lunch with Coworkers', 'Pizza Delivery', 'Coffee Shop', 'Snacks for Movie Night', 'Weekly Grocery Run', 'Sushi Date'] 
    },
    { 
      title: 'Transport', 
      type: TransactionType.EXPENSE, 
      icon: CategoryIcon.CAR, 
      color: '#FF9800',
      descriptions: ['Uber Ride to Work', 'Gas Station Fill-up', 'Monthly Bus Pass', 'Subway Ticket', 'Car Maintenance', 'Parking Fee']
    },
    { 
      title: 'Entertainment', 
      type: TransactionType.EXPENSE, 
      icon: CategoryIcon.TICKET, 
      color: '#9C27B0',
      descriptions: ['Cinema Ticket', 'Concert Tickets', 'Netflix Subscription', 'Spotify Premium', 'Video Game Purchase', 'Museum Entry', 'Bowling Night'] 
    },
    { 
      title: 'Shopping', 
      type: TransactionType.EXPENSE, 
      icon: CategoryIcon.SHOPPING_CART, 
      color: '#E91E63',
      descriptions: ['New T-Shirt', 'Gift for Mom', 'Home Decoration', 'Electronics', 'Books', 'Winter Jacket', 'Shoes Sale', 'Bluetooth Headphones'] 
    },
    { 
      title: 'Home', 
      type: TransactionType.EXPENSE, 
      icon: CategoryIcon.HOME, 
      color: '#2196F3',
      descriptions: ['Rent Payment', 'Internet Bill', 'Electricity Bill', 'Water Bill', 'Cleaning Supplies', 'Furniture'] 
    },
    { 
      title: 'Health', 
      type: TransactionType.EXPENSE, 
      icon: CategoryIcon.HEALTH, 
      color: '#00BCD4',
      descriptions: ['Gym Membership', 'Pharmacy', 'Doctor Appointment', 'Vitamins', 'Dental Checkup'] 
    }
  ]

  const categories = []

  for (const cat of categoriesData) {
    let category = await prisma.category.findFirst({
      where: {
        userId: user.id,
        title: cat.title,
      }
    })

    if (!category) {
      category = await prisma.category.create({
        data: {
          title: cat.title,
          icon: cat.icon,
          color: cat.color,
          userId: user.id,
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
    
    // Ensure at least 15 (target 20) in current month
    if (currentMonthCount < currentMonthTransactionsTarget) {
      // Random day in current month
      // Handle edge case for current day to avoid future dates if desired, 
      // but simple random day up to 28 is safe for all months
      const day = Math.floor(Math.random() * 28) + 1
      date = new Date(currentYear, currentMonth, day)
      currentMonthCount++
    } else {
      // Random date in previous 3 months
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
    
    // Pick random description from category
    const description = category.descriptions[Math.floor(Math.random() * category.descriptions.length)]

    // Amount generation
    let amount: number
    if (category.type === TransactionType.INCOME) {
      // Income between 1000 and 5000
      amount = Math.floor(Math.random() * 4000) + 1000
    } else {
      // Expense between 10 and 500
      amount = Math.floor(Math.random() * 490) + 10
    }

    await prisma.transaction.create({
      data: {
        description,
        amount,
        type: category.type,
        date,
        categoryId: category.id,
        userId: user.id,
      }
    })
  }

  console.log(`Seeding finished. Generated ${totalTransactions} transactions.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
