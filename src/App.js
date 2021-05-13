import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layouts/Layouts';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder';
import Auth from '../src/containers/Auth/Auth';
import Checkout from '../src/containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import * as Action from './store/actions/index';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(Action.checkAuthState())
  };
}
export default connect(null, mapDispatchToProps)(App);
