"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PhoneAnalyticsChart() {
  const data = [
    { month: "Jan", attributions: 45, retours: 12, nouveaux: 8 },
    { month: "Fév", attributions: 52, retours: 18, nouveaux: 12 },
    { month: "Mar", attributions: 48, retours: 15, nouveaux: 6 },
    { month: "Avr", attributions: 61, retours: 22, nouveaux: 15 },
    { month: "Mai", attributions: 55, retours: 19, nouveaux: 9 },
    { month: "Jun", attributions: 67, retours: 25, nouveaux: 18 },
  ]

  const maxValue = Math.max(...data.flatMap((d) => [d.attributions, d.retours, d.nouveaux]))

  return (
    <Card className="bg-white border-0 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 opacity-30" />
      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-xl font-bold">Activité des Téléphones</CardTitle>
            <p className="text-slate-500 text-sm mt-1">Analyse des tendances mensuelles</p>
          </div>
          <Select defaultValue="6months">
            <SelectTrigger className="w-40 bg-white/80 backdrop-blur-sm border-slate-200 shadow-sm">
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
      <CardContent className="relative">
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-sm"></div>
              <span className="text-slate-600 text-sm font-medium">Attributions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm"></div>
              <span className="text-slate-600 text-sm font-medium">Retours</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-sm"></div>
              <span className="text-slate-600 text-sm font-medium">Nouveaux</span>
            </div>
          </div>

          <div className="h-80 flex items-end justify-between space-x-4 px-4">
            {data.map((item, index) => (
              <div key={item.month} className="flex-1 flex flex-col items-center space-y-3">
                <div className="w-full flex justify-center space-x-1">
                  <div
                    className="bg-gradient-to-t from-blue-400 via-blue-500 to-cyan-500 rounded-t-lg transition-all duration-1000 ease-out shadow-lg hover:shadow-xl group relative"
                    style={{
                      width: "24px",
                      height: `${(item.attributions / maxValue) * 240}px`,
                      animationDelay: `${index * 150}ms`,
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.attributions}
                    </div>
                  </div>
                  <div
                    className="bg-gradient-to-t from-emerald-400 via-emerald-500 to-teal-500 rounded-t-lg transition-all duration-1000 ease-out shadow-lg hover:shadow-xl group relative"
                    style={{
                      width: "24px",
                      height: `${(item.retours / maxValue) * 240}px`,
                      animationDelay: `${index * 150 + 50}ms`,
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.retours}
                    </div>
                  </div>
                  <div
                    className="bg-gradient-to-t from-orange-400 via-orange-500 to-amber-500 rounded-t-lg transition-all duration-1000 ease-out shadow-lg hover:shadow-xl group relative"
                    style={{
                      width: "24px",
                      height: `${(item.nouveaux / maxValue) * 240}px`,
                      animationDelay: `${index * 150 + 100}ms`,
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.nouveaux}
                    </div>
                  </div>
                </div>
                <span className="text-slate-500 text-sm font-medium">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
