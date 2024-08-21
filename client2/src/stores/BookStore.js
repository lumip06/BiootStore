

import {filterBooks, getOneBook} from "../api/BookAPI";


export const createBookStore = ((set, get) => ({
        books: [],
        booksTotal: 0,
        page: 1,
        filterOptions: {},
        filters: {},
        limit: 12,
        selectedBook: {},


        filterCount: () => {
            const {filterOptions: filterOptions} = get();
            return Object.values(filterOptions).filter(Boolean).length;
        },
        setLimit: (newLimit) => set((state) => {

            set({limit: newLimit});
            return {limit: newLimit}

        }),

        getCartBookIds: () => {

            // if (!Array.isArray(idsToIgnore)) {
            //     console.error('idsToIgnore should be an array. Received:', idsToIgnore);
            //     idsToIgnore = [];
            // }

            const { cartBooks } = get();
            const cartBookIds = Object.keys(cartBooks);

            // Filter out the IDs that are in idsToIgnore
            // const filteredIds = cartBookIds.filter(id => !idsToIgnore.includes(id));

            console.log("Cart Book IDs:", cartBookIds);
            // console.log("IDs to Ignore:", idsToIgnore);
            // console.log("Filtered IDs:", filteredIds);
            //
            // return filteredIds;
            return cartBookIds;
        },
        nextPage: () => set((state) => {
            const newPage = state.page + 1;
            return {
                page: newPage,
                filters: {
                    ...state.filters,
                    offset: (newPage - 1 ) * state.limit,

                },
            };
        }),
        previousPage: () => set((state) => {
            const newPage = state.page - 1;
            return {
                page: newPage,
                filters: {
                    ...state.filters,
                    offset: (newPage - 1 ) * state.limit,

                },
            };
        }),

        fetchBooks: () => set(async (state) => {
            try {
                const filters = {...state.filters};
                delete filters["skip"];


                const response = await filterBooks(filters, state.limit);
                const newBooks = response.data.books || [];
                const booksTotal = response.data.booksTotal;


                set({books: newBooks, booksTotal: booksTotal});

                return {
                    books: newBooks,
                    booksTotal: booksTotal,
                };
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        }),
        selectBook: (id) => set(async (state) => {
            try {


                const response = await getOneBook(id);
                const newBook = await response || [];
                console.log("new book selected " + newBook);


                set((prevState) => ({
                    selectedBook: {
                        ...prevState.selectedBook,
                        [id]: newBook
                    }
                }));
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        }),
        toggleFilter: (checkboxId, checkboxName, isChecked) => {
            set((state) => {
                const newFilter = {...state.filters};

                if (isChecked) {
                    newFilter[checkboxName] = checkboxId;
                    state.page = 1;
                    delete newFilter["skip"];
                } else {
                    delete newFilter[checkboxName];
                }

                return {
                    filterOptions: {
                        ...state.filterOptions,
                        [checkboxId]: isChecked,
                    },
                    filters: newFilter,
                };
            });


        },

        updateSelectedBooksStock: () => set((state) => {
            const { cartBooks } = get();
            const cartBookIds = Object.keys(cartBooks);
            const updatedSelectedBook = { ...state.selectedBook };

            cartBookIds.forEach(id => {

                if (updatedSelectedBook[id] && cartBooks[id]) {
                    updatedSelectedBook[id].quantity -= cartBooks[id].quantity;
                }
            });

            return {
                selectedBook: updatedSelectedBook,
            };
        }),

    })
);