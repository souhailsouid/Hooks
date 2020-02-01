import React , {useContext} from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import CurrentUserContext from '../../contexts/current-user/current-user.context'
import {CartContext} from '../../providers/cart/cart.provider'

import './header.styles.scss';

const Header = () => {
  const currentUser = useContext(CurrentUserContext)
  const {hidden} = useContext(CartContext)
  return(
  <div className='header'>
    <Link className='logo-container' to='/'>
    <img src="https://s3.eu-central-1.amazonaws.com/balibart-s3/Shops/5acf0f6514006a7fe670e2cd/theme/logo.png" className='logo' alt="logo"></img>

    </Link>
    <div className='options'>
      <Link className='option option-shop' to='/shop'>
        SHOP
      </Link>
      <Link className='option option-contact' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option option-auth' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option option-auth' to='/signin'>
          SIGN IN
        </Link>
      )}
  
      <CartIcon />
         

    </div>
    {hidden ? null : <CartDropdown />}
  </div>
  )
}



export default Header;
