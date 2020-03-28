import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreators from '../../../store/actions/';

class ContactData extends Component {
    state= {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false, 
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Italy'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false, 
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest'},
                        { value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false    
    }
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        }
        this.props.onOrderBurger(order);
    }
    checkValidity (value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        if (isValid && rules.required) {
            isValid = value.trim() !== '';
        }
        if (isValid && rules.minLength) {
            isValid = value.length >= rules.minLength;
        }
        if (isValid && rules.maxLength) {
            isValid = value.length <= rules.maxLength;
        }

        return isValid;
    }
    
    inputChangeHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedOrderElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkValidity(updatedOrderElement.value, updatedOrderElement.validation);
        updatedOrderElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedOrderElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (<form onSubmit={this.orderHandler}> 
            {formElementsArray.map(element => (
                <Input key={element.id} 
                    elementType={element.config.elementType} 
                    elementConfig={element.config.elementConfig} value={element.config.value} onChange={(event) => this.inputChangeHandler(event, element.id)}
                    invalid={!element.config.valid} shouldValidate={element.config.validation}
                    touched={element.config.touched}
                    />
            ))}
            <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
            </form>);
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4> Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) => dispatch(actionCreators.purchaseBurger(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, Axios));