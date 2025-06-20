"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ModernKPIPanel() {
  const kpis = [
    { label: "Ratio actuel", value: "16.2" },
    { label: "Ratio rapide", value: "1.52" },
    { label: "Ratio de rotation des comptes débiteurs", value: "-4.05" },
    { label: "Ratio dette/capitaux propres", value: "1.62" },
  ]

  return (
    <Card className="bg-gradient-to-br from-slate-800 via-slate-900 to-black border-0 shadow-lg text-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">KPIs</CardTitle>
          <div className="text-xs text-slate-400">Mis à jour il y a 1h</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {kpis.map((kpi, index) => (
          <div
            key={kpi.label}
            className="flex items-center justify-between py-2"
            style={{
              animationDelay: `${index * 100}ms`,
              animation: "fadeInUp 0.6s ease-out forwards",
            }}
          >
            <span className="text-sm text-slate-300">{kpi.label}</span>
            <span className="text-lg font-semibold text-white">{kpi.value}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
