import React from 'react';

import styles from './Modal.module.css';
import Aux from '../../../hoc/aux'
import Backdrop from '../Backdrop/Backdrop'

const modal = (props) => {
    return (
        <Aux>
            <Backdrop
                show={props.showSummary}
                closed={props.backdropHandler}/>

            <div className={styles.Modal}
                style={
                    { transform: props.showSummary ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.showSummary ? '1' : '0'
                    }
                }>
                {props.children}
            </div>
        </Aux>
    );
}

export default modal;
