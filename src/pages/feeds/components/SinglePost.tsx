import { useState,useMemo,useEffect } from "react"
import { useLocation,useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card,  CardHeader } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
import { Heart,MessageSquareText } from "lucide-react"
import { LikePost,AddComment,FetchComments } from "@/api/services/feedsService"
import {toast} from 'sonner'



import useGlobalAuth from "@/Auth/useGlobalAuth"




export interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: string
  likes: number
  isLiked: boolean
}

export interface PostProps {
  id: string
  author: {
    name: string
    avatar: string
  },
  commentsCount:number
  timestamp: string,
  image?: string
  caption: string
  likes: number
  isLiked: boolean
  comments?: Comment[]
}




//single comment

export function SinglePost({
  id,
  author,
  image,
  timestamp,
  caption,
  likes: initialLikes,
  isLiked: initialIsLiked,
  comments: initialComments,
  commentsCount: initialCommentsCount
}: PostProps) {
  const location = useLocation()
  const navigate=useNavigate()
  const {handleProtectedAction} = useGlobalAuth()
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [SuccessfullIsLike, setSuccessfullIsLike] = useState(initialIsLiked)
  const [pendingLike, setPendingLike] = useState<boolean | null>(null)

  // const lastTouchTimeRef = useRef<number>(0);
  const isTextOnly = !image


  useEffect(() => {
    if (pendingLike === null) return;
    const timeout = setTimeout(async () => {
      if (isLiked !== SuccessfullIsLike) {
        await LikeUpdate();
      }
    },1000);
    return () => clearTimeout(timeout);
  }, [pendingLike]);

   const toggleLike = () =>{
    setPendingLike((prev) => (prev === null || prev===false) ? true : false)
    setIsLiked((prev) => !prev)
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1))
    
    
   }
   const LikeUpdate = async () => {
    try{
      const responseData= await LikePost({postId:id});
      setSuccessfullIsLike(responseData.isLiked)
      console.log('like updated',responseData.isLiked)
    }
    catch{
      toast.error('some error occured in liking the post')
      setIsLiked((prev) => !prev)
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1))
    }
    
  }


  const PostClick=()=>{
    if (location.pathname === 'feed/'+id) {
      return;
    }
    handleProtectedAction(()=>navigate(`/feed/${id}`))

  }
  // const handleDoubleClick = useCallback(() => {
  //   toggleLike();
  // }, [toggleLike]);

  // const handleTouchEnd = useCallback(() => {
  //   const now = Date.now();
  //   // If two taps occur within 300ms, register as a double tap
  //   if (now - lastTouchTimeRef.current < 300) {
  //     toggleLike();
  //   }
  //   lastTouchTimeRef.current = now;
  // }, [toggleLike]);

  


  return (
    <>
    {/*max-w-[1095px]*/}
    {/* onDoubleClick={handleDoubleClick} onTouchEnd={handleTouchEnd} */}
    <Card  className="w-full mx-auto rounded-[2rem] gradient-border">
      <CardHeader className="flex flex-row items-center gap-4 border-b pb-4 space-y-0">
      
        <Avatar>
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <p className="font-semibold">{author.name}</p>
        <div className="flex flex-col">
          {/* <p className="font-semibold">{author.name}</p> */}
          {/* <p className="text-sm text-muted-foreground">{author.role}</p> */}
        </div>
       

        <div className="ml-auto flex items-center">
        <p className="">{timestamp.slice(0,10)}</p>
        {/* {showAllComments && !isTextOnly && (
          <Button variant="ghost" size="icon" onClick={toggleComments} className="ml-auto lg:hidden">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )} */}
        </div>
      </CardHeader>
      <div className={`flex flex-col h-full lg:flex-col `}>
        <div className="cursor-pointer" onClick={PostClick} >
        <div className="p-4">
            <p className="text-xl mb-4">{caption}</p>
          </div>
        {!isTextOnly && (
          <div className={`content-center `}>
          <img
            src={image || "/img_avatar.png"}
            alt="Post image"
            width={600}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
        ) }
        </div>
      
          
        
        
        <div className="p-4 border-t">
                <div className="flex items-center justify-between w-full ">
                  <div className="flex items-center gap-5">


                    <Button variant="ghost" size="icon" onClick={PostClick} className="hover:bg-inherit w-full h-full text-start cursor-pointer">
                      <MessageSquareText style={{height:"2rem",width:"2rem"}}  strokeWidth={1} className="" />
                      <span className="text-lg font-semibold">{initialCommentsCount}</span>
                    </Button>
                
                    <Button
                    className="hover:bg-inherit w-full h-full text-start cursor-pointer"
                      variant="ghost"
                      size="icon"
                      onClick={()=> handleProtectedAction(toggleLike) }
                      aria-label={isLiked ? "Unlike" : "Like"}
                      aria-pressed={isLiked}
                    >
                      <Heart style={{height:"2rem",width:"2rem"}} strokeWidth={1} className={` ${isLiked ? "animate-smooth-bounce fill-red-500 text-red-500 " : ""}`} />
                      <span className="text-lg font-semibold  ">{likes}</span>
                    </Button>
            

                
                  </div>
                  <span className="text-sm font-semibold">{likes} likes</span>
                </div>

                
                
          </div>

      </div>
    </Card>


      </>
  )
}



