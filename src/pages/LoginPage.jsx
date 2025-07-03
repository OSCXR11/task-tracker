import LoginForm from "../components/Login/LoginForm";
import '../components/Login/LoginForm.css';

function LoginPage(){
    return(
        <div>
            <h2 className="header">Task Tracker</h2>
            <LoginForm/>
        </div>
    )
}

export default LoginPage;