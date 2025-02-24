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


export default AddCommentElement;