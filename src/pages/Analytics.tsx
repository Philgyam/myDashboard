import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from 'recharts'; // Import Cell here
import { Trophy, Users, Globe } from 'lucide-react';
import logo2 from '../images/logo2.png'
import logo3 from '../images/logo3.png'
import logo4 from '../images/logo4.png'
import logo from '../images/logo.png'
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'







export default function TopAnalytics() {
  const topPartners = [
    {
      id: 1,
      name: "Tech Solutions Inc",
      logo: logo2,
      revenue: 150000,
      deals: 45,
      status: "Gold Partner"
    },
    {
      id: 2,
      name: "Global Retail Co",
      logo:logo3,
      revenue: 120000,
      deals: 38,
      status: "Silver Partner"
    },
    {
      id: 3,
      name: "Digital Systems Ltd",
      logo: logo4,
      revenue: 95000,
      deals: 30,
      status: "Gold Partner"
    },
    {
      id: 4,
      name: "Smart Services Corp",
      logo: logo,
      revenue: 85000,
      deals: 28,
      status: "Bronze Partner"
    }
  ];

  const topCustomers = [
    {
      id: 1,
      name: "John Smith",
      avatar:img2,
      totalSpent: 25000,
      orders: 34,
      status: "VIP"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar: img1,
      totalSpent: 18500,
      orders: 28,
      status: "Premium"
    },
    {
      id: 3,
      name: "Michael Brown",
      avatar: img3,
      totalSpent: 15800,
      orders: 25,
      status: "VIP"
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar: img1,
      totalSpent: 12900,
      orders: 20,
      status: "Regular"
    }
  ];

  const countryData = [
    { country: "United States", shortName: "US", purchases: 45000, flag: "🇺🇸" },
    { country: "United Kingdom", shortName: "UK", purchases: 28000, flag: "🇬🇧" },
    { country: "Germany", shortName: "DE", purchases: 25000, flag: "🇩🇪" },
    { country: "France", shortName: "FR", purchases: 22000, flag: "🇫🇷" },
    { country: "Canada", shortName: "CA", purchases: 20000, flag: "🇨🇦" },
    { country: "Australia", shortName: "AU", purchases: 18000, flag: "🇦🇺" },
    { country: "Japan", shortName: "JP", purchases: 15000, flag: "🇯🇵" }
  ];

  const getPartnerStatusColor = (status) => {
    const colors = {
      'Gold Partner': 'bg-yellow-100 text-yellow-800',
      'Silver Partner': 'bg-gray-100 text-gray-800',
      'Bronze Partner': 'bg-orange-100 text-orange-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getCustomerStatusColor = (status) => {
    const colors = {
      'VIP': 'bg-purple-100 text-purple-800',
      'Premium': 'bg-blue-100 text-blue-800',
      'Regular': 'bg-green-100 text-green-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p- space-y-6">
      <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics Overview</h3>

      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Top Partners Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-yellow-500" />
                Top Partners
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPartners.map((partner) => (
                <div key={partner.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <img src={partner.logo} alt={partner.name} />
                    </Avatar>
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-gray-500">
                        {partner.deals} deals
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${partner.revenue.toLocaleString()}</div>
                    <Badge className={getPartnerStatusColor(partner.status)}>
                      {partner.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Customers Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">
              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-500" />
                Top Customers
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <img src={customer.avatar} alt={customer.name} />
                    </Avatar>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-gray-500">
                        {customer.orders} orders
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">${customer.totalSpent.toLocaleString()}</div>
                    <Badge className={getCustomerStatusColor(customer.status)}>
                      {customer.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution Card */}
        <Card className="col-span-1">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-xl font-bold">
      <div className="flex items-center gap-2">
        <Globe className="h-6 w-6 text-green-500" />
        Geographic Distribution
      </div>
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col md:flex-row">
      <div className="h-[300px] w-full md:w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={countryData}
              dataKey="purchases"
              nameKey="country"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ country, purchases, flag }) => (
                <div className="flex flex-col items-center">
                  <span className="text-sm">{flag} {country.shortName}</span>
                  <span className="text-xs">{purchases.toLocaleString()} purchases</span>
                </div>
              )}
            >
              {countryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={['#4f46e5', '#3b82f6', '#10b981', '#f97316', '#fbbf24', '#eab308', '#d97706'][index % 7]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value.toLocaleString()} purchases`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/2 pl-4 mt-4 md:mt-0">
        <h2 className="text-lg font-semibold">Country Details</h2>
        <ul className="space-y-2">
          {countryData.map((country) => (
            <li key={country.shortName} className="flex items-center">
              <span className="text-lg">{country.shortName}:</span>
              <span className="ml-2">{country.purchases.toLocaleString()} purchases</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </CardContent>
</Card>
      </div>
    </div>
  );
}