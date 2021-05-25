import React from 'react'
import './styles.css'
import API from "../../utils/API"

export function SignUpForm({ newUser, setNewUser }) {

    function handleChange(field, value) {
        setNewUser(prevState => {
            return {
                ...prevState,
                [field]: value
            }
        })

    }

    const handleSubmit = () => {
        API.createNewUser(newUser)
            .then(res => console.log(res))
    }

    // console.log(newUser)

    return (
        <div className="SignUpForm-wrapper">
            <form className="signup-form-form">
                <input onChange={(e) => handleChange("firstName", e.target.value)} type="text" placeholder="First Name" />
                <input onChange={(e) => handleChange("lastName", e.target.value)} type="text" placeholder="Last Name" />
                <input onChange={(e) => handleChange("businessName", e.target.value)} type="text" placeholder="Business Name" />
                <input onChange={(e) => handleChange("email", e.target.value)} type="text" placeholder="Email" />
                <input onChange={(e) => handleChange("password", e.target.value)} type="password" placeholder="Password" />
                {/* <input onChange={(e) => handleChange("passwordConfirmation", e.target.value)} type="password" placeholder="Confirm Password" /> */}
            </form>
            <button onClick={handleSubmit}>Create Account</button>
        </div>
    )
}