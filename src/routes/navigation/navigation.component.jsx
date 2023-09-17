import { Fragment, useContext } from "react";
import { Outlet } from "react-router-dom";
import { NavigationContainer, NavLinks, 
  NavLink, LogoContainer } from "./navigation.styles";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDrowdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.utils";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

    return (
      <Fragment>
        <NavigationContainer>
          <LogoContainer to='/'>
            <CrwnLogo className="logo" />
          </LogoContainer>
          <NavLinks>
            <NavLink to='/shop'>
                Shop
            </NavLink>
            {
              currentUser ? (
                <NavLink as='span' onClick={signOutUser}>
                Sign Out
                </NavLink>
                ) : (
                  <NavLink to='/auth'>Sign In </NavLink>
              )
            }
            <CartIcon />
          </NavLinks>
          {isCartOpen && <CartDrowdown />}
        </NavigationContainer>
        <Outlet />
      </Fragment>
    );
};

export default Navigation;