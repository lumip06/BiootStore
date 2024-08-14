const loadUserFromLocalStorage = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    try {
        return loggedInUser ? JSON.parse(loggedInUser) : null;
    } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        return null;
    }
}


const saveUserToLocalStorage = (loggedInUser) => {
    if (loggedInUser !== null && loggedInUser !== undefined) {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } else {
        localStorage.removeItem('loggedInUser');
    }
}

export const createUserStore = ((set, get) => ({
    loggedInUser: loadUserFromLocalStorage(),

    setLoggedInUser: (newLoggedInUser) => set((state) => {
        set({ loggedInUser: newLoggedInUser });
        console.log(newLoggedInUser);
        saveUserToLocalStorage(newLoggedInUser);
        return { loggedInUser: newLoggedInUser };
    }),

    logoutUser: () => set(state => {
        const emptyUser = null;
        set({ loggedInUser: emptyUser });
        console.log("logout");
        saveUserToLocalStorage(emptyUser);
        return {
            loggedInUser: emptyUser,
        };
    }),
}))