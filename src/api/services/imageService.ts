import axios from "axios";
import axiosClient from "../axios/axiosClient";

export async function uploadImg(ToFolder:string ,image:any){
    // 1. Get upload signature from backend
    const { userId,signature, timestamp, folder, cloudName, apiKey } = await axiosClient.post(
      "/handle-media/generate-upload-signature",
      {
        folder: ToFolder,
       
      }
    ).then((res) => res.data);

    // 2. Upload file directly to Cloudinary
    const formData = new FormData();
    formData.append("file", image);
    formData.append("api_key", apiKey);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append("folder", folder);
    formData.append("public_id", userId);
    

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    )
    const result =await res.data;
    if (result.moderation && result.moderation.status === "rejected") {
      throw new Error("Image is offensive or inappropriate.")
    }

    if (!result.secure_url) {
      throw new Error("Image upload failed!");
    }

    return result.secure_url;

}

