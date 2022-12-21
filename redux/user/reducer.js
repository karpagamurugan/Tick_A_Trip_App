/* eslint-disable prettier/prettier */
import actions from './actions';

const initialState = {
    isAuthenticated: [],
    registerUser:[],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_USER_LOGIN:
            return {
                ...state,
                isAuthenticated: action.payload
            };

        case actions.SET_USER_REGISTER:
            return {
                ...state,
                registerUser: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;