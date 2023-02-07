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
    Upcoming_hotel: [],
    Hotel_details:[],
    AddTravaller_form:[],
    AddTravaller_search_name:[],
    AddTravaller_country_code:[],
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
            case actions.GET_HOTEL_TICKETS_DETAILS:
                return {
                    ...state,
                    Hotel_details: action.payload
                }
                case actions.GET_ADD_TRAVELLER_FORM:
                return {
                    ...state,
                    AddTravaller_form: action.payload
                }
                case actions.SET_ADD_TRAVELLER_SEARCH_BY_NAME:
                return {
                    ...state,
                    AddTravaller_search_name: action.payload
                }
                case actions.GET_ADD_TRAVELLER_COUNTRY_CODE:
                return {
                    ...state,
                    AddTravaller_country_code: action.payload
                }
        default:
            return state;
    }
};

export default userReducer;