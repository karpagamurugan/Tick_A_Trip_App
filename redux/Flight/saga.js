/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../constants/constApi'
import actions from './actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import setAuthToken from '../../constants/setAuthToken'

const FlightSearchSaga = function* () {
    yield all([
        yield takeEvery(actions.SET_FLIGHT_SEARCH_BY_NAME, getAirportnameList),
        yield takeEvery(actions.SET_FLIGHT_SEARH, FlightSearch),

    ])
}



const getAirportnameList = function* (data) {
    const { payload } = data
    // console.log('payload', payload)

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
        // console.log('result data....', result.data)

        if(payload?.type === 'from'){
            yield put({ type: actions.GET_FLIGHT_SEARCH_FROM_BY_NAME, payload:result?.data });
        }else{
            yield put({ type: actions.GET_FLIGHT_SEARCH_TO_BY_NAME, payload:result?.data });
        }

    } catch (err) {
        console.log('err', err.message)
    }
}

const FlightSearch = function* (data) {
    const { payload } = data
    console.log('payload', payload)

    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/getFlightSearch`,
                payload?.payloaddata, {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );


        console.log('search result.....',result?.data)
        // navigation.navigate('FlightResult')

    } catch (err) {
        console.log('err', err.message)
    }
}



export default FlightSearchSaga