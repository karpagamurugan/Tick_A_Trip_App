/* eslint-disable prettier/prettier */
import actions from './actions';

const initialState = {
    Airport_Name:[],
  
}

const FlightSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_FLIGHT_SEARCH_BY_NAME:
            return {
                ...state,
                Airport_Name: action.payload
            };

     
        default:
            return state;
    }
};

export default FlightSearchReducer;