import SingleCommunity from "./SingleCommunity";
import useFetchCommunities from "@/api/hooks/useFetchCommunities";
import {InitialCommunitiesResponse} from "@/api/types/FeedsTypes";
import {memo} from 'react'
const Communities = memo(() => {
    const [communities,loading,error]=useFetchCommunities();
    console.log(communities)
    const navItemClass = ({ isActive }:{isActive: boolean }) =>
        `flex items-center p-3 rounded-lg transition-colors 
        ${isActive ? 'bg-gradient-to-r from-red-400 to-orange-400 text-white' : 'text-gray-700 hover:bg-gray-100'}`;
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
            <SingleCommunity navItemClass={navItemClass} key={community.id} {...community}/>
        ))}
        </div>
    )

})
export default Communities;