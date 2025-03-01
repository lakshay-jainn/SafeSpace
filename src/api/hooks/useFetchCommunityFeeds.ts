
import { useState,useEffect } from "react";
import publicAxiosClient from "../axios/publicAxiosClient";
import {InitialCommunitiesResponse } from "../types/FeedsTypes";
import { handleApiError } from "../utils/apiUtils";
import axiosClient from "../axios/axiosClient";
import useGlobalAuth from "@/Auth/useGlobalAuth";
export default function useFetchCommunityFeeds(communityId:(string | undefined),fetchAgain:boolean) {
    const {isLoggedIn}=useGlobalAuth()
    const [communityFeeds,setCommunityFeeds] = useState<Partial<InitialCommunitiesResponse> | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)
    
    useEffect(()=>{
        const fetchCommunityFeeds = async() =>{
            try{
                
                let response;
                if (!isLoggedIn){
                    
                    response=await publicAxiosClient.get(`/community/${communityId}/feeds`)
                }
                else{
                    
                    response=await axiosClient.get(`/community/${communityId}/posts`)
                }
                const data=response.data;

                setCommunityFeeds(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                setError(ErrorResponse.message)
            } finally {
                setLoading(false);
            }
        
        }
        fetchCommunityFeeds();
        return () => {
            setCommunityFeeds(null);
            setLoading(true);
            setError(false);    
        }
        
    },[fetchAgain,communityId])



    return [communityFeeds,setCommunityFeeds,loading,error];
}