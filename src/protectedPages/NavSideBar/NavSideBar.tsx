// Sidebar.jsx

import { NavLink } from 'react-router-dom';
import { Home, Compass, Bell, Mail, User, Settings } from 'lucide-react';

const NavSideBar = () => {
  const navItemClass = ({ isActive }:{isActive: boolean }) =>
    `flex items-center p-3 rounded-lg transition-colors 
    ${isActive ? 'bg-red-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`;

  return (
    <aside className=" min-h-screen bg-white border-gray-200 sticky top-0 p-6 z-10">
      <div className="mb-10 text-center">
        {/* Replace with your own logo */}
        <img src="/logo.png" alt="SafeSpace" className="mx-auto max-w-xs" />
      </div>
      <nav className="flex flex-col space-y-4">
        <NavLink to="/feeds" className={navItemClass}>
          <Home className="w-5 h-5 mr-3" />
          <span className="text-base">Home</span>
        </NavLink>
        <NavLink to="/explore" className={navItemClass}>
          <Compass className="w-5 h-5 mr-3" />
          <span className="text-base">Explore</span>
        </NavLink>
        <NavLink to="/notifications" className={navItemClass}>
          <Bell className="w-5 h-5 mr-3" />
          <span className="text-base ">Notifications</span>
        </NavLink>
        <NavLink to="/messages" className={navItemClass}>
          <Mail className="w-5 h-5 mr-3" />
          <span className="text-base">Messages</span>
        </NavLink>
        <NavLink to="/profile" className={navItemClass}>
          <User className="w-5 h-5 mr-3" />
          <span className="text-base">Profile</span>
        </NavLink>
        <NavLink to="/settings" className={navItemClass}>
          <Settings className="w-5 h-5 mr-3" />
          <span className="text-base">Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default NavSideBar;
