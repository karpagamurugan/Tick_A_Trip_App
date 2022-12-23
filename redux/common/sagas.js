/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import actions from './actions'


const CommonSaga = function* () {
    yield all([
        yield takeEvery(actions.COMMON_LOADER, CommonLoader),
       
    ])
}



const CommonLoader = function* (data) {
    const { payload } = data
    try{
        console.log(payload)
    }catch(e){
        console.log(e)
    }
}

export default CommonSaga