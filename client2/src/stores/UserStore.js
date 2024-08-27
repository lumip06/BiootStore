import {jwtDecode as jwt_decode} from 'jwt-decode';
import axios from 'axios';
import {
    loadUserFromLocalStorage,
    loadWishlistFromLocalStorage,
    saveUserToLocalStorage,
    saveWishlistToLocalStorage
} from "./FromLocalStorage";



const serverUrl = process.env.REACT_APP_SERVER_URL;

export const createUserStore = ((set, get) => ({
    loggedInUser: loadUserFromLocalStorage(),
    wishlistBooks: loadWishlistFromLocalStorage() || [],
    loadingUser: false,
    errorUser: null,
    // Getters for loggedInUser properties
    getUsername: () => get().loggedInUser?.username || '',
    getEmail: () => get().loggedInUser?.email || '',
    getUserId: () => get().loggedInUser?.userId|| '',
    getRole: () => get().loggedInUser?.role || '',


    getWishlist: () => get().wishlistBooks || [],


    setLoadingUser: (loading) => set({ loadingUser: loading }),


    setErrorUser: (error) => set({ errorUser: error }),


    getLoadingUser: () => get().loadingUser,


    getErrorUser: () => get().errorUser,

    setLoggedInUser: (newLoggedInUser, token) => set(async (state) => {
        set({ loadingUser: true, errorUser: null });
        try {

            set({loggedInUser: newLoggedInUser});
            console.log(newLoggedInUser);


            const decodedToken = jwt_decode(token);
            console.log("new user in store:", newLoggedInUser);
            console.log("Decoded Token:", decodedToken);


            saveUserToLocalStorage(newLoggedInUser, token);


            const response = await fetch(`${serverUrl}wishlists`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                // throw new Error(`HTTP error! Status: ${response.status}`);
                set({ errorUser: response.status, loadingUser: false });
            }

            const responseData = await response.json();

            // Update wishlistBooks state with fetched data
            set({wishlistBooks: responseData});
            // Log wishlistBooks after updating state
            saveWishlistToLocalStorage(responseData);
            console.log("Fetched wishlistBooks:", responseData);
            set({ loadingUser: false });
        } catch (error) {
            // console.error("Error setting user or fetching wishlist:", error);
            set({ errorUser: error.message, loadingUser: false });
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
            // console.error("Token is expired or invalid");
            set({ errorUser: "Token is expired or invalid", loadingUser: false });
            get().logoutUser();
        }

        return {token};
    }),
    setWishlistBooks: (newBook, action = 'set') => {
        set({ loadingUser: true, errorUser: null });
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
                                    // throw new Error(`HTTP error! Status: ${response.status}`);
                                    set({ errorUser: response.status, loadingUser: false });
                                }


                                const responseData = response.data;
                                console.log("RETURNED:",responseData);
                                set({wishlistBooks: responseData});
                                saveWishlistToLocalStorage(responseData);
                                set({ loadingUser: false });
                                return { wishlistBooks: responseData };

                            } catch (error) {
                                // console.error("Error updating wishlist:", error);
                                set({ errorUser: error.message, loadingUser: false });
                            }
                        } else {
                            // console.log("Book ID already in wishlist, not adding:", bookId);
                            set({ errorUser: "Book ID already in wishlist, not adding", loadingUser: false });
                        }
                    }
                    break;

                case 'remove':
                    if (newBook) {
                        console.log("Removing book ID from wishlist:");
                        try {
                            const token = get().getToken();


                            const requestBody = { items:newBook.map(bookId => ({ bookId })) };


                            const response = await axios.delete(`${serverUrl}wishlists`, {
                                data: requestBody,
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${token}`
                                }
                            });


                            if (response.status === 200) {
                                console.log("Items removed successfully:", response.data);

                                set({wishlistBooks: response.data});
                                saveWishlistToLocalStorage(response.data);
                                set({ loadingUser: false });
                                return { wishlistBooks: response.data };
                            } else {
                                // console.error("Failed to remove items:", response.status);
                                set({ errorUser:  response.status, loadingUser: false });
                            }
                        } catch (error) {
                            // console.error("Error removing items from wishlist:", error);
                            set({ errorUser: error.message, loadingUser: false });
                        }
                    }
                    break;

                default:
                    return state;
            }
            set({ wishlistBooks:updatedItems });
            set({ loadingUser: false });
            return { wishlistBooks: updatedItems };
        });

        console.log(newBook);
    },
    getWishlistBooks: () => get().wishlistBooks,
}));