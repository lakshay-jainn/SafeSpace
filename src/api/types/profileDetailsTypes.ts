export interface profileDetailsResponse{
    profile:{
        //common
        email:string,
        username:string,
        userId:string,
        image:string,
        DOB:string,
        batch:string,
        name:string,
        course:string,


        //alumni
        company?:string,
        jobTitle?:string,

        //student
        skills?:string[],
        internships?:String[],
        urls?:String[]    
    }

}


export interface profileDetailsPayload {
    //common
    email?:string,
    username?:string,
    userId?:string,
    image?:string,
    DOB?:string,
    batch?:string,
    name?:string,
    course?:string,


    //alumni
    company?:string,
    jobTitle?:string,

    //student
    skills?:string[],
    internships?:String[],
    urls?:String[]    
}