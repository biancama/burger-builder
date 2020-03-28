import * as actionTypes from './actionTypes';
import Axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
};


export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    }
};

// redux thunk

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        Axios.get('/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
            console.log(response);
        })
        .catch(error => {
            dispatch(fetchIngredientsFailed);
            console.log(error);
        });
    };
};