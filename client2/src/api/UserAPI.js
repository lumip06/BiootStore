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
        // Fetch user data
        const response = await fetch(`${serverUrl}users/username/${username}`);

        // Check if the response is successful (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const data = await response.json();

        // Return the parsed data
        return data;

    } catch (error) {
        console.error('Error fetching user data:', error); // Log the error object
        console.error('Error details:', error.response ? error.response.data : error.message);
        throw error; // Rethrow error if needed
    }
};
