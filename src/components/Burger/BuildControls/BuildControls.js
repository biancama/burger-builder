import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', typs: 'salad'},
    {label: 'Bacon', typs: 'bacon'},
    {label: 'Cheese', typs: 'cheese'},
    {label: 'Meat', typs: 'meat'}
];

const buildControlsTransformed = controls.map (cont => {
    return <BuildControl key={cont.label} label={cont.label} />
});

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {buildControlsTransformed}
    </div>
);
export default buildControls; 