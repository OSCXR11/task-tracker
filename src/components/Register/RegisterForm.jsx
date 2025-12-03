import { useState } from "react";
import { useNavigate } from "react-router-dom";


function RegisterForm(){
    const API_BASE = "https://task-tracker-backend-dvvx.onrender.com/";
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        password: ''
    });

    const handleChange = (event) => {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        const response = await fetch(API_BASE + 'api/v1/auth/register', {
            method: 'Post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();
        
        if(response.ok){
            alert('Registered! Token: ' + data.token);
            navigate('/login');
        }
        else{
            const errorData = await response.json();
            alert(errorData.message || 'Registration failed');
        }
    };

    return(
        <form className="container" onSubmit={handleSubmit}>
            <div className="inputs">
                <input className="input" name="firstName" placeholder="First Name" onChange={handleChange} required/>
                <input className="input" name="lastName" placeholder="Last Name" onChange={handleChange} required/>
                <input className="input" name="userName" placeholder="User Name" onChange={handleChange} required/>
                <input className="input" type= "password" name="password" placeholder="Password" onChange={handleChange} required/>
                <button className="loginBtn" type="submit">Register</button>
            </div>
            
            <div className="linkText">
                <p>Already have an account? <button type="button" onClick={() => navigate('/login')}>
                    Login
                </button></p>
            </div>
            
        </form>
    );
}

export default RegisterForm;