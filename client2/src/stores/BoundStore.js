import {create} from 'zustand'
import {createBookStore} from "./BookStore";
import {createOrderStore} from "./OrderStore";
import {createUserStore} from "./UserStore";


export const useBoundStore = create((...a) => ({
        ...createBookStore(...a),
        ...createOrderStore(...a),
        ...createUserStore(...a)
    }
))
