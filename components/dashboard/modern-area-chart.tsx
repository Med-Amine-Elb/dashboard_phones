"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ModernAreaChart() {
  const data = [
    { month: "Jan", income: 15000, expenses: 12000 },
    { month: "Fév", income: 18000, expenses: 14000 },
    { month: "Mar", income: 22000, expenses: 16000 },
    { month: "Avr", income: 25000, expenses: 18000 },
    { month: "Mai", income: 28000, expenses: 20000 },
    { month: "Jun", income: 32000, expenses: 22000 },
  ]

  const maxValue = Math.max(...data.flatMap((d) => [d.income, d.expenses]))
  const chartHeight = 200

  // Generate SVG path for smooth curves
  const generatePath = (points: number[], isArea = false) => {
    if (points.length === 0) return ""

    const width = 400
    const stepX = width / (points.length - 1)

    let path = `M 0 ${chartHeight - (points[0] / maxValue) * chartHeight}`

    for (let i = 1; i < points.length; i++) {
      const x = i * stepX
      const y = chartHeight - (points[i] / maxValue) * chartHeight
      const prevX = (i - 1) * stepX
      const prevY = chartHeight - (points[i - 1] / maxValue) * chartHeight

      const cpX1 = prevX + stepX / 3
      const cpY1 = prevY
      const cpX2 = x - stepX / 3
      const cpY2 = y

      path += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${x} ${y}`
    }

    if (isArea) {
      path += ` L ${width} ${chartHeight} L 0 ${chartHeight} Z`
    }

    return path
  }

  const incomePoints = data.map((d) => d.income)
  const expensePoints = data.map((d) => d.expenses)

  return (
    <Card className="bg-white border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Revenus & Dépenses</CardTitle>
          <Select defaultValue="6months">
            <SelectTrigger className="w-40 text-sm border-slate-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 derniers mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Chart */}
          <div className="relative h-64">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="incomeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#64748b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#64748b" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Area fills */}
              <path
                d={generatePath(incomePoints, true)}
                fill="url(#incomeGradient)"
                className="transition-all duration-1000 ease-out"
              />
              <path
                d={generatePath(expensePoints, true)}
                fill="url(#expenseGradient)"
                className="transition-all duration-1000 ease-out"
              />

              {/* Lines */}
              <path
                d={generatePath(incomePoints)}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                className="transition-all duration-1000 ease-out"
              />
              <path
                d={generatePath(expensePoints)}
                fill="none"
                stroke="#64748b"
                strokeWidth="3"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Peak indicator */}
            <div className="absolute top-4 right-8 bg-white rounded-lg px-3 py-2 shadow-sm border">
              <div className="text-xs text-slate-500">$32,636.00</div>
              <div className="text-xs text-slate-400">Mai 8</div>
            </div>
          </div>

          {/* Legend and months */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Revenus</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-slate-500 rounded-full"></div>
                <span className="text-sm text-slate-600">Dépenses</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-slate-400">
              {data.map((item, index) => (
                <span key={item.month}>{item.month}</span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
