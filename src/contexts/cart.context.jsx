import { createContext, useState } from "react";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
});

export const CartProvider = ({ children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }


    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems};

    return <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
}