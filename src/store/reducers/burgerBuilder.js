import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const INGREDIENT_PRICES ={
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.4,
    meat: 2.7
}

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
};

const reducer =( state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT: 
            const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = (state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT: 
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1,                    
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
        case actionTypes.SET_INGREDIENTS: 
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: 0         
            };
         case actionTypes.FETCH_INGREDIENTS_FAILED: 
            return {
                ...state,
                error : true
            };

        default: 
            return state
    }
}


export default reducer;