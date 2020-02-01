import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import NotificationError from '../notifications/error/notification-error.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
import znk from '../../assets/znk.png'
import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      show: false
    };
  }
  

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch (error) {
      console.log(error);
      this.setState({error: error.message, show: true})
      

    }
  };

  handleChange = event => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {

    const {show, error} = this.state
  
    return (
      <div className='sign-in' >


        <img src={znk}  className="logo" alt="logo-zenika"/>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={this.handleChange}
            value={this.state.email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={this.state.password}
            handleChange={this.handleChange}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Connection</CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
            <i class="fab fa-google icon-google"></i>&nbsp;   Se connecter avec Google
            </CustomButton>
          </div>
        </form>
        <a href="/creationdecompte" className=" help-link" title="se rediriger vers la page de création de compte">Créer un compte ?</a>
        {show ?
       <NotificationError error={error} onClose={() => this.setState({show: false})}/> : null}
      </div>
    );
  }
}

export default SignIn;
