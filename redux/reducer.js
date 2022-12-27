/* eslint-disable prettier/prettier */
import userReducer from "./user/reducer";
import CommonReducer from './common/reducer';
import HotelTicktReducer from './Tickets/Hotel/reducer';

const reducer = {
    userReducer,
    CommonReducer,
    HotelTicktReducer
}

export default reducer