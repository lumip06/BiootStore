import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;


export const registerUser = async (formData) => {
    const user = {
        username: formData.username,
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2,
        role: formData.role
    };

    const response = await axios.post(`${serverUrl}users/`, user, {
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const {user: registeredUser, token} = response.data;

    return {user: registeredUser, token};

};


export const loginUser = async (username, password) => {

    const response = await axios.post(`${serverUrl}users/login`, {
        username,
        password
    });

    return response.data;

};
