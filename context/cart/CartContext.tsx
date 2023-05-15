import {createContext} from 'react'
import { IcartProducts } from '../../interfaces'

interface ContextProps {
    cart: IcartProducts[]
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

     //methods
    addProductToCart: (product: IcartProducts) => void
    updateCartQuantity: (product: IcartProducts) => void
    removeCartProduct:(product: IcartProducts) => void
}

export const CartContext = createContext({} as ContextProps)