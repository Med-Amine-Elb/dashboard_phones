"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Smartphone,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  X,
  Phone,
  PieChart,
  Bell,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  userRole: "admin" | "assigner"
}

export default function Sidebar({ isOpen, onClose, userRole }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const adminNavItems = [
    {
      name: "Tableau de Bord",
      href: "/admin/dashboard",
      icon: PieChart,
      badge: null,
      description: "Vue d'ensemble des statistiques",
    },
    {
      name: "Utilisateurs",
      href: "/admin/users",
      icon: Users,
      badge: "156",
      description: "Gestion des comptes utilisateurs",
    },
    {
      name: "Téléphones",
      href: "/admin/phones",
      icon: Smartphone,
      badge: "89",
      description: "Inventaire des appareils",
    },
    {
      name: "Attributions",
      href: "/admin/assignments",
      icon: UserCheck,
      badge: "67",
      description: "Gestion des attributions",
    },
    {
      name: "Rapports",
      href: "/admin/reports",
      icon: BarChart3,
      badge: null,
      description: "Analyses et rapports",
    },
    {
      name: "Paramètres",
      href: "/admin/settings",
      icon: Settings,
      badge: null,
      description: "Configuration du système",
    },
  ]

  const assignerNavItems = [
    {
      name: "Tableau de Bord",
      href: "/assigner/dashboard",
      icon: PieChart,
      badge: null,
      description: "Vue d'ensemble",
    },
    {
      name: "Attributions",
      href: "/assigner/assignments",
      icon: UserCheck,
      badge: "23",
      description: "Mes attributions",
    },
    {
      name: "Téléphones",
      href: "/assigner/phones",
      icon: Phone,
      badge: "45",
      description: "Appareils disponibles",
    },
    {
      name: "Rapports",
      href: "/assigner/reports",
      icon: BarChart3,
      badge: null,
      description: "Mes rapports",
    },
  ]

  const navItems = userRole === "admin" ? adminNavItems : assignerNavItems

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-xl border-r border-slate-200/60 transform transition-all duration-300 ease-in-out lg:translate-x-0 shadow-strong",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200/60 bg-gradient-to-r from-blue-50/50 to-indigo-50/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl flex items-center justify-center shadow-medium">
              <Smartphone className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                TéléphoneManager
              </h1>
              <p className="text-sm text-slate-600 font-medium">Système de Gestion</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="lg:hidden text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between p-4 rounded-2xl transition-all duration-200 relative overflow-hidden",
                  isActive
                    ? "bg-gradient-to-r from-blue-50 via-blue-100 to-indigo-50 text-blue-700 shadow-soft border border-blue-200/50"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-50/80 hover:shadow-soft",
                )}
                onClick={onClose}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInLeft 0.6s ease-out forwards",
                }}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-blue-600/5 to-indigo-500/5 rounded-2xl" />
                )}

                <div className="flex items-center space-x-4 relative z-10">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-medium"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200 group-hover:text-slate-700",
                    )}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-base">{item.name}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 relative z-10">
                  {item.badge && (
                    <Badge
                      className={cn(
                        "text-xs font-semibold rounded-lg px-2 py-1",
                        isActive
                          ? "bg-blue-600 text-white border-blue-700"
                          : "bg-slate-200 text-slate-700 border-slate-300 group-hover:bg-slate-300",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isActive ? "text-blue-600 rotate-90" : "text-slate-400 group-hover:text-slate-600",
                    )}
                  />
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-slate-200/60 bg-gradient-to-r from-slate-50/50 to-blue-50/50">
          <div className="flex items-center space-x-3 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 shadow-soft mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-medium">
              <span className="text-white font-bold text-lg">AD</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">Administrateur</p>
              <p className="text-sm text-slate-600">admin@entreprise.fr</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-slate-700 hover:text-slate-900 hover:bg-white/80 rounded-xl"
            >
              <Bell className="w-4 h-4 mr-3" />
              Notifications
              <Badge className="ml-auto bg-red-100 text-red-700 border-red-300 rounded-lg text-xs">3</Badge>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-slate-700 hover:text-red-600 hover:bg-red-50/80 rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Se Déconnecter
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
