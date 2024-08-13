export const calculateTotalPrice = (cartBooks, bookInfos) => {
    return Object.entries(cartBooks).reduce((total, [bookId, quantity]) => {
        const bookInfo = bookInfos[bookId];
        if (bookInfo) {
            return total + (bookInfo.price * quantity);
        }
        return total;
    }, 0);
};

