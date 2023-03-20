/* eslint-disable prettier/prettier */
import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from '../../components/constants/constApi';
import actions from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../../components/constants/setAuthToken';
import CommonAction from '../common/actions';

const FlightSearchSaga = function* () {
    yield all([
        yield takeEvery(actions.SET_FLIGHT_SEARCH_BY_NAME, getAirportnameList),
        yield takeEvery(actions.SET_FLIGHT_SEARCH, FlightSearch),
        yield takeEvery(actions.SET_FARE_RULES, getFareRules),
        yield takeEvery(actions.SET_REVALIDATE, setRevalidate),
        yield takeEvery(actions.SET_FLIGHT_BOOKING, setFlightBooking),
    ])
}



const getAirportnameList = function* (data) {
    const { payload } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/getAirportNameSearch`,
                payload, {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );

        if (payload?.type === 'from') {
            yield put({ type: actions.GET_FLIGHT_SEARCH_FROM_BY_NAME, payload: result?.data });
        } else {
            yield put({ type: actions.GET_FLIGHT_SEARCH_TO_BY_NAME, payload: result?.data });
        }

    } catch (err) {
        console.log('err', err.message)
    }
}

const FlightSearch = function* (data) {
    const { payload } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/getFlightSearch`,
                payload?.data, {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );
        console.log('error response',result?.data)

        if (result?.data?.status === true) {
            yield put({ type: actions.GET_FLIGHT_SEARCH, payload: result?.data });
            payload.navigation.navigate('FlightResult',{prefs:payload?.prefs})
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Revalidation Failed'}})
        }
    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err}})

        console.log('err msg...', err.message)
        yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
    }
}


const getFareRules = function*(data){
    const { payload } = data
    yield put({ type: CommonAction.FLIGHT_LOADER, payload: true })

    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/getFlightDetail`,
                payload, {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );

        if(result?.data?.status === true){
            yield put({ type: actions.GET_FARE_RULES, payload: result?.data });
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        }else{
            console.log('fare rulessss failed')
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        }
    } catch (err) {
        console.log('err', err.message)
        yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

    }  
}

const setRevalidate = function*(data){
    const { payload } = data
    yield put({ type: CommonAction.FLIGHT_LOADER, payload: true })

    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/revalidate`,
                payload, {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );
        console.log('from saga,...',result?.data?.message)
        if(result?.data?.status === true){
            yield put({ type: actions.GET_REVALIDATE, payload: result?.data?.message})
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        }else{
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Revalidation Failed'}})
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        }
    } catch (err) {
        console.log('err', err)
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err}})
        yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

    }  
}


const setFlightBooking = function*(data){
    const { payload } = data
    yield put({ type: CommonAction.FLIGHT_LOADER, payload: true })

    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/booking`,
                payload, {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );
        console.log('from saga,...',result?.data?.message)
        if(result?.data?.status === true){
            yield put({ type: actions.GET_REVALIDATE, payload: result?.data?.message})
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        }else{
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Revalidation Failed'}})
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        }
    } catch (err) {
        console.log('err', err)
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err}})
        yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

    }  
}

export default FlightSearchSaga