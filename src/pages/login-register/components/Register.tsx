
import { SignupAPI } from '@/api/services/authService';
import { handleApiError } from '@/api/utils/apiUtils';
import { FormEvent } from 'react';
import styles from '../loginregister.module.css';
import { toast } from 'sonner';
function RegisterComponent({actionCallback,setOnLoginComponent,Login} : {actionCallback: () => unknown,setOnLoginComponent: (value:boolean)=>void,Login: (token:string)=>void}) {
  
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
   
      const formData = new FormData(event.currentTarget);
      const username =formData.get('username');
      const password=formData.get('password');
      const confirmPassword=formData.get('confirmPassword');
      // if (password === confirmPassword){
      //   console.table([email,password,confirmPassword,isAlumni]);
      // }
      // assuming all fields are checked lakshay do it buddy




      // Write all logic before proceding to this try .... like username validation , email , pass and con pass

      try {
        const responseData= await SignupAPI({ username:username,password:password});
        const token = responseData.token;
        Login(token)
        actionCallback()
        toast.success('Signup Successful')

      }
      catch(error){
        const ErrorResponse=handleApiError(error);
        toast.error(ErrorResponse.message)
      }
    };
      
      
	
	 
  return (
    // <div className={styles["mainwrapper"]}>
      <div className={styles["wrapper"]}>
        
          <div className={`${styles["title"]} flex flex-col items-center`}>
            <img className='h-15 w-15' src="safespace.png" alt="" />
            SafeSpace
          </div>

     
        <div className={styles["form-container"]}>
          

          <div className={styles["form-inner"]}>
          <form onSubmit={onSubmit} className={styles["signup"]}>
              <div className={styles["field"]}>
                <input type="text" name='username' placeholder="Username" required />
              </div>
              <div className={styles["field"]}>
                <input type="password" name='password' placeholder="Password" required />
              </div>
              <div className={styles["field"]}>
                <input
                  type="password"
                  name='confirmPassword'
                  placeholder="Confirm password"
                  required
                />
              </div>
              <div className={`${styles["field"]} ${styles["btn"]}`}>
                <div className={`${styles["btn-layer"]} bg-gradient-to-r from-red-400 to-orange-400 `}></div>
                <input type="submit" value="Signup" />
              </div>
              <div className={styles["signup-link"]}>
                Already registered? <button onClick={(event)=> {setOnLoginComponent(true);event.preventDefault()}}><a className='cursor-pointer'>Login here!</a></button>
              </div>
            </form>

          </div>
        </div>
      
	  </div>

    // </div>
  );
}

export default RegisterComponent;
