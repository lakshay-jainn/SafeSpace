import {ChevronLeft} from 'lucide-react';
import { Link } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { z } from "zod"
import { useState,useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Input } from "@/components/ui/input"
import { useDropzone } from "react-dropzone";
import { ImagePlus } from "lucide-react";
import { toast,Toaster } from "sonner";


const profileFormSchema = z.object({  
    image: z
        //Rest of validations done via react dropzone
        .instanceof(File)
        // .refine((file) => file.size !== 0, "Please upload an image")
        .optional(),
  
    name:z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  
  
  })
  
  //now i am assigning the defined restrictions above to a type
  type ProfileFormValues = z.infer<typeof profileFormSchema>

  
export default function CreatePost(){

    const [preview, setPreview] = useState<string | ArrayBuffer | null>('');



    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
          name: "",
          image: new File([""], "filename"),
        },
        mode: "onSubmit",
      });

      const onDrop = useCallback(
        (acceptedFiles: File[]) => {
          const reader = new FileReader();
          try {
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(acceptedFiles[0]);
            form.setValue("image", acceptedFiles[0]);
            form.clearErrors("image");
          } catch (error) {
            setPreview(null);
            form.resetField("image");
          }
        },
        [form],
      );
    
      // some properties of upload functionality
      
      const {
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections,
      } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 1000000, // 1MB
        multiple: false,
        // Provide no‑op functions to satisfy the type requirements:
        onDragEnter: () => {},
        onDragOver: () => {},
        onDragLeave: () => {},
        accept: {
          "image/png": [".png"],
          "image/jpeg": [".jpg", ".jpeg"],
        },
      });

    async function onSubmit(data : ProfileFormValues) {
            

            const updatedFields=data;
            console.log(updatedFields)
          
            // Send the updated fields to the backend
            try {
              
              toast.success("Profile updated successfully");
            } catch (error) {
              if (error instanceof Error){
                console.log(error.message);
              }
              toast.error("An error occurred while updating the profile");
        
              
            }
          }
        
    return(
        

        <section className="rounded-lg border bg-card text-card-foreground shadow-xs w-full max-w-2xl mx-auto px-5 py-3">
            <div className="flex gap-5 font-bold">    
                <Link to='..' relative='path'>
                <ChevronLeft />
                </Link> 
                Create a Post
            </div>
            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/*Name field*/}

                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input placeholder="shaddcn" {...field} />
                                </FormControl>
                                <FormDescription>
                                This is your public display name. It can be your real name or a
                                pseudonym.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                    />

                    <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                            <FormItem className="md:w-max">
                                <FormLabel
                                className={`${
                                    fileRejections.length !== 0 && "text-destructive"
                                }`}
                                >
                                <h2 className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Upload your image
                                    <span
                                    className={
                                        form.formState.errors.image || fileRejections.length !== 0
                                        ? "text-destructive"
                                        : "text-muted-foreground"
                                    }
                                    ></span>
                                </h2>
                                </FormLabel>
                                <FormControl>
                                <div
                                    {...getRootProps()}
                                    className="mx-auto flex cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-xs shadow-foreground"
                                >
                                    {preview && (
                                    <img
                                        src={preview as string}
                                        alt="Uploaded image"
                                        className="max-h-[300px] rounded-lg"
                                    />
                                    )}
                                    <ImagePlus
                                    className={`size-40 ${preview ? "hidden" : "block"}`}
                                    />
                                    <Input {...getInputProps()} type="file" />
                                    {isDragActive ? (
                                    <p>Drop the image!</p>
                                    ) : (
                                    <p>Click here or drag an image to upload it</p>
                                    )}
                                </div>
                                </FormControl>
                                <FormMessage>
                                {fileRejections.length !== 0 && (
                                    <p>
                                    Image must be less than 1MB and of type png, jpg, or jpeg
                                    </p>
                                )}
                                </FormMessage>
                            </FormItem>
                            )}
                    />
                        

                    <Toaster />
                    <Button disabled={form.formState.isSubmitting} type="submit">Update profile</Button>
                </form>
            </Form>

        </section>
    )
}




