import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;


export const registerUser = async (formData) => {
    const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password1
    };

    try {

        console.log('Sending user data for register:', user);


        const response = await axios.post(`${serverUrl}users/`, user, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }

};


export const loginUser = async (username, password) => {
    try {

        const response = await axios.get(`${serverUrl}users/username/${username}`);

        return response.data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        console.error('Error details:', error.response ? error.response.data : error.message);
        throw error;
    }
};
