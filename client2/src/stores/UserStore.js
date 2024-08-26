import {jwtDecode as jwt_decode} from 'jwt-decode';
import axios from 'axios';
import {
    loadUserFromLocalStorage,
    loadWishlistFromLocalStorage,
    saveUserToLocalStorage,
    saveWishlistToLocalStorage
} from "./FromLocalStorage";

import {useFetchRequest} from "../api/CustomHook";
import data from "bootstrap/js/src/dom/data";

const serverUrl = process.env.REACT_APP_SERVER_URL;

export const createUserStore = ((set, get) => ({
    loggedInUser: loadUserFromLocalStorage(),
    wishlistBooks: loadWishlistFromLocalStorage() || [],
    setLoggedInUser: (newLoggedInUser, token) => set(async (state) => {
        try {
            // Update loggedInUser state
            set({loggedInUser: newLoggedInUser});
            console.log(newLoggedInUser);

            // Decode token and log info
            const decodedToken = jwt_decode(token);
            console.log("new user in store:", newLoggedInUser);
            console.log("Decoded Token:", decodedToken);

            // Save user to local storage
            saveUserToLocalStorage(newLoggedInUser, token);

            // Fetch wishlist books from server
            const response = await fetch(`${serverUrl}wishlists`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add token if needed
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();

            // Update wishlistBooks state with fetched data
            set({wishlistBooks: responseData});
            // Log wishlistBooks after updating state
            saveWishlistToLocalStorage(responseData);
            console.log("Fetched wishlistBooks:", responseData);

        } catch (error) {
            console.error("Error setting user or fetching wishlist:", error);
        }

    }),

    logoutUser: () => set(state => {
        const emptyUser = null;
        set({loggedInUser: emptyUser});
        console.log("logout");
        saveUserToLocalStorage(emptyUser);
        localStorage.removeItem("wishlistBooks");
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


        if (token) {
            const decodedToken = jwt_decode(token);
            console.log("Decoded Token:", decodedToken);

        } else {
            console.error("Token is expired or invalid");
            get().logoutUser();
        }

        return {token};
    }),
    setWishlistBooks: (newBook, action = 'set') => {

        set(async (state) => {

            const currentWishlist = state.wishlistBooks || {userId: null, items: []};
            const {userId, items} = currentWishlist;


            let updatedItems = [...items];

            switch (action) {
                case 'set':
                    updatedItems = Array.isArray(newBook.items) ? [...newBook.items] : [];
                    break;

                case 'add':
                    if (newBook && newBook._id) {
                        const bookId = newBook._id;
                        const bookIdIndex = updatedItems.findIndex(item => item._id === bookId);

                        if (bookIdIndex === -1) {
                            updatedItems.push({ bookId });
                            console.log("Adding book ID to wishlist:", bookId);
                            const requestBody = { items: updatedItems };


                            try {
                                const token = get().getToken();
                                const response = await axios.post(`${serverUrl}wishlists`, requestBody, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${token}`
                                    }
                                });

                                if (response.status !== 200) {
                                    throw new Error(`HTTP error! Status: ${response.status}`);
                                }


                                const responseData = response.data;
                                console.log("RETURNED:",responseData);
                                set({wishlistBooks: responseData});
                                saveWishlistToLocalStorage(responseData);
                                return { wishlistBooks: responseData };

                            } catch (error) {
                                console.error("Error updating wishlist:", error);
                            }
                        } else {
                            console.log("Book ID already in wishlist, not adding:", bookId);
                        }
                    }
                    break;

                case 'remove':
                    if (newBook) {
                        console.log("Removing book ID from wishlist:");
                        try {
                            const token = get().getToken(); // Get the token from your store or context

                            // Create the request body with the book IDs
                            const requestBody = { items:newBook.map(bookId => ({ bookId })) };

                            // Send DELETE request with Axios
                            const response = await axios.delete(`${serverUrl}wishlists`, {
                                data: requestBody, // Pass the body using the 'data' field
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                }
                            });


                            if (response.status === 200) {
                                console.log("Items removed successfully:", response.data);

                                set({wishlistBooks: response.data});
                                saveWishlistToLocalStorage(response.data);
                                return { wishlistBooks: response.data };
                            } else {
                                console.error("Failed to remove items:", response.status);
                            }
                        } catch (error) {
                            console.error("Error removing items from wishlist:", error);
                        }
                    }
                    break;

                default:
                    return state;
            }
            set({ wishlistBooks:updatedItems });
            return { wishlistBooks: updatedItems };
        });

        console.log(newBook);
    },
    getWishlistBooks: () => get().wishlistBooks,
}));