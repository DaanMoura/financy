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
      title: 'Salary',
      type: TransactionType.INCOME,
      icon: CategoryIcon.WALLET,
      color: 'green',
      descriptions: [
        { label: 'Monthly Salary', min: 500000, max: 800000 }, // $5,000 – $8,000
        { label: 'Performance Bonus', min: 100000, max: 300000 }, // $1,000 – $3,000
        { label: 'Yearly Bonus', min: 200000, max: 600000 }, // $2,000 – $6,000
        { label: 'Freelance Project Payment', min: 80000, max: 250000 } // $800   – $2,500
      ]
    },
    {
      title: 'Freelance',
      type: TransactionType.INCOME,
      icon: CategoryIcon.BRIEFCASE,
      color: 'yellow',
      descriptions: [
        { label: 'Website Redesign', min: 150000, max: 500000 }, // $1,500 – $5,000
        { label: 'Consulting Fee', min: 50000, max: 200000 }, // $500   – $2,000
        { label: 'Logo Design', min: 30000, max: 100000 }, // $300   – $1,000
        { label: 'Mobile App Development', min: 300000, max: 800000 }, // $3,000 – $8,000
        { label: 'SEO Audit', min: 20000, max: 80000 } // $200   – $800
      ]
    },
    {
      title: 'Food',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.FOOD,
      color: 'orange',
      descriptions: [
        { label: 'Groceries at Supermarket', min: 3000, max: 25000 }, // $30  – $250
        { label: 'Dinner at Italian Restaurant', min: 5000, max: 15000 }, // $50  – $150
        { label: 'Lunch with Coworkers', min: 2500, max: 8000 }, // $25  – $80
        { label: 'Pizza Delivery', min: 2000, max: 6000 }, // $20  – $60
        { label: 'Coffee Shop', min: 500, max: 2000 }, // $5   – $20
        { label: 'Snacks for Movie Night', min: 800, max: 3000 }, // $8   – $30
        { label: 'Weekly Grocery Run', min: 8000, max: 30000 }, // $80  – $300
        { label: 'Sushi Date', min: 6000, max: 18000 } // $60  – $180
      ]
    },
    {
      title: 'Transport',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.CAR,
      color: 'blue',
      descriptions: [
        { label: 'Uber Ride to Work', min: 1500, max: 5000 }, // $15  – $50
        { label: 'Gas Station Fill-up', min: 4000, max: 10000 }, // $40  – $100
        { label: 'Monthly Bus Pass', min: 5000, max: 9000 }, // $50  – $90
        { label: 'Subway Ticket', min: 200, max: 800 }, // $2   – $8
        { label: 'Car Maintenance', min: 15000, max: 80000 }, // $150 – $800
        { label: 'Parking Fee', min: 500, max: 3000 } // $5   – $30
      ]
    },
    {
      title: 'Entertainment',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.TICKET,
      color: 'purple',
      descriptions: [
        { label: 'Cinema Ticket', min: 1500, max: 4000 }, // $15  – $40
        { label: 'Concert Tickets', min: 10000, max: 50000 }, // $100 – $500
        { label: 'Netflix Subscription', min: 1500, max: 2200 }, // $15  – $22
        { label: 'Spotify Premium', min: 999, max: 1499 }, // $9.99 – $14.99
        { label: 'Video Game Purchase', min: 2999, max: 7999 }, // $29.99 – $79.99
        { label: 'Museum Entry', min: 1000, max: 3500 }, // $10  – $35
        { label: 'Bowling Night', min: 2000, max: 5000 } // $20  – $50
      ]
    },
    {
      title: 'Shopping',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.SHOPPING_CART,
      color: 'pink',
      descriptions: [
        { label: 'New T-Shirt', min: 2000, max: 8000 }, // $20  – $80
        { label: 'Gift for Mom', min: 3000, max: 15000 }, // $30  – $150
        { label: 'Home Decoration', min: 5000, max: 30000 }, // $50  – $300
        { label: 'Electronics', min: 20000, max: 200000 }, // $200 – $2,000
        { label: 'Books', min: 1500, max: 5000 }, // $15  – $50
        { label: 'Winter Jacket', min: 10000, max: 50000 }, // $100 – $500
        { label: 'Shoes Sale', min: 5000, max: 25000 }, // $50  – $250
        { label: 'Bluetooth Headphones', min: 15000, max: 80000 } // $150 – $800
      ]
    },
    {
      title: 'Home',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.HOME,
      color: 'red',
      descriptions: [
        { label: 'Rent Payment', min: 80000, max: 300000 }, // $800  – $3,000
        { label: 'Internet Bill', min: 5000, max: 15000 }, // $50   – $150
        { label: 'Electricity Bill', min: 8000, max: 25000 }, // $80   – $250
        { label: 'Water Bill', min: 3000, max: 10000 }, // $30   – $100
        { label: 'Cleaning Supplies', min: 1500, max: 6000 }, // $15   – $60
        { label: 'Furniture', min: 20000, max: 150000 } // $200  – $1,500
      ]
    },
    {
      title: 'Health',
      type: TransactionType.EXPENSE,
      icon: CategoryIcon.HEALTH,
      color: 'blue',
      descriptions: [
        { label: 'Gym Membership', min: 5000, max: 15000 }, // $50  – $150
        { label: 'Pharmacy', min: 800, max: 10000 }, // $8   – $100
        { label: 'Doctor Appointment', min: 10000, max: 40000 }, // $100 – $400
        { label: 'Vitamins', min: 2000, max: 8000 }, // $20  – $80
        { label: 'Dental Checkup', min: 15000, max: 60000 } // $150 – $600
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
