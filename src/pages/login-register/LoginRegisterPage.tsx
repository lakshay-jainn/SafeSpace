import styles from "./loginregister.module.css";
import LoginRegisterToggle from "./toggle/LoginRegisterToggle";
function LoginRegisterPage() {
  return (
    <div className={styles["mainwrapper"]}>
        <LoginRegisterToggle />
    </div>
  );
} 
export default LoginRegisterPage;