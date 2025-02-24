
import { useState,useEffect } from "react";
import publicAxiosClient from "../axios/publicAxiosClient";
import axiosClient from "../axios/axiosClient";
import {InitialFeedsResponse } from "../types/FeedsTypes";
import { handleApiError } from "../utils/apiUtils";
import useGlobalAuth from "@/Auth/useGlobalAuth";
export default function useFetchFeeds({fetchAgain}:{fetchAgain:boolean}) {
    const {isLoggedIn}=useGlobalAuth()
    const [feeds,setFeeds] = useState<Partial<InitialFeedsResponse> | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)
    
    useEffect(()=>{
        const fetchFeeds = async() =>{
            try{
                let response;
                if (!isLoggedIn){
                    
                    response=await publicAxiosClient.get('/feeds')
                }
                else{
                    
                    response=await axiosClient.get('/post/posts')
                }
            
                const data=response.data;

                setFeeds(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                setError(ErrorResponse.message)
            } finally {
                setLoading(false);
            }
        
        }
        fetchFeeds();
        
    },[fetchAgain])



    return [feeds,setFeeds,loading,error];
}