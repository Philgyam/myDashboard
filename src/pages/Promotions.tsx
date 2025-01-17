'use client'

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Package2, MapPin, Truck, CheckCircle2, Search, ExternalLink } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function AdminOrderTracking() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [carrierFilter, setCarrierFilter] = useState('all')

  const orders = [
    {
      id: "ORD-2024-1234",
      customerName: "John Doe",
      product: "Premium Wireless Headphones",
      orderDate: "Jan 15, 2024",
      status: "in-transit",
      estimatedDelivery: "January 19, 2024",
      carrier: "FedEx",
      trackingNumber: "FX-789456123",
      origin: "Los Angeles, CA",
      destination: "New York, NY",
      currentLocation: "Chicago, IL",
      updates: [
        {
          date: "Jan 17, 2024 15:30",
          location: "Chicago, IL",
          status: "Package in transit",
          description: "Package has left the Chicago distribution center"
        },
        {
          date: "Jan 16, 2024 09:15",
          location: "Denver, CO",
          status: "Package arrived at carrier facility",
          description: "Package processed through sorting facility"
        },
        {
          date: "Jan 15, 2024 14:20",
          location: "Los Angeles, CA",
          status: "Package picked up",
          description: "Package picked up by carrier"
        }
      ]
    },
    {
      id: "ORD-2024-1235",
      customerName: "Jane Smith",
      product: "Smart Watch Series 5",
      orderDate: "Jan 16, 2024",
      status: "delivered",
      estimatedDelivery: "January 18, 2024",
      carrier: "UPS",
      trackingNumber: "UPS-987654321",
      origin: "Seattle, WA",
      destination: "Miami, FL",
      currentLocation: "Miami, FL",
      updates: [
        {
          date: "Jan 18, 2024 10:00",
          location: "Miami, FL",
          status: "Delivered",
          description: "Package delivered to recipient"
        },
        {
          date: "Jan 17, 2024 08:30",
          location: "Miami, FL",
          status: "Out for delivery",
          description: "Package is out for delivery"
        },
        {
          date: "Jan 16, 2024 15:45",
          location: "Seattle, WA",
          status: "Package picked up",
          description: "Package picked up by carrier"
        }
      ]
    },
    {
      id: "ORD-2024-1236",
      customerName: "Robert Johnson",
      product: "4K Gaming Monitor",
      orderDate: "Jan 17, 2024",
      status: "pending",
      estimatedDelivery: "January 21, 2024",
      carrier: "DHL",
      trackingNumber: "DHL-456789123",
      origin: "Houston, TX",
      destination: "Boston, MA",
      currentLocation: "Houston, TX",
      updates: [
        {
          date: "Jan 17, 2024 09:00",
          location: "Houston, TX",
          status: "Label created",
          description: "Shipping label created, awaiting pickup"
        }
      ]
    },
    {
      id: "ORD-2024-1237",
      customerName: "Emily Davis",
      product: "Bluetooth Speaker",
      orderDate: "Jan 18, 2024",
      status: "delivered",
      estimatedDelivery: "January 20, 2024",
      carrier: "FedEx",
      trackingNumber: "FX-123456789",
      origin: "San Francisco, CA",
      destination: "Chicago, IL",
      currentLocation: "Chicago, IL",
      updates: [
        {
          date: "Jan 20, 2024 09:00",
          location: "Chicago, IL",
          status: "Delivered",
          description: "Package delivered to recipient"
        },
        {
          date: "Jan 19, 2024 14:15",
          location: "Chicago, IL",
          status: "Out for delivery",
          description: "Package is out for delivery"
        },
        {
          date: "Jan 18, 2024 08:30",
          location: "San Francisco, CA",
          status: "Package picked up",
          description: "Package picked up by carrier"
        }
      ]
    },
    {
      id: "ORD-2024-1238",
      customerName: "Michael Brown",
      product: "Gaming Laptop",
      orderDate: "Jan 19, 2024",
      status: "in-transit",
      estimatedDelivery: "January 25, 2024",
      carrier: "UPS",
      trackingNumber: "UPS-456123789",
      origin: "Las Vegas, NV",
      destination: "Seattle, WA",
      currentLocation: "Salt Lake City, UT",
      updates: [
        {
          date: "Jan 20, 2024 12:00",
          location: "Salt Lake City, UT",
          status: "Package in transit",
          description: "Package has left the Salt Lake City distribution center"
        },
        {
          date: "Jan 19, 2024 10:00",
          location: "Las Vegas, NV",
          status: "Package processed",
          description: "Package processed through sorting facility"
        }
      ]
    },
    {
      id: "ORD-2024-1239",
      customerName: "Sarah Wilson",
      product: "Smartphone",
      orderDate: "Jan 20, 2024",
      status: "pending",
      estimatedDelivery: "January 26, 2024",
      carrier: "DHL",
      trackingNumber: "DHL-987654321",
      origin: "New York, NY",
      destination: "Austin, TX",
      currentLocation: "New York, NY",
      updates: [
        {
          date: "Jan 20, 2024 15:00",
          location: "New York, NY",
          status: "Label created",
          description: "Shipping label created, awaiting pickup"
        }
      ]
    }
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesCarrier = carrierFilter === 'all' || order.carrier.toLowerCase() === carrierFilter.toLowerCase();

    return matchesSearch && matchesStatus && matchesCarrier;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500"
      case "in-transit":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "delivered":
        return "Delivered"
      case "in-transit":
        return "In Transit"
      case "pending":
        return "Pending"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="container  px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Tracking Dashboard</h1>
        <p className="text-gray-600">
          Monitor and manage all customer order shipments
        </p>
      </div>

      {/* Filters and Search */}
      <div className="grid gap-4 md:grid-cols-[1fr_200px_200px] mb-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-600" />
          <Input
            placeholder="Search by order ID, customer name, or tracking number"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select defaultValue="all" onValueChange={setStatusFilter}>
          <SelectTrigger className="bg-gray-100">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in-transit">In Transit</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all" onValueChange={setCarrierFilter}>
          <SelectTrigger className="bg-gray-100">
            <SelectValue placeholder="Carrier" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Carriers</SelectItem>
            <SelectItem value="fedex">FedEx</SelectItem>
            <SelectItem value="ups">UPS</SelectItem>
            <SelectItem value="dhl">DHL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredOrders.map((order) => (
          <Card key={order.id} className="cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => setSelectedOrder(order)}>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
                <div>
                  <p className="text-sm font-medium text-gray-600">Order ID</p>
                  <p>{order.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Customer</p>
                  <p>{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Product</p>
                  <p className="truncate">{order.product}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Delivery Date</p>
                  <p>{order.estimatedDelivery}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(order.status)}`} />
                    <span>{getStatusText(order.status)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tracking Details Modal */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-3xl bg-white">
          <DialogHeader>
            <DialogTitle>Order Tracking Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <ScrollArea className="max-h-[80vh]">
              <div className="space-y-6 p-1">
                {/* Order Summary */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="font-semibold mb-2">Order Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium">{selectedOrder.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Customer:</span>
                        <span className="font-medium">{selectedOrder.customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Product:</span>
                        <span className="font-medium">{selectedOrder.product}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium">{selectedOrder.orderDate}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Carrier:</span>
                        <span className="font-medium">{selectedOrder.carrier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tracking Number:</span>
                        <span className="font-medium">{selectedOrder.trackingNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(selectedOrder.status)}`} />
                          <span className="font-medium">{getStatusText(selectedOrder.status)}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Estimated Delivery:</span>
                        <span className="font-medium">{selectedOrder.estimatedDelivery}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Route */}
                <div>
                  <h3 className="font-semibold mb-4">Shipping Route</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="flex items-start gap-3">
                      <Package2 className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Origin</p>
                        <p className="text-sm text-gray-600">{selectedOrder.origin}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Current Location</p>
                        <p className="text-sm text-gray-600">{selectedOrder.currentLocation}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Destination</p>
                        <p className="text-sm text-gray-600">{selectedOrder.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div>
                  <h3 className="font-semibold mb-4">Tracking Updates</h3>
                  <div className="space-y-4">
                    {selectedOrder.updates.map((update: any, index: number) => (
                      <div key={index} className="relative flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-muted bg-background">
                            {index === 0 ? (
                              <Truck className="h-4 w-4 text-primary" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 text-gray-600" />
                            )}
                          </div>
                          {index !== selectedOrder.updates.length - 1 && (
                            <div className="w-px h-full bg-muted" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <p className="text-sm text-gray-600">{update.date}</p>
                          <p className="font-medium">{update.status}</p>
                          <p className="text-sm text-gray-600">{update.location}</p>
                          <p className="text-sm text-gray-600">{update.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                  <Button className="w-full">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View on Carrier Site
                  </Button>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}