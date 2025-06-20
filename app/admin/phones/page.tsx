import DashboardLayout from "@/components/layout/dashboard-layout"
import PhoneManagement from "@/components/phones/phone-management"
import PhoneInventoryChart from "@/components/charts/phone-inventory-chart"
import DeviceLifecycleChart from "@/components/charts/device-lifecycle-chart"

export default function PhonesPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestion des Téléphones</h1>
            <p className="text-slate-600">Gérez votre inventaire de téléphones et suivez leur cycle de vie</p>
          </div>
        </div>

        {/* Enhanced Phone Charts */}
        <PhoneInventoryChart />
        <DeviceLifecycleChart />

        {/* Phone Management */}
        <PhoneManagement />
      </div>
    </DashboardLayout>
  )
}
