import {loadCartFromLocalStorage, saveCartToLocalStorage} from "./FromLocalStorage";


export const createOrderStore = ((set, get) => ({
    cartBooks: loadCartFromLocalStorage(),
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

    }),})
);