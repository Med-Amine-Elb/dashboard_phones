import DashboardLayout from "@/components/layout/dashboard-layout"
import AssignmentManagement from "@/components/assignments/assignment-management"
import AssignmentTrendsChart from "@/components/charts/assignment-trends-chart"

export default function AssignmentsPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Gestion des Attributions</h1>
            <p className="text-slate-600">Suivez et gérez les attributions de téléphones aux employés</p>
          </div>
        </div>

        {/* Enhanced Assignment Trends Chart */}
        <AssignmentTrendsChart />

        {/* Assignment Management */}
        <AssignmentManagement />
      </div>
    </DashboardLayout>
  )
}
