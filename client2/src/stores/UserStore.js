const loadUserFromLocalStorage = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    try {
        return loggedInUser ? JSON.parse(loggedInUser) : null; // Return null if no user is found
    } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        return null; // Return null if there's an error parsing JSON
    }
}

// Helper function to save user to localStorage
const saveUserToLocalStorage = (loggedInUser) => {
    if (loggedInUser !== null && loggedInUser !== undefined) {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } else {
        localStorage.removeItem('loggedInUser'); // Remove from storage if user is null or undefined
    }
}

export const createUserStore = ((set, get) => ({
    loggedInUser: loadUserFromLocalStorage(),

    setLoggedInUser: (newLoggedInUser) => set((state) => {
        set({ loggedInUser: newLoggedInUser });
        console.log(newLoggedInUser);
        saveUserToLocalStorage(newLoggedInUser); // Pass the user data to saveUserToLocalStorage
        return { loggedInUser: newLoggedInUser };
    }),

    logoutUser: () => set(state => {
        const emptyUser = null; // Use null to represent no user
        set({ loggedInUser: emptyUser });
        console.log("logout");
        saveUserToLocalStorage(emptyUser); // Clear the user in localStorage
        return {
            loggedInUser: emptyUser,
        };
    }),
}))