import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { z } from "zod"
import { useState,useCallback,useRef } from "react"
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
import useGlobalAuth from "@/Auth/useGlobalAuth"
import { createPost } from "@/api/services/feedsService"
import { uploadImg } from "@/api/services/imageService"
import { Input } from "@/components/ui/input"
import { useDropzone } from "react-dropzone";
import { ImagePlus,CircleX } from "lucide-react";
import { toast } from "sonner";
import { postUploadPayload } from "@/api/types/profileDetailsTypes"
import { handleApiError } from "@/api/utils/apiUtils"
import { checkImageToxicity } from "@/api/services/imageService"
const profileFormSchema = z
  .object({
    image: z.instanceof(File).optional(),
    // Mark text as optional here and handle its validation later
    name: z.string().optional(),
  })
  .superRefine((data : any, ctx : any) => {
    // Check if neither image is provided nor text meets the minimum length
    if (data.image.size <=0 && (!data.name || data.name.trim().length < 2 || data.name.trim().length > 100)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Either an image must be uploaded or Caption (Max: 100 characters) must be provided.",
        // You can assign the error to the "name" field or create a general error.
        path: ["name"],
      });
    }
  });
  //now i am assigning the defined restrictions above to a type
  type ProfileFormValues = z.infer<typeof profileFormSchema>

  
export default function CreatePost({setCreatePostModal = (value:boolean)=>{},setFetchAgain} : {setCreatePostModal?:(value:boolean)=>void,setFetchAgain:(value: (newValue : boolean)=>boolean )=>void}){
    const {handleProtectedAction,isLoggedIn} = useGlobalAuth();
    const [preview, setPreview] = useState<string | ArrayBuffer | null>('');
    const inputFileRef = useRef<HTMLInputElement | null>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const adjustHeight = () => {
      if (textareaRef.current) {
          textareaRef.current.style.height = "auto"; // Reset height to auto before measuring
          textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to content height
      }
  };


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
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections,
      } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 5000000, // 1MB
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

      const handleRemoveImage = () => {
        setPreview(null)
        form.resetField("image")
        if (inputFileRef.current) {
          inputFileRef.current.value = "" // Clear the input file element
        }
      }

    async function onSubmit(data : ProfileFormValues) {
            
            if (!isLoggedIn) {
              handleProtectedAction(()=>void(0));
              return;
            }
            
            const updatedFields: postUploadPayload = {};
            if (data.image && data.image.size !== 0){
              try{
                console.log(data.image)
                const response=await checkImageToxicity(acceptedFiles[0]);
                // toast.success(response)
                console.log(response)
                if(response.label ==='QUESTIONABLE' || response.label === 'UNSAFE' || (response.label === 'SAFE' && response.confidence < 90)){
                  toast.error(`Image is offensive or inappropriate. \n\n    Label: ${response.label} Confidence Level: ${Math.floor(response.confidence)}%`)
                  return
                }
              } catch (error){
                const errorMessage=handleApiError(error)
                toast.error(errorMessage.message)
                return;
              }

              let profileImageUrl;
              try{
                const profileImage=await uploadImg('posts',data.image);
                profileImageUrl=profileImage;
              }catch(e){
                if (e instanceof Error){
                  toast.error(e.message)
                  return;
                }
                toast.error(`${e}`)
                return;
              }
              
              updatedFields.content = profileImageUrl;
            }
            if (data.name) {
              updatedFields.caption = data.name;
            }
          
            // Send the updated fields to the backend
            try {
              await createPost({ ...updatedFields });
              toast.success("Post Created updated successfully");
              setCreatePostModal(false);
              setFetchAgain((prev : boolean) => !prev);

            } catch (error) {
              const errorMessage=handleApiError(error)
              toast.error(errorMessage.message);
        
              
            }
          }
        
    return(
        

        <section className="rounded-2xl w-full mx-auto px-5 py-3 mb-5 gradient-border">

            <Form {...form}>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {/*Name field*/}
                    <div >
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                            <FormItem>
                                <FormLabel></FormLabel>
                                <FormControl>
                                  <div className="p-2 border-1 rounded-lg">
                                    
                                      <textarea onInput={adjustHeight} placeholder="Share Without Hesitation" className="input-no-focus-shadow border-0 h-full w-full resize-none overflow-hidden bg-transparent" {...field} ref={textareaRef} />
                                 
                                  
                                  
                                    {preview && (
                                      <div className="relative w-fit mx-auto">
                                      <button onClick={handleRemoveImage} className="absolute left-full -translate-x-[120%] translate-y-[10%] bg-white rounded-full shadow-md aspect-square">
                                        <CircleX className="text-orange-500"/>
                                        
                                      </button>
                                    <img
                                        src={preview as string}
                                        alt="Uploaded image"
                                        className="max-h-[300px] rounded-lg"
                                    />
                                    </div>
                                    )}
              
                                    
                                    {isDragActive && (
                                    <p>Drop the image!</p>
                                    ) }
                                
                                  </div>
                                
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                    />

                    <div className="flex justify-between items-center  mt-2">
                    <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                            <FormItem className="">
                                <FormControl>
                                <div {...getRootProps()} className="cursor-pointer  w-fit">
                                    <ImagePlus />
                                    <Input ref={inputFileRef} {...getInputProps()} type="file" />

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
                    <Button disabled={form.formState.isSubmitting} className="bg-gradient-to-r from-red-400 to-orange-400 rounded-full" type="submit">Post</Button>
                    </div>
                    
                    </div>
                    
                        

              
                    
                </form>
            </Form>

        </section>
    )
}




