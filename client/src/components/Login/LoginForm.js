import React, { useState } from "react";
import UserContext from "../../utils/UserContext";
import './styles.css'
import API from "../../utils/API";

export function LoginForm() {

    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: '',
        authenticated: false
    })

    const handleChange = (field, value) => {
        setUserLoginData(prevState => {
            return {
                ...prevState,
                [field]: value
            }
        })
    }

    const handleSubmit = () => {
        API.loginUser(userLoginData)
            .then(res => console.log(res.data))
    }

    // console.log(userLoginData);

    return (
        <div className="LoginForm-wrapper">
            <form className="login-form-form">
                <input onChange={(e) => handleChange("email", e.target.value)} type="text" placeholder="Username/Email" />
                <input onChange={(e) => handleChange("password", e.target.value)} type="password" placeholder="Password" />
            </form>
            <button onClick={handleSubmit}>Log In</button>
        </div>
    )
}