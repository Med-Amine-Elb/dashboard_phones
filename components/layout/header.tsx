"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Bell, Menu, Search, Settings, User, LogOut, Moon, Sun } from "lucide-react"
import { useState } from "react"

interface HeaderProps {
  onMenuClick: () => void
  user: any
}

export default function Header({ onMenuClick, user }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement global search functionality
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Global Search */}
          <form onSubmit={handleSearch} className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher téléphones, utilisateurs, attributions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 w-96 bg-slate-50/80 border-slate-200 rounded-xl focus:bg-white focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200"
              />
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="relative text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl"
              >
                <Bell className="w-4 h-4" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white border-slate-200 shadow-xl rounded-xl">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
                <p className="text-sm text-slate-600">Vous avez 3 nouvelles notifications</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                <DropdownMenuItem className="p-4 hover:bg-slate-50">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Nouveau téléphone ajouté</p>
                      <p className="text-xs text-slate-600">iPhone 15 Pro ajouté à l'inventaire</p>
                      <p className="text-xs text-slate-400 mt-1">Il y a 5 minutes</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 hover:bg-slate-50">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Attribution terminée</p>
                      <p className="text-xs text-slate-600">Samsung Galaxy S23 attribué à Marie Martin</p>
                      <p className="text-xs text-slate-400 mt-1">Il y a 15 minutes</p>
                    </div>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 hover:bg-slate-50">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900">Maintenance requise</p>
                      <p className="text-xs text-slate-600">Google Pixel 8 nécessite une maintenance</p>
                      <p className="text-xs text-slate-400 mt-1">Il y a 1 heure</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-slate-100 rounded-xl p-2">
                <Avatar className="w-8 h-8 border-2 border-white shadow-sm">
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold">
                    {user?.name
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("") || "AD"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-slate-900">{user?.name || "Administrateur"}</p>
                  <p className="text-xs text-slate-600">{user?.role || "admin"}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border-slate-200 shadow-xl rounded-xl">
              <div className="p-3 border-b border-slate-100">
                <p className="font-semibold text-slate-900">{user?.name || "Administrateur"}</p>
                <p className="text-sm text-slate-600">{user?.email || "admin@entreprise.fr"}</p>
              </div>
              <DropdownMenuItem className="p-3 hover:bg-slate-50">
                <User className="w-4 h-4 mr-3" />
                Mon Profil
              </DropdownMenuItem>
              <DropdownMenuItem className="p-3 hover:bg-slate-50">
                <Settings className="w-4 h-4 mr-3" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="p-3 hover:bg-red-50 text-red-600">
                <LogOut className="w-4 h-4 mr-3" />
                Se Déconnecter
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
