import { useParams } from "react-router-dom";
import SingleFeed from "./components/SingleFeed";
import ScrollbarCss from "@/scrollbarCss/ScrollbarCss";
function SingleFeedPage(){
    const { postId } = useParams();

    return (
        <div className="w-full flex-1 md:flex-[0.5] pt-5 px-5">
            <SingleFeed postId={postId} />
            
            <div className={` overflow-y-scroll ${ScrollbarCss} `}>

            </div>
        </div>
        
    )
}
export default SingleFeedPage;