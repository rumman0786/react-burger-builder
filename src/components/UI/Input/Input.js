import React from 'react';

import styles from './Input.module.css'

const input = (props) => {
    let userInput = null;

    switch(props.elementType){
        case ('input'):
            userInput = <input
                            className={styles.InputElement}
                            {...props.elementConfig}
                            value={props.value} />;
            break;
        
        case ('textarea'):
            userInput = <textarea
                            className={styles.InputElement}
                            {...props.elementConfig}
                            value={props.value}/>;
            break;
        default:
            userInput = <input
                            className={styles.InputElement}
                            {...props.elementConfig}
                            value={props.value}/>;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {userInput}
        </div>
    );
};

export default input;