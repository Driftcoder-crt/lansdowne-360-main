import { GoogleGenerativeAI } from "@google/generative-ai"
import { type NextRequest, NextResponse } from "next/server"

const genAI = new GoogleGenerativeAI("AIzaSyAILoUwN1_QpT2jLBp9kv_KO21IjiB9kak")

const HOTEL_CONTEXT = `
You are AI 360° Hotel's elite concierge. Give ULTRA-CONCISE responses (2-3 lines max). Use emojis and structure clearly.

QUICK INFO:
• AI 360° Hotel Lansdowne | 360° Himalayan Views
• Rooms: Super Deluxe ₹8,999 | Deluxe ₹6,999 | Standard ₹4,999
• Contact: +91 98765 43210 | Book: live.ipms247.com/booking/book-rooms-a1360degree

RESPONSE RULES:
1. Maximum 2-3 lines only
2. Use emojis for visual appeal
3. Be direct and helpful
4. Always end with "Need more details?"
`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 80,
        temperature: 0.6,
      },
    })

    const conversationContext =
      conversationHistory
        ?.slice(-2)
        .map((msg: any) => `${msg.role}: ${msg.content}`)
        .join("\n") || ""

    const prompt = `${HOTEL_CONTEXT}

Recent chat:
${conversationContext}

Guest: ${message}

Reply in 2-3 lines max with emojis. Be helpful and concise:`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    return NextResponse.json({
      response: text,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("AI Chat Error:", error)
    return NextResponse.json(
      {
        error: "🔧 Technical issue. Call +91 98765 43210 for help.",
      },
      { status: 500 },
    )
  }
}
