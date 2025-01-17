import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Tag,
  Settings,
  Plug,
  HelpCircle,
  LogOut,
  Menu,
  Truck
} from 'lucide-react';

const mainNavigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, color: 'text-blue-400' },
  { name: 'Orders', href: '/orders', icon: ShoppingCart, color: 'text-green-400' },
  { name: 'Products', href: '/products', icon: Package, color: 'text-purple-400' },
  { name: 'Customers', href: '/customers', icon: Users, color: 'text-orange-400' },
  { name: 'Tracking', href: '/promotions', icon: Truck, color: 'text-pink-400' },
  { name: 'Integrations', href: '/integrations', icon: Plug, color: 'text-indigo-400' },
];

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings, color: 'text-gray-400' },
];

export default function Sidebar() {
  const location = useLocation();

  const NavLink = ({ item }: any) => {
    const isActive = location.pathname === item.href;
    const Icon = item.icon;

    return (
      <Link
        to={item.href}
        className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 ${
          isActive ? 'bg-white/10 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white'
        }`}
      >
        <Icon
          className={`mr-3 transition-colors ${
            isActive ? 'text-white h-5 w-5' : `${item.color} group-hover:text-white`
          }`}
        />
        {item.name} {/* Always show the name */}
      </Link>
    );
  };

  return (
    <div className={`flex flex-col pt-[3rem] bg-gray-900 text-white h-screen w-64`}>
      <div className="flex items-center justify-between h-16 px-4 bg-gray-900">
        <div className="text-xl mt-[2rem] font-bold">Your Logo</div>
      </div>

      {/* Main navigation */}
      <div className="flex flex-col flex-1 pt-5 pb-4">
        <nav className="flex-1 px-3 space-y-1">
          {mainNavigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </nav>

        {/* Bottom navigation */}
        <div className="px-3 py-4 mt-auto space-y-1 border-t border-gray-700">
          {bottomNavigation.map((item) => (
            <NavLink key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}