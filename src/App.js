import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import CurrentUserContext from './contexts/current-user/current-user.context'
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import SignUpPage from './pages/sign-in-and-sign-up/sign-up/sign-up.component'
import Header from './components/header/header.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      currentUser: null
    }
  }
  unsubscribeFromAuth = null;

  componentDidMount() {
  

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          console.log('snapshot', snapShot)
          this.setState({currentUser:{
            id: snapShot.id,
            ...snapShot.data()
          }});
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    console.log(this.state)
    return (
      <div>
      <CurrentUserContext.Provider value={this.state.currentUser}>
        <Header />
      </CurrentUserContext.Provider>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.state.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
           <Route exact path='/creationdecompte' component={SignUpPage} />
        </Switch>
     
      </div>
    );
  }
}



export default App;
