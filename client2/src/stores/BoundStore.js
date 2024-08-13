import {create} from 'zustand'
import {createBookStore} from "./BookStore";
import {createOrderStore} from "./OrderStore";


export const useBoundStore = create((...a) => ({
        ...createBookStore(...a),
        ...createOrderStore(...a)
    }
))
