"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HealthRatingGauge() {
  const healthScore = 78
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (healthScore / 100) * circumference

  const getHealthColor = (score: number) => {
    if (score >= 80) return "from-emerald-500 to-green-400"
    if (score >= 60) return "from-yellow-500 to-orange-400"
    return "from-red-500 to-pink-400"
  }

  const getHealthLabel = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Bon"
    return "À améliorer"
  }

  return (
    <Card className="bg-white border-0 shadow-xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50 opacity-30" />
      <CardHeader className="relative pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 text-lg font-bold">État de Santé</CardTitle>
            <p className="text-slate-500 text-sm mt-1">Système global</p>
          </div>
          <div className="text-xs text-slate-400">Mis à jour il y a 1h</div>
        </div>
      </CardHeader>
      <CardContent className="relative flex flex-col items-center">
        <div className="relative w-40 h-40 mb-4">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" strokeLinecap="round" />

            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={`url(#healthGradient)`}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-2000 ease-out"
              style={{
                animation: "drawCircle 2s ease-out forwards",
              }}
            />

            <defs>
              <linearGradient id="healthGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-slate-800">{healthScore}%</span>
            <span className="text-sm text-slate-500 mt-1">{getHealthLabel(healthScore)}</span>
          </div>
        </div>

        {/* Health indicators */}
        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Disponibilité système</span>
            <span className="text-emerald-600 font-medium">99.2%</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Performance</span>
            <span className="text-blue-600 font-medium">Rapide</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Erreurs</span>
            <span className="text-orange-600 font-medium">0.1%</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
