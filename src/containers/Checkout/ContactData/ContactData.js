import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state= {
        name: '', 
        email: '', 
        address: {
            street: '',
            postalCode: '' 
        },
        loading: false
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
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
        .then(response => {
            this.setState({loading: false, purchasing: false}); 
            this.props.history.push('/');
        })
        .catch(error => {
            this.setState({loading: false, purchasing: false});
            console.log(error);
        });
    }
    render () {
        let form = (<form> 
            <input className={styles.Input} type="text" name="name" placeholder="Your name"/>
            <input className={styles.Input} type="text" name="email" placeholder="Your email"/>
            <input className={styles.Input} type="text" name="street" placeholder="Street"/>
            <input className={styles.Input} type="text" name="postalCode" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
            </form>);
        if (this.state.loading) {
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

export default ContactData;