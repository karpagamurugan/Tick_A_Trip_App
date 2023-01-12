/* eslint-disable prettier/prettier */
import axios from 'axios';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { API_URL } from '../../constants/constApi';
import actions from './actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import setAuthToken from '../../constants/setAuthToken';
import CommonAction from '../../redux/common/actions';

const PopularPlaceSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_POPULAR_PLACES, getPopularPlaces),
        yield takeEvery(actions.SET_POPULAR_PLACE_DETAILS, getPopularPlacesDetails),


    ])
}



const getPopularPlaces = function* (data) {
    const { payload } = data
    yield put({ type: CommonAction.COMMON_LOADER, payload: true })

    try {
        const result = yield call(() =>
            axios.get(
                `${API_URL}/popularplace`,
            )
        );
       if(result?.data?.status === true){
        yield put({ type: actions.GET_POPULAR_PLACES, payload:result?.data });
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
       }

    } catch (err) {
        console.log('err', err.message)
    }
}



const getPopularPlacesDetails = function* (data) {
    const { payload } = data
    try {
        const result = yield call(() =>
            axios.get(
                `${API_URL}/popularplace/detail/${payload.id}`,
            )
        );
   
       if(result?.data?.status ==true){
        yield put({ type: actions.GET_POPULAR_PLACE_DETAILS, payload:result?.data });
    payload.navigation.navigate('PopularDetails')
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
       }
    } catch (err) {
        console.log('err', err.message)
    }
}


export default PopularPlaceSaga