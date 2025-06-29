import { Bell, Settings, Crown } from "lucide-react"
import { IconButton } from "@/components/ui/buttons"

export const AdminHeader = () => (
  <header className="bg-white border-b border-neutral-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Crown className="h-6 w-6 text-amber-600" />
          <span className="text-lg font-bold text-amber-600">ÉP</span>
        </div>
        <div className="text-sm text-neutral-600">Admin Dashboard</div>
      </div>

      <div className="flex items-center space-x-4">
        <IconButton icon={Bell} variant="ghost" />
        <IconButton icon={Settings} variant="ghost" />

        <div className="flex items-center space-x-3">
          <img src="/placeholder.svg?height=32&width=32" alt="Admin" className="w-8 h-8 rounded-full" />
          <div className="text-sm">
            <div className="font-medium">John Admin</div>
            <div className="text-neutral-500">Manager</div>
          </div>
        </div>
      </div>
    </div>
  </header>
)
