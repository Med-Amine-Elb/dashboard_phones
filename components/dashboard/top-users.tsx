"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default function TopUsers() {
  const users = [
    { name: "John Doe", department: "IT", phones: 3, avatar: "JD", color: "from-blue-500 to-blue-600" },
    { name: "Sarah Wilson", department: "Sales", phones: 2, avatar: "SW", color: "from-emerald-500 to-emerald-600" },
    { name: "Mike Johnson", department: "Marketing", phones: 2, avatar: "MJ", color: "from-orange-500 to-orange-600" },
    { name: "Emily Brown", department: "HR", phones: 1, avatar: "EB", color: "from-purple-500 to-purple-600" },
    { name: "David Lee", department: "Finance", phones: 1, avatar: "DL", color: "from-pink-500 to-pink-600" },
  ]

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-800 text-lg">Top Users</CardTitle>
          <select className="px-3 py-1 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            <option>By Phones</option>
            <option>By Usage</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={user.name}
              className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <div className="flex items-center space-x-3">
                <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                  <AvatarFallback className={`bg-gradient-to-r ${user.color} text-white text-sm font-medium`}>
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-slate-800">{user.name}</p>
                  <p className="text-sm text-slate-500">{user.department}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">{user.phones}</p>
                <p className="text-xs text-slate-500">phones</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
