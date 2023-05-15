import { IcartProducts } from "../../interfaces";
import { CartState } from "./CartProvider";

type CartActionType =
    | { type: '[cart] - LoadCart from coockies | storage', payload: IcartProducts[] }
    | { type: '[cart] - Add product to cart', payload: IcartProducts[] }
    | { type: '[cart] - Update cart quantity', payload: IcartProducts }
    | { type: '[cart] - Remove product in cart', payload: IcartProducts }
    | {
        type: '[cart] - Update order summary', payload: {
            numberOfItems: number;
            subTotal: number;
            tax: number;
            total: number;
        }
    }


export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[cart] - LoadCart from coockies | storage':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[cart] - Add product to cart':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[cart] - Update cart quantity':
            return {
                ...state,
                cart: state.cart.map(product => {
                    if (product._id !== action.payload._id) return product;
                    if (product.size !== action.payload.size) return product;

                    return action.payload
                })
            }

        case '[cart] - Remove product in cart':
            return {
                ...state,
                cart: state.cart.filter(product => !(product._id === action.payload._id && product.size === action.payload.size))
            }
        
        case '[cart] - Update order summary':
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state;
    }
}