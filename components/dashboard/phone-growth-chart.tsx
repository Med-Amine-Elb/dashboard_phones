"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PhoneGrowthChart() {
  const data = [
    { month: "Jan", assignments: 45, returns: 12, newPhones: 8 },
    { month: "Fév", assignments: 52, returns: 18, newPhones: 12 },
    { month: "Mar", assignments: 48, returns: 15, newPhones: 6 },
    { month: "Avr", assignments: 61, returns: 22, newPhones: 15 },
    { month: "Mai", assignments: 55, returns: 19, newPhones: 9 },
    { month: "Jun", assignments: 67, returns: 25, newPhones: 18 },
  ]

  const maxValue = Math.max(...data.flatMap((d) => [d.assignments, d.returns, d.newPhones]))

  return (
    <Card className="bg-white border-0 shadow-strong">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-900 text-xl font-bold">Activité des Téléphones</CardTitle>
          <Select defaultValue="6months">
            <SelectTrigger className="w-48 bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 derniers mois</SelectItem>
              <SelectItem value="year">Dernière année</SelectItem>
              <SelectItem value="quarter">Dernier trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {/* Legend */}
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
              <span className="text-slate-700 text-sm font-medium">Attributions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-sm"></div>
              <span className="text-slate-700 text-sm font-medium">Retours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-sm"></div>
              <span className="text-slate-700 text-sm font-medium">Nouveaux</span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80 flex items-end justify-between space-x-6 px-4">
            {data.map((item, index) => (
              <div key={item.month} className="flex-1 flex flex-col items-center space-y-3">
                <div className="w-full flex justify-center space-x-2">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-1000 ease-out shadow-medium hover:shadow-strong"
                    style={{
                      width: "24px",
                      height: `${(item.assignments / maxValue) * 240}px`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  ></div>
                  <div
                    className="bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-1000 ease-out shadow-medium hover:shadow-strong"
                    style={{
                      width: "24px",
                      height: `${(item.returns / maxValue) * 240}px`,
                      animationDelay: `${index * 100 + 50}ms`,
                    }}
                  ></div>
                  <div
                    className="bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all duration-1000 ease-out shadow-medium hover:shadow-strong"
                    style={{
                      width: "24px",
                      height: `${(item.newPhones / maxValue) * 240}px`,
                      animationDelay: `${index * 100 + 100}ms`,
                    }}
                  ></div>
                </div>
                <span className="text-slate-600 text-sm font-semibold">{item.month}</span>
              </div>
            ))}
          </div>

          {/* Values display */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {data.reduce((sum, item) => sum + item.assignments, 0)}
              </p>
              <p className="text-sm text-slate-600 font-medium">Total Attributions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{data.reduce((sum, item) => sum + item.returns, 0)}</p>
              <p className="text-sm text-slate-600 font-medium">Total Retours</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-600">
                {data.reduce((sum, item) => sum + item.newPhones, 0)}
              </p>
              <p className="text-sm text-slate-600 font-medium">Nouveaux Appareils</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
