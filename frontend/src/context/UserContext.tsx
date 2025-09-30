'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { amountSum } from '@/utils/analytics'

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Expense {
  id: number
  amount: number
  description: string
  category: string
  paymentMethod: string
  merchant: string
  date: Date
  time?:string,
  createdAt: Date  // Add createdAt field
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  loading: boolean
  viewExpenses: Expense[] // Changed from expense to expenses for clarity
  addExpense: (newExpense: Expense) => void // New function to add expense
  setViewExpenses: (expenses: Expense[]) => void // Changed from setExpense
  recentTransactions: Expense[] // Changed from recentTransaction for clarity
  setRecentTransactions: (transactions: Expense[]) => void
  totalExpensAmnt: number
  
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [viewExpenses, setViewExpenses] = useState<Expense[]>([])
  const [recentTransactions, setRecentTransactions] = useState<Expense[]>([])
  let totalExpensAmnt=0;
  

  // Add new expense and update recent transactions
  const addExpense = (newExpense: Expense) => {
    setViewExpenses(prevExpenses => [...prevExpenses, newExpense])
    // Update recent transactions when adding new expense
    setRecentTransactions(prev => {
      const updated = [newExpense, ...prev].slice(0, 5) // Keep only most recent 5
      return updated
    })
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await axios.get('http://localhost:30001/api/v1/userInfo', {
          withCredentials: true
        })
        const expenseResponse = await axios.get('http://localhost:30001/api/v1/fetchExpense', {
          withCredentials: true
        })

        let totalExpensAmnt=amountSum(expenseResponse.data.expenses)
        console.log("analytic pagee",totalExpensAmnt)
        setUser(userResponse.data)
        setViewExpenses(expenseResponse.data.expenses)
        
        // Sort by date first, then by createdAt time
        const sortedTransactions = expenseResponse.data.expenses
          .sort((a: Expense, b: Expense) => {
            const dateComparison = new Date(b.date).getTime() - new Date(a.date).getTime()
            if (dateComparison !== 0) return dateComparison
            
            // If dates are same, compare createdAt timestamps
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
          .slice(0, 5)

        setRecentTransactions(sortedTransactions)
      } catch (error) {
        console.error('Error fetching user:', error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  return (
    <UserContext.Provider value={{ 
      totalExpensAmnt,
      user, 
      setUser, 
      viewExpenses,
      setViewExpenses,
      addExpense,
      loading,
      recentTransactions, // Changed name
      setRecentTransactions // Changed name
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}