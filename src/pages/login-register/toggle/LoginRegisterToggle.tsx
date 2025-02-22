import useGlobalAuth from "@/Auth/useGlobalAuth";
import LoginComponent from "../components/Login";
import RegisterComponent from "../components/Register";
import { useState } from "react";
function LoginRegisterToggle({actionCallback = () => {}}) {
    const [onLoginComponent, setOnLoginComponent] = useState(true)
    const { Login } = useGlobalAuth()
    if (onLoginComponent) {
        return <LoginComponent actionCallback={actionCallback} setOnLoginComponent={setOnLoginComponent} Login={Login} />
    }
    else {
        return <RegisterComponent actionCallback={actionCallback} setOnLoginComponent={setOnLoginComponent} Login={Login} />
    }
    
        

}
export default LoginRegisterToggle;