import React from 'react';

import './custom-buttom.styles.scss';

const CustomButton = ({
  children,
  isGoogleSignIn,
  isAlreadySignUp,
  inverted,
  ...otherProps
}) => (
  <button
    className={`
    ${inverted ? 'inverted' : ''} 
    ${isGoogleSignIn ? 'google-sign-in' : ''}
    ${isAlreadySignUp ? 'already-sign-up': ''}
     custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
