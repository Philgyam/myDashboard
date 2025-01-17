import  { useState, useEffect } from 'react';
import TopAnalytics from './Analytics';
import ann from '../images/anno.png'
import bg from '../images/bg.png'
import product1 from '../images/item1.png'
import product2 from '../images/item6.jpg'
import product3 from '../images/item7.png'
import product4 from '../images/home1.png'
import { Button } from '../components/ui/button';


import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import {
  DollarSign, ShoppingBag, Users, TrendingUp, Package,
  ArrowUpRight, ArrowDownRight, Star, Rocket , Box, Loader,  Truck, User
} from 'lucide-react';

const salesByCategory = [
  { name: 'Electronics', value: 35 },
  { name: 'Clothing', value: 25 },
  { name: 'Home & Garden', value: 20 },
  { name: 'Books', value: 15 },
  { name: 'Others', value: 5 },
];

const customerFeedback = [
  {
    id: 1,
    customerName: "Alice Johnson",
    comment: "Great service and friendly staff!",
    date: "2023-10-01",
  },
  {
    id: 2,
    customerName: "Bob Smith",
    comment: "The product quality exceeded my expectations.",
    date: "2023-10-02",
  },
  {
    id: 3,
    customerName: "Charlie Brown",
    comment: "I had a wonderful experience shopping here.",
    date: "2023-10-03",
  },
  {
    id: 4,
    customerName: "Diana Prince",
    comment: "Fast delivery and excellent customer support.",
    date: "2023-10-04",
  },
  {
    id: 5,
    customerName: "Eve Adams",
    comment: "I would highly recommend this to my friends!",
    date: "2023-10-05",
  },
];


const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231',
    change: '+20.1%',
    isPositive: true,
    icon: DollarSign,
    detail: 'vs last month'
  },
  
  {
    name: 'Orders',
    value: '356',
    change: '+12.5%',
    isPositive: true,
    icon: ShoppingBag,
    detail: 'vs last month'
  },
  {
    name: 'Customers',
    value: '2,103',
    change: '+18.2%',
    isPositive: true,
    icon: Users,
    detail: 'vs last month'
  },
  {
    name: 'Product returned',
    value: '3.2%',
    change: '-2.3%',
    isPositive: false,
    icon: TrendingUp,
    detail: 'vs last month'
  },
];

const salesDataByStore = {
  store1: [
    { name: 'Mobile Phones', value: 40 },
    { name: 'Laptops', value: 30 },
    { name: 'Monitors', value: 20 },
    { name: 'accessories', value: 10 },
  ],
  store2: [
    { name: 'Tables', value: 50 },
    { name: 'Chairs', value: 25 },
    { name: 'Utensils', value: 15 },
    { name: 'kitchen wares', value: 10 }, // Different item for store2
  ],
  store3: [
    { name: 'Jeans', value: 30 },
    { name: 'Shoes', value: 35 },
    { name: 'Suits', value: 20 },
    { name: 'Casual Wears', value: 10 },
    { name: 'Others', value: 5 }, // Different item for store3
  ],
};

const recentOrders = [
  { id: '1234', customer: 'John Doe', amount: '$156.00', status: 'Completed', product: 'Wireless Headphones', date: '1 hour ago' },
  { id: '1235', customer: 'Jane Smith', amount: '$289.99', status: 'Processing', product: 'Smart Watch', date: '3 hours ago' },
  { id: '1236', customer: 'Mike Johnson', amount: '$99.99', status: 'Pending', product: 'Phone Case', date: '5 hours ago' },
  { id: '1237', customer: 'Sarah Williams', amount: '$499.99', status: 'Completed', product: 'Laptop Stand', date: '8 hours ago' }
];

const topProducts = [
  { name: 'Play Station5',  image: product1,  sales: 892, revenue: '$89,200', rating: 4.8 },
  { name: 'Smart Watch Elite',   image: product2,  sales: 645, revenue: '$128,355', rating: 4.6 },
  { name: 'Premium Iphone',   image: product3,  sales: 410, revenue: '$16,400', rating: 4.9 },
  { name: 'Smart Watch Elite2',   image: product2,  sales: 205, revenue: '$128,355', rating: 4.6 },

];

const storeData = {
  store1: { currentOrders: 15, processedOrders: 25, totalItems: 300,  totalSold: 180, OrdersLocal: 40, OrdersInt: 20, completedOrders: 270, totalSalesToday: '$13,200', totalReturns: '5' },
  store2: { currentOrders: 30, processedOrders: 15, totalItems: 200, totalSold: 102, OrdersLocal: 23, completedOrders:15, totalSalesToday: '$1,500', totalReturns: '3' },
  store3: { currentOrders: 15,processedOrders: 20, totalItems: 100, totalSold: 78, OrdersLocal: 17, completedOrders: 5, totalSalesToday: '$800', totalReturns: '2' },
};

const monthlyData = {
  store1: [
    { name: 'Jan', revenue: 4000, orders: 150, customers: 120 },
    { name: 'Feb', revenue: 3000, orders: 130, customers: 90 },
    { name: 'Mar', revenue: 2000, orders: 90, customers: 70 },
    { name: 'Apr', revenue: 2780, orders: 110, customers: 85 },
    { name: 'May', revenue: 1890, orders: 80, customers: 60 },
    { name: 'Jun', revenue: 2390, orders: 95, customers: 75 },
  ],
  store2: [
    { name: 'Jan', revenue: 5000, orders: 200, customers: 150 },
    { name: 'Feb', revenue: 4000, orders: 180, customers: 130 },
    { name: 'Mar', revenue: 3000, orders: 160, customers: 110 },
    { name: 'Apr', revenue: 3500, orders: 190, customers: 140 },
    { name: 'May', revenue: 4500, orders: 220, customers: 160 },
    { name: 'Jun', revenue: 4800, orders: 210, customers: 170 },
  ],
  store3: [
    { name: 'Jan', revenue: 2000, orders: 100, customers: 80 },
    { name: 'Feb', revenue: 2500, orders: 120, customers: 90 },
    { name: 'Mar', revenue: 2300, orders: 110, customers: 85 },
    { name: 'Apr', revenue: 2700, orders: 130, customers: 95 },
    { name: 'May', revenue: 2900, orders: 150, customers: 100 },
    { name: 'Jun', revenue: 3100, orders: 160, customers: 110 },
  ],
};

const COLORS = ['#4F46E5', '#7C3AED', '#EC4899', '#F59E0B', '#10B981'];

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('Monthly');
  const [showRevenue, setShowRevenue] = useState(true);
  const [animatedData, setAnimatedData] = useState([]);
  const [selectedStore, setSelectedStore] = useState('store1');
  const [loading, setLoading] = useState(false);
  const [salesByCategory, setSalesByCategory] = useState(salesDataByStore.store1); // Default to store1

  const animateBars = () => {
    const targetKey = showRevenue ? 'revenue' : 'orders';
    const newData = monthlyData[selectedStore].map(entry => ({
      name: entry.name,
      Value: entry[targetKey]
    }));
    setAnimatedData(newData);
  };

  useEffect(() => {
    animateBars();
  }, [showRevenue, selectedStore]);

  const handleStoreChange = (e) => {
    setLoading(true);
    const newStore = e.target.value;
    setSelectedStore(newStore);
    setSalesByCategory(salesDataByStore[newStore]); // Update sales by category
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const currentStoreData = storeData[selectedStore];

  return (
    <div className="min-h-screen bg-gray-50 p-6 bg-white  h-full">
      <div className="mx-auto space-y-6 h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <select
              className="bg-white border border-gray-300 rounded-md px-4 py-2"
              value={selectedStore}
              onChange={handleStoreChange}
            >
              <option value="store1">All Stores</option>
              <option value="store2">Store 2</option>
              <option value="store3">Store 3</option>
            </select>
         
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 px-3">
  {/* Welcome Message */}
  <div className="bg-green-100 rounded-xl shadow-lg p-6 transition-all hover:shadow-xl col-span-full">
  <h2 className="text-lg font-semibold text-gray-900 flex items-center">
    <span role="img" aria-label="heart" className="mr-2">❤️</span>
    Hello Jane! Welcome to your dashboard!
  </h2>
  <p className="mt-2 text-sm text-gray-700">
    Here’s an overview of your current stats. Let’s get started!
  </p>
  <div className="mt-4">
    <Button variant="solid" className="bg-indigo-600 text-white hover:bg-indigo-700">
      Explore Now
    </Button>
  </div>
</div>

  {stats.map((stat) => {
    const Icon = stat.icon;
    return (
      <div key={stat.name} className="bg-white border-4 rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="p-3 bg-indigo-50 rounded-lg">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {stat.change}
                </div>
              </dd>
              <dd className="text-xs text-gray-500 mt-1">{stat.detail}</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  })}
</div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Stats Cards Section */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  h-full">
          {loading ? (
  <div className="flex justify-center items-center h-full">
    <Loader className="h-10 w-10 text-indigo-600 animate-spin" />
  </div>
) : (
  <>
    <div className="bg-indigo-50 rounded-xl border-4  flex flex-col p-4 h-full items-center ">
      <div className="flex items-center mb-2">
        <div className="bg-indigo-100 p-2 rounded-full">
          <DollarSign className="h-6 w-6 text-indigo-600" />
        </div>
        <span className="text-sm font-medium text-indigo-600 ml-2">Current Orders</span>
      </div>
      <div className="flex justify-center text-center">
        
        <div className="mx-2">
          <p className="text-xl font-bold text-gray-900">{currentStoreData.currentOrders}</p>
          <p className="text-gray-900">Processed</p>
        </div>
        <div className="mx-2">
          <p className="text-xl font-bold text-gray-900">{currentStoreData.processedOrders}</p>
          <p className="text-gray-900">Processing</p>
        </div>
        <div className="mx-2">
          <p className="text-xl font-bold text-gray-900">{currentStoreData.processedOrders + currentStoreData.currentOrders }</p>
          <p className="text-gray-900">Total</p>
        </div>
      </div>
    
    </div>

    <div className="bg-green-50 rounded-xl flex border-4  flex-col p-4 h-full  items-center ">
      <div className="flex items-center mb-2">
        <div className="bg-green-100 p-2 rounded-full">
          <Package className="h-6 w-6 text-green-600" />
        </div>
        <span className="text-sm font-medium text-green-600 ml-2">Store Items</span>
      </div>
      <div className="flex justify-center text-center">
        <div className="mx-2">
          <p className="text-xl font-bold text-gray-900">{currentStoreData.totalItems}</p>
          <p className="text-gray-900">Total</p>
        </div>
        <div className="mx-2">
          <p className="text-xl font-bold text-gray-900">{currentStoreData.totalSold}</p>
          <p className="text-gray-900">Sold</p>
        </div>
      </div>
    </div>

    <div className="bg-yellow-50 rounded-xl border-4  flex flex-col p-4 h-full items-center">
      <div className="flex items-center mb-2">
        <div className="bg-yellow-100 p-2 rounded-full">
          <Truck className="h-6 w-6 text-yellow-600" />
        </div>
        <span className="text-sm font-medium text-yellow-600 ml-2">Package Delivery</span>
      </div>
      <div className="flex justify-center text-center">
        <div className="mx-2">
          <p className="text-xl font-bold text-gray-900">{currentStoreData.OrdersLocal}</p>
          <p className="text-gray-900">Local</p>
        </div>
        <div className="mx-2">
          <p className="text-xl font-bold text-gray-900">{currentStoreData.OrdersInt}</p>
          <p className="text-gray-900">International</p>
        </div>
      </div>
    </div>

    <div className="bg-blue-50 rounded-xl border-4 flex flex-col p-4 h-full items-center ">
      <div className="flex items-center mb-2">
        <div className="bg-blue-100 p-2 rounded-full">
          <ArrowDownRight className="h-6 w-6 text-blue-600" />
        </div>
        <span className="text-sm font-medium text-blue-600 ml-2">Returned Products</span>
      </div>
      <p className="text-xl font-bold text-gray-900 text-center">{currentStoreData.completedOrders}</p>
      <p className="text-gray-900">items returned</p>
    </div>
  </>
)}

</div>
        
          {/* Revenue / Orders Overview Chart */}
          <div className="bg-white border-4 border-blue-100 rounded-xl shadow-sm p-6 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Revenue / Orders Overview</h3>
              <div className="flex space-x-2">
                <button
                  className={`px-3 py-1 text-sm rounded-md ${showRevenue ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setShowRevenue(true)}
                >
                  Revenue
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-md ${!showRevenue ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                  onClick={() => setShowRevenue(false)}
                >
                  Orders
                </button>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={animatedData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="Value"
                    fill="#4F46E5"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={500}
                    barSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Category Chart */}
          <div className="bg-white border-4 border-purple-100 rounded-xl shadow-sm p-6 h-full">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h3>
  <div className="h-80 flex justify-center items-center">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={salesByCategory}
          innerRadius={60}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          {salesByCategory.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>
  <div className="grid grid-cols-2 gap-4 mt-4">
    {salesByCategory.map((category, index) => (
      <div key={category.name} className="flex items-center">
        <div
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        />
        <span className="text-sm text-gray-600">
          {category.name} <span className="font-medium text-gray-900">{category.value}%</span>
        </span>
      </div>
    ))}
  </div>
</div>

        </div>

      {/* Recent Orders, Top Products, and Recent Customer Feedback */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Recent Orders */}
  <div 
  className="bg-green-50 rounded-xl border-4 border-green-200 shadow-sm p-6 h-full relative" 
  style={{
    position: 'relative',
    overflow: 'hidden'
  }}
>
  {/* Background Image */}
  <div 
    style={{
      backgroundImage: `url(${bg})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat',
      position: 'absolute', // Positioning it absolutely
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.3, // Adjust opacity for fading effect
      zIndex: 1 // Ensures it's behind the content
    }} 
  />

  {/* Overlay for better readability */}
  <div 
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white overlay
      zIndex: 2 // Above the background image but below content
    }} 
  />

  <h3 className="text-lg font-semibold text-green-900 mb-4 relative z-10">Ways to Boost Sales</h3>
  
  <div className="flex relative z-10">
    {/* Image Section */}
    <div className="w-1/2 flex-shrink-0">
      <img src={ann} alt="Boost Sales" className="h-full w-full  object-cover rounded-lg" />
    </div>

    {/* Text Section */}
    <div className="w-1/2 flex flex-col justify-center pl-4">
      <ul className="space-y-4">
        <li className="text-md font-medium text-green--00">1. Set Up Partnerships</li>
        <li className="text-md font-medium text-green-800">2. Use Our Email and Social Media Integration</li>
        <li className="text-md font-medium text-green-800">3. Leverage Customer Feedback</li>
      </ul>
      <div className="mt-4">
        <button className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition duration-200 flex items-center justify-center">
          <Rocket className="mr-2 h-5 w-5" />
          Boost Sales
        </button>
      </div>
    </div>
  </div>
</div>


  {/* Top Products */}
  <div className="bg-white rounded-xl shadow-sm p-6 h-full">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
  <div className="flow-root">
    <ul className="divide-y divide-gray-200">
      {topProducts.map((product) => (
        <li key={product.name} className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={product.image} // Use the product image
                  alt={product.name}
                  className="h-10 w-10 rounded-lg object-cover" // Style the image
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{product.name}</p>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{product.revenue}</p>
              <p className="text-sm text-gray-500">{product.sales} sales</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
</div>

  {/* Recent Customer Feedback */}
  <div className="bg-white rounded-xl shadow-sm p-6 h-full">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Customer Feedback</h3>
    <div className="flow-root">
      <ul className="divide-y divide-gray-200">
        {customerFeedback.map((feedback) => (
          <li key={feedback.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{feedback.customerName}</p>
                <p className="text-sm text-gray-500 truncate">{feedback.comment}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{feedback.date}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>
<TopAnalytics/>

      </div>
      
    </div>
  );
}