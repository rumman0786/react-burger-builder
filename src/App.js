import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom'

import Layout from './hoc/Layouts/Layouts';
import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import Checkout from '../src/containers/Checkout/Checkout'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    );
  }
}

export default App;
