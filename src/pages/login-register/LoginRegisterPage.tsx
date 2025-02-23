import styles from "./loginregister.module.css";
import LoginRegisterToggle from "./toggle/LoginRegisterToggle";
function LoginRegisterPage() {

  return (
    <div className={`${styles["mainwrapper"]}`}>
      <div className=" basis-md">
      <LoginRegisterToggle  />
      </div>
        
    </div>
  );
} 
export default LoginRegisterPage;


//  const navigate = useNavigate();
//const location = useLocation();
//const from = location.state?.from?.pathname;

//actionCallback={() => navigate(from, {replace:true})}