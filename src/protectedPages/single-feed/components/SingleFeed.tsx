import useFetchSingleFeed from "@/api/hooks/useFetchSingleFeed";
import { SinglePost } from "@/pages/feeds/components/SinglePost";
import { PostProps } from "@/pages/feeds/components/SinglePost";
import { InitialCommentsResponse } from "@/api/types/FeedsTypes";
function SingleFeed({postId} : {postId : (string | undefined)}){
    const [singleFeed,loading,error]=useFetchSingleFeed({postId});
    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>{error}</div>
    }
    if (!loading && !error){
        const post: PostProps={
            id:singleFeed.id,
            author:{
              name:singleFeed.user.username ,
              avatar:singleFeed.user.profileImage,
              role:singleFeed.user.role,
            },
            timestamp:singleFeed.createdAt,
            image:singleFeed.content!=='' ? singleFeed.content : undefined,
            caption: singleFeed.caption ? singleFeed.caption : '',
            likes:singleFeed.likesCount,
            isLiked:singleFeed.isLiked,
            comments:singleFeed.comments?.map((comment:Partial<InitialCommentsResponse>) => ({
              id: comment.id,
              author: comment.user.username, 
              avatar: comment.user.profileImage,
              content: comment.comment,
              timestamp: '  ', 
              likes: comment.likesCount,
              isLiked: comment.isLiked
            })) || [],
  
  
    
          }       
  
          return( <SinglePost key={post.id} {...post} />)

    }
    
}
export default SingleFeed;