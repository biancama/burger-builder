import axios from '../../axios-orders'
import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* initIngredientsSaga() {
    try {
        const res = yield axios.get( 'ingredients.json' )
        yield put( actions.setIngredients(res.data) )
    } catch ( error) {

        yield put(actions.fetchIngredientsFailed())
    }
}