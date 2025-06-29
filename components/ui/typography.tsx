import type React from "react"
import { cn } from "@/lib/utils"

// Display Typography (Hero Sections)
export const DisplayXL = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn("text-6xl md:text-8xl font-black leading-none tracking-tight text-neutral-900", className)}
    {...props}
  >
    {children}
  </h1>
)

export const DisplayLG = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1
    className={cn("text-5xl md:text-7xl font-bold leading-tight tracking-tight text-neutral-900", className)}
    {...props}
  >
    {children}
  </h1>
)

export const DisplayMD = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn("text-4xl md:text-6xl font-bold leading-tight text-neutral-900", className)} {...props}>
    {children}
  </h1>
)

// Heading Typography
export const HeadingXL = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-4xl md:text-5xl font-bold leading-tight text-neutral-900", className)} {...props}>
    {children}
  </h2>
)

export const HeadingLG = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2 className={cn("text-3xl md:text-4xl font-bold leading-tight text-neutral-900", className)} {...props}>
    {children}
  </h2>
)

export const HeadingMD = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-2xl md:text-3xl font-semibold leading-snug text-neutral-900", className)} {...props}>
    {children}
  </h3>
)

export const HeadingSM = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h4 className={cn("text-xl md:text-2xl font-semibold leading-snug text-neutral-900", className)} {...props}>
    {children}
  </h4>
)

export const HeadingXS = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h5 className={cn("text-lg md:text-xl font-semibold leading-snug text-neutral-900", className)} {...props}>
    {children}
  </h5>
)

// Body Typography
export const BodyLG = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-xl leading-relaxed text-neutral-600", className)} {...props}>
    {children}
  </p>
)

export const BodyMD = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-lg leading-relaxed text-neutral-600", className)} {...props}>
    {children}
  </p>
)

export const BodyBase = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-base leading-normal text-neutral-600", className)} {...props}>
    {children}
  </p>
)

export const BodySM = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm leading-normal text-neutral-500", className)} {...props}>
    {children}
  </p>
)

export const BodyXS = ({ children, className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-xs leading-normal text-neutral-500", className)} {...props}>
    {children}
  </p>
)

// Special Typography
interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  gradient?: "primary" | "luxury" | "accent"
}

export const GradientText = ({ children, gradient = "primary", className, ...props }: GradientTextProps) => {
  const gradients = {
    primary: "bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent",
    luxury: "bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent",
    accent: "bg-gradient-to-r from-purple-600 to-amber-600 bg-clip-text text-transparent",
  }

  return (
    <span className={cn(gradients[gradient], className)} {...props}>
      {children}
    </span>
  )
}

interface PriceTextProps {
  amount: number | string
  currency?: string
  period?: string
  className?: string
}

export const PriceText = ({ amount, currency = "$", period, className }: PriceTextProps) => (
  <div className={cn("flex items-baseline space-x-1", className)}>
    <span className="text-3xl font-bold text-amber-600">
      {currency}
      {amount}
    </span>
    {period && <span className="text-neutral-500">{period}</span>}
  </div>
)
