/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../constants/constApi'
import actions from './actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import setAuthToken from '../../constants/setAuthToken'
import { PROFILE_URL } from '../../constants/constProfileApi'
import CommonAction from '../../redux/common/actions';

const userSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_USER_LOGIN, userAthentification),
        yield takeEvery(actions.GET_USER_REGISTER, getUserRegister),
        yield takeEvery(actions.GET_USER_PROFILE, getUserProfile),
        yield takeEvery(actions.GET_COMPLETED_FLIGHT_TICKETS, getCompletedFlightTickets),
        yield takeEvery(actions.GET_CANCELLED_FLIGHT_TICKETS, getCancelledFlightTickets),
        yield takeEvery(actions.GET_UPCOMING_FLIGHT_TICKETS, getUpcomingFlightTickets),
        yield takeEvery(actions.GET_COMPLETED_HOTEL_TICKETS, getCompletedHotelTickets),
        yield takeEvery(actions.GET_CANCELLED_HOTEL_TICKETS, getCancelledHotelTickets),
        yield takeEvery(actions.GET_UPCOMING_HOTEL_TICKETS, getUpcomingHotelTickets),
        yield takeEvery(actions.SET_HOTEL_TICKETS_DETAILS, getHotelDetails),
        yield takeEvery(actions.SET_ADD_TRAVELLER_SEARCH_BY_NAME, getSearchTraveller),
        yield takeEvery(actions.GET_ADD_TRAVELLER_VALUE, getAddtoTravellerValue),
    ])
}

const getHotelDetails = function* (data) {
    const { payload } = data
    console.log('payload', payload)
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelbooking_details`,
                payload, {
                headers: {
                    accept: 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                },
            }
            )
        );
        console.log('Hotelresult', result)
        yield put({ type: actions.GET_HOTEL_TICKETS_DETAILS, payload: result.data });

    } catch (err) {
        console.log('err', err.message)
        yield put({ type: actions.GET_HOTEL_TICKETS_DETAILS, payload: err.data });
    }
}

const getAddtoTravellerValue = function* (data) {
    const { payload } = data
    console.log('payload', payload)
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/addTraveler`,
                payload, {
                headers: {
                    accept: 'application/json',
                    // 'Content-Type': 'multipart/form-data',
                },
            }
            )
        );
        yield put({ type: actions.GET_ADD_TRAVELLER_VALUE, payload: result.data });

    } catch (err) {
        console.log('err', err.message)
        yield put({ type: actions.GET_ADD_TRAVELLER_VALUE, payload: err.data });
    }
}

const getSearchTraveller = function* (data) {
    const { payload } = data
    console.log('payload', payload)
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/countries`,
                payload, {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );
        console.log('searchTraveller', result)
        console.log(payload.type)
        if (payload.type === 'country-code') {
            yield put({ type: actions.GET_ADD_TRAVELLER_COUNTRY_CODE, payload: result.data });

        } else if (payload.type === 'issuing-country') {
            yield put({ type: actions.GET_ADD_TRAVELLER_COUNTRY_ISSUING, payload: result.data });

        } else if (payload.type === 'nationality') {
            yield put({ type: actions.GET_ADD_TRAVELLER_NATIONALITY, payload: result.data });

        } else {
            yield put({ type: actions.GET_ADD_TRAVELLER_COUNTRY_CODE, payload: "" });
            yield put({ type: actions.GET_ADD_TRAVELLER_COUNTRY_ISSUING, payload: "" });
            yield put({ type: actions.GET_ADD_TRAVELLER_NATIONALITY, payload: "" });
        }
    } catch (err) {
        console.log('err', err.nametitle.message)
        {err.nametitle && (
            <Text style={{ paddingTop: 10, color:"red"}}>{err.nametitle.message}</Text>
        )}
    }
}



const getUserRegister = function* (data) {
    const { payload, navigation } = data
    console.log('payload', payload)

    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/register`,
                payload, {
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );
        // console.log('result', result)
        AsyncStorage.setItem('tickatrip-token', result.data.success.token)
        yield put({ type: actions.SET_USER_REGISTER, payload: result.data });
        navigation.navigate('bottomNavigation')
    } catch (err) {
        console.log('err', err.message)
        yield put({ type: actions.SET_USER_REGISTER, payload: err.data });
    }
}
const userAthentification = function* (data) {
    yield put({ type: CommonAction.COMMON_LOADER, payload: true });
    const { payload, navigation } = data
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/login`,
                JSON.stringify(payload),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
        )
        console.log('result login', result)
        setAuthToken(result.data.status.token)
        AsyncStorage.setItem('tickatrip-token', result.data.status.token)
        AsyncStorage.setItem('email', result.data.status.user.email)
        AsyncStorage.setItem('phone', result.data.status.user.phone)
        AsyncStorage.setItem('username', result.data.status.user.username)
        AsyncStorage.setItem('LoggedIn', 'Sucess')
        yield put({ type: actions.SET_USER_LOGIN, payload: result.data.user })
        yield put({ type: actions.GET_USER_PROFILE })
        yield put({ type: CommonAction.COMMON_LOADER, payload: false });
        // navigation.navigate('bottomNavigation')

        navigation.reset({
            index: 0,
            routes: [{ name: 'bottomNavigation' }]
        })
    } catch (err) {
        console.log('result err', err)
        yield put({ type: CommonAction.COMMON_LOADER, payload: false });
        yield put({ type: actions.SET_USER_LOGIN, payload: err.data })
    }
}

const getUserProfile = function* (data) {
    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user`)
        )
        yield put({ type: actions.SET_USER_PROFILE, payload: result.data })
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: actions.SET_USER_PROFILE, payload: err.data })
    }
}


const getCompletedFlightTickets = function* (data) {
    const { payload } = data;

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/mycompletedbookings`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.GET_COMPLETED_FLIGHT_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)

        } else {
            yield put({ type: actions.GET_COMPLETED_FLIGHT_TICKETS, payload: result.data })

        }

        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {
        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        // yield put({ type: actions.SET_USER_PROFILE, payload: err.data })
        console.log('error completed....', err)
    }
}

const getCancelledFlightTickets = function* (data) {
    const { payload } = data;

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/mybookings_cancel`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.GET_CANCELLED_FLIGHT_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)

        } else {
            yield put({ type: actions.GET_CANCELLED_FLIGHT_TICKETS, payload: result.data })

        }

        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {
        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        // yield put({ type: actions.SET_USER_PROFILE, payload: err.data })
        console.log('error.... cancelled', err)
    }
}



const getUpcomingFlightTickets = function* (data) {
    const { payload } = data;
    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/mybookings`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.GET_UPCOMING_FLIGHT_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)

        } else {
            yield put({ type: actions.GET_UPCOMING_FLIGHT_TICKETS, payload: result.data })

        }

        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {

        console.log('error upcoming....', err)
    }
}




const getCompletedHotelTickets = function* (data) {
    const { payload } = data;
    // yield put({ type: CommonAction.HOTEL_LOADER, payload: true })

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/hotel/mycompletedbookings`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.GET_COMPLETED_HOTEL_TICKETS, payload: result.data })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        } else {
            yield put({ type: actions.GET_COMPLETED_HOTEL_TICKETS, payload: result.data })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }

    } catch (err) {

        console.log('error completed.... hotel', err)
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

    }
}

const getCancelledHotelTickets = function* (data) {
    const { payload } = data;
    // yield put({ type: CommonAction.HOTEL_LOADER, payload: true })

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/hotel/mybookings_cancel`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.GET_CANCELLED_HOTEL_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        } else {
            yield put({ type: actions.GET_CANCELLED_HOTEL_TICKETS, payload: result.data })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }

        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })


        console.log('error.... cancelled hotel', err)
    }
}



const getUpcomingHotelTickets = function* (data) {
    const { payload } = data;
    // yield put({ type: CommonAction.HOTEL_LOADER, payload: true })

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/hotel/mybookings`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.GET_UPCOMING_HOTEL_TICKETS, payload: result.data })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        } else {
            yield put({ type: actions.GET_UPCOMING_HOTEL_TICKETS, payload: result.data })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {

        console.log('error upcoming hotel....', err)
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

    }
}


export default userSaga