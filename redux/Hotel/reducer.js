/* eslint-disable prettier/prettier */
import actions from "./actions";

const initialState = {
    getHotelSearchResult: {},
    getHotelFilterResult: [],
    hotelSessionId: null,
}

const HotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_HOTEL_SEARCH:
            return {
                ...state,
                getHotelSearchResult: action.payload
            }
        case actions.SET_HOTEL_FILTER:
            return {
                ...state,
                getHotelFilterResult: action.payload
            }
        case actions.SET_HOTEL_SESSION_ID:
            return {
                ...state,
                hotelSessionId: action.payload
            }
        default:
            return state;
    }
}
export default HotelReducer