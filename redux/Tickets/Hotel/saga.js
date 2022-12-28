/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../../constants/constApi'
import actions from './actions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const userHotelTicktSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_HOTEL_TICKETS, getUserRegister)
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

export default userHotelTicktSaga