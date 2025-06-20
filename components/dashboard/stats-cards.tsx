"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Smartphone, UserCheck, PhoneCall, TrendingUp, TrendingDown } from "lucide-react"

export default function StatsCards() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPhones: 0,
    activeAssignments: 0,
    availablePhones: 0,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalUsers: 156,
        totalPhones: 89,
        activeAssignments: 67,
        availablePhones: 22,
      })
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const cards = [
    {
      title: "Total Utilisateurs",
      value: stats.totalUsers,
      icon: Users,
      gradient: "from-blue-600 via-blue-700 to-indigo-700",
      bgGradient: "from-blue-50 via-blue-100 to-indigo-50",
      change: "+12%",
      trend: "up",
      description: "Mois dernier",
    },
    {
      title: "Total Téléphones",
      value: stats.totalPhones,
      icon: Smartphone,
      gradient: "from-emerald-600 via-emerald-700 to-teal-700",
      bgGradient: "from-emerald-50 via-emerald-100 to-teal-50",
      change: "+5%",
      trend: "up",
      description: "Inventaire actuel",
    },
    {
      title: "Attributions Actives",
      value: stats.activeAssignments,
      icon: UserCheck,
      gradient: "from-orange-600 via-orange-700 to-amber-700",
      bgGradient: "from-orange-50 via-orange-100 to-amber-50",
      change: "+8%",
      trend: "up",
      description: "En cours",
    },
    {
      title: "Téléphones Disponibles",
      value: stats.availablePhones,
      icon: PhoneCall,
      gradient: "from-purple-600 via-purple-700 to-indigo-700",
      bgGradient: "from-purple-50 via-purple-100 to-indigo-50",
      change: "-3%",
      trend: "down",
      description: "Prêts à attribuer",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        const TrendIcon = card.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card
            key={card.title}
            className="relative overflow-hidden bg-white border-0 shadow-strong hover:shadow-xl transition-all duration-500 transform hover:scale-105 group"
            style={{
              animationDelay: `${index * 150}ms`,
              animation: isLoading ? "none" : "fadeInUp 0.8s ease-out forwards",
            }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-60 group-hover:opacity-80 transition-opacity duration-300`}
            />
            <CardContent className="relative p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <p className="text-slate-700 text-sm font-semibold mb-1">{card.title}</p>
                  <p className="text-slate-600 text-xs font-medium">{card.description}</p>
                </div>
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-strong group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-baseline space-x-2">
                  <p className="text-3xl font-bold text-slate-900">
                    {isLoading ? (
                      <span className="animate-pulse bg-slate-200 rounded w-16 h-8 inline-block"></span>
                    ) : (
                      <CountUp end={card.value} />
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendIcon className={`w-4 h-4 ${card.trend === "up" ? "text-emerald-600" : "text-red-600"}`} />
                    <span className={`text-sm font-bold ${card.trend === "up" ? "text-emerald-700" : "text-red-700"}`}>
                      {card.change}
                    </span>
                  </div>
                  <div className={`w-20 h-1.5 rounded-full bg-gradient-to-r ${card.gradient} opacity-70`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [end])

  return <span>{count}</span>
}
