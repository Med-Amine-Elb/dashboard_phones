"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AssignmentChart() {
  // Mock data for the chart
  const data = [
    { month: "Jan", assignments: 45, returns: 12 },
    { month: "Feb", assignments: 52, returns: 18 },
    { month: "Mar", assignments: 48, returns: 15 },
    { month: "Apr", assignments: 61, returns: 22 },
    { month: "May", assignments: 55, returns: 19 },
    { month: "Jun", assignments: 67, returns: 25 },
  ]

  const maxValue = Math.max(...data.flatMap((d) => [d.assignments, d.returns]))

  return (
    <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700/50">
      <CardHeader>
        <CardTitle className="text-white">Assignment Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Assignments</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span className="text-slate-300 text-sm">Returns</span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between space-x-2">
            {data.map((item, index) => (
              <div key={item.month} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col space-y-1">
                  <div
                    className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-1000 ease-out"
                    style={{
                      height: `${(item.assignments / maxValue) * 200}px`,
                      animationDelay: `${index * 100}ms`,
                    }}
                  ></div>
                  <div
                    className="bg-gradient-to-t from-purple-500 to-purple-400 rounded-t transition-all duration-1000 ease-out"
                    style={{
                      height: `${(item.returns / maxValue) * 200}px`,
                      animationDelay: `${index * 100 + 50}ms`,
                    }}
                  ></div>
                </div>
                <span className="text-slate-400 text-xs">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
