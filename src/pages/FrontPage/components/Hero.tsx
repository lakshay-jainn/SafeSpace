import styles from './Hero.module.css'
import { Button } from "./Button";
import { useNavigate } from 'react-router-dom';
export const Hero = () => {
  const navigate=useNavigate()
  return <div className="relative bg-linear-to-b from-indigo-50 via-purple-50 to-white pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-4 top-1/4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob" />
        <div className="absolute -right-4 top-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000" />
        <div className="absolute left-1/2 bottom-1/4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center relative z-10">
          <div className="inline-block mb-8">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-indigo-100/95 text-indigo-800 shadow-xs">
              🚀 Welcome to the Future of Social Media
            </span>
          </div>
          <div className="relative">
            <h1 className={` ${styles.afterHeroText} text-5xl sm:text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent drop-shadow-xs`} >
              A Safe Space for Every Voice
            </h1>
           
          </div>
          <p className="text-xl md:text-2xl text-gray-800 mb-8 max-w-2xl mx-auto leading-relaxed font-medium">
            AI-powered social platform ensuring positivity, privacy, and
            protection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={()=>navigate('/feeds')} className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
              Join Now
            </Button>
            <Button variant="secondary" className="text-lg px-8 py-4">
              <a href="#features">
              Learn More
              </a>
              
            </Button>
          </div>
        </div>
      </div>
    </div>;
};