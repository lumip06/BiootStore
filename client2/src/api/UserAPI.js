import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;


export const registerUser = async (formData) => {
    const user = {
        username: formData.username,
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2,
    };

    try {
        console.log('Sending user data for registration:', user);

        const response = await axios.post(`${serverUrl}users/`, user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });


        const { user: registeredUser, token } = response.data;


        console.log('User registered successfully:', registeredUser);
        return { user: registeredUser ,token};
    } catch (error) {
        console.error('Error creating user:', error);

    }
};


export const loginUser = async (username, password) => {
    try {

        const response = await axios.post(`${serverUrl}users/login`, {
            username,
            password
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);

    }
};
