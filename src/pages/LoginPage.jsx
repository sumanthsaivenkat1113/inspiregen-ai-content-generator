import LoginForm from "../components/Auth/LoginForm";
import Navbar from "../components/navbar";

export default function LoginPage(){
    return (
        <>
        <Navbar isBtnReq={false}/>
        <LoginForm/>
        </>
    )
}