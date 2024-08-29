export const handleAddToCart = (bookId, setQuantityInCart, addBookToCart) => {

    addBookToCart(bookId);
    setQuantityInCart(prevQuantity => prevQuantity + 1);
};
export const handleAddToWishlist = (book, wishlistBooks, setWishlistBooks) => {
    const item = wishlistBooks.items.find(item => item.bookId === book._id);

    if (item) {

        setWishlistBooks([book._id], 'remove');
    } else {

        setWishlistBooks(book, 'add');
    }
};