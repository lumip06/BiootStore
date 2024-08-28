export const handleAddToCart = (bookId, setQuantityInCart, addBookToCart) => {

    addBookToCart(bookId);
    setQuantityInCart(prevQuantity => prevQuantity + 1);
};
export const handleAddToWishlist = (book, wishlistBooks, setWishlistBooks) => {
    const item = wishlistBooks.items.find(item => item.bookId === book._id);

    if (item) {
        console.log("Found item, removing from wishlist", item);
        setWishlistBooks([book._id], 'remove');
    } else {
        console.log("Item not found, adding to wishlist");
        setWishlistBooks(book, 'add');
    }
};