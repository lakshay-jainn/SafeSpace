// Sidebar.jsx

import { NavLink,useNavigate } from 'react-router-dom';
import { Home, Compass, Bell, Mail, User, Settings,LogOut,LogIn } from 'lucide-react';
import useGlobalAuth from '@/Auth/useGlobalAuth';
import useFetchUserDetails from '@/api/hooks/useFetchUserDetails';
import { useEffect } from 'react';
import { InitialUserDetailsResponse } from '@/api/types/FeedsTypes';
const NavSideBar = ({setSidebarModal  = (value:boolean) => {}}) => {
  let userDetails : (Partial<InitialUserDetailsResponse>) = {};
  let loading;
  let error;

  const navigate = useNavigate();
  const { handleProtectedAction ,isLoggedIn,Logout} = useGlobalAuth();

  if (isLoggedIn){
    [userDetails,loading,error] = useFetchUserDetails();
  }


  const handleNavItemClick = (event : any) => {
    const target = event.target.closest('[data-navlink]');
    if (!target) return;
    const href =target.getAttribute('href');
    event.preventDefault()
    setSidebarModal(false)
    handleProtectedAction(() => navigate(href));
  }

  const navItemClass = ({ isActive }:{isActive: boolean }) =>
    `flex items-center p-3 rounded-lg transition-colors 
    ${isActive ? 'bg-gradient-to-r from-red-400 to-orange-400 text-white' : 'text-gray-700 hover:bg-gray-100'}`;

  return (
    <aside className=" min-h-screen bg-white border-gray-200 sticky top-0 p-6 z-10">
      <div className="mb-2 text-center flex gap-3 items-center">
        {/* Replace with your own logo */}
        <img src="https://res.cloudinary.com/dx4uiowkr/image/upload/v1740250460/logo/dfhejwjjz6u7acefnmsm.png" alt="SafeSpace" className="w-15 h-15" />
        <h1 className="text-2xl font-bold">SafeSpace</h1>
      </div>
      {isLoggedIn && userDetails && userDetails.id && (
        <div className='flex gap-5'>
          <img className='w-7 rounded-full h-7 mb-5' src={`${userDetails.profileImage}`} alt="" />
          <p>{userDetails.username}</p>
        </div>
      )}
      <nav className="flex flex-col space-y-4" onClickCapture={handleNavItemClick}>
        <NavLink to="/feeds" className={navItemClass} onClick={()=>setSidebarModal(false)}>
          <Home className="w-5 h-5 mr-3" />
          <span className="text-base">Home</span>
        </NavLink>
        <NavLink to="/explore" className={navItemClass} data-navlink>
          <Compass className="w-5 h-5 mr-3" />
          <span className="text-base">Explore</span>
        </NavLink>
        <NavLink to="/notifications" className={navItemClass} data-navlink>
          <Bell className="w-5 h-5 mr-3" />
          <span className="text-base ">Notifications</span>
        </NavLink>
        <NavLink to="/messages" className={navItemClass} data-navlink>
          <Mail className="w-5 h-5 mr-3" />
          <span className="text-base">Messages</span>
        </NavLink>
        <NavLink to="/profile" className={navItemClass} data-navlink>
          <User className="w-5 h-5 mr-3" />
          <span className="text-base">Profile</span>
        </NavLink>
        <NavLink to="/settings" className={navItemClass} data-navlink>
          <Settings className="w-5 h-5 mr-3" />
          <span className="text-base">Settings</span>
        </NavLink>
        {
          isLoggedIn ? (
            <NavLink to="/feeds" className='flex justify-between items-center p-3 rounded-lg transition-colors text-white bg-gradient-to-r from-rose-400 to-red-500' onClick={()=>{Logout()}} data-navlink>
            <span className="text-base">Logout</span>
            <LogOut className="w-5 h-5 " />
          </NavLink>
          ) : (
            <NavLink to="/feeds" className='flex justify-between items-center p-3 rounded-lg transition-colors text-white bg-gradient-to-r from-[#28A745] to-[#17A2B8]'  data-navlink>
            <span className="text-base">Login</span>
            <LogIn className="w-5 h-5 " />
          </NavLink>
          )
        }

      </nav>
    </aside>
  );
};

export default NavSideBar;
