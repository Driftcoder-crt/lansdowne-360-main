import type React from "react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "primary" | "secondary" | "ghost" | "danger"
}

export const ButtonPrimary = ({ children, size = "md", className, ...props }: ButtonProps) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  }

  return (
    <button
      className={cn(
        `
        bg-gradient-to-r from-amber-600 to-amber-700 
        hover:from-amber-700 hover:to-amber-800 
        text-white font-semibold rounded-lg
        transition-all duration-200 
        shadow-md hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
      `,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export const ButtonSecondary = ({ children, size = "md", className, ...props }: ButtonProps) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  }

  return (
    <button
      className={cn(
        `
        bg-white border-2 border-amber-600 
        hover:bg-amber-50 text-amber-700 
        font-semibold rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
      `,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export const ButtonGhost = ({ children, size = "md", className, ...props }: ButtonProps) => {
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  }

  return (
    <button
      className={cn(
        `
        bg-transparent hover:bg-neutral-100 
        text-neutral-700 hover:text-neutral-900 
        font-medium rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
      `,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export const ButtonDanger = ({ children, size = "md", className, ...props }: ButtonProps) => {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  }

  return (
    <button
      className={cn(
        `
        bg-red-600 hover:bg-red-700 
        text-white font-semibold rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]}
      `,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  variant?: "primary" | "ghost"
  size?: "sm" | "md" | "lg"
}

export const IconButton = ({ icon: Icon, variant = "ghost", size = "md", className, ...props }: IconButtonProps) => {
  const variants = {
    primary: "bg-amber-600 hover:bg-amber-700 text-white",
    ghost: "hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900",
  }

  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <button
      className={cn(
        `
        inline-flex items-center justify-center rounded-lg
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
      `,
        className,
      )}
      {...props}
    >
      <Icon className={iconSizes[size]} />
    </button>
  )
}
