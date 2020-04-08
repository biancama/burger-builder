import reducer  from './auth';
import * as actionTypes from '../actions/actionTypes'

const initialState = 
    {
        token: null,
        userId: null,
        error: null,
        loading: false,
        authRedirectPath: '/'
    };


describe('auth reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(
            initialState
        );
    });

    it('should store token upon login', () => {
        expect(reducer(
            initialState, 
            {
            type: actionTypes.AUTH_SUCCESS, 
            idToken: 'SOME_TOKEN', 
            userId: 'SOME_USERID', 
            }
         )).toEqual(
            {
                token: 'SOME_TOKEN',
                userId: 'SOME_USERID',
                error: null,
                loading: false,
                authRedirectPath: '/'
            }
        );
    });


});
