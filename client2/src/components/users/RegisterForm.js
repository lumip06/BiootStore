import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../../api/UserAPI";
import {useBoundStore} from "../../stores/BoundStore";

function RegisterForm() {
    const {setLoggedInUser}=useBoundStore();
    const [errors, setErrors] = useState({}); // Error state
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
        agreement: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        // Clear the error for the field being updated
        setErrors({
            ...errors,
            [name]: '',
        });
    };
    const validateRegisterForm=()=>{
        const newErrors = {};
        // Validate fields
        if (!formData.username) {
            newErrors.username = 'Username is required.';
        }
        if (!formData.email) {
            newErrors.email = 'Email is required.';
        }
        if (!formData.password1) {
            newErrors.password1 = 'Password is required.';
        }
        if (formData.password1 !== formData.password2) {
            newErrors.password2 = 'Passwords do not match.';
        }
        if (!formData.agreement) {
            newErrors.agreement = 'You must agree to the terms.';
        }
        return newErrors;
    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateRegisterForm()


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            await registerUser(formData);
            const loggedUser = await loginUser(formData.username, formData.password1);
            setLoggedInUser({ userId: loggedUser._id, username: loggedUser.username, email: loggedUser.email, password: loggedUser.password });
            navigate("/");
        } catch (error) {
            console.error('Registration failed:', error);
        }


    };
    return (

        <form id="register-form" onSubmit={handleRegisterSubmit} autoComplete="on">
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
                    {errors.username && <small className="text-danger">{errors.username}</small>} {/* Error message */}
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
                    {errors.email && <small className="text-danger">{errors.email}</small>} {/* Error message */}
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
                    {errors.password1 && <small className="text-danger">{errors.password1}</small>} {/* Error message */}
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
                    {errors.password2 && <small className="text-danger">{errors.password2}</small>} {/* Error message */}
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
                    {errors.agreement && <small className="text-danger">{errors.agreement}</small>} {/* Error message */}
                </div>
                <button type="submit" className="btn btn-outline-dark btn-lg" id="submit">Register</button>
                <Link to="/login" className="btn btn-outline-dark btn-lg" id="new-user-button">Already a User?</Link>
            </div>
        </form>
    );

}

export default RegisterForm
