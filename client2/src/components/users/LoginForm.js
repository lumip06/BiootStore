import React, {useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
import {loginUser} from "../../api/UserAPI";
import {useBoundStore} from "../../stores/BoundStore";
import { useNavigate } from 'react-router-dom';
function LoginForm() {
    const {setLoggedInUser}=useBoundStore();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        remember: false,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const validateLoginForm=()=>{
        const newErrors = {};

        if (!formData.username) {
            newErrors.username = 'Username is required.';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        }

        return newErrors;
    }
    const handleLoginSubmit =  async (e) => {

        e.preventDefault();
        const newErrors = validateLoginForm()


        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {

            const response = await loginUser(formData.username, formData.password);
            if (response.token) {
                setLoggedInUser(
                    {
                        userId: response.user._id,
                        username: response.user.username,
                        email: response.user.email
                    }, response.token);
                console.log(response.token)
            }
            navigate("/");

        } catch (error) {
            console.error('Login failed:', error);
            const newErrors = {};
            newErrors.notFound="User does not exist";
            setErrors(newErrors);
        }

    };
    return (
        <form id="login-form" onSubmit={handleLoginSubmit} autoComplete="on">
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
                    {errors.username && <small className="text-danger">{errors.username}</small>}
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
                    {errors.password && <small className="text-danger">{errors.password}</small>}
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

                <button type="submit" className="btn btn-outline-light btn-lg" value="Submit" id="submit">Login</button>
                <Link to="/register" className="btn btn-outline-light btn-lg" id="new-user-button">New User?</Link>
                {errors.notFound && <small className="text-danger">{errors.notFound}</small>}

            </div>
        </form>
    );

}

export default LoginForm
