import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import styles from './BuildControls.module.css'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'Meat'},
]
const BuildControls = () => {
    return (
        <div className={styles.BuildControls}>
            {controls.map(control => <BuildControl key={control.label} label={control.label}/>)}
        </div>
    );
};

export default BuildControls;