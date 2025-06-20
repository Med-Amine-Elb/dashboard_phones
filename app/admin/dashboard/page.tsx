import DashboardLayout from "@/components/layout/dashboard-layout"
import TelecomStatsCards from "@/components/dashboard/telecom-stats-cards"
import PhoneInventoryChart from "@/components/charts/phone-inventory-chart"
import AssignmentTrendsChart from "@/components/charts/assignment-trends-chart"
import DepartmentUsageChart from "@/components/charts/department-usage-chart"
import DeviceLifecycleChart from "@/components/charts/device-lifecycle-chart"
import CostAnalysisChart from "@/components/charts/cost-analysis-chart"

export default function AdminDashboard() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Tableau de Bord Télécom</h1>
            <p className="text-slate-600">Vue d'ensemble complète de votre gestion des téléphones d'entreprise</p>
          </div>
          <div className="flex items-center space-x-3">
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-soft text-sm">
              <option>30 derniers jours</option>
              <option>7 derniers jours</option>
              <option>3 derniers mois</option>
              <option>Cette année</option>
            </select>
          </div>
        </div>

        {/* Statistics Cards */}
        <TelecomStatsCards />

        {/* Phone Inventory */}
        <PhoneInventoryChart />

        {/* Assignment Trends */}
        <AssignmentTrendsChart />

        {/* Department Usage */}
        <DepartmentUsageChart />

        {/* Device Lifecycle */}
        <DeviceLifecycleChart />

        {/* Cost Analysis */}
        <CostAnalysisChart />
      </div>
    </DashboardLayout>
  )
}
