import { Outlet } from "react-router-dom";
import NavSideBar from "./NavSideBar/NavSideBar";
import useGlobalAuth from "@/Auth/useGlobalAuth";
function MainPage(){
    const {handleProtectedAction}  = useGlobalAuth();
    const handle =() =>{
        console.log('shup')
    }
    return (
        <main className="w-full h-full block md:flex md:max-w-(--breakpoint-xl) mx-auto">   
            <div className="hidden md:block flex-[0.25]">
            <NavSideBar />
            </div>
            <div className="w-full  md:hidden">
                <header className="p-4">
                    <nav >
                        <ul className="flex justify-between">
                            <li>Home</li>
                            <li>Explore</li>
                            <li>Notifications</li>
                            <li>Messages</li>
                            <li>Profile</li>
                            <li>Settings</li>
                        </ul>
                    </nav>
                </header>
            </div>
            <div className="w-full md:flex-[0.5]">
            <Outlet />
            </div>
            
            <div className="w-full hidden md:block md:flex-[0.25]">
                <div className="p-6">
                    <button onClick={()=>handleProtectedAction(handle)} className="w-full bg-black text-white rounded-lg py-2">
                        sort
                    </button>
                <h1>yoo yoo</h1>
                </div>
           
            </div>
        </main>
    )
}

export default MainPage;

