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

        if (result?.data?.status === true) {
            let a = result?.data?.message.map(el => {
                return {
                    ...el, flight_details: el.flight_details.map(el1 => {
                        return { FareSourceCode: el.FareSourceCode, ...el1 }
                    })
                }
            });
            let b = [], c = [], d = 0;
            a.forEach((el, i) => {
                let temp = "";
                temp = temp + el.flightName;
                el.flight_details.forEach(val => {
                    val.flights.forEach(el1 => {
                        temp = temp + el1.flightList.ArrivalAirportLocationCode + el1.flightList.ArrivalDateTime + el1.flightList.DepartureAirportLocationCode + el1.flightList.DepartureDateTime;
                    });
                    temp = temp + val.totalStops + val.flights.map(obj => obj.flightList.OperatingAirline.Code + obj.flightList.OperatingAirline.FlightNumber)?.join(" / ");
                });
                if (b.includes(temp)) {
                    let tempIndex;
                    b.forEach((el1, ind) => {
                        if (el1 === temp) {
                            tempIndex = ind;
                        }
                    });
                    c[tempIndex] = [...c[tempIndex], el];
                    c = [...c, c[tempIndex]];
                } else {
                    c[d] = [el];
                    b = [...b, temp];
                    d = d + 1;
                }
            });
    
            if (payload?.data?.journey_type === "OneWay") {
                yield put({
                    type: actions.GET_FLIGHT_SEARCH, payload: c
                });
            } else {
                yield put({
                    type: actions.GET_FLIGHT_SEARCH, payload: a
                });
            }
            payload.navigation.navigate('FlightResult', { prefs: payload?.prefs,type:payload?.data?.journey_type })
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
        }
    } catch (err) {
        console.log('errror',err)
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
        yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
    }
}


const getFareRules = function* (data) {
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

        if (result?.data?.status === true) {
            yield put({ type: actions.GET_FARE_RULES, payload: result?.data });
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        } else {
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        }
    } catch (err) {
        console.log('err', err.message)
        yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

    }
}

const setRevalidate = function* (data) {
    const { payload ,navigation,flightInfo,itemInfo} = data
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
        if (result?.data?.status === true) {
            yield put({ type: actions.GET_REVALIDATE, payload: result?.data?.message })
            navigation.navigate('flightBooking',{flightInfo:flightInfo,itemInfo: itemInfo})

            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Revalidation Failed' } })
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })

        }
    } catch (err) {
        console.log('err', err)
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
        yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
    }
}


const setFlightBooking = function* (data) {
    const { payload } = data
    yield put({ type: CommonAction.FLIGHT_LOADER, payload: true })

    console.log('payload',payload)

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
        console.log('result?.data?',result?.data)
        console.log('result?.data?',result?.data?.BookFlightResponse?.BookFlightResult)
        if (result?.data?.status === true) {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
        }
    } catch (err) {
        console.log('err', err)
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
        yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
    }
}

export default FlightSearchSaga