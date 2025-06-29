"use client"

import { useState, useEffect, useRef } from "react"
import {
  X,
  Send,
  Sparkles,
  Brain,
  Loader2,
  Calendar,
  MapPin,
  Star,
  ExternalLink,
  Home,
  Utensils,
  Camera,
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  showBookingButton?: boolean
}

export const FloatingAIRobot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addWelcomeMessage()
    }
  }, [isOpen])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const addWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content:
        "🏔️ **Welcome to AI 360° Hotel!**\n\n✨ Your elite AI concierge at your service.\n🏨 Rooms | 📍 Location | 🎉 Events | 🍽️ Dining\n\nHow can I assist you today?",
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }

  const checkIfBookingResponse = (content: string): boolean => {
    const bookingKeywords = [
      "book",
      "reservation",
      "room",
      "availability",
      "price",
      "rate",
      "stay",
      "check-in",
      "package",
    ]
    return bookingKeywords.some((keyword) => content.toLowerCase().includes(keyword))
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setInputValue("")

    try {
      const response = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          conversationHistory: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        showBookingButton: checkIfBookingResponse(data.response),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsConnected(true)
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "🔧 Technical issue. Call +91 98765 43210 for help.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
      setIsConnected(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (action: string) => {
    sendMessage(action)
  }

  const openBookingSystem = () => {
    window.open("https://live.ipms247.com/booking/book-rooms-a1360degree", "_blank")
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-24 md:bottom-6 right-4 md:right-6 z-50">
      {/* Elite Chat Interface */}
      {isOpen && (
        <div className="mb-4 w-[340px] md:w-[360px] max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-120px)] bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-amber-400/30 overflow-hidden animate-in slide-in-from-bottom-5 duration-500 flex flex-col">
          {/* Elite Header */}
          <div className="relative bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 p-3 text-white flex-shrink-0">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm border border-white/30">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Elite AI Concierge</h3>
                  <div className="text-xs text-amber-100">
                    <div>Powered by AI 360° Hotel</div>
                    <div className="flex items-center space-x-1 mt-0.5">
                      <Sparkles className="w-2 h-2" />
                      <span>Advanced Gemini AI</span>
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-400" : "bg-red-400"} animate-pulse`}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-all duration-300 p-1.5 hover:bg-white/10 rounded-lg hover:scale-110"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Fixed AI Menu - Always Visible */}
          <div className="bg-slate-800/40 border-b border-amber-500/20 p-2 flex-shrink-0">
            <div className="grid grid-cols-6 gap-1">
              <button
                onClick={() => handleQuickAction("Room availability")}
                className="p-2 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-lg hover:from-blue-600/40 hover:to-blue-500/40 transition-all duration-300 border border-blue-500/30 group hover:scale-105 flex flex-col items-center"
              >
                <Calendar className="w-3 h-3 text-blue-400 mb-1" />
                <span className="text-xs text-white font-medium">Rooms</span>
              </button>
              <button
                onClick={() => handleQuickAction("Hotel location")}
                className="p-2 bg-gradient-to-r from-green-600/20 to-green-500/20 rounded-lg hover:from-green-600/40 hover:to-green-500/40 transition-all duration-300 border border-green-500/30 hover:scale-105 flex flex-col items-center"
              >
                <MapPin className="w-3 h-3 text-green-400 mb-1" />
                <span className="text-xs text-white font-medium">Location</span>
              </button>
              <button
                onClick={() => handleQuickAction("Event planning")}
                className="p-2 bg-gradient-to-r from-purple-600/20 to-purple-500/20 rounded-lg hover:from-purple-600/40 hover:to-purple-500/40 transition-all duration-300 border border-purple-500/30 hover:scale-105 flex flex-col items-center"
              >
                <Star className="w-3 h-3 text-purple-400 mb-1" />
                <span className="text-xs text-white font-medium">Events</span>
              </button>
              <button
                onClick={() => handleQuickAction("Dining options")}
                className="p-2 bg-gradient-to-r from-orange-600/20 to-orange-500/20 rounded-lg hover:from-orange-600/40 hover:to-orange-500/40 transition-all duration-300 border border-orange-500/30 hover:scale-105 flex flex-col items-center"
              >
                <Utensils className="w-3 h-3 text-orange-400 mb-1" />
                <span className="text-xs text-white font-medium">Dining</span>
              </button>
              <button
                onClick={() => handleQuickAction("Hotel amenities")}
                className="p-2 bg-gradient-to-r from-teal-600/20 to-teal-500/20 rounded-lg hover:from-teal-600/40 hover:to-teal-500/40 transition-all duration-300 border border-teal-500/30 hover:scale-105 flex flex-col items-center"
              >
                <Home className="w-3 h-3 text-teal-400 mb-1" />
                <span className="text-xs text-white font-medium">Amenities</span>
              </button>
              <button
                onClick={() => handleQuickAction("Photography tours")}
                className="p-2 bg-gradient-to-r from-pink-600/20 to-pink-500/20 rounded-lg hover:from-pink-600/40 hover:to-pink-500/40 transition-all duration-300 border border-pink-500/30 hover:scale-105 flex flex-col items-center"
              >
                <Camera className="w-3 h-3 text-pink-400 mb-1" />
                <span className="text-xs text-white font-medium">Tours</span>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto bg-gradient-to-b from-slate-900/30 to-slate-800/50 backdrop-blur-sm min-h-0">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] ${message.role === "user" ? "order-2" : "order-1"}`}>
                  {message.role === "assistant" && (
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="w-4 h-4 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-2 h-2 text-white" />
                      </div>
                      <span className="text-xs text-slate-400 font-medium">AI Concierge</span>
                    </div>
                  )}
                  <div
                    className={`rounded-xl p-3 shadow-lg transition-all duration-300 hover:scale-[1.02] ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-br-md"
                        : "bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-bl-md"
                    }`}
                  >
                    <div className="whitespace-pre-line text-sm leading-relaxed">{message.content}</div>
                    <div className={`text-xs mt-1 ${message.role === "user" ? "text-amber-100" : "text-slate-400"}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  {/* Smart Book Now Button */}
                  {message.role === "assistant" && message.showBookingButton && (
                    <div className="mt-2 flex justify-start">
                      <button
                        onClick={openBookingSystem}
                        className="px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center space-x-2 hover:scale-105 border border-amber-400/30"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="font-semibold">Book Now</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl rounded-bl-md p-3 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
                    <span className="text-sm text-slate-300">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Direct Booking Section */}
          <div className="p-3 border-t border-amber-500/20 bg-slate-800/30 backdrop-blur-sm flex-shrink-0">
            <button
              onClick={openBookingSystem}
              className="w-full p-3 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all duration-300 border border-amber-400/30 hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-2">
                <ExternalLink className="w-5 h-5" />
                <span className="font-bold">Book Direct - Best Rates</span>
              </div>
            </button>
          </div>

          {/* Premium Input */}
          <div className="p-3 border-t border-amber-500/20 bg-slate-800/50 backdrop-blur-sm flex-shrink-0">
            <div className="flex space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && !isLoading && sendMessage(inputValue)}
                  placeholder="Ask about rooms, events..."
                  disabled={isLoading}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 text-white placeholder-slate-400 text-sm backdrop-blur-sm disabled:opacity-50 transition-all duration-300"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="w-3 h-3 text-amber-400/50" />
                </div>
              </div>
              <button
                onClick={() => sendMessage(inputValue)}
                disabled={!inputValue.trim() || isLoading}
                className="px-3 py-2 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg hover:from-amber-700 hover:to-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-amber-500/25 disabled:hover:shadow-none hover:scale-105"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Elite Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:via-amber-600 hover:to-amber-700 text-white rounded-2xl shadow-2xl hover:shadow-amber-500/40 transition-all duration-500 flex items-center justify-center group overflow-hidden hover:scale-110"
        style={{
          animation: isOpen ? "none" : "pulse 4s infinite",
        }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>

        {/* Main Icon */}
        <div className="relative z-10">
          {isOpen ? (
            <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
          ) : (
            <div className="relative">
              <Brain className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-400 rounded-full border border-white animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Elite Pulse Rings */}
        {!isOpen && (
          <>
            <div className="absolute inset-0 rounded-2xl bg-amber-400 animate-ping opacity-20"></div>
            <div
              className="absolute inset-0 rounded-2xl bg-amber-300 animate-ping opacity-10"
              style={{ animationDelay: "1s" }}
            ></div>
          </>
        )}
      </button>

      {/* Elite Welcome Tooltip */}
      {!isOpen && messages.length === 0 && (
        <div className="absolute bottom-16 right-0 bg-gradient-to-r from-slate-800/95 to-slate-700/95 backdrop-blur-xl rounded-lg shadow-2xl p-2.5 border border-amber-500/30 animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <div>
              <p className="text-xs text-white font-medium">Elite AI Concierge</p>
              <p className="text-xs text-slate-300">Instant assistance</p>
            </div>
          </div>
          <div className="absolute top-full right-3 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-slate-700"></div>
        </div>
      )}
    </div>
  )
}
