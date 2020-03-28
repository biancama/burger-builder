import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions  from '../../store/actions/';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }
    
    updatePurchaseState (ingredients) {
        const oneNonZero = Object.values(ingredients).find(v => v > 0);
        return oneNonZero !== undefined;
    }

    purchaseHandler= () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    render () {
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary =null;
        
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> :<Spinner />;
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} disabled={disabledInfo}
                    price={this.props.totalPrice} purchasable={this.updatePurchaseState(this.props.ings)} ordered={this.purchaseHandler}/>
                </Aux>
            );
            orderSummary = ( <OrderSummary ingredients={this.props.ings} 
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                totalPrice={this.props.totalPrice.toFixed(2)}/>);
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
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    };
}

const mapDispatchToProps = dispatch => { 
    return {
        onIngredientAdded : (name) => dispatch(burgerBuilderActions.addIngredient(name)),
        onIngredientRemoved : (name) => dispatch(burgerBuilderActions.removeIngredient(name)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit())
    };
}
export default connect(mapStateToProps, mapDispatchToProps) (withErrorHandler(BurgerBuilder, Axios));