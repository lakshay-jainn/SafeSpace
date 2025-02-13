export interface InitialFeedsResponse{
    id:string,
    content:string,
    caption:string,
    user:any;
    likesCount:number,
    isLiked:boolean,
    comments:any,
    createdAt:string,

}
export interface InitialCommentsResponse {
    id:string,
    comment:string,
    caption:string,
    user:any;
    likesCount:number,
    isLiked:boolean,
}
