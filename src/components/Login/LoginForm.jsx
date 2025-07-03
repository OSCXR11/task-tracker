import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';


function LoginForm(){

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    });

    const handleChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    
        const handleSubmit = async(event) => {
            event.preventDefault();
            try{
                const response = await fetch('http://localhost:8080/api/v1/auth/authenticate', {
                    method: 'Post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();
                
                if(response.ok){
                    localStorage.setItem('token', data.token);
                    navigate('/dashboard');
                }
                else{
                    alert('Login failed.')
                }
            }catch(error){
                console.error('Login error:', error);
                alert('An error occurred. Please try again.');
        }
    };
    

    return(
        <form className="container" onSubmit={handleSubmit}>
            <div className="inputs">
                <input type="text" className="input" name="userName" placeholder="User Name" onChange={handleChange} required/>
                <input type= "password" className="input" name="password" placeholder="Password" onChange={handleChange} required/>
                <button type="submit" className="loginBtn">Login</button>
            </div>
            

            <div className="linkText">
                <p>Don't have an account? <button type="button" onClick={() => navigate('/register')}>
                click here!
                </button></p>
                
            </div>
            
        </form>
    );

}

export default LoginForm;