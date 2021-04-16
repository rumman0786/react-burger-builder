import React from 'react';
import { withRouter} from 'react-router-dom';

import Ingrident from './Ingridient/Ingridient';
import styles from './Burger.module.css';

const burger = (props) => {
    console.log(props);
    let transformedIngridients = Object.keys(props.ingridients)
                                        .map(ingridientKey => {
                                            return [...Array(props.ingridients[ingridientKey])].map((_, index) => {
                                                return <Ingrident key={ingridientKey + index} type={ingridientKey} />
                                            })
                                        })
                                        .reduce((arr, el) => {
                                            return arr.concat(el)
                                        }, []);
    
    if(transformedIngridients.length === 0) {
        transformedIngridients = <p>Please Add Ingridients</p>
    }

    return (
        <div className={styles.Burger}>
            <Ingrident type="bread-top"/>
                {transformedIngridients}
            <Ingrident type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);
