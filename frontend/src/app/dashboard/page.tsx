'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [newExpense, setNewExpense] = useState({
    category: '',
    merchant: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    status: 'pending'
  })
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food', amount: 2500, date: '2025-09-28', merchant: 'Swiggy', status: 'completed' },
    { id: 2, category: 'Transport', amount: 1800, date: '2025-09-27', merchant: 'Uber', status: 'pending' },
    { id: 3, category: 'Shopping', amount: 5000, date: '2025-09-26', merchant: 'Amazon', status: 'completed' },
  ])

  const stats = {
    totalExpenses: '₹15,000',
    monthlyAverage: '₹12,500',
    highestCategory: 'Shopping',
    upcomingBills: 3
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const renderStatus = (status: string) => {
    const statusStyles = {
      completed: 'bg-green-500/20 text-green-400',
      pending: 'bg-yellow-500/20 text-yellow-400',
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[status as keyof typeof statusStyles]}`}>
        {status}
      </span>
    )
  }

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen)

  const modalRef = useRef<HTMLDivElement>(null)

  const handleModalClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setShowAddExpenseModal(false)
    }
  }

  const handleNewExpenseChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewExpense(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new expense object
    const newExpenseItem = {
      id: expenses.length + 1,
      category: newExpense.category,
      amount: Number(newExpense.amount),
      date: newExpense.date,
      merchant: newExpense.merchant,
      status: newExpense.status
    };

    // Add new expense to the list
    setExpenses(prev => [newExpenseItem, ...prev]);

    // Reset form and close modal
    setNewExpense({
      category: '',
      merchant: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      status: 'pending'
    });
    setShowAddExpenseModal(false);

    // Optional: Update total stats
    // You might want to update your stats here as well
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-6 mx-auto animate-pulse">
              <span className="text-white font-bold text-2xl">₹</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white">
          {/* Mobile Header */}
          <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-3">
                <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-base">₹</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Overlay */}
          {isSidebarOpen && (
            <div 
              className="md:hidden fixed inset-0 bg-black/50 z-30"
              onClick={toggleSidebar}
            />
          )}

          {/* Side Navigation */}
          <div className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 z-40
            md:w-64 w-64 transition-all duration-300 transform
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:translate-x-0`}>
            <div className="p-4 md:p-6">
              {/* Close button for mobile */}
              <div className="flex items-center justify-between mb-8 md:justify-start">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-base md:text-lg">₹</span>
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ExpenseAI
                  </h1>
                </div>
                <button 
                  onClick={toggleSidebar}
                  className="md:hidden text-gray-400 hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav className="space-y-2">
                {['Dashboard', 'Transactions', 'Analytics', 'Bills', 'Settings'].map((item) => (
                  <button key={item} 
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all text-sm md:text-base
                    ${item === 'Dashboard' 
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                      : 'text-gray-400 hover:bg-gray-800'}`}>
                    {item}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:ml-64 pt-16 md:pt-0">
            <div className="max-w-7xl mx-auto p-4 md:p-8">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
                  <h2 className="text-xl md:text-2xl font-bold">Dashboard Overview</h2>
                  <div className="flex space-x-2">
                    {['week', 'month', 'year'].map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriod(period)}
                        className={`px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm transition-all
                          ${selectedPeriod === period 
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' 
                            : 'text-gray-400 hover:bg-gray-800'}`}>
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                  {Object.entries(stats).map(([key, value]) => (
                    <div key={key} 
                      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700
                        hover:border-blue-500/20 transition-all duration-300">
                      <div className="text-gray-400 text-sm mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                      <div className="text-lg md:text-2xl font-bold truncate">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Expenses */}
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg md:text-xl font-bold">Recent Expenses</h2>
                    <button 
                      onClick={() => setShowAddExpenseModal(true)}
                      className="px-3 md:px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 text-xs md:text-sm border border-blue-500/20
                        hover:bg-blue-500/30 transition-all">
                      Add New
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto -mx-4 md:mx-0">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="text-gray-400 text-xs md:text-sm border-b border-gray-700">
                          <th className="pb-3 pl-4 md:pl-0 text-left">Date</th>
                          <th className="pb-3 text-left">Category</th>
                          <th className="pb-3 text-left">Merchant</th>
                          <th className="pb-3 text-left">Status</th>
                          <th className="pb-3 pr-4 md:pr-0 text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses.map(expense => (
                          <tr key={expense.id} className="border-b border-gray-700/50 text-sm">
                            <td className="py-4 pl-4 md:pl-0">{expense.date}</td>
                            <td className="py-4">{expense.category}</td>
                            <td className="py-4 max-w-[150px] truncate">{expense.merchant}</td>
                            <td className="py-4">{renderStatus(expense.status)}</td>
                            <td className="py-4 pr-4 md:pr-0 text-right">₹{expense.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Add Expense Modal */}
                {showAddExpenseModal && (
                  <div 
                    className="fixed inset-0 flex items-center justify-center z-[100] p-4"
                    onClick={handleModalClick}
                  >
                    {/* Modal Backdrop */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                    
                    {/* Modal Content */}
                    <div 
                      ref={modalRef}
                      className="relative w-full max-w-md bg-gray-800/95 border border-gray-700 rounded-2xl p-6 md:p-8 
                        shadow-xl transform transition-all duration-200 scale 
                        animate-[modal-appear_0.3s_ease-out]"
                    >
                      {/* Close Button */}
                      <button 
                        onClick={() => setShowAddExpenseModal(false)}
                        className="absolute right-4 top-4 p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <h2 className="text-xl font-bold text-white mb-6">Add New Expense</h2>
                      
                      <form onSubmit={handleAddExpense} className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Category</label>
                          <input 
                            type="text" 
                            name="category"
                            value={newExpense.category}
                            onChange={handleNewExpenseChange}
                            className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            placeholder="e.g. Food, Transport"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Merchant</label>
                          <input 
                            type="text" 
                            name="merchant"
                            value={newExpense.merchant}
                            onChange={handleNewExpenseChange}
                            className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            placeholder="e.g. Swiggy, Uber"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Amount</label>
                          <input 
                            type="number" 
                            name="amount"
                            value={newExpense.amount}
                            onChange={handleNewExpenseChange}
                            className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            placeholder="e.g. 2500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Date</label>
                          <input 
                            type="date" 
                            name="date"
                            value={newExpense.date}
                            onChange={handleNewExpenseChange}
                            className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Status</label>
                          <select
                            name="status"
                            value={newExpense.status}
                            onChange={handleNewExpenseChange}
                            className="w-full p-3 rounded-lg bg-gray-800/50 border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                          >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                        <button 
                          type="submit"
                          className="w-full px-4 py-3 rounded-lg bg-blue-500 text-white font-semibold text-sm
                            hover:bg-blue-600 transition-all"
                        >
                          Save Expense
                        </button>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}