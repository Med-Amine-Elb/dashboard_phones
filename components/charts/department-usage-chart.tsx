"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { Building2, TrendingUp } from "lucide-react"

const departmentData = [
  { name: "IT", users: 45, phones: 52, color: "#3b82f6", efficiency: 115 },
  { name: "Ventes", users: 38, phones: 41, color: "#10b981", efficiency: 108 },
  { name: "Marketing", users: 28, phones: 30, color: "#f59e0b", efficiency: 107 },
  { name: "RH", users: 15, phones: 16, color: "#8b5cf6", efficiency: 107 },
  { name: "Finance", users: 22, phones: 23, color: "#ef4444", efficiency: 105 },
  { name: "Support", users: 18, phones: 20, color: "#06b6d4", efficiency: 111 },
]

const usageData = [
  { department: "IT", utilization: 95, satisfaction: 4.8 },
  { department: "Ventes", utilization: 88, satisfaction: 4.6 },
  { department: "Marketing", utilization: 82, satisfaction: 4.4 },
  { department: "RH", utilization: 78, satisfaction: 4.5 },
  { department: "Finance", utilization: 85, satisfaction: 4.3 },
  { department: "Support", utilization: 90, satisfaction: 4.7 },
]

export default function DepartmentUsageChart() {
  const totalUsers = departmentData.reduce((sum, dept) => sum + dept.users, 0)
  const totalPhones = departmentData.reduce((sum, dept) => sum + dept.phones, 0)
  const avgEfficiency = departmentData.reduce((sum, dept) => sum + dept.efficiency, 0) / departmentData.length

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Department Distribution */}
      <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-indigo-50/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-indigo-600" />
                Répartition par Département
              </CardTitle>
              <CardDescription className="text-slate-600 mt-1">
                Distribution des {totalPhones} téléphones
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-800">{avgEfficiency.toFixed(0)}%</div>
              <div className="text-sm text-slate-600">Efficacité moy.</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center mb-6">
            <ChartContainer
              config={{
                phones: { label: "Téléphones", color: "#3b82f6" },
              }}
              className="h-[200px] w-[200px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="phones"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          <div className="space-y-3">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                  <span className="text-sm font-medium text-slate-800">{dept.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-slate-600">{dept.users} utilisateurs</span>
                  <span className="font-medium text-slate-800">{dept.phones} téléphones</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Analytics */}
      <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-emerald-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600" />
            Analyse d'Utilisation
          </CardTitle>
          <CardDescription className="text-slate-600 mt-1">
            Taux d'utilisation et satisfaction par département
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              utilization: { label: "Utilisation (%)", color: "#10b981" },
              satisfaction: { label: "Satisfaction", color: "#3b82f6" },
            }}
            className="h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="department" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="utilization" fill="var(--color-utilization)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>

          {/* Department Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="text-center p-3 bg-emerald-50 rounded-lg">
              <div className="text-lg font-bold text-emerald-600">{totalUsers}</div>
              <div className="text-xs text-slate-600">Utilisateurs</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-600">{totalPhones}</div>
              <div className="text-xs text-slate-600">Téléphones</div>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">4.5</div>
              <div className="text-xs text-slate-600">Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
