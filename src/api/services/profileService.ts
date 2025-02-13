import { profileDetailsPayload } from "@/api/types/profileDetailsTypes";
import axiosClient from "@/api/axios/axiosClient";

export const updateProfileDetails = async (data: profileDetailsPayload ) => {

    const personalUpdateUrl = "/alumni-student/create-update-profile-alumni-student";
   
      const response = await axiosClient.post(personalUpdateUrl,data);

       return response.data;
   };
