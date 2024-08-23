export const createOrderItems = (cartBooks) => {
    let items = [];

    if (Object.keys(cartBooks).length > 0) {
        Object.entries(cartBooks).forEach(([bookId, quantity]) => {
            const item = {
                bookId: bookId,
                quantity: quantity,

            };
            items.push(item);
        });
    }
    return items;

};