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
    Hotel_details: [],
    AddTravaller_form: [],
    AddTravaller_search_name: [],
    AddTravaller_country_code: [],
    AddTravaller_country_issuing: [],
    AddTravaller_nationality: [],
    AddTravaller_value: [],
    AddTravaller_token: [],
    travelers_list: [],
    flight_tickets_details: {},
    myHotelBookingsCancelRequest: [],
    myHotelBookingsCancelVerify: [],
    myFlightBookingsCancelRequest:[],
    myFlightBookingsCancelVerify:[],
    otpModalView:false,
    flight_Coupons:[],
    hotel_Coupons:[]
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
        case actions.SET_COMPLETED_FLIGHT_TICKETS:
            return {
                ...state,
                Completed_flight: action.payload
            }
        case actions.SET_CANCELLED_FLIGHT_TICKETS:
            return {
                ...state,
                Cancelled_flight: action.payload
            }
        case actions.SET_UPCOMING_FLIGHT_TICKETS:
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
        case actions.GET_ADD_TRAVELLER_COUNTRY_ISSUING:
            return {
                ...state,
                AddTravaller_country_issuing: action.payload
            }
        case actions.GET_ADD_TRAVELLER_NATIONALITY:
            return {
                ...state,
                AddTravaller_nationality: action.payload
            }
        case actions.GET_ADD_TRAVELLER_VALUE:
            return {
                ...state,
                AddTravaller_value: action.payload
            }
        case actions.GET_ADD_TRAVELLER_TOKEN:
            return {
                ...state,
                AddTravaller_token: action.payload
            }
        case actions.SET_ADD_TRAVELLER_TOKEN:
            return {
                ...state,
                travelers_list: action.payload
            }
        case actions.GET_FLIGHT_TICKETS_DETAILS:
            return {
                ...state,
                flight_tickets_details: action.payload
            }
        case actions.SET_HOTEL_BOOKINGS_CANCEL_REQUEST:
            return {
                ...state,
                myHotelBookingsCancelRequest: action.payload
            }
        case actions.SET_HOTEL_BOOKINGS_CANCEL_VERIFY:
            return {
                ...state,
                myHotelBookingsCancelVerify: action.payload
            }
            case actions.SET_FLIGHT_BOOKINGS_CANCEL_REQUEST:
                return {
                    ...state,
                    myFlightBookingsCancelRequest: action.payload
                }
            case actions.SET_FLIGHT_BOOKINGS_CANCEL_VERIFY:
                return {
                    ...state,
                    myFlightBookingsCancelVerify: action.payload
                }
                case actions.OTP_MODAL_VIEW:
                    return {
                        ...state,
                        otpModalView: action.payload
                    }
                    case actions.SET_ALL_FLIGHT_COUPON:
                    return {
                        ...state,
                        flight_Coupons: action.payload
                    }
                    case actions.SET_ALL_HOTEL_COUPON:
                        return {
                            ...state,
                            hotel_Coupons: action.payload
                        }
                        case actions.SHOW_CANCELL_GUEST_HOTEL_OTP_MODAL:
                            return {
                                ...state,
                                showHotelOtp: action.payload
                            }
                            case actions.SHOW_CANCELL_GUEST_FLIGHT_OTP_MODAL:
                                return {
                                    ...state,
                                    showFlightOtp: action.payload
                                }
        default:
            return state;
    }
};

export default userReducer;