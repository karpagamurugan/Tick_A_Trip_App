/* eslint-disable prettier/prettier */
import userReducer from "./user/reducer";
import CommonReducer from './common/reducer';
import FlightSearchReducer from './Flight/reducer';
import PopularPlacesReducer from './PopularPlaces/reducer';
import HotelReducer from "./Hotel/reducer";

const reducer = {
    userReducer,
    CommonReducer,
    FlightSearchReducer,
    PopularPlacesReducer,
    HotelReducer,
}

export default reducer