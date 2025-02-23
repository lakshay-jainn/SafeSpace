import axiosClient from "../axios/axiosClient";


export async function AddComment(data:any){

    const response = await axiosClient.post('/posts/create-comment',data)
    
    return response.data
}

export async function LikePost(data : any){

    const response = await axiosClient.post('/post/like',data)

      return response.data;
}

export async function FetchComments(data : any ){

    const response = await axiosClient.post('/post/comment',data)
    
    return response.data
}
export async function createPost(data : any){
    
    const response = await axiosClient.post('/post/create',data)
    
    return response.data
}