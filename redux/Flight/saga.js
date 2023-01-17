/* eslint-disable prettier/prettier */
import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from '../../constants/constApi';
import actions from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../../constants/setAuthToken';
import CommonAction from '../common/actions';

const FlightSearchSaga = function* () {
    yield all([
        yield takeEvery(actions.SET_FLIGHT_SEARCH_BY_NAME, getAirportnameList),
        yield takeEvery(actions.SET_FLIGHT_SEARCH, FlightSearch),

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
    // console.log('payload', payload)
    yield put({ type: CommonAction.COMMON_LOADER, payload: true })
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
        console.log(result?.data)
        if (result?.data?.status === true) {
            console.log('search result.....', result?.data)
            yield put({ type: actions.GET_FLIGHT_SEARCH, payload: result?.data });
            payload.navigation.navigate('FlightResult')
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })

        } else {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        }
    } catch (err) {
        console.log('err', err.message)
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    }
}



export default FlightSearchSaga