/* eslint-disable prettier/prettier */
import actions from './actions';

const initialState = {
    isAuthenticated: [],
    registerUser: [],
    userProfileData: [],
    isLogin: false,
    Completed_flight: [],
    Cancelled_flight: [],
    Upcoming_flight: [],
    Completed_hotel: [],
    Cancelled_hotel: [],
    Upcoming_hotel: []
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
        case actions.GET_COMPLETED_FLIGHT_TICKETS:
            return {
                ...state,
                Completed_flight: action.payload
            }
        case actions.GET_CANCELLED_FLIGHT_TICKETS:
            return {
                ...state,
                Cancelled_flight: action.payload
            }
        case actions.GET_UPCOMING_FLIGHT_TICKETS:
            return {
                ...state,
                Upcoming_flight: action.payload
            }
        case actions.GET_COMPLETED_HOTEL_TICKETS:
            return {
                ...state,
                Completed_hotel: action.payload
            }
        case actions.GET_CANCELLED_HOTEL_TICKETS:
            return {
                ...state,
                Cancelled_hotel: action.payload
            }
        case actions.GET_UPCOMING_HOTEL_TICKETS:
            return {
                ...state,
                Upcoming_hotel: action.payload
            }
        default:
            return state;
    }
};

export default userReducer;