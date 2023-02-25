/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../components/constants/constApi'
import actions from './actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import setAuthToken from '../../components/constants/setAuthToken'
import { PROFILE_URL } from '../../components/constants/constProfileApi'
import CommonAction from '../../redux/common/actions';
import axiosRetry from "axios-retry"
import { useDispatch } from 'react-redux'

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
        yield takeEvery(actions.GET_ADD_TRAVELLER_TOKEN, getTraveller),
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
        console.log('user hotel', err.message)
        yield put({ type: actions.GET_HOTEL_TICKETS_DETAILS, payload: err.data });
    }
}

const getData = async () => {
    const dispatch = useDispatch()
    await AsyncStorage.getItem('tickatrip-token').then(
        (res) => {
            console.log('res', res)
            dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN, payload: res })
        }
    )
}
const getAddtoTravellerValue = function* (data) {
    // async function* getAddtoTravellerValue(data) {
    const { payload } = data
    // console.log('payload', payload)
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/user/addTraveler`,
                payload, {
                headers: {
                    // accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );
        if (result?.data?.status === true) {
            console.log('get', result?.data)
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Traveler Added Successfully' } })
            // yield put({ type: userAction.GET_ADD_TRAVELLER_TOKEN, payload: true })
            getData()


        } else {
            console.log('get', result?.data?.error)
            console.log('get', 'Sometyhing went wrtong')
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.error } })
        }

    } catch (err) {
        console.log('getAddtoTravellerValue', err.message)
        // yield put({ type: actions.GET_ADD_TRAVELLER_VALUE, payload: err.data });
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
        // console.log('searchTraveller', result.data)
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
        console.log('getSearchTraveller', err.nametitle.message)

    }
}
const getTraveller = function* (data) {
    const { payload } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/user/getTravelers`,
                {
                    headers: {
                        // 'Content-Type': 'application/json',
                        'Authorization': `Bearer ${payload}`
                    },
                }
            )
        );

        if (result?.data.status === true) {
            console.log('get', 'Add Successfully')
            // yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Traveler Added Successfully Successfully' } })
            // AsyncStorage.setItem('tickatrip-token', result.data.success.token)
            yield put({ type: actions.SET_ADD_TRAVELLER_TOKEN, payload: result.data });
        } else {
            console.log('get', 'Sometyhing went wrtong')
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.error } })
        }
    } catch (err) {
        // console.log('getSearchTraveller', err)

    }
}


const getUserRegister = function* (data) {
    const { payload, navigation } = data
    console.log(payload)
    try {
        console.log('iff')
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
        if (result?.data?.status === true) {
            console.log('result', result)
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Registered Successfully' } })
            AsyncStorage.setItem('tickatrip-token', result.data.success.token)
            yield put({ type: actions.SET_USER_REGISTER, payload: result.data });
            navigation.navigate('bottomNavigation')

        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
        }

    } catch (err) {
        console.log('register', err.message)
        yield put({ type: actions.SET_USER_REGISTER, payload: err.data });
    }
}


const userAthentification = function* (data) {
    yield put({ type: CommonAction.COMMON_LOADER, payload: true });
    const { payload, navigation } = data
    try {
        // axiosRetry(axios, {
        //     retries: 1000,
        //     retryCondition: (error) => {
        //       return error.response.status === 429
        //     },
        //   })
        // const globalConfig: RetryConfig = {
        //     retry: 3,
        //     retryDelay: 1000,
        //   };
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
        if (result.data.status.token !== null || result.data.status.token !== undefined) {
            setAuthToken(result.data.status.token)
            AsyncStorage.setItem('tickatrip-token', result.data.status.token)
            AsyncStorage.setItem('email', result.data.status.user.email)
            AsyncStorage.setItem('phone', result.data.status.user.phone)
            AsyncStorage.setItem('username', result.data.status.user.username)
            AsyncStorage.setItem('LoggedIn', 'Sucess')
            yield put({ type: actions.SET_USER_LOGIN, payload: result.data.user })
            yield put({ type: actions.GET_USER_PROFILE })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false });
            navigation.reset({
                index: 0,
                routes: [{ name: 'bottomNavigation' }]
            })

            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Login success' } })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Something went wrong' } })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false });
        }

    } catch (err) {
        console.log('userAthentification', err)
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
        yield put({ type: CommonAction.COMMON_LOADER, payload: false });
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
            yield put({ type: actions.SET_COMPLETED_FLIGHT_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)

        } else {
            yield put({ type: actions.SET_COMPLETED_FLIGHT_TICKETS, payload: result.data })

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
            yield put({ type: actions.SET_CANCELLED_FLIGHT_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)

        } else {
            yield put({ type: actions.SET_CANCELLED_FLIGHT_TICKETS, payload: result.data })

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
            yield put({ type: actions.SET_UPCOMING_FLIGHT_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)

        } else {
            yield put({ type: actions.SET_UPCOMING_FLIGHT_TICKETS, payload: result.data })

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