import { useParams } from "react-router-dom";
import SingleFeed from "./components/SingleFeed";


function SingleFeedPage(){
    const { postId } = useParams();
    return (
        <div className="w-full flex-1 md:flex-[0.5] pt-5 px-5 overflow-y-scroll">
            <SingleFeed postId={postId} />
            
        </div>
        
    )
}

export default SingleFeedPage;