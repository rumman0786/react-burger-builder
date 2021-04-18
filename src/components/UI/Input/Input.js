import React from 'react';

import styles from './Input.module.css'

const input = (props) => {
    let userInput = null;
    let validationError = null;

    let inputClasses = [styles.InputElement];
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
        validationError = <p className={styles.ValidationError}>{props.errorMessage}</p>;
    }

    switch(props.elementType){
        case ('input'):
            userInput = <input
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value} 
                            onChange={props.changed}/>;
            break;
        
        case ('textarea'):
            userInput = <textarea
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value} 
                            onChange={props.changed}/>;
            break;
        case ('select'):
            userInput = (<select
                            onChange={props.changed}
                            className={inputClasses.join(' ')}>
                            {props.elementConfig.options.map(option => {
                                return <option key={option.value} value={option.value}>{option.label}</option>;
                            })}
                        </select>
                    );
            break;
        default:
            userInput = <input
                            className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}/>;
    }

    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {userInput}
            {validationError}
        </div>
    );
};

export default input;