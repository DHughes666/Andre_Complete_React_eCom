import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';


import { CartContext } from '../../contexts/cart.context';

import './cart-dropdown.styles.scss';

import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';


const CartDrowdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigator = useNavigate();

    const goToCheckoutHandler = () => {
        navigator('/checkout')
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </div>
    )
}

export default CartDrowdown;