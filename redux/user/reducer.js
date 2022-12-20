/* eslint-disable prettier/prettier */
import actions from './actions';

const initialState = {
    isAuthenticated:[],
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_USER_LOGIN:
            return {
                ...state,
                isAuthenticated: action.payload
            };


        default:
            return state;
    }
};

export default userReducer;