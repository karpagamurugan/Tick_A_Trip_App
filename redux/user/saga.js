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
    // console.log('first_name..1',payload.first_name)
    // console.log('last_name..2',payload.last_name)
    // console.log('username..3',payload.username)
    // console.log('mobilenumber..4',payload.mobilenumber)
    // console.log('email..5',payload.email)
    // console.log('dob..6',payload.dob)
    // console.log('password..7',payload.password)
    // console.log('confirmuserpasseword..8',payload.confirmuserpasseword)
    // console.log('gender..12',payload.gender)
    // console.log('country..9',payload.country)
    // console.log('currency..10',payload.currency)
    // console.log('aboutme..13',payload.aboutme)
    // console.log('occupation..14',payload.occupation)
    // console.log('favouritedest..15',payload.favouritedest)
    // console.log('fovouritefood..16',payload.fovouritefood)
    // console.log('flyernumber..17',payload.flyernumber)
    // console.log('passportnumber..18',payload.passportnumber)
    // console.log('issuecountry..19',payload.issuecountry)
    // console.log('postalcode..20',payload.postalcode)
    // console.log('expirydate..21',payload.expirydate)
    // console.log('pan..22',payload.pan)
    // console.log('status..11',payload.maritalstatus)


    var form_data = new FormData();
    for (var key in payload) {
        form_data.append(key, payload[key]);
    }
    try {
        console.log('form_data', form_data);
        // console.log('form_data', API_URL);
        yield call(() =>
        axios.post(API_URL+`/register`,
        form_data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            ).then(result => {
                console.log('result..',result.data)
            }).catch(err => {
                console.log('error',err)
            }))
            // if(result?.data?.statusCode === 422){
            //     console.log('result', result)
            // }else{
            //     console.log('result data...')
            // }
            // console.log('result', result)
        // yield put({ type: actions.SET_USER_REGISTER, payload: result.data });

    } catch (err) {
        console.log('err', err)
        yield put({ type: actions.SET_USER_REGISTER, payload: err.data });
    }
}

export default userSaga