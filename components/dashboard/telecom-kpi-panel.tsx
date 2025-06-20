"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TelecomKPIPanel() {
  const kpis = [
    { label: "Ratio actuel", value: "16.2", trend: "up" },
    { label: "Ratio rapide", value: "1.52", trend: "up" },
    { label: "Ratio de rotation des comptes débiteurs", value: "-4.05", trend: "down" },
    { label: "Ratio dette/capitaux propres", value: "1.62", trend: "up" },
  ]

  return (
    <Card className="bg-gradient-to-br from-slate-800 via-slate-900 to-black border-0 shadow-strong text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-white">KPIs</CardTitle>
          <div className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded-lg">Mis à jour il y a 1h</div>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-4">
        {kpis.map((kpi, index) => (
          <div
            key={kpi.label}
            className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-white/5 transition-all duration-200"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <span className="text-sm text-slate-300 font-medium">{kpi.label}</span>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-white">{kpi.value}</span>
              <div className={`w-2 h-2 rounded-full ${kpi.trend === "up" ? "bg-emerald-400" : "bg-red-400"}`}></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
