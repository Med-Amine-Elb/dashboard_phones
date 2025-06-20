import DashboardLayout from "@/components/layout/dashboard-layout"
import UserManagement from "@/components/users/user-management"
import DepartmentUsageChart from "@/components/charts/department-usage-chart"

export default function UsersPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestion des Utilisateurs</h1>
            <p className="text-slate-600">Gérez les utilisateurs et analysez l'utilisation par département</p>
          </div>
        </div>

        {/* Enhanced Department Usage Chart */}
        <DepartmentUsageChart />

        {/* User Management */}
        <UserManagement />
      </div>
    </DashboardLayout>
  )
}
