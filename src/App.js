import React, { Component } from 'react';
import Layout from './hoc/Layouts/Layouts';

import BurgerBuilder from '../src/containers/BurgerBuilder/BurgerBuilder'
import Checkout from '../src/containers/Checkout/Checkout'

class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder/>
        <Checkout/>
      </Layout>
    );
  }
}

export default App;
