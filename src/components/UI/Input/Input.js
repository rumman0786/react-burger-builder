import React from 'react';

import styles from './Input.module.css'

const input = (props) => {
    let userInput = null;

    switch(props.elementType){
        case ('input'):
            userInput = <input
                            className={styles.InputElement}
                            {...props.elementConfig}
                            value={props.value} 
                            onChange={props.changed}/>;
            break;
        
        case ('textarea'):
            userInput = <textarea
                            className={styles.InputElement}
                            {...props.elementConfig}
                            value={props.value} 
                            onChange={props.changed}/>;
            break;
        case ('select'):
            userInput = (<select
                            onChange={props.changed}
                            className={styles.InputElement}>
                            {props.elementConfig.options.map(option => {
                                return <option key={option.value} value={option.value}>{option.label}</option>;
                            })}
                        </select>
                    );
            break;
        default:
            userInput = <input
                            className={styles.InputElement}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}/>;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {userInput}
        </div>
    );
};

export default input;