import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES ={
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.4,
    meat: 2.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error:false
    }

    componentDidMount() {
        Axios.get('/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data});
            console.log(response);
        })
        .catch(error => {
            this.setState({error: true});
            console.log(error);
        });
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

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You continue');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Massimo Biancalani',
                address : {
                    street: 'Teststreet 1',
                    zipcode: '41351',
                    country: 'Italy'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
        }
        Axios.post('/orders.json', order)
        .then(respone => {
            this.setState({loading: false, purchasing: false});
            console.log(respone);
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
            console.log(error);
        });
    }
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary =null;
        
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> :<Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls ingredientAdded={this.addingIngredientHandler} ingredientRemoved={this.removingIngredientHandler} disabled={disabledInfo}
                    price={this.state.totalPrice} purchasable={this.state.purchasable} ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = ( <OrderSummary ingredients={this.state.ingredients} 
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice.toFixed(2)}/>);
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, Axios);