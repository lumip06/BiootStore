import {useFetchRequest} from "../../api/CustomHook";
import {useBoundStore} from "../../stores/BoundStore";

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
    const booksObject = {};
    if (Array.isArray(booksData)) {
        booksData.forEach(book => {
            if (book && book._id) {
                booksObject[book._id] = book;
            }
        });
    }
        setBookInfos(booksObject);

};
const serverUrl = process.env.REACT_APP_SERVER_URL;


export const useFetchBookInfos = () => {
    const { apiCall } = useFetchRequest();
    const { setLoadingOrders, setErrorOrders, getCartBookIds } = useBoundStore();

    return (setBookInfos) => {
        setLoadingOrders(true);
        setErrorOrders(null);
        const cartBookIds = getCartBookIds();

        if (cartBookIds.length > 0) {
            const requestBody = {ids: cartBookIds};

            apiCall(
                `${serverUrl}books/infos`,
                'POST',
                requestBody,
                [
                    (booksData) => {
                        processBooksData(booksData, setBookInfos);
                    }
                ],
                [setErrorOrders],
                [setLoadingOrders],
            );
        } else {
            setBookInfos({});
            setLoadingOrders(false);
        }
    };
};