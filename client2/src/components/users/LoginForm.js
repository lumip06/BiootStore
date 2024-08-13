import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {loginUser, registerUser} from "../../API";

function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        remember: false,
    });
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("entering submit")

        console.log(formData);
        //console.log(loginUser(formData));



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
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-check mb-2">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="remember">
                        Remember me
                    </label>
                </div>

                <button type="submit" className="btn btn-outline-dark btn-lg" value="Submit" id="submit">Login</button>
                <Link to="/register" className="btn btn-outline-dark btn-lg" id="new-user-button">New User?</Link>
            </div>
        </form>
    );

}

export default LoginForm
