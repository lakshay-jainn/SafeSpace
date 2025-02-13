import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
export const NavBar = () => {
  const navigate = useNavigate();
  return <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent flex items-center gap-3">
          <img className='w-15 h-15' src="safespace.png" /> 
            SafeSpace
          </div>
          <div className="hidden sm:flex space-x-8 items-center">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Features
            </a>
            <a href="#creators" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Creators
            </a>
            <Button onClick={()=>navigate('/feeds')} variant="secondary" className="shadow-xs hover:shadow-sm">
              Sign In
            </Button>
            <Button  onClick={()=>navigate('/feeds')} className="shadow-md hover:shadow-lg">Go to Feeds!</Button>
          </div>
        </div>
      </div>
    </nav>;
};