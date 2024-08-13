import axios from "axios";

const serverUrl = process.env.REACT_APP_SERVER_URL;


export const registerUser = async (formData) => {
    const user ={'username':formData.username,'email':formData.email,'password':formData.password1};
    try {
        // Log the payload to ensure it is correct
        console.log('Sending user data for register:', user); // No need to wrap in an object
        const response = await fetch(`${serverUrl}users/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( user ), // Correctly sending the items array
        });

        if (!response.ok) {
            throw new Error(`Failed to create user: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // Rethrow error if needed
    }


};


export const loginUser = async (username,password) => {
    try {
        // Fetch specific book data
        return await fetch(`${serverUrl}users/username/${username}`);

    } catch (error) {
        console.error('Error fetching book properties:', error); // Log the error object
        console.error('Error details:', error.response ? error.response.data : error.message);
        throw error; // Rethrow error if needed
    }
};
