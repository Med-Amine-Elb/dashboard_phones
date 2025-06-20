"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, Cell } from "recharts"
import { Smartphone, Wrench, AlertCircle } from "lucide-react"

const lifecycleData = [
  { stage: "Nouveau", count: 45, avgDays: 0, color: "#10b981" },
  { stage: "En service", count: 298, avgDays: 365, color: "#3b82f6" },
  { stage: "Maintenance", count: 21, avgDays: 7, color: "#f59e0b" },
  { stage: "Fin de vie", count: 12, avgDays: 1095, color: "#ef4444" },
]

const conditionData = [
  { condition: "Excellent", count: 156, percentage: 41.5 },
  { condition: "Bon", count: 142, percentage: 37.8 },
  { condition: "Correct", count: 58, percentage: 15.4 },
  { condition: "Mauvais", count: 20, percentage: 5.3 },
]

const maintenanceData = [
  { month: "Jan", repairs: 8, replacements: 3, cost: 2400 },
  { month: "Fév", repairs: 12, replacements: 5, cost: 3200 },
  { month: "Mar", repairs: 6, replacements: 2, cost: 1800 },
  { month: "Avr", repairs: 15, replacements: 7, cost: 4100 },
  { month: "Mai", repairs: 9, replacements: 4, cost: 2700 },
  { month: "Jun", repairs: 11, replacements: 6, cost: 3500 },
]

export default function DeviceLifecycleChart() {
  const totalDevices = lifecycleData.reduce((sum, item) => sum + item.count, 0)
  const avgLifespan = 2.3 // years
  const totalMaintenanceCost = maintenanceData.reduce((sum, item) => sum + item.cost, 0)

  return (
    <div className="space-y-6">
      {/* Lifecycle Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-blue-50/30">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  Cycle de Vie des Appareils
                </CardTitle>
                <CardDescription className="text-slate-600 mt-1">Répartition par étape du cycle de vie</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-slate-800">{avgLifespan}</div>
                <div className="text-sm text-slate-600">Années moy.</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Nombre", color: "#3b82f6" },
              }}
              className="h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lifecycleData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="stage" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {lifecycleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-emerald-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-emerald-600" />
              État des Appareils
            </CardTitle>
            <CardDescription className="text-slate-600 mt-1">Condition physique des téléphones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {conditionData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-slate-700">{item.condition}</span>
                    <span className="text-sm text-slate-600">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-center p-3 bg-emerald-50 rounded-lg">
                <div className="text-lg font-bold text-emerald-600">79%</div>
                <div className="text-xs text-slate-600">Bon état</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-lg font-bold text-orange-600">21%</div>
                <div className="text-xs text-slate-600">À surveiller</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Trends */}
      <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-orange-50/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-orange-600" />
                Tendances de Maintenance
              </CardTitle>
              <CardDescription className="text-slate-600 mt-1">
                Évolution des réparations et remplacements
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-800">{totalMaintenanceCost.toLocaleString()}€</div>
              <div className="text-sm text-slate-600">Coût total</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              repairs: { label: "Réparations", color: "#f59e0b" },
              replacements: { label: "Remplacements", color: "#ef4444" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={maintenanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="repairsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                  </linearGradient>
                  <linearGradient id="replacementsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="repairs"
                  stackId="1"
                  stroke="var(--color-repairs)"
                  fill="url(#repairsGradient)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="replacements"
                  stackId="1"
                  stroke="var(--color-replacements)"
                  fill="url(#replacementsGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
