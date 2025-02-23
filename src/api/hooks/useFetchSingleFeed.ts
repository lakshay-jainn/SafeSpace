
import { useState,useEffect } from "react";

import axiosClient from "../axios/axiosClient";
import {InitialFeedsResponse } from "../types/FeedsTypes";
import { handleApiError } from "../utils/apiUtils";

export default function useFetchSingleFeed({postId} : {postId : (string | undefined)}) {
    
    const [singleFeed,setSingleFeed] = useState<Partial<InitialFeedsResponse> | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)


    useEffect(()=>{
        const fetchSingleFeed = async() =>{
            try{
                let response;

                    response=await axiosClient.get(`/post/${postId}`)

                const data=response.data;
                setSingleFeed(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                setError(ErrorResponse.message)
            } finally {
                setLoading(false);
            }
        
        }
        fetchSingleFeed();
            
        
    },[])



    return [singleFeed,loading,error];
}