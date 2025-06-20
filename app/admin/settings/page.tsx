import DashboardLayout from "@/components/layout/dashboard-layout"
import SettingsManagement from "@/components/settings/settings-management"

export default function SettingsPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Paramètres Système</h1>
            <p className="text-slate-600">Configurez votre système de gestion des téléphones</p>
          </div>
        </div>

        {/* Settings Management */}
        <SettingsManagement />
      </div>
    </DashboardLayout>
  )
}
