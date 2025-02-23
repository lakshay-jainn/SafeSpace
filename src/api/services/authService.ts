import publicAxiosClient from "../axios/publicAxiosClient"

export async function SigninAPI(data:any){

    const response = await publicAxiosClient.post('/user/signin',data)
    
    return response.data
}

export async function SignupAPI(data:any){

    const response = await publicAxiosClient.post('/user/signup',data)
    
    return response.data
}