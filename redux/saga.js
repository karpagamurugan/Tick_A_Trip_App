/* eslint-disable prettier/prettier */
import { all } from 'redux-saga/effects'
import userSaga from './user/saga'
import userHotelTicktSaga from './Tickets/Hotel/saga';
import FlightSearchSaga from './Flight/saga';
import HotelSaga from './Hotel/saga';

export default function* rootSaga() {
    yield all([
        userSaga(),
        userHotelTicktSaga(),
        FlightSearchSaga(),
        HotelSaga(),
    ])
}