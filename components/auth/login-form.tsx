"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Smartphone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (formData.username && formData.password) {
      const userRole = formData.username.includes("admin") ? "admin" : "assigner"

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: formData.username,
          role: userRole,
          token: "mock-jwt-token",
        }),
      )

      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${formData.username}!`,
      })

      router.push(userRole === "admin" ? "/admin/dashboard" : "/assigner/dashboard")
    } else {
      toast({
        title: "Échec de la connexion",
        description: "Veuillez vérifier vos identifiants et réessayer.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 opacity-50" />
      <CardHeader className="text-center pb-4 relative">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center mb-4 shadow-xl">
          <Smartphone className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-3xl bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent font-bold">
          Connexion
        </CardTitle>
        <p className="text-slate-600 mt-2">Accédez à votre espace de gestion</p>
      </CardHeader>
      <CardContent className="relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-700 font-medium">
              Nom d'utilisateur
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Entrez votre nom d'utilisateur"
              value={formData.username}
              onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
              className="bg-white/80 backdrop-blur-sm border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-700 font-medium">
              Mot de passe
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Entrez votre mot de passe"
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className="bg-white/80 backdrop-blur-sm border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 transition-all rounded-xl"
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
              className="border-slate-300 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
            />
            <Label htmlFor="remember" className="text-slate-600 text-sm">
              Se souvenir de moi
            </Label>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-600 hover:from-blue-600 hover:via-blue-700 hover:to-cyan-700 text-white font-medium py-3 transition-all duration-200 transform hover:scale-[1.02] shadow-xl rounded-xl"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connexion en cours...
              </>
            ) : (
              "Se Connecter"
            )}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            Démo : Utilisez "admin" ou "user" comme nom d'utilisateur avec n'importe quel mot de passe
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
