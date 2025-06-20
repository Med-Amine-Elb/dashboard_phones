"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Smartphone, TrendingUp, Package } from "lucide-react"

const inventoryData = [
  { brand: "Apple", total: 145, assigned: 120, available: 15, maintenance: 10 },
  { brand: "Samsung", total: 98, assigned: 85, available: 8, maintenance: 5 },
  { brand: "Google", total: 67, assigned: 55, available: 10, maintenance: 2 },
  { brand: "OnePlus", total: 34, assigned: 28, available: 4, maintenance: 2 },
  { brand: "Xiaomi", total: 23, assigned: 18, available: 3, maintenance: 2 },
]

const statusData = [
  { name: "Attribués", value: 306, color: "#3b82f6" },
  { name: "Disponibles", value: 40, color: "#10b981" },
  { name: "Maintenance", value: 21, color: "#f59e0b" },
  { name: "Hors service", value: 8, color: "#ef4444" },
]

export default function PhoneInventoryChart() {
  const totalPhones = inventoryData.reduce((sum, item) => sum + item.total, 0)
  const assignedPhones = inventoryData.reduce((sum, item) => sum + item.assigned, 0)
  const availablePhones = inventoryData.reduce((sum, item) => sum + item.available, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Inventory by Brand */}
      <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-blue-50/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Inventaire par Marque
              </CardTitle>
              <CardDescription className="text-slate-600 mt-1">
                Répartition des {totalPhones} téléphones par fabricant
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-800">{totalPhones}</div>
              <div className="text-sm text-slate-600">Total</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              assigned: { label: "Attribués", color: "#3b82f6" },
              available: { label: "Disponibles", color: "#10b981" },
              maintenance: { label: "Maintenance", color: "#f59e0b" },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={inventoryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="brand" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="assigned" stackId="a" fill="var(--color-assigned)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="available" stackId="a" fill="var(--color-available)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="maintenance" stackId="a" fill="var(--color-maintenance)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Status Distribution */}
      <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-emerald-50/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                Statut des Appareils
              </CardTitle>
              <CardDescription className="text-slate-600 mt-1">Distribution par état d'utilisation</CardDescription>
            </div>
            <div className="flex items-center gap-2 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+5.2%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <ChartContainer
              config={{
                assigned: { label: "Attribués", color: "#3b82f6" },
                available: { label: "Disponibles", color: "#10b981" },
                maintenance: { label: "Maintenance", color: "#f59e0b" },
                outOfService: { label: "Hors service", color: "#ef4444" },
              }}
              className="h-[200px] w-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {statusData.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <div>
                  <div className="text-sm font-medium text-slate-800">{item.value}</div>
                  <div className="text-xs text-slate-600">{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
