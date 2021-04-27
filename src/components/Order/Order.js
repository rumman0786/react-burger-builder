import React from 'react';

import style from './Order.module.css';

const order = (props) => {
    const ingridients = [];
    console.log(props);
    for(let key in props.ingridients) {
        ingridients.push(
            <span
                key={key}
                style={{
                    transform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    padding: '5px',
                    border: '2px solid #ccc'
                }}
                >{key} : ({props.ingridients[key]})</span>
        );
    }

    return (
        <div className={style.Order}>
            <p>Ingrident: {ingridients}</p>
            <p>Total Price: <strong>${Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;