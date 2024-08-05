import {create} from 'zustand'

export const createBookStore = ((set, get) => ({
    books: 0,
    page: 0,
    checkboxes: {},
    filters: {},


    toggleFilter: (checkboxId, checkboxName) => set((state) => {
        const newCheckboxState = !state.checkboxes[checkboxId];
        const newFilter = {...state.filters};

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


    }),
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

}));


export const useBoundStore = create((...a) => ({
        ...createBookStore(...a)
    }
))
