/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, join, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../constants/constApi'
import CommonAction from '../common/actions'
import actions from './actions'

const HotelSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_HOTEL_SEARCH, getHotelSearch),
        yield takeEvery(actions.GET_HOTEL_FILTER, getHotelFilter)
    ])
}

const getHotelSearch = function* (data) {
    const { payload, navigation } = data
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
            yield put({ type: actions.SET_HOTEL_SESSION_ID, payload: result.data.message.sessionId });;
            navigation.navigate('HotelList')
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        console.log('err', err.message.map((val) => val))
        yield put({ type: actions.SET_HOTEL_SEARCH, payload: err.data });
    }
}

const getHotelFilter = function* (data) {
    const { payload } = data
    console.log('payload', payload)
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelFilter`, JSON.stringify(payload),
                {
                    headers: {
                        accept: 'application/json',
                    },
                }
            )
        );
        console.log('result filter data', result.data)
        console.log('result filter errors', result.data.errors)
        if (result.data.status === true) {
            yield put({ type: actions.SET_HOTEL_FILTER, payload: result.data.message ? result.data.message : [] })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        console.log('err', err)
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: actions.SET_HOTEL_FILTER, payload: err.data });
    }
}


export default HotelSaga;