export interface InitialFeedsResponse{
    id:string,
    content:string,
    caption:string,
    user:any;
    likesCount:number,
    isLiked:boolean,
    comments:any,
    createdAt:string,
    commentCount:number,

}

export interface InitialWhisperCommentsResponse{
    

}
export interface InitialCommentsResponse {
    id:string,
    comment:string,
    caption:string,
    user:any;
    likesCount:number,
    isLiked:boolean,
    createdAt: Date
}
export interface InitialCommunitiesResponse{
    id:string,
    name:string,
    description:string,
    // post: Partial<InitialFeedsResponse>[]

}
export interface InitialUserDetailsResponse{
    id:string,
    username:string,
    profileImage:string,
}