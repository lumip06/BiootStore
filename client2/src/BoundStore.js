import {create} from 'zustand'
import {filterBooks, getOneBook} from "./API";
import {createJSONStorage, persist} from "zustand/middleware";

export const createBookStore = ((set, get) => ({
        books: [],
        booksTotal: 0,
        page: 0,
        filterOptions: {},
        filters: {},
        limit: 12,
        selectedBook: {},
        cartBooks:{},

        filterCount: () => {
            const {filterOptions: filterOptions} = get();
            return Object.values(filterOptions).filter(Boolean).length;
        },
        setLimit: (newLimit) => set((state) => {

            set({limit: newLimit});
            return {limit: newLimit}

        }),

        nextPage: () => set((state) => {
            const newPage = state.page + 1;
            return {
                page: newPage,
                filters: {
                    ...state.filters,
                    offset: newPage * state.limit,

                },
            };
        }),
        previousPage: () => set((state) => {
            const newPage = state.page - 1;
            return {
                page: newPage,
                filters: {
                    ...state.filters,
                    offset: newPage * state.limit,

                },
            };
        }),

        fetchBooks: () => set(async (state) => {
            try {
                const filters = {...state.filters};
                delete filters["skip"];


                const response = await filterBooks(filters, state.limit, state.page);
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
                const newBook = await response.json() || [];
                console.log("new book selected " +newBook);


                set((prevState) => ({
                    selectedBook: {
                        ...prevState.selectedBook,
                        [id]: newBook // Set the selected book by ID
                    }
                }));
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        }),
        addBooktoCart: (book) => set(async (state) => {
            try {
                const newCartBook = {...state.cartBooks};
                newCartBook[book.id]=book;

                return {
                    cartBooks: newCartBook
                };
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        }),
        toggleFilter: (checkboxId, checkboxName, isChecked) => {
            set((state) => {
                const newFilter = {...state.filters};

                if (isChecked) {
                    newFilter[checkboxName] = checkboxId;
                    state.page = 0;
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

    })
);


export const useBoundStore = create((...a) => ({
        ...createBookStore(...a)
    }
))
