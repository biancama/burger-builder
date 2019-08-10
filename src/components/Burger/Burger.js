import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
   
    let transformedIngredientsKeyValues = Object.entries(props.ingredients)
        .map(([key, val]) => {  
            const indexes = [...Array(val).keys()];
            return indexes.map( i=> {
                return <BurgerIngredient key={key + i} type={key} />
            });
        }).flatMap(x => x); 
    console.log(transformedIngredientsKeyValues);
    if (transformedIngredientsKeyValues.length === 0) {
        transformedIngredientsKeyValues = <p>Please add some ingredients!!!</p>
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredientsKeyValues}
            <BurgerIngredient type="bread-bottom" />

        </div>
    )
}

export default burger;