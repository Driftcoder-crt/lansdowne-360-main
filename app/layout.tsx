import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { FloatingAIRobot } from "@/components/ui/floating-ai-robot"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI 360° Hotel - Luxury Tech-Enabled Hospitality",
  description:
    "Experience luxury redefined through elegant, tech-enabled, and nature-integrated properties across India's most beautiful destinations.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingAIRobot />
      </body>
    </html>
  )
}
