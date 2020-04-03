import React, { Component } from "react";
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {
    

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        console.log('checkoutContinueHandler');
        this.props.history.replace('/checkout/contact-data');
    }

    
    render() {
        let summary = <Redirect to="/pippo" /> 
        console.log('Checkout: ' + this.props.ingredients + ' ' + this.props.purchased + ' ' + (this.props.ingredients && !this.props.purchased));
        if (this.props.ingredients && !this.props.purchased) {
            summary = (                
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients} 
                        cancel={this.checkoutCancelHandler} 
                        continue={this.checkoutContinueHandler}/>
                    <Route
                        path={this.props.match.url + '/contact-data'}  
                        component={ContactData} />
                </div>
            );
        }
        return summary ;
    }
}



const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
}

export default connect(mapStateToProps )(Checkout);