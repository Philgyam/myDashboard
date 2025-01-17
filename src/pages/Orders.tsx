import React, { useState } from 'react';
import { Table } from '../components/ui/table';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

// Define the Order type
interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: string;
  items: number;
  email: string;
  store: string;
}

// Modal Component
interface OrderModalProps {
  order: Order | null;
  onClose: () => void;
  getStatusColor: (status: string) => string;
}

const OrderModal: React.FC<OrderModalProps> = ({ order, onClose, getStatusColor }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-white p-8 rounded-lg shadow-xl w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <div className="space-y-2">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Customer:</strong> {order.customer}</p>
          <p><strong>Date:</strong> {order.date}</p>
          <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
          <p><strong>Status:</strong> <Badge className={getStatusColor(order.status)}>{order.status}</Badge></p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Store:</strong> {order.store}</p>
          <p><strong>Items:</strong> {order.items}</p>
        </div>
        <Button onClick={onClose} className="mt-6 w-full bg-blue-600 text-white hover:bg-blue-700 transition duration-200">
          Close
        </Button>
      </div>
    </div>
  );
};

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([
    { id: '1', customer: 'John Doe', date: '2025-01-16', total: 299.99, status: 'pending', items: 3, email: 'john@example.com', store: 'Store One' },
    { id: '2', customer: 'Jane Smith', date: '2025-01-15', total: 149.50, status: 'processing', items: 2, email: 'jane@example.com', store: 'Store Two' },
    { id: '3', customer: 'Bob Wilson', date: '2025-01-14', total: 499.99, status: 'delivered', items: 5, email: 'bob@example.com', store: 'Store One' },
    { id: '4', customer: 'Alice Johnson', date: '2025-01-13', total: 89.99, status: 'delivering', items: 1, email: 'alice@example.com', store: 'Store Two' },
    { id: '5', customer: 'Charlie Brown', date: '2025-01-12', total: 250.00, status: 'declined', items: 4, email: 'charlie@example.com', store: 'Store One' },
    { id: '6', customer: 'Diana Prince', date: '2025-01-11', total: 349.75, status: 'pending', items: 6, email: 'diana@example.com', store: 'Store Two' },
  ]);

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedStore, setSelectedStore] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<string>('date');
  const [sortDirection, setSortDirection] = useState<string>('desc');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      pending: 'bg-yellow-200 text-yellow-800',
      processing: 'bg-blue-200 text-blue-800',
      delivering: 'bg-purple-200 text-purple-800',
      delivered: 'bg-green-200 text-green-800',
      declined: 'bg-red-200 text-red-800',
    };
    return colors[status] || 'bg-gray-200 text-gray-800';
  };

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
  };

  const filteredOrders = orders
    .filter(order => (selectedStatus === 'all' || order.status === selectedStatus) && (selectedStore === 'all' || order.store === selectedStore))
    .filter(order => 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.includes(searchTerm)
    )
    .sort((a, b) => {
      const direction = sortDirection === 'asc' ? 1 : -1;
      if (a[sortField] > b[sortField]) return direction;
      if (a[sortField] < b[sortField]) return -direction;
      return 0;
    });

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 w-full mx-auto">
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" className="gap-2 bg-blue-500 text-white hover:bg-blue-600">
            <Filter className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
        <Card className="bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-800">{orders.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-800">
              {orders.filter(order => order.status === 'pending').length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-800">
              {orders.filter(order => order.status === 'delivered').length}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Declined</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-800">
              {orders.filter(order => order.status === 'declined').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search orders..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus} className="min-w-[180px]">
          <SelectTrigger className="bg-white border border-gray-300">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="delivering">Delivering</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedStore} onValueChange={setSelectedStore} className="min-w-[180px]">
          <SelectTrigger className="bg-white border border-gray-300">
            <SelectValue placeholder="Filter by store" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="all">All Stores</SelectItem>
            <SelectItem value="Store One">Store One</SelectItem>
            <SelectItem value="Store Two">Store Two</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border w-full overflow-x-auto">
        <Table className='w-full'>
          <thead>
            <tr className="bg-gray-50">
              <th className="p-4 text-left text-sm font-medium text-gray-500" onClick={() => handleSort('id')}>
                <div className="flex items-center gap-2 cursor-pointer">
                  Order ID
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-500" onClick={() => handleSort('customer')}>
                <div className="flex items-center gap-2 cursor-pointer">
                  Customer
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-500" onClick={() => handleSort('date')}>
                <div className="flex items-center gap-2 cursor-pointer">
                  Date
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-500" onClick={() => handleSort('total')}>
                <div className="flex items-center gap-2 cursor-pointer">
                  Total
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Store</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
              <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="p-4 text-sm text-gray-900">{order.id}</td>
                <td className="p-4 text-sm text-gray-900 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  {order.customer}
                </td>
                <td className="p-4 text-sm text-gray-900">{order.date}</td>
                <td className="p-4 text-sm text-gray-900">${order.total.toFixed(2)}</td>
                <td className="p-4 text-sm text-gray-900">{order.store}</td>
                <td className="p-4">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </td>
                <td className="p-4">
                  <Select value={order.status} onValueChange={(newStatus) => handleStatusChange(order.id, newStatus)} className="min-w-[150px]">
                    <SelectTrigger className="bg-white border border-gray-300">
                      <SelectValue placeholder="Change status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="delivering">Delivering</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          getStatusColor={getStatusColor}
        />
      )}
    </div>
  );
}

export default Orders;