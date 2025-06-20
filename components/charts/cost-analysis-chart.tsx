"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Bar, ComposedChart } from "recharts"
import { Euro, TrendingDown, Calculator, PieChart } from "lucide-react"

const costData = [
  { month: "Jan", purchases: 15400, maintenance: 2400, total: 17800, devices: 12 },
  { month: "Fév", purchases: 22100, maintenance: 3200, total: 25300, devices: 18 },
  { month: "Mar", purchases: 8900, maintenance: 1800, total: 10700, devices: 7 },
  { month: "Avr", purchases: 31200, maintenance: 4100, total: 35300, devices: 25 },
  { month: "Mai", purchases: 18600, maintenance: 2700, total: 21300, devices: 15 },
  { month: "Jun", purchases: 26800, maintenance: 3500, total: 30300, devices: 21 },
  { month: "Jul", purchases: 12400, maintenance: 2100, total: 14500, devices: 10 },
  { month: "Aoû", purchases: 19700, maintenance: 2900, total: 22600, devices: 16 },
  { month: "Sep", purchases: 28300, maintenance: 3800, total: 32100, devices: 23 },
  { month: "Oct", purchases: 35600, maintenance: 4200, total: 39800, devices: 28 },
  { month: "Nov", purchases: 21900, maintenance: 3100, total: 25000, devices: 17 },
  { month: "Déc", purchases: 16800, maintenance: 2600, total: 19400, devices: 13 },
]

const categoryData = [
  { category: "Smartphones", amount: 186500, percentage: 72.3, color: "#3b82f6" },
  { category: "Accessoires", amount: 34200, percentage: 13.3, color: "#10b981" },
  { category: "Maintenance", amount: 32400, percentage: 12.6, color: "#f59e0b" },
  { category: "Assurance", amount: 4700, percentage: 1.8, color: "#8b5cf6" },
]

export default function CostAnalysisChart() {
  const totalCost = costData.reduce((sum, item) => sum + item.total, 0)
  const avgCostPerDevice = totalCost / costData.reduce((sum, item) => sum + item.devices, 0)
  const monthlyAvg = totalCost / 12

  return (
    <div className="space-y-6">
      {/* Main Cost Trends */}
      <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-green-50/30">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Euro className="w-5 h-5 text-green-600" />
                Analyse des Coûts
              </CardTitle>
              <CardDescription className="text-slate-600 mt-1">
                Évolution mensuelle des dépenses télécom
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-800">{totalCost.toLocaleString()}€</div>
              <div className="text-sm text-slate-600">Total annuel</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              purchases: { label: "Achats", color: "#3b82f6" },
              maintenance: { label: "Maintenance", color: "#f59e0b" },
              total: { label: "Total", color: "#10b981" },
            }}
            className="h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <defs>
                  <linearGradient id="totalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="purchases" fill="var(--color-purchases)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="maintenance" fill="var(--color-maintenance)" radius={[4, 4, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="var(--color-total)"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Cost Breakdown and KPIs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown */}
        <div className="lg:col-span-2">
          <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-blue-50/30">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                Répartition par Catégorie
              </CardTitle>
              <CardDescription className="text-slate-600 mt-1">
                Distribution des coûts par type de dépense
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm font-medium text-slate-700">{item.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-800">{item.amount.toLocaleString()}€</span>
                        <span className="text-xs text-slate-600 ml-2">({item.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* KPIs */}
        <Card className="shadow-soft border-0 bg-gradient-to-br from-white to-purple-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-600" />
              Indicateurs Clés
            </CardTitle>
            <CardDescription className="text-slate-600 mt-1">Métriques financières importantes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{avgCostPerDevice.toFixed(0)}€</div>
                <div className="text-sm text-slate-600">Coût par appareil</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">{monthlyAvg.toFixed(0)}€</div>
                <div className="text-sm text-slate-600">Moyenne mensuelle</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">12.6%</div>
                <div className="text-sm text-slate-600">Part maintenance</div>
              </div>

              <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                <div className="flex items-center justify-center gap-2">
                  <TrendingDown className="w-4 h-4 text-purple-600" />
                  <span className="text-lg font-bold text-purple-600">-8.3%</span>
                </div>
                <div className="text-sm text-slate-600">vs année dernière</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
