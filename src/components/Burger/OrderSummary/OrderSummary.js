import React from 'react';
import AUX from  '../../../hoc/Aux';
const orderSummary = (props) => {
    const ingredientsSummary = Object.entries(props.ingredients)
    .map(([key, value]) => {  
        return (
        <li key={key}><span style={{textTransform: "capitalize"}}>{key}</span>: {value}</li>
        );
    });

    return (
    <AUX>       
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredientes:</p>
        <ul>
            {ingredientsSummary}
        </ul>
        <p>Continue to checkout?</p>
    </AUX>
    );
};


export default orderSummary;