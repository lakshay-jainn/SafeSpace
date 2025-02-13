import axiosClient from "../axios/axiosClient";


export async function AddComment(data:any){

    const response = await axiosClient.post('/posts/create-comment',data)
    
    return response.data
}

export async function LikePost(data : any){

    const response = await axiosClient.post('/posts/like-post',data)

      return response.data;
}

export async function FetchComments(data : any ){

    const response = await axiosClient.post('/posts/comments',data)
    
    return response.data
}
