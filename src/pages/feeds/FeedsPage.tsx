import Feeds from "./components/Feeds"
import ScrollbarCss from "@/scrollbarCss/ScrollbarCss"
import CreatePost from "./components/CreatePost"
import { useOutletContext } from 'react-router-dom';
import Communities from "./components/Communities";
import { Outlet } from "react-router-dom";
export default function FeedsPage() {
    const {fetchAgain,setFetchAgain} = useOutletContext<{fetchAgain:boolean,setFetchAgain:(value: (newValue : boolean)=>boolean )=>{}}>()!;
    return (
        <>
        {/*  feeds that is scrollable  */}
        <div className={`w-full px-5 ${ScrollbarCss} pt-5 flex-1 md:flex-[0.70]`}>
            <div className="hidden md:block">
                <CreatePost setFetchAgain={setFetchAgain} />
            </div>
            <Outlet context={{fetchAgain,setFetchAgain}} />
            
        </div>
        {/*  sticky communities tab  */}
        <div className="hidden md:block flex-[0.30] sticky top-0 h-screen p-5">
            <Communities />
        </div>
        

        </>
       
    )
}


//container mx-auto py-8 space-y-8
//bg-linear-to-r from-orange-100 to-emerald-100