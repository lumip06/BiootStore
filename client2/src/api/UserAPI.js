import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;


export const registerUser = async (formData) => {
    const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password1
    };

    try {
        console.log('Sending user data for registration:', user);

        const response = await axios.post(`${serverUrl}users/`, user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Assuming the response contains user data and a token
        const { user: registeredUser, token } = response.data;

        // Store the token in localStorage or sessionStorage
        localStorage.setItem('token', token);

        console.log('User registered successfully:', registeredUser);
        return { user: registeredUser, token }; // Return the user and token
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Rethrow the error for further handling if necessary
    }
};


export const loginUser = async (username, password) => {
    try {
        // Use POST to send username and password in the request body
        const response = await axios.post(`${serverUrl}users/login`, {
            username,
            password
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
        throw error;
    }
};
