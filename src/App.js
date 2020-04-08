import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {connect} from 'react-redux'

import Layout from './hoc/Layout/Layout';
import asynchComponent from './hoc/asynchComponent/asynchComponent';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout'
import * as actions from './store/actions/index'

const asynchCheckout = asynchComponent(() => {
	return import('./containers/Checkout/Checkout');
});

const asynchOrders = asynchComponent(() => {
	return import('./containers/Orders/Orders');
});

const asynchAuth = asynchComponent(() => {
	return import('./containers/Auth/Auth');
});

class App extends Component {
	componentDidMount() {
		console.log('App  did mount autehnticated' + this.props.isAuthenticated);
		this.props.onTryAutoSignUp();
	}

	render () {
		console.log('App  render  autehnticated ' + this.props.isAuthenticated);

		let routes =
			<Switch>
				<Route path="/auth" component={asynchAuth} />
				<Route path="/" exact component={BurgerBuilder} />
				<Redirect to='/'/>
			</Switch>
		if (this.props.isAuthenticated) {
			routes =
				<Switch>
					<Route path="/checkout" component={asynchCheckout} />
					<Route path="/orders" component={asynchOrders} />
					<Route path="/logout" component={Logout} />
					<Route path="/" exact component={BurgerBuilder} />
					<Redirect to={this.props.authRedirectPath}/>
				</Switch>
		}

    return (
      <div>
        <Layout>
			{routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
		authRedirectPath: state.auth.authRedirectPath
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: ()=> dispatch(actions.authCheckState())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))