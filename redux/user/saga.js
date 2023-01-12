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
        yield takeEvery(actions.GET_UPCOMING_FLIGHT_TICKETS, getUpcomingFlightTickets)

    ])
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
        console.log('result', result)
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
        setAuthToken(result.data.success.token)
        AsyncStorage.setItem('tickatrip-token', result.data.success.token)
        AsyncStorage.setItem('email', result.data.success.user.email)
        AsyncStorage.setItem('phone', result.data.success.user.phone)
        AsyncStorage.setItem('username', result.data.success.user.username)
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

        if(result?.data?.success === true){
            yield put({ type: actions.GET_COMPLETED_FLIGHT_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)

        }else{
            yield put({ type: actions.GET_COMPLETED_FLIGHT_TICKETS, payload: result.data })

        }

        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {
        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        // yield put({ type: actions.SET_USER_PROFILE, payload: err.data })
        console.log('error completed....',err)
    }
}

const getCancelledFlightTickets = function* (data) {
    const { payload } = data;

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/mybookings_cancel`)
        )

        if(result?.data?.success === true){
            yield put({ type: actions.GET_CANCELLED_FLIGHT_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)

        }else{
            yield put({ type: actions.GET_CANCELLED_FLIGHT_TICKETS, payload: result.data })

        }

        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {
        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        // yield put({ type: actions.SET_USER_PROFILE, payload: err.data })
        console.log('error.... cancelled',err)
    }
}



const getUpcomingFlightTickets = function* (data) {
    const { payload } = data;

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/mybookings`)
        )

        if(result?.data?.success === true){
            yield put({ type: actions.GET_UPCOMING_FLIGHT_TICKETS, payload: result.data })
            // console.log('result data....',result?.data)

        }else{
            yield put({ type: actions.GET_UPCOMING_FLIGHT_TICKETS, payload: result.data })

        }

        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {
       
        console.log('error upcoming....',err)
    }
}

export default userSaga