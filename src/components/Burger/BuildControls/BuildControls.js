import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];



const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
        {
            controls.map (cont => {
                return <BuildControl 
                        disabled={props.disabled[cont.type]}
                        ingredientRemoved={() => props.ingredientRemoved(cont.type)} 
                        ingredientAdded={() => props.ingredientAdded(cont.type)} 
                        key={cont.label} label={cont.label} />
            }) 
        }
        <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
            ORDER NOW</button>
    </div>
);
export default buildControls; 