/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, join, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../components/constants/constApi'
import CommonAction from '../common/actions'
import actions from './actions'
import { store } from '../store';


const HotelSaga = function* () {
    yield all([
        yield takeEvery(actions.GET_HOTEL_SEARCH, getHotelSearch),
        yield takeEvery(actions.GET_HOTEL_FILTER, getHotelFilter),
        yield takeEvery(actions.GET_SELECT_NAME, getHotelNameSearch),
        yield takeEvery(actions.GET_HOTEL_ROOM_TYPE, getHotelRoomType),
        yield takeEvery(actions.SET_HOTEL_BOOKING, setHotelBooking),
        yield takeEvery(actions.GET_HOTEL_BOOKING_DETAIL, getHotelBookingDetail),
        yield takeEvery(actions.GET_HOTEL_DETAILS, getHotelDetails),
        yield takeEvery(actions.GET_HOTEL_REVIEWS, getHotelReview),
        yield takeEvery(actions.GET_ADD_REVIEW, createHotelReview),
        yield takeEvery(actions.GET_UPDATE_REVIEW, updateHotelReview),
        yield takeEvery(actions.GET_DELETE_REVIEW, deleteHotelReview),
        yield takeEvery(actions.GET_HOTEL_CHECKOUT, getHotelCheckout),
    ])
}

const getHotelDetails = function* (data) {
    const { payload, navigation,value } = data;
    var form_data = new FormData();

    for (var key in payload) {
        form_data.append(key, payload[key]);
    }
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelDetails`, form_data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            )
        );
        if (result.data.status) {
            yield put({ type: actions.SET_HOTEL_DETAILS, payload: result?.data });
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
            yield put({ type: actions.GET_HOTEL_REVIEWS, payload: {
                hotelId:result?.data?.message.hotelId,
                type:'Hotel'
            },initial:true })

            navigation.navigate('HotelDetail',{data:payload,value:value})
             
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err.message} })
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: actions.SET_HOTEL_DETAILS, payload: err.data });
    }

};
const getHotelSearch = function* (data) {
    const { payload, navigation } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelSearch`,
                payload,
                {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        );
        if (result?.data?.status === true) {
            yield put({ type: actions.SET_HOTEL_SEARCH, payload: result?.data?.message?.hotelList });
            yield put({ type: actions.SET_HOTEL_SESSION_ID, payload: result?.data?.message?.sessionId });;
            navigation.navigate('HotelList')
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors[0]?.errorMessage } })

        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: actions.SET_HOTEL_SEARCH, payload: err.data });
    }
}

const getHotelFilter = function* (data) {
    const { payload, openFile } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelFilter`, JSON.stringify(payload),
                {
                    headers: {
                        accept: 'application/json',
                    },
                }
            )
        );
        if (result?.data?.status === true) {
            // payload?.openFile(false)
            openFile(false)
            yield put({ type: actions.SET_HOTEL_SEARCH, payload: result?.data?.message?.itineraries });
            // yield put({ type: actions.SET_HOTEL_FILTER, payload: result?.data?.message?.itineraries ? result?.data?.message?.itineraries : [] })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Filtered Applied' } })
        } else {
            openFile(false)
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
            // yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:result?.data?.message?.errors[0]?.errorMessage} })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err} })
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: actions.SET_HOTEL_FILTER, payload: err?.data });
    }
}

const getHotelNameSearch = function* (data) {
    const { payload, navigation } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/getHotelCitieSearch`,
                payload,
                {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        );
        if (result.data.status === true) {
            yield put({ type: actions.SET_SELECT_NAME, payload: result.data.message });
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: actions.SET_SELECT_NAME, payload: err.data });
    }
}


const getHotelRoomType = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
    const { payload, navigation, detail } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/roomRates`,
                payload,
                {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        );
        if (result.data.status === true) {
            yield put({ type: actions.SET_HOTEL_ROOM_TYPE, payload: result.data.message });
            navigation.navigate('HotelRoomType', { detail: detail })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: actions.SET_HOTEL_ROOM_TYPE, payload: err.data });
    }
}


const setHotelBooking = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
    const { payload, navigation } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelbooking`,
                JSON.stringify(payload),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        );
        if (result?.data?.status === true) {
            yield put({
                type: actions.GET_HOTEL_BOOKING_DETAIL, payload: {
                    supplierConfirmationNum: result.data?.log?.supplierConfirmationNum,
                    referenceNum: result?.data?.log?.referenceNum
                },
                navigation: navigation
            });
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
        yield put({ type: actions.SET_HOTEL_ROOM_TYPE, payload: err.data });
    }
}


const getHotelBookingDetail = function* (data) {
    const { payload, navigation } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/hotelbooking_details`,
                JSON.stringify(payload),
                {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        );
        if (result.data.status === true) {
            yield put({ type: actions.SET_HOTEL_BOOKING_DETAIL, payload: result.data.message });
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })

    }
}


const getHotelReview = function* (data) {
    const { payload, navigation } = data
    try {
        if (data.initial) {
            const result = yield call(() =>
                axios.post(
                    `${API_URL}/hotelReviews`,
                    JSON.stringify(data.payload), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                )
            );

            if (result?.data?.status) {
                yield put({ type: actions.SET_HOTEL_REVIEWS,  payload: result.data.message.data, page: result.data.message.next_page_url  });
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
            }
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        } else {
            const result = yield call(() =>
                axios.post(
                    `${store.getState().HotelReducer.nextPageUrl}`,
                    JSON.stringify(data.payload), {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
                )
            );
            if (result.data.status) {
                yield put({ type: actions.SET_HOTEL_REVIEWS, payload: [...store.getState().HotelReducer.AllReviews, ...result.data.message.data], page: result.data.message.next_page_url });
            }
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
    
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
    }
}

const createHotelReview = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
    const { payload, navigation } = data

    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/reviews`,
                payload,
                {
                    headers: {
                        accept: 'application/json',
                    },
                }
            )
        );
        if (result.data.status === true) {
            yield put({ type: actions.GET_HOTEL_REVIEWS,
                payload: {
                    hotelId:payload?.hotelId,
                    type:'Hotel'
                },initial:true })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message} })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message?.errors } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
    }
}

const updateHotelReview = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
    const { payload, navigation } = data
    try {
        const result = yield call(() =>
            axios.put(
                `${API_URL}/reviews/${payload?.id}`,
                payload?.data,
                {
                    headers: {
                        accept: 'application/json',
                    },
                }
            )
        );
        if (result?.data?.status === true) {
            yield put({ type: actions.GET_HOTEL_REVIEWS,
            payload: {
                hotelId:payload?.data?.hotelId,
                type:'Hotel'
            },initial:true })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message} })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Failed to Update Review'} })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
    }
}


const deleteHotelReview = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
    const { payload, navigation } = data
    try {
        const result = yield call(() =>
            axios.delete(
                `${API_URL}/reviews/${payload?.id}`,  
                {
                    headers: {
                        accept: 'application/json',
                    },
                }
            )
        );
        if (result?.data?.status === true) {
            yield put({ type: actions.GET_HOTEL_REVIEWS,
            payload: {
                hotelId:payload?.id,
                type:'Hotel'
            },initial:true})
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message} })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Failed to Delete Review'} })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
    }
}

const getHotelCheckout = function* (data) {
    yield put({ type: CommonAction.HOTEL_LOADER, payload: true })
   
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/checkout`,data.payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
        );
        if (result.data.status === true) {
            data.navigation.navigate('HotelPayment',{check_out:result?.data?.checkout_id})
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:'Success'} })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:'Something went wrong please try again' } })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
        }
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:'Request Failed with status 500'} })
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    }
}
export default HotelSaga;