import React, { Component } from 'react';

import styles from './Modal.module.css';
import Aux from '../../../hoc/aux'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.showSummary !== this.props.showSummary;
    }

    componentDidUpdate() {
        console.log("[Modal] component Updated");
    }

    render() {
        return (
            <Aux>
                <Backdrop
                    show={this.props.showSummary}
                    closed={this.props.backdropHandler}/>
    
                <div className={styles.Modal}
                    style={
                        { transform: this.props.showSummary ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.showSummary ? '1' : '0'
                        }
                    }>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
    
}

export default Modal;
