/* eslint-disable prettier/prettier */
import actions from './actions';

const initialState = {
    Popular_Places:{},
    Places_details:{}
  
}

const PopularPlacesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_POPULAR_PLACES:
            return {
                ...state,
                Popular_Places:action.payload,
            }; 
            case actions.GET_POPULAR_PLACE_DETAILS:
                return {
                    ...state,
                    Places_details:action.payload,
                }; 
        default:
            return state;
    }
};

export default PopularPlacesReducer;