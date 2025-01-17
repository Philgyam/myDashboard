import React, { useState } from 'react';
import { Table } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  Users,
  ShoppingBag,
  DollarSign,
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  status: string;
  avatar: string;
  lastPurchase: string;
  preferredPayment: string;
  notes: string;
}

export default function Customers() {
  const [customers] = useState<Customer[]>([
    {
      id: '1',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, USA',
      joinDate: '2024-01-10',
      totalOrders: 15,
      totalSpent: 1250.50,
      status: 'Active',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2024-01-15',
      preferredPayment: 'Credit Card',
      notes: 'Prefers evening delivery',
    },
    {
      id: '2',
      name: 'James Chen',
      email: 'james@example.com',
      phone: '+1 (555) 987-6543',
      location: 'Los Angeles, USA',
      joinDate: '2024-01-05',
      totalOrders: 8,
      totalSpent: 750.25,
      status: 'Active',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2024-01-12',
      preferredPayment: 'PayPal',
      notes: 'Allergic to nuts',
    },
    {
      id: '3',
      name: 'Sophia Johnson',
      email: 'sophia@example.com',
      phone: '+1 (555) 234-5678',
      location: 'Chicago, USA',
      joinDate: '2024-01-08',
      totalOrders: 5,
      totalSpent: 400.75,
      status: 'Active',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2024-01-14',
      preferredPayment: 'Credit Card',
      notes: 'Prefers contactless delivery',
    },
    {
      id: '4',
      name: 'Liam Smith',
      email: 'liam@example.com',
      phone: '+1 (555) 345-6789',
      location: 'San Francisco, USA',
      joinDate: '2024-01-02',
      totalOrders: 12,
      totalSpent: 950.00,
      status: 'Inactive',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2023-12-28',
      preferredPayment: 'Debit Card',
      notes: 'Frequent traveler',
    },
    {
      id: '5',
      name: 'Olivia Brown',
      email: 'olivia@example.com',
      phone: '+1 (555) 456-7890',
      location: 'Austin, USA',
      joinDate: '2024-01-15',
      totalOrders: 3,
      totalSpent: 250.50,
      status: 'Active',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2024-01-15',
      preferredPayment: 'Credit Card',
      notes: 'Loves discounts',
    },
    {
      id: '6',
      name: 'Noah Davis',
      email: 'noah@example.com',
      phone: '+1 (555) 567-8901',
      location: 'Seattle, USA',
      joinDate: '2024-01-04',
      totalOrders: 10,
      totalSpent: 700.90,
      status: 'Active',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2024-01-10',
      preferredPayment: 'PayPal',
      notes: 'Prefers evening deliveries',
    },
    {
      id: '7',
      name: 'Ava Martinez',
      email: 'ava@example.com',
      phone: '+1 (555) 678-9012',
      location: 'Miami, USA',
      joinDate: '2024-01-06',
      totalOrders: 7,
      totalSpent: 500.00,
      status: 'VIP',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2024-01-13',
      preferredPayment: 'Credit Card',
      notes: 'Special requests on all orders',
    },
    {
      id: '8',
      name: 'Mason Garcia',
      email: 'mason@example.com',
      phone: '+1 (555) 789-0123',
      location: 'New York, USA',
      joinDate: '2024-01-11',
      totalOrders: 9,
      totalSpent: 600.00,
      status: 'Active',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2024-01-16',
      preferredPayment: 'Debit Card',
      notes: 'Likes to try new products',
    },
    {
      id: '9',
      name: 'Isabella Wilson',
      email: 'isabella@example.com',
      phone: '+1 (555) 890-1234',
      location: 'Boston, USA',
      joinDate: '2024-01-03',
      totalOrders: 4,
      totalSpent: 150.00,
      status: 'Inactive',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2023-12-30',
      preferredPayment: 'PayPal',
      notes: 'Enjoys seasonal promotions',
    },
    {
      id: '10',
      name: 'Ethan Lee',
      email: 'ethan@example.com',
      phone: '+1 (555) 901-2345',
      location: 'Phoenix, USA',
      joinDate: '2024-01-07',
      totalOrders: 6,
      totalSpent: 300.30,
      status: 'Active',
      avatar: '/api/placeholder/50/50',
      lastPurchase: '2024-01-11',
      preferredPayment: 'Credit Card',
      notes: 'Prefers express shipping',
    }
    // Add 8 more customers with similar structure
  ]);


  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState<
    { id: number; text: string; sender: string; timestamp: string }[]
  >([]);

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: Date.now(),
          text: message,
          sender: 'admin',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
      setMessage('');
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-gray-100 text-gray-800',
      'VIP': 'bg-purple-100 text-purple-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    const dateA = new Date(a.lastPurchase).getTime();
    const dateB = new Date(b.lastPurchase).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  return (
    <div className="p-6 space-y-6">
  <div className="flex sm:flex-row sm:justify-between items-center">
    <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
    <div className="mt-2 hidden md:flex lg:flex sm:mt-0">
      <Button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
        Sort by Purchase: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
      </Button>
    </div>
  </div>

  <div className="mt-[2rem] flex justify-end md:hidden lg:hidden sm:mt-0">
    <Button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
      Sort by Purchase: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
    </Button>
  </div>
  <div className="relative">
    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
    <Input
      placeholder="Search customers..."
      className="pl-8"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  <div className="grid gap-6 lg:hidden md:hidden md:grid-cols-4">
    {sortedCustomers
      .filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((customer) => (
        <div key={customer.id} className="border rounded-lg p-4 shadow-md flex flex-col">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <img src={customer.avatar} alt={customer.name} />
            </Avatar>
            <div className="flex-1">
              <div className="font-medium">{customer.name}</div>
              <div className="text-sm text-gray-500">{customer.email}</div>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{customer.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>Total Spent: ${customer.totalSpent.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(customer.status)}>
                {customer.status}
              </Badge>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCustomer(customer);
                setIsChatOpen(true);
              }}
              className="md:hidden" // Hide on larger screens
            >
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedCustomer(customer);
                setIsProfileOpen(true);
              }}
              className="md:hidden" // Hide on larger screens
            >
              View Profile
            </Button>
          </div>
        </div>
      ))}
  </div>



  <div className="rounded-md hidden md:block lg:block border overflow-x-auto">
    <Table>
      <thead>
        <tr className="bg-gray-50">
          <th className="p-4 text-left text-sm font-medium text-gray-500">Customer</th>
          <th className="p-4 text-left text-sm font-medium text-gray-500">Contact</th>
          <th className="p-4 text-left text-sm font-medium text-gray-500">Orders</th>
          <th className="p-4 text-left text-sm font-medium text-gray-500">Spent</th>
          <th className="p-4 text-left text-sm font-medium text-gray-500">Status</th>
          <th className="p-4 text-left text-sm font-medium text-gray-500">Last Purchase</th>
          <th className="p-4 text-left text-sm font-medium text-gray-500">Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedCustomers
          .filter(customer =>
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((customer) => (
            <tr key={customer.id} className="border-t">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img src={customer.avatar} alt={customer.name} />
                  </Avatar>
                  <div>
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-gray-500">{customer.email}</div>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{customer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{customer.location}</span>
                  </div>
                </div>
              </td>
              <td className="p-4">{customer.totalOrders}</td>
              <td className="p-4">${customer.totalSpent.toFixed(2)}</td>
              <td className="p-4">
                <Badge className={getStatusColor(customer.status)}>
                  {customer.status}
                </Badge>
              </td>
              <td className="p-4">{customer.lastPurchase}</td>
              <td className="p-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setIsChatOpen(true);
                    }}
                    className="hidden md:flex" // Show only on larger screens
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSelectedCustomer(customer);
                      setIsProfileOpen(true);
                    }}
                    className="hidden md:flex" // Show only on larger screens
                  >
                    View Profile
                  </Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>
  </div>

  {/* Chat Sheet */}
  <Sheet open={isChatOpen} onOpenChange={setIsChatOpen}>
    <SheetContent className="w-full sm:w-[540px] bg-white">
      <SheetHeader>
        <SheetTitle>Chat with {selectedCustomer?.name}</SheetTitle>
        <SheetDescription>
          Send messages to your customer directly
        </SheetDescription>
      </SheetHeader>
      <div className="flex flex-col h-[calc(100vh-200px)]">
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'admin' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[70%] ${
                  msg.sender === 'admin'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70">{msg.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-4 flex gap-2">
          <Input
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>

  {/* Customer Profile Dialog */}
  <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
    <DialogContent className="sm:max-w-[625px] bg-white w-full">
      <DialogHeader>
        <DialogTitle>Customer Profile</DialogTitle>
      </DialogHeader>
      {selectedCustomer && (
        <Tabs defaultValue="details" className="w-full">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <img src={selectedCustomer.avatar} alt={selectedCustomer.name} />
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedCustomer.name}</h3>
                  <p className="text-gray-500">{selectedCustomer.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{selectedCustomer.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Joined: {selectedCustomer.joinDate}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4 text-gray-500" />
                    <span>Orders: {selectedCustomer.totalOrders}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>Total Spent: ${selectedCustomer.totalSpent.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="orders">
            <div className="space-y-4">
              <h4 className="font-medium">Recent Orders</h4>
              {/* Add order history here */}
            </div>
          </TabsContent>
          <TabsContent value="preferences">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Payment Method</h4>
                <p>{selectedCustomer.preferredPayment}</p>
              </div>
              <div>
                <h4 className="font-medium">Notes</h4>
                <p>{selectedCustomer.notes}</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </DialogContent>
  </Dialog>
</div>
  )
}