/* eslint-disable prettier/prettier */
import { all, takeEvery } from 'redux-saga/effects'
import actions from './actions'

const userSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_USER_LOGIN, userAthentification)
    ])
}

const userAthentification = function* (data) {
    const {payload} =data
    console.log('initial value',payload)
    try{
        console.log(payload)
    }catch(e){

    }
}

export default userSaga