import React, {Component} from 'react';
import Aux from '../Aux';
import styles from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerClosedHandler = () =>{
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenHandler = () => {
        this.setState((prevState) => {
            return ({showSideDrawer: !prevState.showSideDrawer});
        });
    }


    render() {
        return (
        <Aux>
            <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
            <Toolbar isAuth={this.props.isAuthenticated} clicked={this.sideDrawerOpenHandler} drawerToggleClicked={this.sideDrawerOpenHandler}/>
            <main className={styles.Content}>
                {this.props.children}
            </main>
        </Aux>
        );
    }
} 

const mapStateToProps = state => ({
    isAuthenticated: state.auth.token !== null
});


export default connect (mapStateToProps)(Layout);