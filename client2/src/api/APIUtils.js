export const createOrderItems = (cartBooks, booksInfos) => {
    let items = [];

    if (Object.keys(cartBooks).length > 0) {
        Object.entries(cartBooks).forEach(([bookId, quantity]) => {
            const item = {
                bookId: bookId,
                quantity: quantity,
                price: booksInfos[bookId].price
            };
            items.push(item);
        });
    }
    return items;

};