import { FC, useEffect, useReducer, useState } from 'react'
import Cookie from 'js-cookie'
import { CartContext, cartReducer } from './'
import { IcartProducts } from '../../interfaces'

export interface CartState {
    cart: IcartProducts[],
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}

interface Props {
    children: React.ReactNode
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
}

export const CartProvider: FC<Props> = ({ children }) => {

    const [cookieValidate, setCookieValidate] = useState(false)

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    useEffect(() => {
        try {
            setCookieValidate(false)
            const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
            dispatch({ type: '[cart] - LoadCart from coockies | storage', payload: cookieProducts })
        } catch (error) {
            dispatch({ type: '[cart] - LoadCart from coockies | storage', payload: []})
        } finally {
            setCookieValidate(true)
        }
    }, [])
    
    useEffect(() => {
        if (cookieValidate) Cookie.set('cart', JSON.stringify(state.cart))
    }, [state.cart, cookieValidate])
    
    useEffect(() => {

        const numberOfItems = state.cart.reduce((prev, current)=> current.quantity + prev ,0)
        const subTotal = state.cart.reduce((prev, current)=> (current.quantity * current.price) + prev, 0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE)

            const orderSummary = {
                numberOfItems,
                subTotal,
                tax: subTotal * taxRate,
                total: subTotal * (taxRate +1)
            }
            dispatch({type: '[cart] - Update order summary', payload: orderSummary});

    }, [state.cart])
    
    
    
    const addProductToCart = (product: IcartProducts) => {
        const productInCart = state.cart.some(p => p._id === product._id)
        if (!productInCart) return dispatch({ type: '[cart] - Add product to cart', payload: [...state.cart, product] })

        const productInCartButDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
        if (!productInCartButDifferentSize) return dispatch({ type: '[cart] - Add product to cart', payload: [...state.cart, product] })
        //acumular

        const updateProducts = state.cart.map(p => {
            if (p._id !== product._id) return p;
            if (p.size !== product.size) return p;

            //acumular cantidad
            p.quantity += product.quantity

            return p;

        })
        dispatch({ type: '[cart] - Add product to cart', payload: updateProducts });

    }

    const updateCartQuantity = (product: IcartProducts) => {
        dispatch({type: '[cart] - Update cart quantity', payload: product})
    }


    const removeCartProduct = (product: IcartProducts) => {
        dispatch({type: '[cart] - Remove product in cart', payload: product})
    }
   

    return (
        <CartContext.Provider value={{
            ...state, addProductToCart, updateCartQuantity, removeCartProduct
        }}>
            {children}
        </CartContext.Provider>)
}