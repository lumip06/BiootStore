import {create} from 'zustand'
import {filterBooks} from "./ServerCalls";

export const createBookStore = ((set, get) => ({
    books: [],
    booksTotal: 0,
    page: 0,
    checkboxes: {},
    filters: {},
    limit: 12,


    filterCount: () => {
        const {checkboxes} = get();
        return Object.values(checkboxes).filter(Boolean).length;
    },
    updateLimit: (newLimit) => set((state) => {

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
                checkboxes: {
                    ...state.checkboxes,
                    [checkboxId]: isChecked,
                },
                filters: newFilter,
            };
        });


    },

}));


export const useBoundStore = create((...a) => ({
        ...createBookStore(...a)
    }
))
