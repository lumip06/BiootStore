

import {filterBooks, getOneBook} from "../api/BookAPI";

import Login from "../pages/Login";


export const createBookStore = ((set, get) => ({
        books: [],
        booksTotal: 0,
        page: 1,
        filterOptions: {},
        filters: {},
        limit: 12,
        selectedBook:  {},
        loadingBooks: false,
        errorBooks: null,

        setLoadingBooks: (loading) => set({ loadingBooks: loading }),


        setErrorBooks: (error) => set({ errorBooks: error }),


        getLoadingBooks: () => get().loadingBooks,


        getErrorBooks: () => get().errorBooks,
        filterCount: () => {
            const {filterOptions: filterOptions} = get();
            return Object.values(filterOptions).filter(Boolean).length;
        },
        setLimit: (newLimit) => set((state) => {

            set({limit: newLimit});
            return {limit: newLimit}

        }),

        getCartBookIds: () => {



            const { cartBooks } = get();
            const cartBookIds = Object.keys(cartBooks);


            console.log("Cart Book IDs:", cartBookIds);

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
               // set({ loadingBooks: true, errorBooks: null });
                const filters = {...state.filters};
                delete filters["skip"];


                const response = await filterBooks(filters, state.limit);
                const newBooks = response.data.books || [];
                const booksTotal = response.data.booksTotal;


                set({books: newBooks, booksTotal: booksTotal});
              //  set({ loadingBooks: false });
                return {
                    books: newBooks,
                    booksTotal: booksTotal,
                };
            } catch (error) {
                 console.error('Failed to fetch books:', error);
              //  set({ errorBooks: error.message, loadingBooks: false });
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
                const updatedSelectedBook = get().selectedBook;


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
            console.log(    "cartbooks");
            console.log(cartBooks)
            console.log("UPDATE STOCK")
            cartBookIds.forEach(id => {

                if (updatedSelectedBook[id] && cartBooks[id]) {

                    updatedSelectedBook[id].stock = updatedSelectedBook[id].stock -cartBooks[id];
                }
            });
            set({selectedBook: updatedSelectedBook});

            return {
                selectedBook: updatedSelectedBook,
            };
        }),

    })
);