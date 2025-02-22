import { useState,useMemo,memo,useRef,useCallback } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card,  CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
// import { Separator } from "@/components/ui/separator"
import { Heart, Send, ThumbsUp,MessageSquareText } from "lucide-react"
import { LikePost,AddComment,FetchComments } from "@/api/services/feedsService"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import {  useForm ,UseFormReturn} from "react-hook-form"
import useGlobalAuth from "@/Auth/useGlobalAuth"


const messageSchema = z.object({
      text: z
          .string()
          .min(1, "Message cannot be empty")
        
          // .refine((text) => , {
          //     message: "Profanity is not allowed!",
          // }),
  });


  type AddMessageValues = z.infer<typeof messageSchema>

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
    role: string
  },
  timestamp: string,
  image?: string
  caption: string
  likes: number
  isLiked: boolean
  comments: Comment[]
}




//single comment
const CommentItem = memo(({ comment, onLike }: { comment: Comment; onLike: (id: string) => void }) => {
  return (
    <div className="flex items-start gap-2">
      <Avatar className="w-8 h-8">
        <AvatarImage src={comment.avatar} alt={comment.author} />
        <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold">{comment.author}</p>
          <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
        </div>
        <p className="text-sm">{comment.content}</p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onLike(comment.id)}
          className="text-xs mt-1 p-0 h-auto"
        >
          <ThumbsUp className={`h-3 w-3 mr-1 ${comment.isLiked ? "fill-blue-500 text-blue-500" : ""}`} />
          {comment.likes} {comment.likes === 1 ? "like" : "likes"}
        </Button>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // only redender this. when these props change
  return prevProps.comment.id === nextProps.comment.id &&
    prevProps.comment.likes === nextProps.comment.likes &&
    prevProps.comment.isLiked === nextProps.comment.isLiked &&
    prevProps.comment.content === nextProps.comment.content;
});



//whole comments list
const CommentsList = memo(({ sortedComments, toggleCommentLike  }: 
  { sortedComments: Comment[] ,
    toggleCommentLike: (id: string) => void }) => {
  
    return (
      <div className="space-y-4">
        {sortedComments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onLike={toggleCommentLike}
          />
        ))}
      </div>
    );
  });


  const AddCommentElement =  memo(({ form, handleAddComment  }: { form:  UseFormReturn<AddMessageValues>,handleAddComment: (event:any) => void }) => {
        return (
          <Form {...form}>
                <form className='w-full flex gap-5' onSubmit={form.handleSubmit(handleAddComment)}>
                
                  
                  <FormField
                  control={form.control}
                
                  name="text"
                  render={({ field }) => (
                    <FormItem className="grow">
                
                      <FormControl className="w-full">
                      <Input
                      
                    placeholder="Add a comment..."
                    className="w-full"
                    {...field}
                    value={field.value || ''}
                    
                  />
                      </FormControl>
                
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  <Button size="icon" type="submit">
                    <Send className="h-4 w-4" />
                  </Button>
                 
                
                </form>
                </Form>
        );
      });
  

export function SinglePost({
  id,
  author,
  image,
  timestamp,
  caption,
  likes: initialLikes,
  isLiked: initialIsLiked,
  comments: initialComments,
}: PostProps) {
  const {handleProtectedAction} =useGlobalAuth()
  const [comments, setComments] = useState<Comment[]>(initialComments)
  const [showAllComments, setShowAllComments] = useState(false)
  const [isCommentsExpanded, setIsCommentsExpanded] = useState(false)
  const [likes, setLikes] = useState(initialLikes)
  const [isLiked, setIsLiked] = useState(initialIsLiked)
  const [sortBy, setSortBy] = useState<"recent" | "likes">("recent")
  const [skipComments, setSkipComments] = useState(0);
  
  const lastTouchTimeRef = useRef<number>(0);
  const isTextOnly = !image
  const form = useForm<AddMessageValues>({
    resolver: zodResolver(messageSchema),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

 



  const handleAddComment = async (data:any) => {
    
    const newComment: string=data.text;

        try{
        const responseData = await AddComment({content:newComment,postId:id})

        const CmmtFromDb=responseData.post

        const newCommentObj={
          id:CmmtFromDb.id,
          author: (CmmtFromDb.user.name? CmmtFromDb.user.name : CmmtFromDb.user.username),
          avatar: CmmtFromDb.user.profileImage,
          content: CmmtFromDb.comment,
          likes : CmmtFromDb.likesCount,
          isLiked:false,
          timestamp : '',
        }
        setComments([newCommentObj, ...comments])
        form.reset();
    
      
      }catch{
        console.log('some error occured in adding comment')
      } 

      
      
  }

  const toggleComments = () => {
    setShowAllComments(!showAllComments)
    setIsCommentsExpanded(false)
    
  }

   const loadMoreComments = async() => {
    try{
      setSkipComments((prev)=> prev+5)
      const responseData=await FetchComments({skip:skipComments+5,take:5,postId:id});
   
      const CmmtsFromDb=responseData.comments;

      const newCommentObj = CmmtsFromDb.map((CmmtFromDb : any)=> (
        {id:CmmtFromDb.id,
        author: (CmmtFromDb.user.name? CmmtFromDb.user.name : CmmtFromDb.user.username),
        avatar: CmmtFromDb.user.profileImage,
        content: CmmtFromDb.comment,
        likes : CmmtFromDb.likesCount,
        isLiked:CmmtFromDb.isLiked,
        timestamp : '',}
      ));


      const TotalCommts=[...comments,...newCommentObj]
      const uniqueComments = [...new Map(TotalCommts.map(cmmts => [cmmts.id, cmmts])).values()];
     
      
      setComments([...uniqueComments])
      
      
      if (newCommentObj.length===0) {
        setIsCommentsExpanded(true)
      }
    }catch{

    }
    


  }

   const toggleLike = async () => {
    try{
      const responseData= await LikePost({postId:id});

      setIsLiked(responseData.isLiked)
      setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1))
    }
    catch{
      console.error('some error occured in liking the post')
    }
    

    
  }
  const handleDoubleClick = useCallback(() => {
    toggleLike();
  }, [toggleLike]);

  const handleTouchEnd = useCallback(() => {
    const now = Date.now();
    // If two taps occur within 300ms, register as a double tap
    if (now - lastTouchTimeRef.current < 300) {
      toggleLike();
    }
    lastTouchTimeRef.current = now;
  }, [toggleLike]);

  const toggleCommentLike = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
          : comment,
      ),
    )
  }


  const sortedComments = useMemo(() => {
    return [...comments].sort((a, b) => 
      sortBy === "likes" 
        ? b.likes - a.likes 
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }, [comments, sortBy]); 


  return (
    <>
    {/*max-w-[1095px]*/}
    <Card onDoubleClick={handleDoubleClick} onTouchEnd={handleTouchEnd} className="w-full max-w-2xl mx-auto rounded-[2rem]">
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
          <div className="p-4">
            <p className="text-xl mb-4">{caption}</p>
          </div>
        
        
        <div className="p-4 border-t">
                <div className="flex items-center justify-between w-full ">
                  <div className="flex items-center gap-5">


                    <Button variant="ghost" size="icon" onClick={()=>handleProtectedAction(toggleComments)} className="hover:bg-inherit w-full h-full text-start">
                      <MessageSquareText style={{height:"2rem",width:"2rem"}}  strokeWidth={1} className="" />
                      <span className="text-lg font-semibold">80</span>
                    </Button>
                
                    <Button
                    className="hover:bg-inherit w-full h-full text-start"
                      variant="ghost"
                      size="icon"
                      onClick={()=>handleProtectedAction(toggleLike)}
                      aria-label={isLiked ? "Unlike" : "Like"}
                      aria-pressed={isLiked}
                    >
                      <Heart style={{height:"2rem",width:"2rem"}} strokeWidth={1} className={` transition-transform ${isLiked ? "fill-red-500 text-red-500 animate-smooth-bounce " : ""}`} />
                      <span className="text-lg font-semibold  ">{likes}</span>
                    </Button>
            

                
                  </div>
                  <span className="text-sm font-semibold">{likes} likes</span>
                </div>

                
                
          </div>

      </div>
    </Card>
    {showAllComments &&  (
      <>
      <AddCommentElement form={form} handleAddComment={()=>handleProtectedAction(handleAddComment)} />

                <div className="px-10">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                    
                      <h3 className="text-lg font-semibold">Comments </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setSortBy("recent")}>
                        Recent
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setSortBy("likes")}>
                        Top
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <CommentsList toggleCommentLike={toggleCommentLike} sortedComments={sortedComments} />
                  </div>
                  {!isCommentsExpanded  ? (
                    <Button variant="outline" className="w-full mt-4" onClick={loadMoreComments}>
                      Load more comments
                    </Button>
                  ): <p>No more Comments To show</p>}
                </div>
                </>
              )}

      </>
  )
}



