/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../constants/constApi'
import actions from './actions'

const userSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_USER_LOGIN, userAthentification),
        yield takeEvery(actions.GET_USER_REGISTER, getUserRegister)
    ])
}

const userAthentification = function* (data) {
    const { payload } = data
    console.log('initial value', payload)
    try {
        console.log(payload)
    } catch (err) {

    }
}

const getUserRegister = function* (data) {
    const { payload } = data
    var form_data = new FormData();
    for (var key in payload) {
        form_data.append(key, payload[key]);
    }
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/register`,
                form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
            )
        )
        yield put({ type: actions.SET_USER_REGISTER, payload: result.data })
    } catch (err) {
        yield put({ type: actions.SET_USER_REGISTER, payload: err.data })
    }
}

export default userSaga