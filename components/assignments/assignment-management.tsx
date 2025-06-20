"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  UserCheck,
  Filter,
  Download,
  Calendar,
  Smartphone,
  ArrowRight,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export default function AssignmentManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    user: "",
    phone: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })

  const assignments = [
    {
      id: 1,
      user: "John Doe",
      userEmail: "john.doe@company.com",
      phone: "iPhone 14 Pro",
      phoneImei: "123456789012345",
      assignedDate: "2024-01-15",
      returnDate: null,
      status: "active",
      department: "IT",
      assignedBy: "Admin User",
      notes: "Primary work device",
    },
    {
      id: 2,
      user: "Sarah Wilson",
      userEmail: "sarah.wilson@company.com",
      phone: "Samsung Galaxy S23",
      phoneImei: "234567890123456",
      assignedDate: "2024-01-10",
      returnDate: "2024-01-20",
      status: "returned",
      department: "HR",
      assignedBy: "Admin User",
      notes: "Temporary assignment",
    },
    {
      id: 3,
      user: "Mike Johnson",
      userEmail: "mike.johnson@company.com",
      phone: "Google Pixel 8",
      phoneImei: "345678901234567",
      assignedDate: "2024-01-12",
      returnDate: null,
      status: "active",
      department: "Sales",
      assignedBy: "HR Manager",
      notes: "Sales team device",
    },
    {
      id: 4,
      user: "Emily Brown",
      userEmail: "emily.brown@company.com",
      phone: "iPhone 15",
      phoneImei: "456789012345678",
      assignedDate: "2024-01-08",
      returnDate: null,
      status: "pending",
      department: "Marketing",
      assignedBy: "Admin User",
      notes: "Awaiting device setup",
    },
  ]

  const users = [
    { id: "1", name: "John Doe" },
    { id: "2", name: "Sarah Wilson" },
    { id: "3", name: "Mike Johnson" },
    { id: "4", name: "Emily Brown" },
  ]
  const phones = [
    { id: "1", model: "iPhone 14 Pro" },
    { id: "2", model: "Samsung Galaxy S23" },
    { id: "3", model: "Google Pixel 8" },
    { id: "4", model: "iPhone 15" },
  ]

  const userInputRef = useRef(null)
  const phoneInputRef = useRef(null)

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "returned":
        return "bg-slate-100 text-slate-700 border-slate-200"
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "overdue":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getAvatarColor = (index: number) => {
    const colors = [
      "from-blue-500 to-blue-600",
      "from-emerald-500 to-emerald-600",
      "from-orange-500 to-orange-600",
      "from-purple-500 to-purple-600",
    ]
    return colors[index % colors.length]
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Active"
      case "returned":
        return "Retournée"
      case "pending":
        return "En attente"
      case "overdue":
        return "En retard"
      default:
        return status
    }
  }

  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Gestion des Attributions</h1>
          <p className="text-slate-600">Suivez et gérez les attributions de téléphones dans votre organisation</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg" onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Attribution
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Nouvelle Attribution</DialogTitle>
              </DialogHeader>
              <form className="space-y-4">
                <div className="relative">
                  <Label htmlFor="user">Utilisateur</Label>
                  <Input
                    id="user"
                    placeholder="Rechercher un utilisateur..."
                    value={formData.user}
                    onChange={e => setFormData(f => ({ ...f, user: e.target.value }))}
                    autoComplete="off"
                    className="bg-slate-50 border-slate-200 text-slate-800"
                    ref={userInputRef}
                  />
                  {formData.user && users.filter(u => u.name.toLowerCase().includes(formData.user.toLowerCase())).length > 0 &&
                    !users.some(u => u.name.toLowerCase() === formData.user.toLowerCase()) && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded shadow-lg max-h-40 overflow-auto">
                      {users.filter(u => u.name.toLowerCase().includes(formData.user.toLowerCase())).map(u => (
                        <div
                          key={u.id}
                          className="px-4 py-2 cursor-pointer hover:bg-slate-100"
                          onClick={() => {
                            setFormData(f => ({ ...f, user: u.name }))
                            userInputRef.current && userInputRef.current.blur()
                          }}
                        >
                          {u.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="relative">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    placeholder="Rechercher un téléphone..."
                    value={formData.phone}
                    onChange={e => setFormData(f => ({ ...f, phone: e.target.value }))}
                    autoComplete="off"
                    className="bg-slate-50 border-slate-200 text-slate-800"
                    ref={phoneInputRef}
                  />
                  {formData.phone && phones.filter(p => p.model.toLowerCase().includes(formData.phone.toLowerCase())).length > 0 &&
                    !phones.some(p => p.model.toLowerCase() === formData.phone.toLowerCase()) && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded shadow-lg max-h-40 overflow-auto">
                      {phones.filter(p => p.model.toLowerCase().includes(formData.phone.toLowerCase())).map(p => (
                        <div
                          key={p.id}
                          className="px-4 py-2 cursor-pointer hover:bg-slate-100"
                          onClick={() => {
                            setFormData(f => ({ ...f, phone: p.model }))
                            phoneInputRef.current && phoneInputRef.current.blur()
                          }}
                        >
                          {p.model}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <Label htmlFor="date">Date d'attribution</Label>
                  <Input id="date" type="date" value={formData.date} onChange={e => setFormData(f => ({ ...f, date: e.target.value }))} className="bg-slate-50 border-slate-200 text-slate-800" />
                </div>
                <div>
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Input id="notes" placeholder="Ajouter une note..." value={formData.notes} onChange={e => setFormData(f => ({ ...f, notes: e.target.value }))} className="bg-slate-50 border-slate-200 text-slate-800" />
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>Annuler</Button>
                  <Button type="button" onClick={() => setIsAddDialogOpen(false)}>Créer</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Attributions Actives</p>
                <p className="text-3xl font-bold text-slate-800">67</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Retours en Attente</p>
                <p className="text-3xl font-bold text-slate-800">12</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Ce Mois-ci</p>
                <p className="text-3xl font-bold text-slate-800">23</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Retours en Retard</p>
                <p className="text-3xl font-bold text-slate-800">3</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-red-50 to-red-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-800 text-xl">Attributions ({filteredAssignments.length})</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des attributions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-200 text-slate-800 w-64 focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>
              <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50/50">
                  <TableHead className="text-slate-700 font-semibold">Utilisateur</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Téléphone</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Date d'attribution</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Statut</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Département</TableHead>
                  <TableHead className="text-slate-700 font-semibold">Attribué par</TableHead>
                  <TableHead className="text-slate-700 font-semibold w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((assignment, index) => (
                  <TableRow
                    key={assignment.id}
                    className="border-slate-200 hover:bg-slate-50/50 transition-colors"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animation: "fadeInUp 0.4s ease-out forwards",
                    }}
                  >
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                          <AvatarFallback
                            className={`bg-gradient-to-r ${getAvatarColor(index)} text-white text-sm font-medium`}
                          >
                            {assignment.user
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-800">{assignment.user}</p>
                          <p className="text-sm text-slate-500">{assignment.userEmail}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg flex items-center justify-center border border-blue-100">
                          <Smartphone className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">{assignment.phone}</p>
                          <p className="text-sm text-slate-500 font-mono">{assignment.phoneImei.slice(-6)}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700">{assignment.assignedDate}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusBadgeColor(assignment.status)} border font-medium capitalize`}>
                        {getStatusLabel(assignment.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">{assignment.department}</TableCell>
                    <TableCell className="text-slate-700">{assignment.assignedBy}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-slate-200 shadow-lg">
                          <DropdownMenuItem className="text-slate-700 hover:bg-slate-50">
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier l'attribution
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-700 hover:bg-slate-50">
                            <UserCheck className="w-4 h-4 mr-2" />
                            Marquer comme retournée
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer l'attribution
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
