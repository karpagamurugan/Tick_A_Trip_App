/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, join, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../components/constants/constApi'
import CommonAction from '../common/actions'
import actions from './actions'

const HotelSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_HOTEL_SEARCH, getHotelSearch),
        yield takeEvery(actions.GET_HOTEL_FILTER, getHotelFilter),
        yield takeEvery(actions.GET_SELECT_NAME, getHotelNameSearch),
        yield takeEvery(actions.GET_HOTEL_ROOM_TYPE, getHotelRoomType),
        yield takeEvery(actions.SET_HOTEL_BOOKING, setHotelBooking),
        yield takeEvery(actions.GET_HOTEL_BOOKING_DETAIL,getHotelBookingDetail ),
        yield takeEvery(actions.GET_HOTEL_FILTER,handleHotelFilter ),

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
        }else{
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
        console.log('result filter data', result.data.message.itineraries)
        console.log('result filter errors', result.data.message.errors)
        if (result.data.status === true) {
            yield put({ type: actions.SET_HOTEL_SEARCH, payload: result.data.message.itineraries });
            yield put({ type: actions.SET_HOTEL_FILTER, payload: result.data.message.itineraries ? result.data.message.itineraries : [] })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'hasgdabsjkb' } })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        console.log('err', err)
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: actions.SET_HOTEL_FILTER, payload: err.data });
    }
}

const getHotelNameSearch = function* (data) {
    const { payload, navigation } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/getHotelCitieSearch`,
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
            yield put({ type: actions.SET_SELECT_NAME, payload: result.data.message });
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        console.log('err', err.message.map((val) => val))
        yield put({ type: actions.SET_SELECT_NAME, payload: err.data });
    }
}


const getHotelRoomType = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
    const { payload,navigation,detail } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/roomRates`,
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
            yield put({ type: actions.SET_HOTEL_ROOM_TYPE, payload: result.data.message });
            navigation.navigate('HotelRoomType',{detail:detail})
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }else{
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        console.log('err', err.message.map((val) => val))
        yield put({ type: actions.SET_HOTEL_ROOM_TYPE, payload: err.data });
    }
}


const setHotelBooking = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
    const { payload } = data   
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelbooking`,
                JSON.stringify(payload),
                {
                    headers: {
                        'Content-Type':'application/json',
                    },
                }
            )
        );
        if (result.data.status === true) {
            yield put({ type: actions.GET_HOTEL_BOOKING, payload: result.data.log });
            // navigation.navigate('HotelRoomType',{detail:detail})
            yield put({ type: actions.GET_HOTEL_BOOKING_DETAIL, payload:  {
                supplierConfirmationNum:result.data?.log?.supplierConfirmationNum,
                referenceNum: result?.data?.log?.referenceNum
              } });

            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result.data.message } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }else{
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: actions.SET_HOTEL_ROOM_TYPE, payload: err.data });
    }
}


const getHotelBookingDetail = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
    const { payload} = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelbooking_details`,
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
            yield put({ type: actions.SET_HOTEL_BOOKING_DETAIL, payload: result.data.message });
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }else{
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        console.log('err', err.message.map((val) => val))
    }
}


const handleHotelFilter = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
    const { payload} = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelFilter`,
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
            yield put({ type: actions.SET_HOTEL_FILTER, payload: result.data.message });
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }else{
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        console.log('err', err.message.map((val) => val))
    }
}
export default HotelSaga;