

import { FormEvent } from "react";
import styles from "../loginregister.module.css";
import { SigninAPI } from "@/api/services/authService";
import { handleApiError } from "@/api/utils/apiUtils";
import { toast } from "sonner";
function LoginComponent({actionCallback,setOnLoginComponent,Login} : {actionCallback : () => unknown,setOnLoginComponent: (value:boolean)=>void,Login: (token:string)=>void}) {

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const responseData= await SigninAPI({
        username:username,
        password:password
      });
      const token = responseData.token;
      Login(token);
      actionCallback();
      toast.success("Login Successful");
      } catch (error) {
        const errorData=handleApiError(error);
        toast.error(errorData.message)
    }
    
  }

  return (

      <div className={`${styles["wrapper"]} `}>
        <div className='text-center'>
          <div className={`${styles["title"]} flex flex-col items-center`}>
              <img className='h-15 w-15' src="safespace.png" alt="" />
              SafeSpace
            </div>
        </div>
        <div className={styles["form-container"]}>
       
          <div className={styles["form-inner"]}>
            <form onSubmit={onSubmit} className={styles["login"]}>
              <div className={styles["field"]}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                />
              </div>
              <div className={styles["field"]}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className={styles["pass-link"]}>
                <a href="#">Forgot password?</a>
              </div>
              <div className={`${styles["field"]} ${styles["btn"]}`}>
                <div className={`${styles["btn-layer"]} bg-gradient-to-r from-red-400 to-orange-400 `}></div>
                <input type="submit" value="Login" />
              </div>
              <div className={styles["signup-link"]}>
                Not a member? <button onClick={(event)=>{setOnLoginComponent(false);event.preventDefault()}}><a className="cursor-pointer">Signup now</a></button>
              </div>
            </form>
          </div>
        </div>
      </div>
  
  );
}

export default LoginComponent;
