import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import styles from './BuildControls.module.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]
const BuildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            {
            controls.map(control => 
                <BuildControl
                    key={control.label} 
                    label={control.label}
                    added={() => props.addHandler(control.type)}
                    removed={() => props.removeHandler(control.type)}
                    shouldDisable={props.disabledHandler[control.type]}
                    />
                )
            }
        </div>
    );
};

export default BuildControls;