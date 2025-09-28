'use client'

import axios from 'axios'
import React, { useState, useEffect } from 'react'


export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      setIsVisible(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      password: ''
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Name validation (only for signup)
    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = 'Name is required'
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      }
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      try {
        setIsSubmitting(true)
        
        if (isSignUp===true) {
          // Sign Up API Call
          const signUpData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
          }
          
          const signUpResponse = await axios.post(`http://localhost:30001/api/v1/signup`,signUpData,{withCredentials:true})
          
          
          console.log('Sign Up Success:')
          
          // Handle successful sign up (redirect, show success message, etc.)
          // You can add success handling here
          
        } else {
          // Sign In API Call
          const signInData = {
            email: formData.email,
            password: formData.password
          }
          
          const signInResponse = await axios.post(`http://localhost:30001/api/v1/signin`,signInData,{withCredentials:true})
          
          
          console.log('Sign In Success:')
          
          // Handle successful sign in (store token, redirect, etc.)
          // You can add success handling here
        }
        
      } catch (error: any) {
        console.error('Authentication Error:', error.message)
        
        // Handle different types of errors
        if (error.message.includes('email')) {
          setErrors(prev => ({ ...prev, email: error.message }))
        } else if (error.message.includes('password')) {
          setErrors(prev => ({ ...prev, password: error.message }))
        } else if (error.message.includes('name')) {
          setErrors(prev => ({ ...prev, name: error.message }))
        } else {
          // General error handling
          alert('Authentication failed: ' + error.message)
        }
        
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp)
    setFormData({
      name: '',
      email: '',
      password: ''
    })
    setErrors({
      name: '',
      email: '',
      password: ''
    })
  }

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-6 mx-auto animate-pulse">
              <span className="text-white font-bold text-2xl">₹</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              ExpenseAI
            </h2>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-gray-400 mt-4">Preparing your account...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Navigation */}
        <nav className="relative z-50 container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">₹</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ExpenseAI
              </h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-300 hover:text-white transition-colors duration-200">
                ← Back to Home
              </a>
            </div>
          </div>
        </nav>

        {/* Auth Form */}
        <div className="container mx-auto px-6 py-20 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className={`w-full max-w-md transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Toggle Buttons */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 mb-8 border border-gray-700">
              <div className="grid grid-cols-2 gap-1">
                <button
                  onClick={() => !isSignUp && toggleAuthMode()}
                  className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    !isSignUp
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => isSignUp && toggleAuthMode()}
                  className={`py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    isSignUp
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">
                  {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <p className="text-gray-400">
                  {isSignUp 
                    ? 'Start your journey to better expense management'
                    : 'Sign in to access your expense dashboard'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field (Sign Up Only) */}
                {isSignUp && (
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                          errors.name ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                        }`}
                        placeholder="Enter your full name"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 ${
                        errors.email ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                      }`}
                      placeholder="Enter your email"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2 text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-gray-700/50 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 placeholder-gray-400 pr-12 ${
                        errors.password ? 'border-red-500' : 'border-gray-600 hover:border-gray-500'
                      }`}
                      placeholder={isSignUp ? 'Create a password' : 'Enter your password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-3 px-6 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>{isSignUp ? 'Creating Account...' : 'Signing In...'}</span>
                    </div>
                  ) : (
                    isSignUp ? 'Create Account' : 'Sign In'
                  )}
                </button>

                

                
              </form>

              {/* Additional Links */}
              <div className="text-center mt-6 space-y-2">
                {!isSignUp && (
                  <a href="#" className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                    Forgot your password?
                  </a>
                )}
                
                <p className="text-gray-400 text-sm">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    onClick={toggleAuthMode}
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {isSignUp ? 'Sign in here' : 'Sign up here'}
                  </button>
                </p>
              </div>

              {/* Terms and Privacy (Sign Up Only) */}
              {isSignUp && (
                <div className="text-center mt-6">
                  <p className="text-xs text-gray-400">
                    By creating an account, you agree to our{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a>
                  </p>
                </div>
              )}
            </div>

            {/* Benefits Section */}
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">Join thousands who trust ExpenseAI</p>
              <div className="flex justify-center space-x-8 text-sm">
                <div className="text-center">
                  <div className="text-blue-400 font-semibold">₹50L+</div>
                  <div className="text-gray-500">Tracked</div>
                </div>
                <div className="text-center">
                  <div className="text-purple-400 font-semibold">10K+</div>
                  <div className="text-gray-500">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-pink-400 font-semibold">99.5%</div>
                  <div className="text-gray-500">Accuracy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 py-8">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">₹</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ExpenseAI
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                © 2025 ExpenseAI. Secure • Reliable • Made for India.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}