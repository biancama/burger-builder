import React from 'react';
import styles from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    // const transformedIngredients = Object.keys(props.ingredients)
    //     .map(igKey => {
    //         return [...Array(props.ingredients[igKey])].map((_, i) => {
    //            return <BurgerIngredient key={igKey + i} type={igKey} />
    //         })
    //     });

    const transformedIngredientsKeyValues = Object.entries(props.ingredients)
        .map(([key, val]) => {
            const indexes = [...Array(val).keys()];
            return indexes.map( i=> {
                return <BurgerIngredient key={key + i} type={key} />
            });
        });
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type="bread-top" />
                {transformedIngredientsKeyValues}
            <BurgerIngredient type="bread-bottom" />

        </div>
    )
}

export default burger;