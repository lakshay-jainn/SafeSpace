import SingleCommunity from "./SingleCommunity";
import useFetchCommunities from "@/api/hooks/useFetchCommunities";
import {InitialCommunitiesResponse} from "@/api/types/FeedsTypes";
import {memo} from 'react'
const Communities = memo(() => {
    const [communities,loading,error]=useFetchCommunities();
    if(loading){
        return <div>Communities are loading</div>
    }
    if (error){
        return <div>Something went wrong please refresh {error}</div>
    }
    if (!communities){
        return <div>No communities to show</div>
    }
    


    return (
        <div className="flex flex-col gap-5">
        {communities.map((community : InitialCommunitiesResponse)=>(
            <SingleCommunity key={community.id} {...community}/>
        ))}
        </div>
    )

})
export default Communities;