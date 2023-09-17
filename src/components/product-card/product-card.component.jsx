import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useContext } from 'react';

import { ProductCartContainer, FooterTag, FooterName, FooterPrice } from './product-card.styles';

import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ productItems }) => {
    const { name, price, imageUrl } = productItems;
    const { addItemToCart } = useContext(CartContext)

    const addProductToCart = () => addItemToCart(productItems);
    
    return (
    <ProductCartContainer>
        <img src={imageUrl} alt={`${name}`}/>
        <FooterTag>
            <FooterName>{name}</FooterName>
            <FooterPrice>{price}</FooterPrice>
        </FooterTag>
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>
            Add to Cart
        </Button>
    </ProductCartContainer>
    )
}

export default ProductCard;