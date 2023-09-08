import { createContext, useState, useEffect } from "react";

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

export const CartProvider = ({ children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) =>
        total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => 
        total + cartItem.quantity * cartItem.price, 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }


    const value = {
        isCartOpen, 
        setIsCartOpen, 
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