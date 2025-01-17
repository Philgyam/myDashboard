import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Menu, X } from 'lucide-react'; // Importing icons for toggle button

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile toggle
  const [isCollapsed, setIsCollapsed] = useState(false); // For desktop collapse
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation(); // Get the current location

  useEffect(() => {
    const checkIsMobile = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);
      if (!mobileView) {
        setIsSidebarOpen(true); // Open sidebar for desktop
        setIsCollapsed(false); // Ensure sidebar is expanded on desktop
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  useEffect(() => {
    // Close the sidebar when the route changes on mobile
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location, isMobile]); // Dependency array includes location and isMobile

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleCollapse = () => {
    if (!isMobile) {
      setIsCollapsed((prev) => !prev); // Only collapse/expand on desktop
    }
  };

  return (
    <div className="bg-white-50 min-h-screen mb-4 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} toggleCollapse={toggleCollapse} />

      {/* Toggle Icon for Mobile */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`
            absolute top-16 mt-2 left-8 z-40 w-10 p-2 rounded-full mb-2
            transition-all duration-300
            ${isSidebarOpen ? 'left-[13rem] bg-white' : 'left-2 bg-black'} // Adjusts position based on sidebar state
          `}
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-gray-700" /> // Close icon
          ) : (
            <Menu className="w-6 h-6 text-white" /> // Menu icon
          )}
        </button>
      )}

      <div className="flex flex-grow relative">
        {/* Overlay for mobile */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-20"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed top-0 left-0 h-full z-30 transition-transform duration-300
            ${isMobile ? 'w-64' : (isCollapsed ? 'w-16' : 'w-64')}
            ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
          `}
        >
          <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content */}
        <main
          className={`
            flex-grow transition-all duration-300
            ${!isMobile && (isSidebarOpen ? 'md:ml-64' : 'md:ml-16')}
            ${isMobile ? 'w-full' : ''}
          `}
        >
          <div className="lg:pt-0 pt-[4rem]"> {/* Add padding to create space */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}