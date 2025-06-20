"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Bell,
  Shield,
  Database,
  Building,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SettingsManagement() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Mon Entreprise",
    companyEmail: "admin@monentreprise.fr",
    timezone: "Europe/Paris",
    language: "fr",
    currency: "EUR",
    dateFormat: "DD/MM/YYYY",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    assignmentAlerts: true,
    maintenanceReminders: true,
    overdueAlerts: true,
    weeklyReports: false,
    monthlyReports: true,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    passwordExpiry: "90",
    loginAttempts: "5",
    auditLogging: true,
  })

  const [systemSettings, setSystemSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    dataRetention: "365",
    maintenanceMode: false,
    debugMode: false,
  })

  const handleSaveSettings = async (section: string) => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Paramètres sauvegardés",
        description: `Les paramètres ${section} ont été mis à jour avec succès.`,
      })
    } catch (error) {
      toast({
        title: "Erreur de sauvegarde",
        description: "Impossible de sauvegarder les paramètres. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleResetSettings = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Paramètres réinitialisés",
        description: "Tous les paramètres ont été restaurés aux valeurs par défaut.",
      })
    } catch (error) {
      toast({
        title: "Erreur de réinitialisation",
        description: "Impossible de réinitialiser les paramètres.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const systemStats = [
    { label: "Utilisateurs Actifs", value: "156", change: "+12%", color: "from-blue-500 to-cyan-500" },
    { label: "Appareils Gérés", value: "89", change: "+8%", color: "from-emerald-500 to-teal-500" },
    { label: "Attributions ce Mois", value: "23", change: "+15%", color: "from-orange-500 to-amber-500" },
    { label: "Taux de Disponibilité", value: "99.8%", change: "+0.2%", color: "from-purple-500 to-indigo-500" },
  ]

  const recentActivities = [
    { action: "Sauvegarde automatique", time: "Il y a 2 heures", status: "success" },
    { action: "Mise à jour système", time: "Il y a 1 jour", status: "success" },
    { action: "Nettoyage des logs", time: "Il y a 2 jours", status: "success" },
    { action: "Tentative de connexion échouée", time: "Il y a 3 jours", status: "warning" },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Paramètres Système</h1>
          <p className="text-slate-600">Configurez et gérez les paramètres de votre système de gestion</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl"
            onClick={handleResetSettings}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Réinitialisation...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Réinitialiser
              </>
            )}
          </Button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <Card
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color.replace("from-", "from-").replace("to-", "to-")} bg-opacity-5 border-0 shadow-lg overflow-hidden`}
          >
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-700 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <Badge className="bg-white/20 text-slate-800 border-white/30 text-xs mt-2">{stat.change}</Badge>
                </div>
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}
                >
                  <Settings className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Settings */}
        <div className="lg:col-span-2">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 text-xl">Configuration Système</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-slate-100 rounded-xl">
                  <TabsTrigger value="general" className="rounded-lg">
                    <Building className="w-4 h-4 mr-2" />
                    Général
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="rounded-lg">
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger value="security" className="rounded-lg">
                    <Shield className="w-4 h-4 mr-2" />
                    Sécurité
                  </TabsTrigger>
                  <TabsTrigger value="system" className="rounded-lg">
                    <Database className="w-4 h-4 mr-2" />
                    Système
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-slate-700 font-medium">
                        Nom de l'Entreprise
                      </Label>
                      <Input
                        id="companyName"
                        value={generalSettings.companyName}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, companyName: e.target.value })}
                        className="bg-slate-50 border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail" className="text-slate-700 font-medium">
                        Email de l'Entreprise
                      </Label>
                      <Input
                        id="companyEmail"
                        type="email"
                        value={generalSettings.companyEmail}
                        onChange={(e) => setGeneralSettings({ ...generalSettings, companyEmail: e.target.value })}
                        className="bg-slate-50 border-slate-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-slate-700 font-medium">
                        Fuseau Horaire
                      </Label>
                      <Select
                        value={generalSettings.timezone}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, timezone: value })}
                      >
                        <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Europe/Paris">Europe/Paris (GMT+1)</SelectItem>
                          <SelectItem value="Europe/London">Europe/London (GMT+0)</SelectItem>
                          <SelectItem value="America/New_York">America/New_York (GMT-5)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-slate-700 font-medium">
                        Langue
                      </Label>
                      <Select
                        value={generalSettings.language}
                        onValueChange={(value) => setGeneralSettings({ ...generalSettings, language: value })}
                      >
                        <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSaveSettings("généraux")}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sauvegarde...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <Label className="text-slate-800 font-medium">Notifications par Email</Label>
                        <p className="text-sm text-slate-600">Recevoir des notifications par email</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, emailNotifications: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <Label className="text-slate-800 font-medium">Alertes d'Attribution</Label>
                        <p className="text-sm text-slate-600">Notifications lors des nouvelles attributions</p>
                      </div>
                      <Switch
                        checked={notificationSettings.assignmentAlerts}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, assignmentAlerts: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <Label className="text-slate-800 font-medium">Rappels de Maintenance</Label>
                        <p className="text-sm text-slate-600">Alertes pour la maintenance des appareils</p>
                      </div>
                      <Switch
                        checked={notificationSettings.maintenanceReminders}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, maintenanceReminders: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <Label className="text-slate-800 font-medium">Rapports Mensuels</Label>
                        <p className="text-sm text-slate-600">Rapports automatiques mensuels</p>
                      </div>
                      <Switch
                        checked={notificationSettings.monthlyReports}
                        onCheckedChange={(checked) =>
                          setNotificationSettings({ ...notificationSettings, monthlyReports: checked })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSaveSettings("de notifications")}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sauvegarde...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="security" className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <Label className="text-slate-800 font-medium">Authentification à Deux Facteurs</Label>
                        <p className="text-sm text-slate-600">Sécurité renforcée pour les connexions</p>
                      </div>
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-medium">Timeout de Session (minutes)</Label>
                        <Select
                          value={securitySettings.sessionTimeout}
                          onValueChange={(value) => setSecuritySettings({ ...securitySettings, sessionTimeout: value })}
                        >
                          <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="60">1 heure</SelectItem>
                            <SelectItem value="120">2 heures</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-medium">Tentatives de Connexion Max</Label>
                        <Select
                          value={securitySettings.loginAttempts}
                          onValueChange={(value) => setSecuritySettings({ ...securitySettings, loginAttempts: value })}
                        >
                          <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3">3 tentatives</SelectItem>
                            <SelectItem value="5">5 tentatives</SelectItem>
                            <SelectItem value="10">10 tentatives</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSaveSettings("de sécurité")}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sauvegarde...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </>
                    )}
                  </Button>
                </TabsContent>

                <TabsContent value="system" className="space-y-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <Label className="text-slate-800 font-medium">Sauvegarde Automatique</Label>
                        <p className="text-sm text-slate-600">Sauvegarde automatique des données</p>
                      </div>
                      <Switch
                        checked={systemSettings.autoBackup}
                        onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoBackup: checked })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-700 font-medium">Fréquence de Sauvegarde</Label>
                      <Select
                        value={systemSettings.backupFrequency}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, backupFrequency: value })}
                      >
                        <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Toutes les heures</SelectItem>
                          <SelectItem value="daily">Quotidienne</SelectItem>
                          <SelectItem value="weekly">Hebdomadaire</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div>
                        <Label className="text-orange-800 font-medium">Mode Maintenance</Label>
                        <p className="text-sm text-orange-600">Désactive l'accès utilisateur temporairement</p>
                      </div>
                      <Switch
                        checked={systemSettings.maintenanceMode}
                        onCheckedChange={(checked) =>
                          setSystemSettings({ ...systemSettings, maintenanceMode: checked })
                        }
                      />
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSaveSettings("système")}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sauvegarde...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* System Activity */}
        <div className="space-y-6">
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 text-lg">Activité Système</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.status === "success"
                          ? "bg-emerald-100 text-emerald-600"
                          : activity.status === "warning"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {activity.status === "success" ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : activity.status === "warning" ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Health Chart */}
          <Card className="bg-white border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-slate-800 text-lg">Santé du Système</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">CPU</span>
                    <span className="text-slate-800 font-medium">23%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-[23%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Mémoire</span>
                    <span className="text-slate-800 font-medium">67%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full w-[67%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Stockage</span>
                    <span className="text-slate-800 font-medium">45%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full w-[45%]"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Réseau</span>
                    <span className="text-slate-800 font-medium">12%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full w-[12%]"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
