
import { useParams } from "react-router-dom"
import CommunityFeeds from "./components/CommunityFeeds";
import { useState } from "react";
import CreatePost from "../feeds/components/CreatePost";
import Communities from "../feeds/components/Communities";
function CommunityPage(){
    const {communityId} = useParams();
    const [FetchCommunityFeedsAgain,setFetchCommunityFeedsAgain]=useState(false)
    
    return (
        <>
        {/*  feeds that is scrollable  */}
        <div className={`w-full px-5 pt-5 flex-1 md:flex-[0.70]`}>
            <div className="hidden md:block">
                <CreatePost setFetchAgain={setFetchCommunityFeedsAgain} />
            </div>
           
            <CommunityFeeds communityId={communityId} fetchAgain={FetchCommunityFeedsAgain} />
        </div>
        {/*  sticky communities tab  */}
        <div className="hidden md:block flex-[0.30] sticky top-0 h-screen p-5">
            <Communities />
        </div>
        

        </>
    )
}

export default CommunityPage









//container mx-auto py-8 space-y-8
//bg-linear-to-r from-orange-100 to-emerald-100