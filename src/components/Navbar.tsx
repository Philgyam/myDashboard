import { Bell, Settings, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import dp from '../images/dp.jpg';
import { useState, useEffect, useRef } from 'react';
import AdminModal from './adminModal';
export default function Navbar() {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isUserDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility

  const notificationRef = useRef(null);
  const userDropdownRef = useRef(null);

  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
    if (isUserDropdownOpen) setUserDropdownOpen(false); // Close user dropdown if open
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!isUserDropdownOpen);
    if (isNotificationOpen) setNotificationOpen(false); // Close notification dropdown if open
  };

  const handleAddAdminClick = () => {
    setModalOpen(true); // Open the modal
    setUserDropdownOpen(false); // Close user dropdown if open
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current && !notificationRef.current.contains(event.target) &&
        userDropdownRef.current && !userDropdownRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-gray-900 text-white shadow-md">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-lg font-bold text-white">MyLogo</Link>
    
            {/* Icons and User Profile */}
            <div className="flex items-center space-x-6">
              {/* Notification Bell */}
              <div className="relative" ref={notificationRef}>
                <button
                  onClick={toggleNotification}
                  className="relative p-2 text-white hover:text-gray-300"
                >
                  <span className="sr-only">View notifications</span>
                  <Bell className="w-6 h-6" />
                  {/* Notification Badge */}
                  <span className="absolute top-0 right-0 block w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-gray-900 animate-pulse"></span>
                </button>
    
                {/* Notification Dropdown */}
                {isNotificationOpen && (
                  <div className="absolute left-[-4rem] mt-2 w-64 bg-white rounded-md shadow-lg z-20">
                    <div className="p-2 text-gray-700">
                      <p className="font-semibold">Notifications</p>
                      <ul>
                        <li className="px-4 py-2 hover:bg-gray-100">Kwasi placed an order. Check your orders tab.</li>
                        <li className="px-4 py-2 hover:bg-gray-100">Products have been viewed by users. Check tracking tab.</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
    
              {/* Settings */}
              <Link
                to="/settings"
                className="p-2 text-white hover:text-gray-300"
              >
                <span className="sr-only">Settings</span>
                <Settings className="w-6 h-6" />
              </Link>
    
              {/* User Avatar with Dropdown */}
              <div className="relative flex items-center" ref={userDropdownRef}>
                <div className="w-10 h-10 p-1 border-2 border-green-400 rounded-full overflow-hidden">
                  <img
                    src={dp} // Replace with user image URL
                    alt="User Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="hidden ml-3 text-sm font-medium text-white lg:block">
                  <p>Welcome Jane</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
                {/* Dropdown Arrow */}
                <button
                  onClick={toggleUserDropdown}
                  className="ml-2 text-white hover:text-gray-300 transition duration-150"
                >
                  <ChevronDown />
                </button>
    
                {/* User Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-[10rem] w-48 bg-white rounded-md shadow-lg z-20">
                    <Link to="/setting" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</Link>
                    <button 
                      onClick={handleAddAdminClick} 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Add an Admin
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Modal */}
      <AdminModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}