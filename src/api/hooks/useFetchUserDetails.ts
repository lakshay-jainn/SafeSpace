import { useState,useEffect } from "react";
import axiosClient from "../axios/axiosClient";
import {InitialUserDetailsResponse } from "../types/FeedsTypes";
import { handleApiError } from "../utils/apiUtils";
export default function useFetchUserDetails() {
    const [userDetails,setUserDetails] = useState<InitialUserDetailsResponse | null>(null)
    const [loading,setLoading]= useState<boolean>(true)
    const [error,setError] = useState <boolean | any>(false)
    
    useEffect(()=>{
        const fetchUserDetails = async() =>{
            try{
                const response=await axiosClient.get('/post/user')
               
                const data=response.data;
                
                setUserDetails(data);
            } catch(error: any) {
                const ErrorResponse = handleApiError(error)
                setError(ErrorResponse.message)
            } finally {
                setLoading(false);
            }
        
        }
        fetchUserDetails();
        
    },[])



    return [userDetails,loading,error];
}