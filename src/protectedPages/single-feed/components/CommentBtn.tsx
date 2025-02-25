import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { AddMessageValues } from "./Comments"
import { memo } from "react"
import { useRef } from "react"
const AddCommentElement =  memo(({ form, handleAddComment  }: { form:  UseFormReturn<AddMessageValues>,handleAddComment: (event:any,clickedButton:string) => void }) => {
  const buttonRef = useRef("");

  const handleClick = (buttonName: string) => {
        buttonRef.current = buttonName;
    };
  const onSubmit = (data: any) => {
      handleAddComment(data, buttonRef.current);
  };
  return (
            <Form {...form}>
                  <form className='w-full flex flex-col gap-5' onSubmit={form.handleSubmit(onSubmit)}>
                  
                    
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
                    <div className="flex gap-2">
                    <Button className="w-1/2 bg-gradient-to-r from-red-400 to-orange-500 rounded-full" size="icon" type="submit" onClick={() => handleClick("Comment")}>
                    Comment
                      <Send className="h-4 w-4" />
                    </Button>
                    <Button className="w-1/2 rounded-full bg-gradient-to-r from-[#28A745] to-[#17A2B8]" size="icon" type="submit" onClick={() => handleClick("Whisper")}>
                    Whisper
                      <Send className="h-4 w-4" />
                    </Button>
                    </div>

                    
                  </form>
                  </Form>
          );
        });


export default AddCommentElement;