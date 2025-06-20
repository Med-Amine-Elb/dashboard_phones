"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Filter,
  Download,
  Grid,
  List,
  Smartphone,
  Loader2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PhoneManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [isAddPhoneOpen, setIsAddPhoneOpen] = useState(false)
  const [isEditPhoneOpen, setIsEditPhoneOpen] = useState(false)
  const [isViewPhoneOpen, setIsViewPhoneOpen] = useState(false)
  const [selectedPhone, setSelectedPhone] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const [phones, setPhones] = useState([
    {
      id: 1,
      brand: "Apple",
      model: "iPhone 14 Pro",
      imei: "123456789012345",
      serialNumber: "F2LW8J9N14",
      status: "assigned",
      assignedTo: "John Doe",
      purchaseDate: "2023-01-15",
      condition: "excellent",
      color: "Space Black",
      storage: "256GB",
      price: 999,
    },
    {
      id: 2,
      brand: "Samsung",
      model: "Galaxy S23 Ultra",
      imei: "234567890123456",
      serialNumber: "R58N123456",
      status: "available",
      assignedTo: null,
      purchaseDate: "2023-02-20",
      condition: "good",
      color: "Phantom Black",
      storage: "512GB",
      price: 1199,
    },
    {
      id: 3,
      brand: "Google",
      model: "Pixel 8 Pro",
      imei: "345678901234567",
      serialNumber: "GA02983-US",
      status: "maintenance",
      assignedTo: null,
      purchaseDate: "2023-03-10",
      condition: "fair",
      color: "Obsidian",
      storage: "128GB",
      price: 899,
    },
    {
      id: 4,
      brand: "Apple",
      model: "iPhone 15",
      imei: "456789012345678",
      serialNumber: "F2LW8J9N15",
      status: "assigned",
      assignedTo: "Sarah Wilson",
      purchaseDate: "2023-09-22",
      condition: "excellent",
      color: "Natural Titanium",
      storage: "256GB",
      price: 1099,
    },
    {
      id: 5,
      brand: "OnePlus",
      model: "11 Pro",
      imei: "567890123456789",
      serialNumber: "OP11PRO001",
      status: "retired",
      assignedTo: null,
      purchaseDate: "2022-05-15",
      condition: "poor",
      color: "Titan Black",
      storage: "256GB",
      price: 799,
    },
  ])

  const [newPhone, setNewPhone] = useState({
    brand: "",
    model: "",
    imei: "",
    serialNumber: "",
    status: "available",
    condition: "excellent",
    color: "",
    storage: "",
    price: "",
    purchaseDate: new Date().toISOString().split("T")[0],
  })

  const handleAddPhone = async () => {
    if (!newPhone.brand || !newPhone.model || !newPhone.imei || !newPhone.serialNumber) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const phone = {
        id: phones.length + 1,
        ...newPhone,
        price: Number.parseFloat(newPhone.price) || 0,
        assignedTo: null,
      }

      setPhones([...phones, phone])
      setNewPhone({
        brand: "",
        model: "",
        imei: "",
        serialNumber: "",
        status: "available",
        condition: "excellent",
        color: "",
        storage: "",
        price: "",
        purchaseDate: new Date().toISOString().split("T")[0],
      })
      setIsAddPhoneOpen(false)

      toast({
        title: "Phone Added Successfully",
        description: `${phone.brand} ${phone.model} has been added to inventory.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add phone. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditPhone = async () => {
    if (!selectedPhone) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setPhones(phones.map((phone) => (phone.id === selectedPhone.id ? selectedPhone : phone)))

      setIsEditPhoneOpen(false)
      setSelectedPhone(null)

      toast({
        title: "Phone Updated Successfully",
        description: `${selectedPhone.brand} ${selectedPhone.model} has been updated.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update phone. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePhone = async (phoneId: number) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const phoneToDelete = phones.find((p) => p.id === phoneId)
      setPhones(phones.filter((phone) => phone.id !== phoneId))

      toast({
        title: "Phone Deleted",
        description: `${phoneToDelete?.brand} ${phoneToDelete?.model} has been removed from inventory.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete phone. Please try again.",
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
        [
          "Brand",
          "Model",
          "IMEI",
          "Serial Number",
          "Status",
          "Assigned To",
          "Condition",
          "Color",
          "Storage",
          "Price",
          "Purchase Date",
        ],
        ...filteredPhones.map((phone) => [
          phone.brand,
          phone.model,
          phone.imei,
          phone.serialNumber,
          phone.status,
          phone.assignedTo || "None",
          phone.condition,
          phone.color,
          phone.storage,
          phone.price,
          phone.purchaseDate,
        ]),
      ]
        .map((row) => row.join(","))
        .join("\n")

      const blob = new Blob([csvContent], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `phones-export-${new Date().toISOString().split("T")[0]}.csv`
      a.click()
      window.URL.revokeObjectURL(url)

      toast({
        title: "Export Successful",
        description: "Phone inventory has been exported to CSV file.",
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export phone data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "available":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "maintenance":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "retired":
        return "bg-slate-100 text-slate-700 border-slate-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getConditionBadgeColor = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "good":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "fair":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "poor":
        return "bg-red-100 text-red-700 border-red-200"
      default:
        return "bg-slate-100 text-slate-700 border-slate-200"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "assigned":
        return "Attribué"
      case "available":
        return "Disponible"
      case "maintenance":
        return "Maintenance"
      case "retired":
        return "Retiré"
      default:
        return status
    }
  }

  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case "excellent":
        return "Excellent"
      case "good":
        return "Bon"
      case "fair":
        return "Moyen"
      case "poor":
        return "Mauvais"
      default:
        return condition
    }
  }

  const filteredPhones = phones.filter(
    (phone) =>
      phone.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phone.imei.includes(searchTerm) ||
      phone.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Gestion des Téléphones</h1>
          <p className="text-slate-600">Gérez l'inventaire des téléphones de votre organisation et suivez l'état des appareils</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Exportation...
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </>
            )}
          </Button>

          <Dialog open={isAddPhoneOpen} onOpenChange={setIsAddPhoneOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un téléphone
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau téléphone</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="brand">Marque</Label>
                    <Select
                      value={newPhone.brand}
                      onValueChange={(value) => setNewPhone({ ...newPhone, brand: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la marque" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Apple">Apple</SelectItem>
                        <SelectItem value="Samsung">Samsung</SelectItem>
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="OnePlus">OnePlus</SelectItem>
                        <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="model">Modèle</Label>
                    <Input
                      id="model"
                      value={newPhone.model}
                      onChange={(e) => setNewPhone({ ...newPhone, model: e.target.value })}
                      placeholder="ex: iPhone 15 Pro"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="imei">IMEI</Label>
                    <Input
                      id="imei"
                      value={newPhone.imei}
                      onChange={(e) => setNewPhone({ ...newPhone, imei: e.target.value })}
                      placeholder="Numéro IMEI à 15 chiffres"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serialNumber">Numéro de série</Label>
                    <Input
                      id="serialNumber"
                      value={newPhone.serialNumber}
                      onChange={(e) => setNewPhone({ ...newPhone, serialNumber: e.target.value })}
                      placeholder="Numéro de série de l'appareil"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="storage">Stockage</Label>
                    <Select
                      value={newPhone.storage}
                      onValueChange={(value) => setNewPhone({ ...newPhone, storage: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Stockage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="64GB">64GB</SelectItem>
                        <SelectItem value="128GB">128GB</SelectItem>
                        <SelectItem value="256GB">256GB</SelectItem>
                        <SelectItem value="512GB">512GB</SelectItem>
                        <SelectItem value="1TB">1TB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="color">Couleur</Label>
                    <Input
                      id="color"
                      value={newPhone.color}
                      onChange={(e) => setNewPhone({ ...newPhone, color: e.target.value })}
                      placeholder="Couleur de l'appareil"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newPhone.price}
                      onChange={(e) => setNewPhone({ ...newPhone, price: e.target.value })}
                      placeholder="Prix d'achat"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="condition">État</Label>
                    <Select
                      value={newPhone.condition}
                      onValueChange={(value) => setNewPhone({ ...newPhone, condition: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Bon</SelectItem>
                        <SelectItem value="fair">Moyen</SelectItem>
                        <SelectItem value="poor">Mauvais</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select
                      value={newPhone.status}
                      onValueChange={(value) => setNewPhone({ ...newPhone, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Disponible</SelectItem>
                        <SelectItem value="assigned">Attribué</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="retired">Retiré</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="purchaseDate">Date d'achat</Label>
                    <Input
                      id="purchaseDate"
                      type="date"
                      value={newPhone.purchaseDate}
                      onChange={(e) => setNewPhone({ ...newPhone, purchaseDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddPhoneOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleAddPhone} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Ajout...
                    </>
                  ) : (
                    "Ajouter un téléphone"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-white border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-slate-800 text-xl">Téléphones ({filteredPhones.length})</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des téléphones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-200 text-slate-800 w-64 focus:border-blue-400 focus:ring-blue-400/20"
                />
              </div>
              <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              <div className="flex items-center border border-slate-200 rounded-lg">
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-slate-100 text-slate-800" : "text-slate-600 hover:bg-slate-50"}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-slate-100 text-slate-800" : "text-slate-600 hover:bg-slate-50"}
                >
                  <Grid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === "list" ? (
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-200 bg-slate-50/50">
                    <TableHead className="text-slate-700 font-semibold">Appareil</TableHead>
                    <TableHead className="text-slate-700 font-semibold">IMEI</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Statut</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Attribué à</TableHead>
                    <TableHead className="text-slate-700 font-semibold">État</TableHead>
                    <TableHead className="text-slate-700 font-semibold">Date d'achat</TableHead>
                    <TableHead className="text-slate-700 font-semibold w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPhones.map((phone, index) => (
                    <TableRow
                      key={phone.id}
                      className="border-slate-200 hover:bg-slate-50/50 transition-colors"
                      style={{
                        animationDelay: `${index * 50}ms`,
                        animation: "fadeInUp 0.4s ease-out forwards",
                      }}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center border border-blue-100">
                            <Smartphone className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-800">
                              {phone.brand} {phone.model}
                            </p>
                            <p className="text-sm text-slate-500">
                              {phone.storage} • {phone.color}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-700 font-mono text-sm">{phone.imei}</TableCell>
                      <TableCell>
                        <Badge className={`${getStatusBadgeColor(phone.status)} border font-medium capitalize`}>
                          {getStatusLabel(phone.status)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700">
                        {phone.assignedTo || <span className="text-slate-400 italic">Non attribué</span>}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getConditionBadgeColor(phone.condition)} border font-medium capitalize`}>
                          {getConditionLabel(phone.condition)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700">{phone.purchaseDate}</TableCell>
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
                              <Eye className="w-4 h-4 mr-2" />
                              Voir les détails
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-slate-700 hover:bg-slate-50">
                              <Edit className="w-4 h-4 mr-2" />
                              Modifier le téléphone
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer le téléphone
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPhones.map((phone, index) => (
                <Card
                  key={phone.id}
                  className="bg-white border border-slate-200 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.6s ease-out forwards",
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl flex items-center justify-center border border-blue-100">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                      </div>
                      <Badge className={`${getStatusBadgeColor(phone.status)} border font-medium capitalize`}>
                        {getStatusLabel(phone.status)}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-slate-800">
                          {phone.brand} {phone.model}
                        </h3>
                        <p className="text-sm text-slate-500">
                          {phone.storage} • {phone.color}
                        </p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-500">IMEI :</span>
                          <span className="text-slate-700 font-mono">{phone.imei.slice(-6)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">État :</span>
                          <Badge className={`${getConditionBadgeColor(phone.condition)} border text-xs capitalize`}>
                            {getConditionLabel(phone.condition)}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Attribué :</span>
                          <span className="text-slate-700">
                            {phone.assignedTo ? phone.assignedTo.split(" ")[0] : "Aucun"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <Button variant="outline" size="sm" className="w-full border-slate-200 hover:bg-slate-50">
                        Voir les détails
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
