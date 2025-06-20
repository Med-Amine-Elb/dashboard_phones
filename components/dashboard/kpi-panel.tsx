"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function KPIPanel() {
  const kpis = [
    {
      label: "Taux d'utilisation",
      value: "87.2%",
      trend: "+2.4%",
      color: "text-emerald-400",
    },
    {
      label: "Temps moyen d'attribution",
      value: "2.3j",
      trend: "-0.5j",
      color: "text-blue-400",
    },
    {
      label: "Satisfaction utilisateur",
      value: "94%",
      trend: "+1.2%",
      color: "text-purple-400",
    },
    {
      label: "Coût par attribution",
      value: "€45",
      trend: "-€3",
      color: "text-orange-400",
    },
  ]

  return (
    <Card className="bg-gradient-to-br from-slate-800 via-slate-900 to-black border-0 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-cyan-600/10" />
      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white text-lg font-bold">Indicateurs Clés</CardTitle>
            <p className="text-slate-400 text-sm mt-1">Mis à jour il y a 1h</p>
          </div>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-6">
        {kpis.map((kpi, index) => (
          <div
            key={kpi.label}
            className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group"
            style={{
              animationDelay: `${index * 150}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <div className="flex-1">
              <p className="text-slate-300 text-sm font-medium">{kpi.label}</p>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-white text-xl font-bold">{kpi.value}</span>
                <span className={`text-sm font-medium ${kpi.color}`}>{kpi.trend}</span>
              </div>
            </div>
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${kpi.color.replace("text-", "from-")} to-transparent opacity-20 group-hover:opacity-30 transition-opacity flex items-center justify-center`}
            >
              <div className={`w-2 h-2 ${kpi.color.replace("text-", "bg-")} rounded-full`}></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
