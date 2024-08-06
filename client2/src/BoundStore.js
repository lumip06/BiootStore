import {create} from 'zustand'
import {filterBooks} from "./ServerCalls";

export const createBookStore = ((set, get) => ({
    books: [],
    booksTotal: 0,
    page: 0,
    checkboxes: {},
    filters: {},
    limit:6,


    toggleFilter: (checkboxId, checkboxName, isTrue) => {
        set((state) => {
            const newCheckboxState = !state.checkboxes[checkboxId];
            const newFilter = { ...state.filters };

            if (newCheckboxState) {
                newFilter[checkboxName] = checkboxId;
                state.page = 0;
                delete newFilter["offset"];
            } else {
                delete newFilter[checkboxName];
            }

            return {
                checkboxes: {
                    ...state.checkboxes,
                    [checkboxId]: newCheckboxState,
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
                offset: newPage * 6,

            },
        };
    }),
    previousPage: () => set((state) => {
        const newPage = state.page - 1;
        return {
            page: newPage,
            filters: {
                ...state.filters,
                offset: newPage * 6,

            },
        };
    }),
    // Action to fetch books from the database
    fetchBooks: () => set(async (state) => {
        try {
            const filters = { ...state.filters };
            delete filters["offset"];

            // Assuming filterBooks is an async function that makes an API call
            const response = await filterBooks(filters);

            // Extract books and booksTotal from the response
            const newBooks = response.data.books || [];
            const booksTotal = response.data.booksTotal;

            // Log the fetched books
            console.log("Fetched books:", newBooks);
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
    // Trigger fetchBooks after the state has been updated

}));


export const useBoundStore = create((...a) => ({
        ...createBookStore(...a)
    }
))
