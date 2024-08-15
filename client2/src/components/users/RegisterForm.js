import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../../api/UserAPI";
import {useBoundStore} from "../../stores/BoundStore";

function RegisterForm() {
    const {setLoggedInUser}=useBoundStore();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
        agreement: false,
    });
    const fields = [
        { label: 'Username', type: 'text', name: 'username', placeholder: 'Username' },
        { label: 'Email', type: 'email', name: 'email', placeholder: 'Email' },
        { label: 'Password', type: 'password', name: 'password1', placeholder: 'Password' },
        { label: 'Password once again', type: 'password', name: 'password2', placeholder: 'Password' }
    ];
    const handleChange = (e) => {
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
        e.preventDefault();

        // Validate the form data and set errors if any
        const newErrors = validateRegisterForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // Register the user and get the loggedUser and token
            const response = await registerUser(formData); // Adjust this line if necessary
            const { user: loggedUser, token } = response; // Ensure the destructuring matches your API response

            // Check if the user and token are available
            if (loggedUser && token) {
                // Set the logged-in user and token in the store
                setLoggedInUser(
                    {
                        userId: loggedUser._id,
                        username: loggedUser.username,
                        email: loggedUser.email,
                    },
                    token
                );

                // Optionally store the token in localStorage for future use
                localStorage.setItem('token', token);

                // Redirect to the home page or another page as needed
                navigate("/"); // Redirect to the home page after registration
            } else {
                // Handle case where user or token is not returned
                setErrors({ general: 'Registration successful, but unable to retrieve user details. Please try again.' });
            }
        } catch (error) {
            console.error('Registration failed:', error.response ? error.response.data : error.message);
            // Optionally set error state to show a message to the user
            setErrors({ general: 'Registration failed. Please try again.' });
        }
    };
    return (

        <form id="register-form" onSubmit={handleRegisterSubmit} autoComplete="on">
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
                                onChange={handleChange}
                            />
                            {errors[field.name] &&
                                <small className="text-danger">{errors[field.name]}</small>}
                        </div>
                    ))}
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
                    {errors.agreement &&
                        <small className="text-danger">{errors.agreement}</small>}
                </div>

                <button type="submit" className="btn btn-outline-dark btn-lg" id="submit">Register</button>
                <Link to="/login" className="btn btn-outline-dark btn-lg" id="new-user-button">Already a User?</Link>
            </div>
        </form>
    );

}

export default RegisterForm
