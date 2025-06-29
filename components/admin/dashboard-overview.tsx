import { HeadingLG, BodyBase } from "@/components/ui/typography"
import { StatsCard } from "@/components/ui/cards"

const stats = [
  {
    value: "94%",
    label: "Occupancy Rate",
    description: "Today",
    trend: "+2.5%",
  },
  {
    value: "$45,230",
    label: "Revenue",
    description: "Today",
    trend: "+12.3%",
  },
  {
    value: "127",
    label: "Check-ins",
    description: "Today",
    trend: "+5.2%",
  },
  {
    value: "4.9",
    label: "Guest Rating",
    description: "This month",
    trend: "+0.2",
  },
]

export const DashboardOverview = () => (
  <div className="space-y-8">
    <div>
      <HeadingLG className="mb-2">Dashboard Overview</HeadingLG>
      <BodyBase className="text-neutral-600">Welcome back! Here's what's happening at Élite Palace today.</BodyBase>
    </div>

    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatsCard key={index} stat={stat} />
      ))}
    </div>

    {/* Charts and Tables */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <RevenueChart />
      <OccupancyChart />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <RecentReservations />
      <TasksList />
    </div>
  </div>
)

const RevenueChart = () => (
  <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-md">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold">Revenue Overview</h3>
      <select className="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>
    </div>

    <div className="h-64 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">📊</div>
        <div className="text-neutral-600">Revenue Chart</div>
      </div>
    </div>
  </div>
)

const OccupancyChart = () => (
  <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-md">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-semibold">Occupancy Trends</h3>
      <select className="px-3 py-2 border border-neutral-300 rounded-lg text-sm">
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
      </select>
    </div>

    <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">📈</div>
        <div className="text-neutral-600">Occupancy Chart</div>
      </div>
    </div>
  </div>
)

const RecentReservations = () => {
  const reservations = [
    {
      id: "1",
      guest: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      room: "Presidential Suite",
      amount: 1500,
      dates: "Dec 15-18",
    },
    {
      id: "2",
      guest: { name: "Michael Chen", avatar: "/placeholder.svg?height=40&width=40" },
      room: "Luxury Suite",
      amount: 850,
      dates: "Dec 16-19",
    },
    {
      id: "3",
      guest: { name: "Emma Williams", avatar: "/placeholder.svg?height=40&width=40" },
      room: "Deluxe Room",
      amount: 450,
      dates: "Dec 17-20",
    },
  ]

  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recent Reservations</h3>
        <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">View All</button>
      </div>

      <div className="space-y-4">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={reservation.guest.avatar || "/placeholder.svg"}
                alt={reservation.guest.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="font-medium">{reservation.guest.name}</div>
                <div className="text-sm text-neutral-600">{reservation.room}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-medium">${reservation.amount}</div>
              <div className="text-sm text-neutral-600">{reservation.dates}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const TasksList = () => {
  const tasks = [
    { id: "1", title: "Room 205 Maintenance", priority: "high", time: "2 hours ago" },
    { id: "2", title: "VIP Guest Arrival", priority: "urgent", time: "30 minutes" },
    { id: "3", title: "Housekeeping Schedule", priority: "normal", time: "1 hour ago" },
    { id: "4", title: "Restaurant Reservation", priority: "low", time: "3 hours ago" },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "normal":
        return "bg-blue-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-neutral-500"
    }
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-neutral-200 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Recent Tasks</h3>
        <button className="text-amber-600 hover:text-amber-700 font-medium text-sm">View All</button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
              <div>
                <div className="font-medium">{task.title}</div>
                <div className="text-sm text-neutral-600 capitalize">{task.priority} priority</div>
              </div>
            </div>

            <div className="text-sm text-neutral-600">{task.time}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
