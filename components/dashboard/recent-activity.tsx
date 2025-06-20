import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "John Doe",
      action: "assigned",
      phone: "iPhone 14 Pro",
      time: "2 minutes ago",
      type: "assignment",
      avatar: "JD",
    },
    {
      id: 2,
      user: "Sarah Wilson",
      action: "returned",
      phone: "Samsung Galaxy S23",
      time: "15 minutes ago",
      type: "return",
      avatar: "SW",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "requested",
      phone: "iPhone 15",
      time: "1 hour ago",
      type: "request",
      avatar: "MJ",
    },
    {
      id: 4,
      user: "Emily Brown",
      action: "assigned",
      phone: "Google Pixel 8",
      time: "2 hours ago",
      type: "assignment",
      avatar: "EB",
    },
    {
      id: 5,
      user: "David Lee",
      action: "updated profile",
      phone: "",
      time: "3 hours ago",
      type: "profile",
      avatar: "DL",
    },
  ]

  const getActivityColor = (type: string) => {
    switch (type) {
      case "assignment":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "return":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "request":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "profile":
        return "bg-purple-100 text-purple-700 border-purple-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getAvatarColor = (index: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-emerald-500 to-emerald-600",
      "from-orange-500 to-orange-600",
      "from-purple-500 to-purple-600",
      "from-pink-500 to-pink-600",
    ]
    return colors[index % colors.length]
  }

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-slate-800 text-xl">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="flex items-center space-x-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-slate-100"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                <AvatarFallback className={`bg-gradient-to-r ${getAvatarColor(index)} text-white text-sm font-medium`}>
                  {activity.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-slate-800 font-medium">
                  <span className="font-semibold">{activity.user}</span> {activity.action} {activity.phone}
                </p>
                <p className="text-slate-500 text-sm">{activity.time}</p>
              </div>
              <Badge className={`${getActivityColor(activity.type)} border font-medium`}>{activity.type}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
