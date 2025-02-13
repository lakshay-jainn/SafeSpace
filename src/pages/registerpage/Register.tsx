
import {Link , useNavigate} from "react-router-dom";
import {useState} from 'react';
import { FormEvent } from 'react';
import styles from '../loginregister.module.css';
import useGlobalAuth from "@/Auth/useGlobalAuth";
function Register() {
  const {Login} = useGlobalAuth();
	const [isAlumni, setIsAlumni] = useState(true);
  const navigate = useNavigate()
	const handleToggle = (isAlumniSelected: boolean) => {
		setIsAlumni(isAlumniSelected);
	  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
   
      const formData = new FormData(event.currentTarget);
      const username =formData.get('username');
      const email=formData.get('email');
      const password=formData.get('password');
      const confirmPassword=formData.get('confirmPassword');

      // if (password === confirmPassword){
      //   console.table([email,password,confirmPassword,isAlumni]);
      // }
      // assuming all fields are checked lakshay do it buddy




      // Write all logic before proceding to this try .... like username validation , email , pass and con pass

      try {
        const response= await fetch("http://localhost:8080/api/v1/user/signup" , {
          method:"POST",
          headers: {
            "Content-Type": "application/json", 
          },
          body:JSON.stringify({
            username:username,
            email:email,
            password:password,
            isAlumni:isAlumni,

          })
          
        })

        const data=await response.json();
        console.log(data)
        if (response.ok){
          const token = data.token;
          Login(token)
          navigate("/")
        }
        else{
          throw new Error(data.message)
        }
      }
      catch(e){
        if (e instanceof Error){
          console.log(e.message)
        }else{
         console.log("Error occured on hitting api ",e)}
       
      }
    };
      
      
	
	 
  return (
    <div className={styles["mainwrapper"]}>
      <div className={styles["wrapper"]}>
        <div className={styles["title-text"]}>
          <div style={{
                marginLeft: isAlumni ? "0" : "-50%",
              }} className={`${styles["title"]} ${styles["alumni"]}`}>
            Alumni Signup
          </div>
          <div className={`${styles["title"]} ${styles["student"]}`}>
            Student Signup
          </div>
        </div>
        <div className={styles["form-container"]}>
          <div className={styles["slide-controls"]}>
            
            
            <button
              onClick={() => handleToggle(true)}
              className={`${styles["slide"]} ${styles["almuni"]} ${
				isAlumni ? styles["active"] : styles["not-active"]
			  }`}>
              Alumni
            </button>
            <button
			onClick={() => handleToggle(false)}
              className={`${styles["slide"]} ${styles["student"]} ${
				!isAlumni ? styles["active"] : styles["not-active"]
			  }`}
            >
              Student
            </button>
            <div className={styles["slider-tab"]} style={{
                left: isAlumni ? "0" : "50%",
              }}
></div>
          </div>
          <div className={styles["form-inner"]}>
          <form onSubmit={onSubmit} className={styles["signup"]}>
              <div className={styles["field"]}>
                <input type="text" name='username' placeholder="Username" required />
              </div>
              <div className={styles["field"]}>
                <input type="text" name='email' placeholder="Email Address" required />
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
                <div className={styles["btn-layer"]}></div>
                <input type="submit" value="Signup" />
              </div>
              <div className={styles["signup-link"]}>
                Already registered? <Link to='/auth/login'>Login here!</Link>
              </div>
            </form>

          </div>
        </div>
      
	  </div>

    </div>
  );
}

export default Register;
