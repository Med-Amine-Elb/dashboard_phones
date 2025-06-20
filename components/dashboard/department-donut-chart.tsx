"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DepartmentDonutChart() {
  const departments = [
    { name: "IT", count: 25, color: "from-blue-500 to-cyan-500", percentage: 35, strokeDasharray: "87.96 251.33" },
    {
      name: "Ventes",
      count: 18,
      color: "from-emerald-500 to-teal-500",
      percentage: 25,
      strokeDasharray: "62.83 251.33",
    },
    {
      name: "Marketing",
      count: 15,
      color: "from-purple-500 to-indigo-500",
      percentage: 21,
      strokeDasharray: "52.78 251.33",
    },
    { name: "RH", count: 9, color: "from-orange-500 to-amber-500", percentage: 13, strokeDasharray: "32.67 251.33" },
    { name: "Finance", count: 4, color: "from-pink-500 to-rose-500", percentage: 6, strokeDasharray: "15.08 251.33" },
  ]

  const total = departments.reduce((sum, dept) => sum + dept.count, 0)

  return (
    <Card className="bg-white border-0 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 opacity-30" />
      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-bold">Attributions par Département</CardTitle>
            <p className="text-slate-500 text-sm mt-1">Répartition actuelle</p>
          </div>
          <Select defaultValue="month">
            <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="year">Année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center justify-between">
          {/* Donut Chart */}
          <div className="relative w-48 h-48">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              {departments.map((dept, index) => {
                const offset = departments.slice(0, index).reduce((sum, d) => {
                  return sum + (d.percentage / 100) * 251.33
                }, 0)

                return (
                  <circle
                    key={dept.name}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke={`url(#gradient-${index})`}
                    strokeWidth="8"
                    strokeDasharray={`${(dept.percentage / 100) * 251.33} 251.33`}
                    strokeDashoffset={-offset}
                    className="transition-all duration-1000 ease-out hover:stroke-width-10"
                    style={{
                      animationDelay: `${index * 200}ms`,
                    }}
                  />
                )
              })}

              {/* Gradients */}
              <defs>
                {departments.map((dept, index) => (
                  <linearGradient key={index} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={dept.color.split(" ")[1]} />
                    <stop offset="100%" stopColor={dept.color.split(" ")[3]} />
                  </linearGradient>
                ))}
              </defs>
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-800">{total}</span>
              <span className="text-sm text-slate-500">Total</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-1 ml-8 space-y-4">
            {departments.map((dept, index) => (
              <div
                key={dept.name}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "slideInRight 0.6s ease-out forwards",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${dept.color} shadow-sm group-hover:scale-110 transition-transform`}
                  ></div>
                  <span className="text-slate-700 font-medium">{dept.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-slate-800 font-semibold">{dept.count}</div>
                    <div className="text-slate-500 text-sm">{dept.percentage}%</div>
                  </div>
                  <div className="w-16 bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 bg-gradient-to-r ${dept.color} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
