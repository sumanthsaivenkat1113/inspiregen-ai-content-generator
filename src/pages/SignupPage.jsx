import SignupForm from "../components/Auth/SignupForm";
import Navbar from "../components/navbar";

export default function SignupPage(){
    return (
        <>
        <Navbar isBtnReq={false}/>
        <SignupForm/>
        </>
    )
}