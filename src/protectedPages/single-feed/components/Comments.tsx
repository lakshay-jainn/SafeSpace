import { UseFormReturn,useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import {memo,useState,useMemo} from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Comment } from "@/pages/feeds/components/SinglePost";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {  Send, ThumbsUp } from "lucide-react"
import {z} from 'zod'
import { AddComment } from "@/api/services/feedsService";
import { FetchComments } from "@/api/services/feedsService";

const messageSchema = z.object({
    text: z
        .string()
        .min(1, "Message cannot be empty")
      
        // .refine((text) => , {
        //     message: "Profanity is not allowed!",
        // }),
});


type AddMessageValues = z.infer<typeof messageSchema>


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
    
  





        function Comments({initialComments,id}:{initialComments:any,id:any}) {
            const [comments, setComments] = useState<Comment[]>(initialComments)
            const [sortBy, setSortBy] = useState<"recent" | "likes">("recent")
            const [skipComments, setSkipComments] = useState(0);
            const [isCommentsExpanded, setIsCommentsExpanded] = useState(false)

            const form = useForm<AddMessageValues>({
                resolver: zodResolver(messageSchema),
                mode: "onSubmit",
                reValidateMode: "onSubmit",
              });

              
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
            
            return (
               
                    <>
                    <AddCommentElement form={form} handleAddComment={handleAddComment} />
              
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
                            )
            
          }


export default Comments;