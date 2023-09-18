import { createContext, useState, useEffect, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
    // Find if cartItems contains productToAdd
    const existingCartItems = cartItems.find((cartItem) => (
        cartItem.id === productToAdd.id
    ));

    // If found, increment quantity
    if(existingCartItems) {
        return cartItems.map((cItem) => 
            cItem.id === productToAdd.id ? {...cItem, quantity: cItem.quantity + 1} : 
            cItem
        )
    }

    // return new array with modified cartItems/ new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // First we find the cart item to remove
    const existingCartItems = cartItems.find((cartItem) => (
        cartItem.id === cartItemToRemove.id
    ));


    // Next we check if the quantity is equal to 1 or more, if not we remove it entirely from the cart
    if (existingCartItems.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }

    // Return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cItem) => 
            cItem.id === cartItemToRemove.id ? {...cItem, quantity: cItem.quantity - 1} : 
            cItem
        )
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
});

const INITIAL_STATE = {
    isCartOpen: true,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
}

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_CART_ITEMS':
            return {
                ...state,
                ...payload,
            };

        default:
            throw new Error(`unhandled type of ${type} in cartReducer`);
    }
}

export const CartProvider = ({ children}) => {
    const [{cartItems, isCartOpen, cartCount, cartTotal}, 
            dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {

        // newCartCount
        const newCartCount = newCartItems.reduce((total, cartItem) =>
        total + cartItem.quantity, 0);

        // newCartTotal
        const newCartTotal = newCartItems.reduce((total, cartItem) => 
        total + cartItem.quantity * cartItem.price, 0);

        dispatch({type: 'SET_CART_ITEMS', 
            payload: {
                cartItems: newCartItems, 
                cartTotal: newCartTotal, 
                cartCount: newCartCount
            }
        }); 

        /** 
         * generate newCartTotal
         * 
         * generate newCartCount
         * 
         * dispatch new action with payload = {
         *  newCartItems,
         *  newCartTotal,
         *  newCartCount
         * }
         */
    }

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove) => {
        const newCartItems = removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }


    const value = {
        isCartOpen, 
        setIsCartOpen: () => {}, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart,
         cartItems, 
         cartCount, 
         cartTotal};

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}