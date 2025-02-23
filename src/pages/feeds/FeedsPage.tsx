import Feeds from "./components/Feeds"
import ScrollbarCss from "@/scrollbarCss/ScrollbarCss"
import CreatePost from "./components/CreatePost"
import { useOutletContext } from 'react-router-dom';

export default function FeedsPage() {
    const {fetchAgain,setFetchAgain} = useOutletContext<{fetchAgain:boolean,setFetchAgain:(value: (newValue : boolean)=>boolean )=>void}>()!;
    return (
        <>
        <div className={`w-full flex-1 overflow-y-scroll px-5 ${ScrollbarCss} md:overflow-visible md:flex-[0.5] pt-5`}>
            <div className="hidden md:block">
                <CreatePost setFetchAgain={setFetchAgain} />
            </div>
            
            <Feeds fetchAgain={fetchAgain} />
        </div>
        <div className="w-full hidden md:block md:flex-[0.25]">
                <div className="p-6">
                    <button onClick={()=>console.log('hello')} className="w-full bg-black text-white rounded-lg py-2">
                        sort
                    </button>
                <h1>yoo yoo</h1>
                </div>
        </div>

        </>
       
    )
}


//container mx-auto py-8 space-y-8
//bg-linear-to-r from-orange-100 to-emerald-100