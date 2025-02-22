import { Outlet } from "react-router-dom";
export default function FeedsPage(){
    return (
        <main className="w-full h-full relative">
            <Outlet />
        </main>
    )
}


//container mx-auto py-8 space-y-8
//bg-linear-to-r from-orange-100 to-emerald-100