import {create} from 'zustand'
import {filterBooks} from "./ServerCalls";

export const createBookStore = ((set, get) => ({
    books: [],
    booksTotal: 0,
    page: 0,
    checkboxes: {},
    filters: {},
    limit:12,


    toggleFilter: (checkboxId, checkboxName, isChecked) => {
        set((state) => {
            // const newCheckboxState = !state.checkboxes[checkboxId];
            const newFilter = { ...state.filters };

            if (isChecked) {
                newFilter[checkboxName] = checkboxId;
                state.page = 0;
                delete newFilter["skip"];
            } else {
                delete newFilter[checkboxName];
            }

            return {
                checkboxes: {
                    ...state.checkboxes,
                    [checkboxId]:isChecked,
                },
                filters: newFilter,
            };
        });


    },
    filterCount: () => {
        const {checkboxes} = get();
        return Object.values(checkboxes).filter(Boolean).length;
    },

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
    // Action to fetch books from the database
    fetchBooks: () => set(async (state) => {
        try {
            const filters = { ...state.filters };
            delete filters["skip"];

            // Assuming filterBooks is an async function that makes an API call
            const response = await filterBooks(filters,state.limit,state.page);

            // Extract books and booksTotal from the response
            const newBooks = response.data.books || [];
            const booksTotal = response.data.booksTotal;

            // Log the fetched books
            // console.log("Fetched books:", newBooks);
            set({ books: newBooks, booksTotal: booksTotal});
            // Correctly update the state with the new books and booksTotal
            return {
                books: newBooks,
                booksTotal: booksTotal,
            };
        } catch (error) {
            console.error('Failed to fetch books:', error);
        }
    }),
    updateLimit:(newLimit) => set((state) => {
        // console.log(newLimit)
        set({ limit:newLimit});
        return {limit:newLimit}

    }),

}));


export const useBoundStore = create((...a) => ({
        ...createBookStore(...a)
    }
))
