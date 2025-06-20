"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { TrendingUp, Activity } from "lucide-react"

const trendsData = [
  { month: "Jan", assignments: 45, returns: 12, net: 33 },
  { month: "Fév", assignments: 52, returns: 18, net: 34 },
  { month: "Mar", assignments: 48, returns: 15, net: 33 },
  { month: "Avr", assignments: 61, returns: 22, net: 39 },
  { month: "Mai", assignments: 55, returns: 19, net: 36 },
  { month: "Jun", assignments: 67, returns: 25, net: 42 },
  { month: "Jul", assignments: 58, returns: 21, net: 37 },
  { month: "Aoû", assignments: 72, returns: 28, net: 44 },
  { month: "Sep", assignments: 65, returns: 24, net: 41 },
  { month: "Oct", assignments: 78, returns: 31, net: 47 },
  { month: "Nov", assignments: 69, returns: 26, net: 43 },
  { month: "Déc", assignments: 74, returns: 29, net: 45 },
]

const weeklyData = [
  { day: "Lun", assignments: 12 },
  { day: "Mar", assignments: 15 },
  { day: "Mer", assignments: 18 },
  { day: "Jeu", assignments: 14 },
  { day: "Ven", assignments: 22 },
  { day: "Sam", assignments: 8 },
  { day: "Dim", assignments: 5 },
]

export default function AssignmentTrendsChart() {
  const totalAssignments = trendsData.reduce((sum, item) => sum + item.assignments, 0)
  const totalReturns = trendsData.reduce((sum, item) => sum + item.returns, 0)
  const netGrowth = totalAssignments - totalReturns

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Monthly Trends */}
      <div className="lg:col-span-2">
        <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  Tendances d'Attribution
                </CardTitle>
                <CardDescription className="text-slate-600 mt-1">
                  Évolution mensuelle des attributions et retours
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">+{netGrowth}</div>
                <div className="text-sm text-slate-600">Croissance nette</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                assignments: { label: "Attributions", color: "#8b5cf6" },
                returns: { label: "Retours", color: "#06b6d4" },
                net: { label: "Net", color: "#10b981" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="assignmentsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.05} />
                    </linearGradient>
                    <linearGradient id="returnsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="assignments"
                    stroke="var(--color-assignments)"
                    fillOpacity={1}
                    fill="url(#assignmentsGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="returns"
                    stroke="var(--color-returns)"
                    fillOpacity={1}
                    fill="url(#returnsGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-600" />
            Activité Hebdomadaire
          </CardTitle>
          <CardDescription className="text-slate-600 mt-1">Attributions par jour de la semaine</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              assignments: { label: "Attributions", color: "#3b82f6" },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="assignments"
                  stroke="var(--color-assignments)"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Weekly Stats */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">94</div>
              <div className="text-xs text-slate-600">Cette semaine</div>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-lg">
              <div className="text-lg font-bold text-emerald-600">+12%</div>
              <div className="text-xs text-slate-600">vs semaine dernière</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
