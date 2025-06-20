"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AssignmentsByDepartment() {
  const departments = [
    { name: "IT", count: 25, color: "bg-blue-500", percentage: 35 },
    { name: "Ventes", count: 18, color: "bg-emerald-500", percentage: 25 },
    { name: "Marketing", count: 15, color: "bg-orange-500", percentage: 21 },
    { name: "RH", count: 9, color: "bg-purple-500", percentage: 13 },
    { name: "Finance", count: 4, color: "bg-pink-500", percentage: 6 },
  ]

  const totalAssignments = departments.reduce((sum, dept) => sum + dept.count, 0)

  return (
    <Card className="bg-white border-0 shadow-strong">
      <CardHeader className="pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-slate-900 text-lg font-bold">Attributions par Département</CardTitle>
          <Select defaultValue="thismonth">
            <SelectTrigger className="w-40 bg-slate-50 border-slate-200 text-slate-700 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thismonth">Ce mois</SelectItem>
              <SelectItem value="lastmonth">Mois dernier</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {departments.map((dept, index) => (
            <div
              key={dept.name}
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-50 transition-all duration-200 group"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "slideInRight 0.6s ease-out forwards",
              }}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 ${dept.color} rounded-full shadow-sm`}></div>
                <span className="text-slate-800 font-semibold text-base">{dept.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-32 bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`h-2.5 ${dept.color} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
                <div className="text-right min-w-[60px]">
                  <span className="text-slate-800 text-lg font-bold">{dept.count}</span>
                  <p className="text-slate-600 text-xs font-medium">{dept.percentage}%</p>
                </div>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-700 font-semibold">Total des Attributions</span>
              <span className="text-2xl font-bold text-slate-900">{totalAssignments}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
