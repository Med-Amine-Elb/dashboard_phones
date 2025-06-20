"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UserPlus, Smartphone, UserCheck, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QuickActions() {
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const { toast } = useToast()

  const handleGenerateReport = async () => {
    setIsGeneratingReport(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Report Generated",
        description: "Your monthly summary report has been generated and is ready for download.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGeneratingReport(false)
    }
  }

  const actions = [
    {
      title: "Add User",
      icon: UserPlus,
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      action: () => {
        toast({
          title: "Add User",
          description: "Opening user creation form...",
        })
      },
    },
    {
      title: "Add Phone",
      icon: Smartphone,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "from-emerald-50 to-emerald-100",
      action: () => {
        toast({
          title: "Add Phone",
          description: "Opening phone registration form...",
        })
      },
    },
    {
      title: "New Assignment",
      icon: UserCheck,
      color: "from-orange-500 to-orange-600",
      bgColor: "from-orange-50 to-orange-100",
      action: () => {
        toast({
          title: "New Assignment",
          description: "Opening assignment wizard...",
        })
      },
    },
    {
      title: "Generate Report",
      icon: FileText,
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      action: handleGenerateReport,
      loading: isGeneratingReport,
    },
  ]

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-slate-800 text-lg">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Button
                key={action.title}
                variant="ghost"
                className="h-20 flex-col space-y-2 hover:bg-slate-50 transition-all duration-200 group border border-slate-100 hover:border-slate-200"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                }}
                onClick={action.action}
                disabled={action.loading}
              >
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-r ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm`}
                >
                  <Icon
                    className={`w-5 h-5 bg-gradient-to-r ${action.color} bg-clip-text text-transparent ${action.loading ? "animate-pulse" : ""}`}
                  />
                </div>
                <span className="text-xs font-medium text-slate-700">
                  {action.loading ? "Generating..." : action.title}
                </span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
