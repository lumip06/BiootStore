import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, useNavigate} from "react-router-dom";
import { registerUser} from "../../api/UserAPI";
import {useBoundStore} from "../../stores/BoundStore";
import Status from "../common/Status";

function RegisterForm() {
    const { loadingUser, errorUser, setLoadingUser, setErrorUser,setLoggedInUser } = useBoundStore();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
        agreement: false,
        role:'client'
    });
    const fields = [
        { label: 'Username', type: 'text', name: 'username', placeholder: 'Username' },
        { label: 'Email', type: 'email', name: 'email', placeholder: 'Email' },
        { label: 'Password', type: 'password', name: 'password1', placeholder: 'Password' },
        { label: 'Password once again', type: 'password', name: 'password2', placeholder: 'Password' }
    ];

    const handleAgreement = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });

        setErrors({
            ...errors,
            [name]: '',
        });
    };
    const validateRegisterForm=()=>{
        const newErrors = {};

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
       setLoadingUser(true);setErrorUser(null);
        e.preventDefault();


        const newErrors = validateRegisterForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoadingUser(false);
            return;
        }

        try {

            const response = await registerUser(formData);

                const { user: loggedUser, token } = response;

                 if (loggedUser && token) {
                    setLoggedInUser(
                        {
                            userId: loggedUser._id,
                            username: loggedUser.username,
                            email: loggedUser.email,
                            role: loggedUser.role
                        },
                        token
                    );

                    localStorage.setItem('token', token);

                    navigate("/");
                 }


        } catch (error) {
            setLoadingUser(false);

            if (error.response) {

                if (error.response.data && error.response.data.message) {
                    console.error('Validation Error:', error.response.data.message);
                    setErrorUser(`Server error: ${error.response.data.message}`);
                } else {
                    console.error('Server Error:', error.response.status);
                    setErrorUser(`Server error: ${error.response.status}`);
                }
            }

        }
        setLoadingUser(false);
    };
    return (
        <Status loading={loadingUser} error={errorUser}>
        <form id="register-form" onSubmit={handleRegisterSubmit} autoComplete="on">
            <svg viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"
                 fill="#000000" width="48"
                 height="48">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        d="M645.3 656.8c12.6-2.7 21.4-13.6 22.5-26.1h0.1c0.6-6.7 1.7-13.3 3.3-19.8h-0.2c1.3-4.6 1.5-9.6 0.4-14.7-3.5-16.2-19.1-26.5-34.7-23.1-11.9 2.6-20.5 12.4-22.3 24.1-0.1 0.7-0.2 1.3-0.4 2-1.7 7.5-3 15.2-3.7 23-0.6 3.7-0.5 7.6 0.3 11.6 3.5 16.1 19 26.4 34.7 23zM513 753.6c-86.7 0-157.2-70.5-157.2-157.2 0-15.9 2.4-31.5 7-46.5 4.9-15.8 21.7-24.7 37.5-19.8 15.8 4.9 24.7 21.7 19.8 37.5-2.9 9.3-4.3 19-4.3 28.8 0 53.6 43.6 97.2 97.2 97.2 19.5 0 38.3-5.7 54.3-16.6 13.7-9.3 32.4-5.7 41.7 8.1 9.3 13.7 5.7 32.4-8.1 41.7-26 17.5-56.4 26.8-87.9 26.8z"
                        fill="#33CC99"></path>
                    <path d="M576.1 303.4m-175.4 0a175.4 175.4 0 1 0 350.8 0 175.4 175.4 0 1 0-350.8 0Z"
                          fill="#FFB89A"></path>
                    <path
                        d="M513 121.4c39.7 0 77.1 15.5 105.1 43.5 28.1 28.1 43.5 65.4 43.5 105.1s-15.5 77.1-43.5 105.1c-28.1 28.1-65.4 43.5-105.1 43.5-39.7 0-77.1-15.5-105.1-43.5-28.1-28.1-43.5-65.4-43.5-105.1s15.5-77.1 43.5-105.1 65.4-43.5 105.1-43.5m0-60c-115.3 0-208.7 93.4-208.7 208.7S397.7 478.8 513 478.8c115.3 0 208.7-93.4 208.7-208.7S628.3 61.4 513 61.4z"
                        fill="#45484C"></path>
                    <path
                        d="M512.3 573.2c44.4 0 88.3 7.5 130.6 22.3 38.5 13.5 75.2 33.1 106.2 56.8 28.8 22 52.4 47.2 68.2 72.8 14 22.6 21.4 44.6 21.4 63.6 0 15.2-4.7 27.2-15.1 38.9-12.6 14.1-32.8 26.6-60 37.3-58.9 23.1-145.8 35.3-251.3 35.3S319.9 888 261 864.9c-27.2-10.7-47.4-23.2-60-37.3-10.4-11.7-15.1-23.7-15.1-38.9 0-19 7.4-40.9 21.4-63.6 15.9-25.6 39.5-50.8 68.2-72.8 31-23.7 67.7-43.3 106.2-56.8 42.4-14.8 86.3-22.3 130.6-22.3m0-60c-213.4 0-386.4 152.1-386.4 275.5s173 171.5 386.4 171.5 386.4-48.1 386.4-171.5-172.9-275.5-386.4-275.5z"
                        fill="#45484C"></path>
                </g>
            </svg>
            <div className="d-grid gap-2 col-6 mx-auto">
                <div className="form-group">
                    {fields.map((field, index) => (
                        <div key={index}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type={field.type}
                                className="form-control"
                                id={field.name}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={formData[field.name]}
                                onChange={handleAgreement}
                            />
                            {errors[field.name] &&
                                <small className="text-danger">{errors[field.name]}</small>}
                        </div>
                    ))}
                    <small id="passwordHelpBlock" className="form-text text-muted" >
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
                        onChange={handleAgreement}
                    />
                    <label className="form-check-label" htmlFor="agreement">
                        I Agree to the terms.
                    </label>
                    {errors.agreement &&
                        <small className="text-danger">{errors.agreement}</small>}
                </div>

                <button type="submit" className="btn btn-outline-light btn-lg" id="submit">Register</button>
                <Link to="/login" className="btn btn-outline-light btn-lg" id="new-user-button">Already a User?</Link>
            </div>
        </form>
        </Status>
    );

}

export default RegisterForm
