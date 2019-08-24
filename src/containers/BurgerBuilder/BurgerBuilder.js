import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
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
        purchasable: false
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
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addingIngredientHandler} ingredientRemoved={this.removingIngredientHandler} disabled={disabledInfo}
                price={this.state.totalPrice} purchasable={this.state.purchasable}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;