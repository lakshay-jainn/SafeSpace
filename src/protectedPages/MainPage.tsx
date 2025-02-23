import { Outlet } from "react-router-dom";
import NavSideBar from "@/pages/feeds/components/NavSideBar";
import {Dialog,DialogTrigger,DialogContent,DialogTitle,DialogDescription} from '@/components/ui/dialog';
import {Menu,CirclePlus} from 'lucide-react'
import ScrollbarCss from "@/scrollbarCss/ScrollbarCss";
import { useState } from "react";
import CreatePost from "@/pages/feeds/components/CreatePost";
function MainPage(){
    const [sidebarModal,setSidebarModal] = useState(false);
    const [createPostModal,setCreatePostModal] = useState(false);
    const [fetchAgain,setFetchAgain] = useState(false);
    return (
        <main className={`overflow-hidden md:overflow-y-scroll ${ScrollbarCss}`}>
        <section className="w-full h-screen flex flex-col md:flex-row md:max-w-(--breakpoint-xl) mx-auto"> 
            {/* mobile header*/}
            <header className="md:hidden z-10 flex border-b-2 bg-white justify-between items-center px-5 py-2">
                <Dialog open={sidebarModal} onOpenChange={setSidebarModal}>
                    <DialogTrigger asChild>
                        <button onClick={()=>setSidebarModal(true)} className="bg-gradient-to-r from-red-400 to-orange-400 h-fit rounded-2xl p-3">
                            <Menu className="w-6 h-6 text-white" />
                        </button>
                    </DialogTrigger>
                    <DialogContent className="top-0 left-0 right-0 border-0 translate-0 h-screen">
                        <DialogTitle>
                            SafeSpace
                        </DialogTitle>
                        <NavSideBar setSidebarModal={setSidebarModal}/>
                    </DialogContent>
                </Dialog>

            <img className="w-15 h-15 " src="https://res.cloudinary.com/dx4uiowkr/image/upload/v1740250460/logo/dfhejwjjz6u7acefnmsm.png" alt="niga" />
            <img className="w-15 h-15" src="https://res.cloudinary.com/dx4uiowkr/image/upload/v1740250460/logo/dfhejwjjz6u7acefnmsm.png" alt="niga" />
            </header>
            {/* mobile footer*/}

            {/*desktop sidebar*/}
            <div className="hidden md:block flex-[0.25]">
            <NavSideBar />
            </div>
                <Outlet context={{fetchAgain,setFetchAgain}} />
            

            <footer className="md:hidden z-40 flex border-t-2 bg-white items-center px-5 py-2 justify-around">
                <Dialog open={createPostModal} onOpenChange={setCreatePostModal}>
                        <DialogTrigger asChild>
                            <button onClick={()=>setCreatePostModal(true)} className="bg-gradient-to-r from-red-400 to-orange-400 h-fit rounded-full p-3">
                                <CirclePlus className="w-6 h-6 text-white" />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl">
                        <DialogDescription></DialogDescription>
                            <DialogTitle>
                            </DialogTitle>
                            <CreatePost setFetchAgain={setFetchAgain} setCreatePostModal={setCreatePostModal}/>
                        </DialogContent>
                        
                    </Dialog>

            </footer>
        </section>
        </main>
    )
}

export default MainPage;

