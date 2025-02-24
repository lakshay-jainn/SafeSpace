import { useParams } from "react-router-dom";
import SingleFeed from "./components/SingleFeed";
import ScrollbarCss from "@/scrollbarCss/ScrollbarCss";
import { useState } from "react";
import { InitialCommentsResponse } from "@/api/types/FeedsTypes";
import Comments from "./components/Comments";
function SingleFeedPage(){
    const { postId } = useParams();
    const [initialComments,setInitialComments] =useState<boolean | InitialCommentsResponse>(false)
    return (
        <div className="w-full flex-1 md:flex-[0.5] pt-5 px-5">
            <SingleFeed setInitialComments={setInitialComments} postId={postId} />
            
            <div className={` overflow-y-scroll ${ScrollbarCss} `}>
                <Comments id={postId} initialComments={initialComments}  />
            </div>
        </div>
        
    )
}
export default SingleFeedPage;