/* eslint-disable prettier/prettier */
import actions from "./actions";

const initialState = {
    getHotelSearchResult: {}
}

const HotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_HOTEL_SEARCH:
            return {
                ...state,
                getHotelSearchResult: action.payload
            }
            default:
            return state;
    }
}
export default HotelReducer