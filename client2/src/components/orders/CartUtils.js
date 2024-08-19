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

        const quantity = Number(book) || 0;
        bookCount += quantity;
    });

    return bookCount;
};

export const processBooksData = (booksData, setBookInfos) => {
    console.log('API Response:', booksData);
    if (Array.isArray(booksData)) {
        const booksObject = booksData.reduce((acc, book) => {
            acc[book._id] = book;
            return acc;
        }, {});
        setBookInfos(booksObject);
    } else {
        console.error('Expected an array but received:', booksData);
        setBookInfos({});
    }
};