"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TelecomAreaChart() {
  const data = [
    { month: "Jan", revenus: 15000, depenses: 12000 },
    { month: "Fév", revenus: 18000, depenses: 14000 },
    { month: "Mar", revenus: 22000, depenses: 16000 },
    { month: "Avr", revenus: 25000, depenses: 18000 },
    { month: "Mai", revenus: 32636, depenses: 20000 },
    { month: "Jun", revenus: 30000, depenses: 22000 },
  ]

  const maxValue = Math.max(...data.flatMap((d) => [d.revenus, d.depenses]))
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

  const revenusPoints = data.map((d) => d.revenus)
  const depensesPoints = data.map((d) => d.depenses)

  return (
    <Card className="bg-white border-0 shadow-soft hover:shadow-medium transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">Revenus & Dépenses</CardTitle>
          <Select defaultValue="6months">
            <SelectTrigger className="w-40 text-sm border-slate-200 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 derniers mois</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
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
                <linearGradient id="revenusGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="depensesGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#64748b" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#64748b" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* Area fills */}
              <path
                d={generatePath(revenusPoints, true)}
                fill="url(#revenusGradient)"
                className="transition-all duration-1000 ease-out"
              />
              <path
                d={generatePath(depensesPoints, true)}
                fill="url(#depensesGradient)"
                className="transition-all duration-1000 ease-out"
              />

              {/* Lines */}
              <path
                d={generatePath(revenusPoints)}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-1000 ease-out"
              />
              <path
                d={generatePath(depensesPoints)}
                fill="none"
                stroke="#64748b"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>

            {/* Peak indicator */}
            <div className="absolute top-4 right-8 bg-white rounded-xl px-3 py-2 shadow-soft border border-slate-200">
              <div className="text-xs font-semibold text-slate-900">$32,636.00</div>
              <div className="text-xs text-slate-500">Mai 8</div>
            </div>
          </div>

          {/* Legend and months */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full shadow-sm"></div>
                <span className="text-sm font-medium text-slate-600">Revenus</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-slate-500 rounded-full shadow-sm"></div>
                <span className="text-sm font-medium text-slate-600">Dépenses</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
              {data.map((item, index) => (
                <span key={item.month} className="hover:text-slate-700 transition-colors duration-200">
                  {item.month}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
