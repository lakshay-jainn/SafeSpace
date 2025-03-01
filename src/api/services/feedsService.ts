import axiosClient from "../axios/axiosClient";


export async function AddComment(data:any){

    const response = await axiosClient.post('/post/comment',data)
    
    return response.data
}

export async function LikePost(data : any){

    const response = await axiosClient.post('/post/like-post',data)

      return response.data;
}

export async function FetchComments(data : any ){
    const response = await axiosClient.post('/post/comments',data)
    return response.data
}
export async function createPost(data : any){
    
    const response = await axiosClient.post('/post/create',data)
    
    return response.data
}


export async function FetchFeeds(url : any){
    const response = await axiosClient.get(url)
    return response.data
}
export async function FetchCommunityFeeds(url : any){
    const response = await axiosClient.get(url)
    return response.data
}