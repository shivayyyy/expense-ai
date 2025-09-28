"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'





export default function Home() {
  const router=useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false)

  function handleSignupClick(){
    setTimeout(() => {
      router.push("/auth")
    }, 300);
  }
  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    {
      icon: '🤖',
      title: 'AI Bill Detection',
      description: 'Automatically scan and categorize your bills with 99% accuracy using advanced AI technology',
      highlight: true
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Get insights into your spending patterns with beautiful charts and personalized recommendations'
    },
    {
      icon: '🔒',
      title: 'Bank-Level Security',
      description: 'Your financial data is protected with enterprise-grade encryption and security protocols'
    },
    {
      icon: '📱',
      title: 'Cross-Platform Sync',
      description: 'Access your expenses seamlessly across all devices with real-time synchronization'
    }
  ]

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Small Business Owner',
      content: 'ExpenseAI has revolutionized how I manage my business expenses. The AI categorization saves me hours every week!',
      avatar: '👩‍💼'
    },
    {
      name: 'Rahul Kumar',
      role: 'Freelance Developer',
      content: 'Finally, an expense tracker that understands Indian spending habits. The rupee integration is perfect.',
      avatar: '👨‍💻'
    },
    {
      name: 'Anjali Patel',
      role: 'Financial Advisor',
      content: 'I recommend ExpenseAI to all my clients. The insights it provides are incredibly valuable for financial planning.',
      avatar: '👩‍💼'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
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
            <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">
              Features
            </a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200">
              Pricing
            </a>
            <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-200">
              Reviews
            </a>
            <button onClick={handleSignupClick} className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Start Free Trial
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl blur-3xl"></div>
        
        <div className={`text-center max-w-5xl mx-auto relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            Smart Expense Management for
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent block">
              Modern India
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
            Revolutionary expense tracking powered by AI. Automatically detect bills, categorize expenses, 
            and get insights tailored for Indian spending patterns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button onClick={handleSignupClick} className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Try Free for 30 Days
            </button>
            
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">₹50L+</div>
              <div className="text-gray-400">Expenses Tracked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">99.5%</div>
              <div className="text-gray-400">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-pink-400 mb-2">10K+</div>
              <div className="text-gray-400">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Feature Highlight */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-3xl p-1 backdrop-blur-sm border border-purple-500/20">
            <div className="bg-gray-900/80 rounded-3xl p-12">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-sm font-semibold mb-6">
                  🚀 Featured Technology
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  AI-Powered Bill Recognition
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Simply snap a photo of your bill, and watch our advanced AI instantly extract details, 
                  categorize expenses, and add them to your budget—all in seconds.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm">✓</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Instant Bill Scanning</h3>
                        <p className="text-gray-400">Capture receipts from restaurants, shopping, utilities, and more with perfect accuracy</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm">✓</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Smart Categorization</h3>
                        <p className="text-gray-400">AI learns your spending habits and automatically sorts expenses into relevant categories</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-sm">✓</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Multi-language Support</h3>
                        <p className="text-gray-400">Understands Hindi, English, and regional languages commonly found on Indian bills</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-3xl">
                        📸
                      </div>
                      <h4 className="text-2xl font-bold mb-4">Upload Your Bill</h4>
                      <div className="bg-gray-800 rounded-xl p-4 mb-4 border-2 border-dashed border-gray-600">
                        <p className="text-gray-400 text-sm">AI Processing...</p>
                        <div className="mt-2 bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"></div>
                      </div>
                      <div className="text-left space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Amount:</span>
                          <span className="font-semibold">₹1,250</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Category:</span>
                          <span className="font-semibold text-blue-400">Food & Dining</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Merchant:</span>
                          <span className="font-semibold">Swiggy</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Manage Money</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive tools designed specifically for Indian users and spending patterns
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${
                feature.highlight
                  ? 'bg-gradient-to-br from-purple-900/50 to-blue-900/50 border-purple-500/50 shadow-xl shadow-purple-500/20'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Loved by Users Across India
          </h2>
          <p className="text-xl text-gray-300">
            See what our customers have to say about ExpenseAI
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="mb-6">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-300 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 border border-blue-500/20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of Indians who are already saving time and money with ExpenseAI
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button onClick={handleSignupClick} className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Start Your Free Trial
              </button>
              
            </div>

            <p className="text-gray-400 text-sm">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">₹</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ExpenseAI
              </span>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-gray-400">
              © 2025 ExpenseAI. Made with ❤️ for India.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}