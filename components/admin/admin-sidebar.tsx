import Link from "next/link"
import { BarChart3, Calendar, Bed, Users, UserCheck, Sparkles, Wrench, FileText, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3, href: "/admin" },
  { id: "reservations", label: "Reservations", icon: Calendar, href: "/admin/reservations", badge: "12" },
  { id: "rooms", label: "Rooms", icon: Bed, href: "/admin/rooms" },
  { id: "guests", label: "Guests", icon: Users, href: "/admin/guests" },
  { id: "staff", label: "Staff", icon: UserCheck, href: "/admin/staff" },
  { id: "housekeeping", label: "Housekeeping", icon: Sparkles, href: "/admin/housekeeping" },
  { id: "maintenance", label: "Maintenance", icon: Wrench, href: "/admin/maintenance" },
  { id: "reports", label: "Reports", icon: FileText, href: "/admin/reports" },
  { id: "integrations", label: "Integrations", icon: Settings, href: "/admin/integrations/ezee" },
  { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
]

export const AdminSidebar = () => (
  <aside className="w-64 bg-white border-r border-neutral-200 h-screen">
    <div className="p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
            {item.badge && (
              <Badge variant="default" className="ml-auto bg-amber-600 text-white">
                {item.badge}
              </Badge>
            )}
          </Link>
        ))}
      </nav>
    </div>
  </aside>
)