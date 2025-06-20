"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function ModernStatsCards() {
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
      change: "+22.45%",
      trend: "up",
      color: "from-blue-500 to-cyan-400",
      bgColor: "from-blue-50 to-cyan-50",
    },
    {
      title: "Inventaire Téléphones",
      value: stats.totalPhones,
      change: "+22.45%",
      trend: "up",
      color: "from-emerald-500 to-teal-400",
      bgColor: "from-emerald-50 to-teal-50",
    },
    {
      title: "Attributions Actives",
      value: stats.activeAssignments,
      change: "+222.45%",
      trend: "up",
      color: "from-orange-500 to-amber-400",
      bgColor: "from-orange-50 to-amber-50",
    },
    {
      title: "Téléphones Disponibles",
      value: stats.availablePhones,
      change: "+22.45%",
      trend: "up",
      color: "from-purple-500 to-indigo-400",
      bgColor: "from-purple-50 to-indigo-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          className="relative overflow-hidden bg-white border-0 shadow-sm hover:shadow-md transition-all duration-300"
          style={{
            animationDelay: `${index * 100}ms`,
            animation: isLoading ? "none" : "fadeInUp 0.6s ease-out forwards",
          }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} opacity-50`} />
          <CardContent className="relative p-6">
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-600">{card.title}</span>
                <span className="text-sm font-semibold text-emerald-600">{card.change}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-slate-900">
                  {isLoading ? (
                    <div className="animate-pulse bg-slate-200 rounded w-16 h-8"></div>
                  ) : (
                    <CountUp end={card.value} />
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

function CountUp({ end }: { end: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 50
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

  return <span>{count.toLocaleString()}</span>
}
