import React, { Component } from 'react';

import Aux from '../../hoc/aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

import classes from './Layout.module.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    toggleSideDrawerHandler = () => {
        const prevshowSideDrawer = this.state.showSideDrawer;
        this.setState({showSideDrawer: !prevshowSideDrawer});
    }

    render () {
        return (
            <Aux>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}/>

                <Toolbar toggleSideDrawer={this.toggleSideDrawerHandler}/>

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;
