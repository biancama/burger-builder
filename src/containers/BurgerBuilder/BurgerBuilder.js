import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICES ={
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.4,
    meat: 2.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }
    addingIngredientHandler = (type) => {
        const previousValue = this.state.ingredients[type];
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = previousValue + 1;
        const singlePrice = INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: this.state.totalPrice + singlePrice});
        this.updatePurchaseState(updatedIngredients);
    }
    removingIngredientHandler = (type) => {
        const previousValue = this.state.ingredients[type];
        if (previousValue <= 0) {
            return;
        }
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = previousValue - 1;
        const singlePrice = INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients, totalPrice: this.state.totalPrice - singlePrice});
        this.updatePurchaseState(updatedIngredients);
    }
    updatePurchaseState (ingredients) {
        const oneNonZero = Object.values(ingredients).find(v => v > 0);
        this.setState({purchasable: typeof oneNonZero != undefined});
    }

    purchaseHandler= () => {
        this.setState({purchasing: true});
    }
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing}><OrderSummary ingredients={this.state.ingredients} /></Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addingIngredientHandler} ingredientRemoved={this.removingIngredientHandler} disabled={disabledInfo}
                price={this.state.totalPrice} purchasable={this.state.purchasable} ordered={this.purchaseHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;