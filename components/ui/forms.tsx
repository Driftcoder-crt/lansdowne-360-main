"use client"

import type React from "react"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helper?: string
}

export const Input = ({ label, error, helper, className, ...props }: InputProps) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-neutral-700">{label}</label>}
    <input
      className={cn(
        `
        w-full px-4 py-3 rounded-lg border 
        ${error ? "border-red-500" : "border-neutral-300"}
        focus:ring-2 focus:ring-amber-500 focus:border-amber-500
        placeholder-neutral-400 text-neutral-900
        transition-colors duration-200
        disabled:bg-neutral-100 disabled:cursor-not-allowed
      `,
        className,
      )}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
    {helper && <p className="text-sm text-neutral-500">{helper}</p>}
  </div>
)

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
  error?: string
}

export const Select = ({ label, options, error, className, ...props }: SelectProps) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-neutral-700">{label}</label>}
    <select
      className={cn(
        `
        w-full px-4 py-3 rounded-lg border 
        ${error ? "border-red-500" : "border-neutral-300"}
        focus:ring-2 focus:ring-amber-500 focus:border-amber-500
        text-neutral-900 bg-white
        transition-colors duration-200
        disabled:bg-neutral-100 disabled:cursor-not-allowed
      `,
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
)

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = ({ label, error, className, ...props }: TextareaProps) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-neutral-700">{label}</label>}
    <textarea
      className={cn(
        `
        w-full px-4 py-3 rounded-lg border 
        ${error ? "border-red-500" : "border-neutral-300"}
        focus:ring-2 focus:ring-amber-500 focus:border-amber-500
        placeholder-neutral-400 text-neutral-900
        transition-colors duration-200
        resize-vertical
        disabled:bg-neutral-100 disabled:cursor-not-allowed
      `,
        className,
      )}
      rows={4}
      {...props}
    />
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
)

interface DatePickerProps {
  label?: string
  error?: string
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
}

export const DatePicker = ({ label, error, value, onChange, placeholder = "Select date" }: DatePickerProps) => (
  <div className="space-y-2">
    {label && <label className="block text-sm font-medium text-neutral-700">{label}</label>}
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(`
            w-full px-4 py-3 rounded-lg border text-left
            ${error ? "border-red-500" : "border-neutral-300"}
            hover:border-amber-400 focus:ring-2 focus:ring-amber-500
            transition-colors duration-200
            disabled:bg-neutral-100 disabled:cursor-not-allowed
          `)}
        >
          <div className="flex items-center justify-between">
            <span className={value ? "text-neutral-900" : "text-neutral-400"}>
              {value ? format(value, "PPP") : placeholder}
            </span>
            <CalendarIcon className="w-5 h-5 text-neutral-400" />
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={value} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
    {error && <p className="text-sm text-red-600">{error}</p>}
  </div>
)
