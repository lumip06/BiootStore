export const calculateTotalPrice = (cartBooks, bookInfos) => {
    return Object.entries(cartBooks).reduce((total, [bookId, quantity]) => {
        const bookInfo = bookInfos[bookId];
        if (bookInfo) {
            return total + (bookInfo.price * quantity);
        }
        return total;
    }, 0);
};

export const checkBookInCart = (cartBooks, id) => {
    return cartBooks.hasOwnProperty(id);
};


export const countBooksInCart = (cartBooks) => {
    let bookCount = 0;

    Object.values(cartBooks).forEach(book => {
        // Ensure quantity is a valid number, default to 0 if not
        const quantity = Number(book) || 0;
        bookCount += quantity;
    });

    return bookCount;
};

