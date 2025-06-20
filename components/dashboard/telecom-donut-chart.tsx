"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TelecomDonutChart() {
  const data = [
    { name: "Marketing", value: 25, color: "#ec4899", amount: "$31,339.00" },
    { name: "Location Bureau", value: 17, color: "#8b5cf6", amount: "$21,500.00" },
    { name: "Publicité", value: 14, color: "#06b6d4", amount: "$17,200.00" },
    { name: "Assurance", value: 10, color: "#84cc16", amount: "$12,400.00" },
    { name: "Fournitures", value: 5, color: "#f59e0b", amount: "$6,200.00" },
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)
  const centerAmount = "$31,339.00"

  // Calculate stroke-dasharray for each segment
  const circumference = 2 * Math.PI * 45
  let cumulativePercentage = 0

  return (
    <Card className="bg-white border-0 shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Principales Dépenses</CardTitle>
          <Select defaultValue="top5">
            <SelectTrigger className="w-32 text-sm border-slate-200 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top5">Top 5</SelectItem>
              <SelectItem value="top10">Top 10</SelectItem>
              <SelectItem value="all">Toutes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          {/* Donut Chart */}
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="10" />

              {data.map((item, index) => {
                const percentage = (item.value / total) * 100
                const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`
                const strokeDashoffset = -((cumulativePercentage / 100) * circumference)

                cumulativePercentage += percentage

                return (
                  <circle
                    key={item.name}
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={item.color}
                    strokeWidth="10"
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out hover:stroke-[12] cursor-pointer"
                    style={{
                      animationDelay: `${index * 200}ms`,
                    }}
                  />
                )
              })}
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold text-slate-900">{centerAmount}</span>
              <span className="text-sm text-slate-500">Marketing</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 ml-8 space-y-4">
            {data.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "slideInRight 0.6s ease-out forwards",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-medium text-slate-700">{item.name}</span>
                </div>
                <span className="text-sm font-semibold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
