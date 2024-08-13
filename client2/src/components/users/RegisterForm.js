import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../../api/UserAPI";
import {useBoundStore} from "../../stores/BoundStore";

function RegisterForm() {
    const {setLoggedInUser}=useBoundStore();

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
        agreement: false,
    });
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("entering submit")
        if (formData.agreement === true && formData.password2 === formData.password1) {
            console.log("entered")
            console.log(formData);
            registerUser(formData);
            const loggedUser = await loginUser(formData.username, formData.password1);

            console.log("user:" + loggedUser.username)
            setLoggedInUser({username: loggedUser.username, email: loggedUser.email, password: loggedUser.password});
            navigate("/"); // This will programmatically navigate to the main page
        }


    };
    return (

        <form id="register-form" onSubmit={handleSubmit} autoComplete="on">
            <div className="d-grid gap-2 col-6 mx-auto">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password1">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password1"
                        name="password1"
                        placeholder="Password"
                        value={formData.password1}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Password once again</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password2"
                        name="password2"
                        placeholder="Password"
                        value={formData.password2}
                        onChange={handleChange}
                    />
                    <small id="passwordHelpBlock" className="form-text text-muted">
                        Your password must be 8-20 characters long, contain letters and numbers, and must not contain
                        spaces, special characters, or emoji.
                    </small>
                </div>
                <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="agreement"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="agreement">
                        I Agree to the terms.
                    </label>
                </div>
                <button type="submit" className="btn btn-outline-dark btn-lg" id="submit">Register</button>
                <Link to="/login" className="btn btn-outline-dark btn-lg" id="new-user-button">Already a User?</Link>
            </div>
        </form>
    );

}

export default RegisterForm
