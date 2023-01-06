/* eslint-disable prettier/prettier */
import actions from './actions';

const initialState = {
    isAuthenticated: [],
    registerUser: [],
    userProfileData: [],
    isLogin: false,
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
        case actions.SET_USER_PROFILE:
            return {
                ...state,
                userProfileData: action.payload
            }
        case actions.SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;