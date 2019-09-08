import React, { Component } from 'react';
import AUX from  '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    componentWillUpdate () {
        console.log("[OrderSurmary] willUpdate");
    }
    render() {
        const ingredientsSummary = Object.entries(this.props.ingredients)
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
                <p><strong>Total Price: {this.props.totalPrice}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </AUX>
        );
    }    
}  

export default OrderSummary;