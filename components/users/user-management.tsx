"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Edit, Trash2, UserCheck, Filter, Download, Loader2, Users } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@entreprise.fr",
      role: "admin",
      department: "IT",
      status: "actif",
      assignedPhone: "iPhone 14 Pro",
      joinDate: "2023-01-15",
    },
    {
      id: 2,
      name: "Marie Martin",
      email: "marie.martin@entreprise.fr",
      role: "assigneur",
      department: "RH",
      status: "actif",
      assignedPhone: "Samsung Galaxy S23",
      joinDate: "2023-02-20",
    },
    {
      id: 3,
      name: "Pierre Durand",
      email: "pierre.durand@entreprise.fr",
      role: "utilisateur",
      department: "Ventes",
      status: "inactif",
      assignedPhone: null,
      joinDate: "2023-03-10",
    },
    {
      id: 4,
      name: "Sophie Moreau",
      email: "sophie.moreau@entreprise.fr",
      role: "utilisateur",
      department: "Marketing",
      status: "actif",
      assignedPhone: "Google Pixel 8",
      joinDate: "2023-04-05",
    },
  ])

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "utilisateur",
    department: "",
    status: "actif",
  })

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.department) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const user = {
        id: users.length + 1,
        ...newUser,
        assignedPhone: null,
        joinDate: new Date().toISOString().split("T")[0],
      }

      setUsers([...users, user])
      setNewUser({ name: "", email: "", role: "utilisateur", department: "", status: "actif" })
      setIsAddUserOpen(false)

      toast({
        title: "Utilisateur ajouté avec succès",
        description: `${user.name} a été ajouté au système.`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de l'ajout de l'utilisateur. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditUser = async () => {
    if (!selectedUser) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setUsers(users.map((user) => (user.id === selectedUser.id ? selectedUser : user)))

      setIsEditUserOpen(false)
      setSelectedUser(null)

      toast({
        title: "Utilisateur mis à jour avec succès",
        description: `Les informations de ${selectedUser.name} ont été mises à jour.`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la mise à jour de l'utilisateur. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteUser = async (userId: number) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userToDelete = users.find((u) => u.id === userId)
      setUsers(users.filter((user) => user.id !== userId))

      toast({
        title: "Utilisateur supprimé",
        description: `${userToDelete?.name} a été retiré du système.`,
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la suppression de l'utilisateur. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const csvContent = [
        ["Nom", "Email", "Rôle", "Département", "Statut", "Téléphone Attribué", "Date d'Inscription"],
        ...filteredUsers.map((user) => [
          user.name,
          user.email,
          user.role,
          user.department,
          user.status,
          user.assignedPhone || "Aucun",
          user.joinDate,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `utilisateurs-export-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export réussi",
        description: "Les données utilisateurs ont été exportées vers un fichier CSV.",
      })
    } catch (error) {
      toast({
        title: "Échec de l'export",
        description: "Échec de l'export des données utilisateurs. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-300"
      case "assigneur":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "utilisateur":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      default:
        return "bg-slate-100 text-slate-800 border-slate-300"
    }
  }

  const getStatusBadgeColor = (status: string) => {
    return status === "actif"
      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
      : "bg-slate-100 text-slate-800 border-slate-300"
  }

  const getAvatarColor = (index: number) => {
    const colors = [
      "from-blue-600 to-cyan-600",
      "from-emerald-600 to-teal-600",
      "from-orange-600 to-amber-600",
      "from-purple-600 to-indigo-600",
    ]
    return colors[index % colors.length]
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-3">Gestion des Utilisateurs</h1>
          <p className="text-lg text-slate-600">
            Gérez les comptes utilisateurs et les permissions dans votre organisation
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl shadow-soft"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Export en cours...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </>
            )}
          </Button>

          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg rounded-xl hover:shadow-xl transition-all duration-200">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un Utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-white border-slate-200 shadow-xl rounded-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-slate-800">
                  Ajouter un Nouvel Utilisateur
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right font-semibold text-slate-800">
                    Nom
                  </Label>
                  <Input
                    id="name"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="col-span-3 bg-white border-slate-300 rounded-xl focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="Nom complet"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right font-semibold text-slate-800">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="col-span-3 bg-white border-slate-300 rounded-xl focus:border-blue-500 focus:ring-blue-500/20"
                    placeholder="email@entreprise.fr"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right font-semibold text-slate-800">
                    Rôle
                  </Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                    <SelectTrigger className="col-span-3 bg-white border-slate-300 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utilisateur">Utilisateur</SelectItem>
                      <SelectItem value="assigneur">Assigneur</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right font-semibold text-slate-800">
                    Département
                  </Label>
                  <Select
                    value={newUser.department}
                    onValueChange={(value) => setNewUser({ ...newUser, department: value })}
                  >
                    <SelectTrigger className="col-span-3 bg-white border-slate-300 rounded-xl">
                      <SelectValue placeholder="Sélectionner un département" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="RH">RH</SelectItem>
                      <SelectItem value="Ventes">Ventes</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)} className="rounded-xl">
                  Annuler
                </Button>
                <Button
                  onClick={handleAddUser}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Ajout en cours...
                    </>
                  ) : (
                    "Ajouter l'Utilisateur"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-semibold">Total Utilisateurs</p>
                <p className="text-3xl font-bold text-blue-900">{users.length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-700 text-sm font-semibold">Utilisateurs Actifs</p>
                <p className="text-3xl font-bold text-emerald-900">
                  {users.filter((u) => u.status === "actif").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-semibold">Administrateurs</p>
                <p className="text-3xl font-bold text-orange-900">{users.filter((u) => u.role === "admin").length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-0 shadow-lg overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-semibold">Avec Téléphone</p>
                <p className="text-3xl font-bold text-purple-900">{users.filter((u) => u.assignedPhone).length}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <UserCheck className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table */}
      <Card className="bg-white border-0 shadow-lg overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold text-slate-800">
              Utilisateurs ({filteredUsers.length})
            </CardTitle>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4" />
                <Input
                  placeholder="Rechercher des utilisateurs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-slate-300 text-slate-900 w-64 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 bg-slate-50">
                  <TableHead className="text-slate-800 font-bold">Utilisateur</TableHead>
                  <TableHead className="text-slate-800 font-bold">Rôle</TableHead>
                  <TableHead className="text-slate-800 font-bold">Département</TableHead>
                  <TableHead className="text-slate-800 font-bold">Statut</TableHead>
                  <TableHead className="text-slate-800 font-bold">Téléphone Attribué</TableHead>
                  <TableHead className="text-slate-800 font-bold">Date d'Inscription</TableHead>
                  <TableHead className="text-slate-800 font-bold w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user, index) => (
                  <TableRow key={user.id} className="border-slate-200 hover:bg-slate-50 transition-colors">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10 border-2 border-white shadow-md">
                          <AvatarFallback
                            className={`bg-gradient-to-r ${getAvatarColor(index)} text-white text-sm font-semibold`}
                          >
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-sm text-slate-600">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getRoleBadgeColor(user.role)} border font-semibold rounded-lg`}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-800 font-medium">{user.department}</TableCell>
                    <TableCell>
                      <Badge className={`${getStatusBadgeColor(user.status)} border font-semibold rounded-lg`}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-800">
                      {user.assignedPhone || <span className="text-slate-500 italic">Aucun téléphone attribué</span>}
                    </TableCell>
                    <TableCell className="text-slate-800">{user.joinDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white border-slate-300 shadow-lg rounded-xl">
                          <DropdownMenuItem
                            className="text-slate-800 hover:bg-slate-50 rounded-lg"
                            onClick={() => {
                              setSelectedUser(user)
                              setIsEditUserOpen(true)
                            }}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier l'Utilisateur
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-800 hover:bg-slate-50 rounded-lg">
                            <UserCheck className="w-4 h-4 mr-2" />
                            Attribuer un Téléphone
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                className="text-red-700 hover:bg-red-50 rounded-lg"
                                onSelect={(e) => e.preventDefault()}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Supprimer l'Utilisateur
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-white border-slate-200 shadow-xl rounded-xl">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Cette action ne peut pas être annulée. Cela supprimera définitivement le compte de{" "}
                                  {user.name} et toutes les données associées.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="rounded-xl">Annuler</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="bg-red-600 hover:bg-red-700 rounded-xl"
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border-slate-200 shadow-xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-slate-800">Modifier l'Utilisateur</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right font-semibold text-slate-800">
                  Nom
                </Label>
                <Input
                  id="edit-name"
                  value={selectedUser.name}
                  onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  className="col-span-3 bg-white border-slate-300 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right font-semibold text-slate-800">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  className="col-span-3 bg-white border-slate-300 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-role" className="text-right font-semibold text-slate-800">
                  Rôle
                </Label>
                <Select
                  value={selectedUser.role}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, role: value })}
                >
                  <SelectTrigger className="col-span-3 bg-white border-slate-300 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utilisateur">Utilisateur</SelectItem>
                    <SelectItem value="assigneur">Assigneur</SelectItem>
                    <SelectItem value="admin">Administrateur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-department" className="text-right font-semibold text-slate-800">
                  Département
                </Label>
                <Select
                  value={selectedUser.department}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, department: value })}
                >
                  <SelectTrigger className="col-span-3 bg-white border-slate-300 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IT">IT</SelectItem>
                    <SelectItem value="RH">RH</SelectItem>
                    <SelectItem value="Ventes">Ventes</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right font-semibold text-slate-800">
                  Statut
                </Label>
                <Select
                  value={selectedUser.status}
                  onValueChange={(value) => setSelectedUser({ ...selectedUser, status: value })}
                >
                  <SelectTrigger className="col-span-3 bg-white border-slate-300 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="actif">Actif</SelectItem>
                    <SelectItem value="inactif">Inactif</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)} className="rounded-xl">
              Annuler
            </Button>
            <Button
              onClick={handleEditUser}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Mise à jour...
                </>
              ) : (
                "Mettre à Jour l'Utilisateur"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
