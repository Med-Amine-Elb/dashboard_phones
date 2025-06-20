import DashboardLayout from "@/components/layout/dashboard-layout"
import ReportsManagement from "@/components/reports/reports-management"
import CostAnalysisChart from "@/components/charts/cost-analysis-chart"
import AssignmentTrendsChart from "@/components/charts/assignment-trends-chart"

export default function ReportsPage() {
  return (
    <DashboardLayout userRole="admin">
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Rapports et Analyses</h1>
            <p className="text-slate-600">Analysez les coûts, tendances et performances de votre parc téléphonique</p>
          </div>
        </div>

        {/* Enhanced Analytics Charts */}
        <CostAnalysisChart />
        <AssignmentTrendsChart />

        {/* Reports Management */}
        <ReportsManagement />
      </div>
    </DashboardLayout>
  )
}
