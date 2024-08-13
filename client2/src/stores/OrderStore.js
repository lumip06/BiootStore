
const loadCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('cartBooks');
    return cartData ? JSON.parse(cartData) : {};
}

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cartBooks) => {
    localStorage.setItem('cartBooks', JSON.stringify(cartBooks));
}


export const createOrderStore = ((set, get) => ({
    cartBooks: loadCartFromLocalStorage(),   ///pairs of {idBook ,quantity}
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