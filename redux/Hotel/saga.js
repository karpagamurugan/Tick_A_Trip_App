/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../constants/constApi'
import CommonAction from '../common/actions'
import actions from './actions'

const HotelSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_HOTEL_SEARCH, getHotelSearch)
    ])
}

const getHotelSearch = function* (data) {
    const { payload, navigation } = data
    console.log('payload hotel search', data)
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelSearch`,
                payload,
                {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        );
        if (result.data.status === true) {
            yield put({ type: actions.SET_HOTEL_SEARCH, payload: result.data.message.hotelList });
            navigation.navigate('HotelList')
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        console.log('err', err.message.map((val) => val))
        yield put({ type: actions.SET_HOTEL_SEARCH, payload: err.data });
    }
}



export default HotelSaga