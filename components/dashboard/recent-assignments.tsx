import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Smartphone } from "lucide-react"

export default function RecentAssignments() {
  const assignments = [
    {
      id: 1,
      user: "John Doe",
      phone: "iPhone 14 Pro",
      assignedDate: "2024-01-15",
      status: "active",
    },
    {
      id: 2,
      user: "Sarah Wilson",
      phone: "Samsung Galaxy S23",
      assignedDate: "2024-01-14",
      status: "active",
    },
    {
      id: 3,
      user: "Mike Johnson",
      phone: "Google Pixel 8",
      assignedDate: "2024-01-13",
      status: "returned",
    },
    {
      id: 4,
      user: "Emily Brown",
      phone: "iPhone 15",
      assignedDate: "2024-01-12",
      status: "active",
    },
  ]

  return (
    <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white">Recent Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment, index) => (
            <div
              key={assignment.id}
              className="p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideInLeft 0.6s ease-out forwards",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">{assignment.user}</span>
                </div>
                <Badge
                  className={
                    assignment.status === "active" ? "bg-green-500/20 text-green-400" : "bg-slate-500/20 text-slate-400"
                  }
                >
                  {assignment.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-400">
                <div className="flex items-center space-x-1">
                  <Smartphone className="w-3 h-3" />
                  <span>{assignment.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{assignment.assignedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
