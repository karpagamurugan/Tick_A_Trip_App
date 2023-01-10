/* eslint-disable prettier/prettier */
import actions from '../common/actions';

const initialState = {
    common_loader: false,
    hotel_loader: false,
}

const CommonReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.COMMON_LOADER:
            return {
                ...state,
                common_loader: action.payload
            };
        case actions.HOTEL_LOADER:
            return {
                ...state,
                hotel_loader: action.payload
            };
        default:
            return state;
    }
};

export default CommonReducer;