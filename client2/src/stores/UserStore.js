import {jwtDecode as jwt_decode} from 'jwt-decode';
import { loadUserFromLocalStorage, saveUserToLocalStorage} from "./FromLocalStorage";

import {useFetchRequest} from "../api/CustomHook";


export const createUserStore = ((set, get) => ({
    loggedInUser: loadUserFromLocalStorage(),
    wishlistBooks: [],
    setLoggedInUser: (newLoggedInUser, token) => set(async (state) => {
        set({loggedInUser: newLoggedInUser});
        console.log(newLoggedInUser);
        const decodedToken = jwt_decode(token);
        console.log("new user in store:", newLoggedInUser)
        console.log("Decoded Token:", decodedToken);
        saveUserToLocalStorage(newLoggedInUser, token);


        return {loggedInUser: newLoggedInUser};
    }),

    logoutUser: () => set(state => {
        const emptyUser = null;
        set({loggedInUser: emptyUser});
        console.log("logout");
        saveUserToLocalStorage(emptyUser);
        return {loggedInUser: emptyUser};
    }),

    getToken: () => {
        const token = localStorage.getItem('token');
        // if (token && !isTokenExpired(token)) {
        if (token) {
            return token;
        } else {
            get().logoutUser();
            return null;
        }
    },
    setToken: (token) => set((state) => {

        localStorage.setItem('token', token);


        // if (token && !isTokenExpired(token)) {
        if (token) {
            const decodedToken = jwt_decode(token);
            console.log("Decoded Token:", decodedToken);

        } else {
            console.error("Token is expired or invalid");
            get().logoutUser();
        }

        return {token};
    }),
    setWishlistBooks: (newWishlist) => {
        set((state) => ({
            wishlistBooks: newWishlist,
        }));
        console.log(newWishlist)
    },
}));