/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../constants/constApi'
import actions from './actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import setAuthToken from '../../constants/setAuthToken'
import { PROFILE_URL } from '../../constants/constProfileApi'

const userSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_USER_LOGIN, userAthentification),
        yield takeEvery(actions.GET_USER_REGISTER, getUserRegister),
        yield takeEvery(actions.GET_USER_PROFILE, getUserProfile)
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
        yield put({ type: actions.SET_USER_LOGIN, payload: result.data.user })
        yield put({ type: actions.GET_USER_PROFILE })
        navigation.navigate('bottomNavigation')
    } catch (err) {
        console.log('result err', err)
        yield put({ type: actions.SET_USER_LOGIN, payload: err.data })
    }
}
const getUserProfile = function* (data) {
    // console.log(`${PROFILE_URL}/user`)
    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user`)
        )
        // console.log('getUserProfile', result)
        yield put({ type: actions.SET_USER_PROFILE, payload: result.data })
    } catch (err) {
        // console.log('getUserProfile err', err)
        yield put({ type: actions.SET_USER_PROFILE, payload: err.data })
    }
}
export default userSaga