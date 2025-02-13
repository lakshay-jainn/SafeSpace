
import { useState,useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import {InitialFeedsResponse } from "../types/FeedsTypes";
import { handleApiError } from "../utils/apiUtils";
export default function useFetchFeeds(){

    const [feeds,setFeeds] = useState<Partial<InitialFeedsResponse> | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)


    useEffect(()=>{
        const fetchFeeds = async() =>{
            try{
            const response=await axiosClient.get('/posts/posts')
            
            const data=response.data;

            setFeeds(data);
        }catch(error: any){
            const ErrorResponse = handleApiError(error)
            setError(ErrorResponse.message)
        }finally{
            setLoading(false);
        }
        
        }
        fetchFeeds();
            
        
    },[])



    return [feeds,loading,error];
}