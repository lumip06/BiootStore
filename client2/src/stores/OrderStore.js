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
        // Simplified method to change the quantity of a book
        changeBookQuantity: (bookId, quantity) => set(state => {
            const newBookCart = { ...state.cartBooks };

            if (quantity <= 0) {
                delete newBookCart[bookId]; // If quantity is 0 or less, remove the book from the cart
            } else {
                newBookCart[bookId] = quantity; // Update the quantity directly
            }

            saveCartToLocalStorage(newBookCart);

            set({ cartBooks: newBookCart });
            return {
                cartBooks: newBookCart,
            };
        }),
    })

);