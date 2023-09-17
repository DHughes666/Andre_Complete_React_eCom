import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


import { CartContext } from '../../contexts/cart.context';

import { CartDropdownContainer, CartItems } from './cart-dropdown.styles';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';


const CartDrowdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigator = useNavigate();

    const goToCheckoutHandler = () => {
        navigator('/checkout')
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </CartItems>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDrowdown;