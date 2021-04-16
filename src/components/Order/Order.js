import React from 'react';

import style from './Order.module.css';

const order = () => {
    return (
        <div className={style.Order}>
            <p>Ingrident: Salad(1)</p>     
            <p>Total Price: <strong>$5.0</strong></p>     
        </div>
    );
};

export default order;