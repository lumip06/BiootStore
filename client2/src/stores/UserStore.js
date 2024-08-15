import { jwtDecode as jwt_decode } from 'jwt-decode';

const loadUserFromLocalStorage = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    const token = localStorage.getItem('token');

    if (token && isTokenExpired(token)) {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
        return null;
    }

    try {
        return loggedInUser ? JSON.parse(loggedInUser) : null;
    } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
        return null;
    }
};

const saveUserToLocalStorage = (loggedInUser, token) => {
    if (loggedInUser !== null && loggedInUser !== undefined) {
        localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        if (token) {
            localStorage.setItem('token', token);
        }
    } else {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('token');
    }
};

const isTokenExpired = (token) => {
    const decodedToken = jwt_decode(token);
    const currentTime = Date.now() / 1000; // Convert to seconds
    return decodedToken.exp < currentTime;
};

export const createUserStore = ((set, get) => ({
    loggedInUser: loadUserFromLocalStorage(),

    setLoggedInUser: (newLoggedInUser, token) => set((state) => {
        set({ loggedInUser: newLoggedInUser });
        console.log(newLoggedInUser);
        const decodedToken = jwt_decode(token);
        console.log("new user in store:",newLoggedInUser)
        console.log("Decoded Token:", decodedToken);
        saveUserToLocalStorage(newLoggedInUser, token);
        return { loggedInUser: newLoggedInUser };
    }),

    logoutUser: () => set(state => {
        const emptyUser = null;
        set({ loggedInUser: emptyUser });
        console.log("logout");
        saveUserToLocalStorage(emptyUser);
        return { loggedInUser: emptyUser };
    }),

    getToken: () => {
        const token = localStorage.getItem('token');
        if (token && !isTokenExpired(token)) {
            return token;
        } else {
            get().logoutUser(); // Automatically logout if token is expired
            return null;
        }
    }
}));