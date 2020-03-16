import React, { Component } from "react";
import { Route } from 'react-router-dom';
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
        return (
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
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.ingredients
    };
}

export default connect(mapStateToProps)(Checkout);