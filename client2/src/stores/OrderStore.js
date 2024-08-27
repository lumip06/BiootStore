import {loadCartFromLocalStorage, saveCartToLocalStorage} from "./FromLocalStorage";


export const createOrderStore = ((set, get) => ({
        cartBooks: loadCartFromLocalStorage(),
        loadingOrders: false,
        errorOrders: null,
        // Method to set loading state
        setLoadingOrders: (loading) => set({ loadingOrders: loading }),

        // Method to set error state
        setErrorOrders: (error) => set({ errorOrders: error }),

        // Method to get loading state
        getLoadingOrders: () => get().loadingOrders,

        // Method to get error state
        getErrorOrders: () => get().errorOrders,
        addBookToCart: (bookId) => set(state => {

            const newBookCart = {...state.cartBooks};

            if (newBookCart[bookId]) {
                newBookCart[bookId] += 1;
            } else {
                newBookCart[bookId] = 1;
            }


            saveCartToLocalStorage(newBookCart);

            set({cartBooks: newBookCart});
            return {
                cartBooks: newBookCart,
            };
        }),
        emptyBookCart: () => set(state => {
            set({cartBooks: {}});
            localStorage.removeItem('cartBooks');
            return {
                cartBooks: {},
            };
        }),
        removeBookFromCart: (bookId) => set(state => {

            const newBookCart = {...state.cartBooks};

            delete newBookCart[bookId];


            saveCartToLocalStorage(newBookCart);

            set({cartBooks: newBookCart});
            return {
                cartBooks: newBookCart,
            };

        }),

        changeBookQuantity: (bookId, quantity) => set(state => {
            const newBookCart = {...state.cartBooks};

            if (quantity <= 0) {
                delete newBookCart[bookId];
            } else {
                newBookCart[bookId] = quantity;
            }

            saveCartToLocalStorage(newBookCart);

            set({cartBooks: newBookCart});
            return {
                cartBooks: newBookCart,
            };
        }),

    })

);