/* eslint-disable prettier/prettier */
import userReducer from "./user/reducer";
import CommonReducer from './common/reducer';
import HotelTicktReducer from './Tickets/Hotel/reducer';
import FlightSearchReducer from './Flight/reducer';

const reducer = {
    userReducer,
    CommonReducer,
    HotelTicktReducer,
    FlightSearchReducer
}

export default reducer