"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserCheck, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function QuickAssignment() {
  const [formData, setFormData] = useState({
    userId: "",
    phoneId: "",
    assignmentDate: new Date().toISOString().split("T")[0],
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const users = [
    { id: "1", name: "John Doe", department: "IT" },
    { id: "2", name: "Sarah Wilson", department: "HR" },
    { id: "3", name: "Mike Johnson", department: "Sales" },
    { id: "4", name: "Emily Brown", department: "Marketing" },
    { id: "5", name: "David Lee", department: "Finance" },
  ]

  const availablePhones = [
    { id: "1", model: "iPhone 14 Pro", imei: "123456789012345" },
    { id: "2", model: "Samsung Galaxy S23", imei: "234567890123456" },
    { id: "3", model: "Google Pixel 8", imei: "345678901234567" },
    { id: "4", model: "iPhone 15", imei: "456789012345678" },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.userId || !formData.phoneId) {
      toast({
        title: "Validation Error",
        description: "Please select both a user and a phone.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const selectedUser = users.find((u) => u.id === formData.userId)
      const selectedPhone = availablePhones.find((p) => p.id === formData.phoneId)

      toast({
        title: "Assignment Created Successfully",
        description: `${selectedPhone?.model} has been assigned to ${selectedUser?.name}.`,
      })

      // Reset form
      setFormData({
        userId: "",
        phoneId: "",
        assignmentDate: new Date().toISOString().split("T")[0],
        notes: "",
      })
    } catch (error) {
      toast({
        title: "Assignment Failed",
        description: "There was an error creating the assignment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="text-slate-800 flex items-center space-x-2">
          <UserCheck className="w-5 h-5 text-blue-600" />
          <span>Quick Assignment</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="user" className="text-slate-700 font-medium">
              Select User
            </Label>
            <Select
              value={formData.userId}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, userId: value }))}
            >
              <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-800">
                <SelectValue placeholder="Choose a user" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name} - {user.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-slate-700 font-medium">
              Available Phone
            </Label>
            <Select
              value={formData.phoneId}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, phoneId: value }))}
            >
              <SelectTrigger className="bg-slate-50 border-slate-200 text-slate-800">
                <SelectValue placeholder="Choose a phone" />
              </SelectTrigger>
              <SelectContent>
                {availablePhones.map((phone) => (
                  <SelectItem key={phone.id} value={phone.id}>
                    {phone.model} - {phone.imei.slice(-6)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-slate-700 font-medium">
              Assignment Date
            </Label>
            <Input
              id="date"
              type="date"
              value={formData.assignmentDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, assignmentDate: e.target.value }))}
              className="bg-slate-50 border-slate-200 text-slate-800"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-700 font-medium">
              Notes (Optional)
            </Label>
            <Input
              id="notes"
              placeholder="Add any notes about this assignment..."
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              className="bg-slate-50 border-slate-200 text-slate-800"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Assignment...
              </>
            ) : (
              "Create Assignment"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
