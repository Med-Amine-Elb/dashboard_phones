import DashboardLayout from "@/components/layout/dashboard-layout"
import StatsCards from "@/components/dashboard/stats-cards"
import QuickAssignment from "@/components/dashboard/quick-assignment"
import RecentAssignments from "@/components/dashboard/recent-assignments"
import AssignmentsByDepartment from "@/components/dashboard/assignments-by-department"

export default function AssignerDashboard() {
  return (
    <DashboardLayout userRole="assigner">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Assignment Dashboard</h1>
            <p className="text-slate-600">Manage phone assignments efficiently and track device availability</p>
          </div>
          <div className="flex items-center space-x-2">
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
              <option>Last 30 Days</option>
              <option>Last Quarter</option>
              <option>Last Year</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <StatsCards simplified />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <QuickAssignment />
            <AssignmentsByDepartment />
          </div>
          <div className="space-y-6">
            <RecentAssignments />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
