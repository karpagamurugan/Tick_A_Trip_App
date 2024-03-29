/* eslint-disable prettier/prettier */
import axios from 'axios'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { API_URL } from '../../components/constants/constApi'
import actions from './actions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import setAuthToken from '../../components/constants/setAuthToken'
import { PROFILE_URL } from '../../components/constants/constProfileApi'
import CommonAction from '../../redux/common/actions';
import { useDispatch } from 'react-redux'
import { result } from 'lodash'

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
        yield takeEvery(actions.SET_FLIGHT_TICKETS_DETAILS, flightTicketsDetails),
        yield takeEvery(actions.SET_FLIGHT_UPDATE_TRAVELLER, updateTraveler),
        yield takeEvery(actions.GET_DELETE_TRAVELLER, getDeleteTraveller),
        yield takeEvery(actions.UPDATE_PROFILE, handleProfileUpdate),
        yield takeEvery(actions.GET_HOTEL_BOOKINGS_CANCEL_REQUEST, getHotelBookingsCancelRequest),
        yield takeEvery(actions.GET_HOTEL_BOOKINGS_CANCEL_VERIFY, getHotelBookingsCancelVerify),
        yield takeEvery(actions.GET_FLIGHT_BOOKINGS_CANCEL_REQUEST, getFlightBookingsCancelRequest),
        yield takeEvery(actions.GET_FLIGHT_BOOKINGS_CANCEL_VERIFY, getFlightBookingsCancelVerify),
        yield takeEvery(actions.GET_ALL_FLIGHT_COUPON, getFlightCoupons),
        yield takeEvery(actions.GET_ALL_HOTEL_COUPON, getHotelCoupons),
        yield takeEvery(actions.SET_GUEST_HOTEL_CANCELL_REQ, setGuestHotelCancellReq),
        yield takeEvery(actions.SET_GUEST_HOTEL_CANCELL_VERIFY, setGuestHotelCancellVerify),
        yield takeEvery(actions.SET_GUEST_FLIGHT_CANCELL_REQ, setGuestFlightCancellReq),
        yield takeEvery(actions.SET_GUEST_FLIGHT_CANCELL_VERIFY, setGuestFlightCancellVerify),
    ])
}


const setGuestHotelCancellReq = function* (data) {
    const { payload } = data;
    var form_data = new FormData();
    for (var key in payload) {
        form_data.append(key, payload[key]);
    }
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/guest/hotel/requestcancellation`,
                form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
        if (result?.data?.status === true) {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type:actions.SHOW_CANCELL_GUEST_HOTEL_OTP_MODAL, payload: true })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:  result?.data?.message } })
        } else {
            yield put({ type:actions.SHOW_CANCELL_GUEST_HOTEL_OTP_MODAL, payload: false })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:  result?.data?.message } })
        }
    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type:actions.SHOW_CANCELL_GUEST_HOTEL_OTP_MODAL, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
    }
}

const setGuestHotelCancellVerify = function* (data) {
    const { payload } = data;
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/guest/hotel/cancelbooking`,
                JSON.stringify(payload), {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
        if (result?.data?.status === true) {
             yield put({ type:actions.SHOW_CANCELL_GUEST_HOTEL_OTP_MODAL, payload: false })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Cancelled Successfully' } })
        } else {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
            yield put({ type:actions.SHOW_CANCELL_GUEST_HOTEL_OTP_MODAL, payload: false })
        }

    } catch (err) {
        yield put({ type:actions.SHOW_CANCELL_GUEST_HOTEL_OTP_MODAL, payload: false })
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err?.response } })

    }
}

const setGuestFlightCancellReq = function* (data) {
    const { payload } = data;
    var form_data = new FormData();
    for (var key in payload) {
        form_data.append(key, payload[key]);
    }
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/guest/flight/requestcancellation`,
                form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
        if (result?.data?.status === true) {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type:actions.SHOW_CANCELL_GUEST_FLIGHT_OTP_MODAL, payload: true })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:  result?.data?.message } })
        } else {
            yield put({ type:actions.SHOW_CANCELL_GUEST_FLIGHT_OTP_MODAL, payload: false })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:  result?.data?.message } })
        }
    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type:actions.SHOW_CANCELL_GUEST_FLIGHT_OTP_MODAL, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
    }
}

const setGuestFlightCancellVerify = function* (data) {
    const { payload } = data;
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/guest/flight/cancelbooking`,
                JSON.stringify(payload), {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
        if (result?.data?.status === true) {
             yield put({ type:actions.SHOW_CANCELL_GUEST_FLIGHT_OTP_MODAL, payload: false })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Cancelled Successfully' } })
        } else {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
            yield put({ type:actions.SHOW_CANCELL_GUEST_FLIGHT_OTP_MODAL, payload: false })
        }

    } catch (err) {
        yield put({ type:actions.SHOW_CANCELL_GUEST_FLIGHT_OTP_MODAL, payload: false })
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err?.response } })

    }
}

const getHotelBookingsCancelRequest = function* (data) {
    const { payload } = data;
    var form_data = new FormData();
    for (var key in payload) {
        form_data.append(key, payload[key]);
    }
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/user/hotel/requestcancellation`,
                form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
        if (result?.data?.status === true) {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
        } else {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:  result?.data?.message } })
        }
    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })

    }
}
const getHotelBookingsCancelVerify = function* (data) {
    const { payload } = data;
    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/user/hotel/cancelbooking`,
                JSON.stringify(payload),{
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                })
        );
        if (result?.data?.status === true) {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Cancelled Successfully' } })
            yield put({ type: actions.OTP_MODAL_VIEW, payload: false })
        } else {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Failed to Cancell booking' } })
            yield put({ type: actions.OTP_MODAL_VIEW, payload: false })
        }

    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Something went wrong please try again'} })
        yield put({ type: actions.OTP_MODAL_VIEW, payload: false })
    }
}

const getFlightBookingsCancelRequest = function* (data) {
    const { payload } = data;
    var form_data = new FormData();
    for (var key in payload) {
        form_data.append(key, payload[key]);
    }

    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/user/flight/requestcancellation`,
                form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
        if (result?.data?.status === true) {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message} })
        } else {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message} })
        }
    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })

    }
}
const getFlightBookingsCancelVerify = function* (data) {
    const { payload } = data;
    var form_data = new FormData();
    for (var key in payload) {
        form_data.append(key, payload[key]);
    }

    try {
        const result = yield call(() =>
            axios.post(`${API_URL}/user/flight/cancelbooking`,
            form_data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
        );
        if (result?.data?.status === true) {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Cancelled Successfully' } })
        } else {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
        }

    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err} })
    }
}

const handleProfileUpdate = function* (data) {

    yield put({ type: CommonAction.COMMON_LOADER, payload: true })

    const { payload } = data
    const body = payload.data
    let formData = new FormData()

    if (body?.file != undefined) {
        formData.append('profile_image', {
            uri: body?.file?.image?.URL,
            type: body?.file?.image?.type,
            name: body?.file?.image?.name,
        })
    }

    formData.append('dob', body?.dob)
    formData.append('first_name', body?.first_name)
    formData.append('gender', body?.gender)
    formData.append('last_name', body?.last_name)
    formData.append('married_status', body?.married_status)
    formData.append('phone', body?.phone)
    formData.append('username', body?.username)

    try {
        const result = yield call(() => axios.post(
            `${API_URL}/user/updateProfile`,
            formData, {
            headers: {
                //accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }))
        if (result?.data?.status === true) {
            yield put({ type: actions.GET_USER_PROFILE });
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
            payload?.navigation.goBack()
        } else {
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Failed to Update Profile' } })
        }


    } catch (e) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:e} })
    }

}

const getHotelDetails = function* (data) {
    const { payload ,navigation} = data
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
        yield put({ type: actions.GET_HOTEL_TICKETS_DETAILS, payload: result.data });
        navigation.navigate('HotelTicketDetails')

    } catch (err) {
        yield put({ type: actions.GET_HOTEL_TICKETS_DETAILS, payload: err.data });
    }
}

const getData = async () => {
    const dispatch = useDispatch()
    await AsyncStorage.getItem('tickatrip-token').then(
        (res) => {
            dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN, payload: res })
        }
    )
}

const getAddtoTravellerValue = function* (data) {
    // async function* getAddtoTravellerValue(data) {
    const { payload } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/user/addTraveler`,
                payload?.data, {
                headers: {
                    // accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            }
            )
        );

        if (result?.data?.status === true) {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Traveler Added Successfully' } })
            yield put({ type: actions.GET_ADD_TRAVELLER_TOKEN, payload: true })

            getData()
            payload.navigation.goBack() 
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.error } })
        }

    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:err} })
        // yield put({ type: actions.GET_ADD_TRAVELLER_VALUE, payload: err.data });
    }
}

const getSearchTraveller = function* (data) {
    const { payload } = data
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
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err.message} })

    }
}
const getTraveller = function* (data) {
    const { payload } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/user/getTravelers`,
                // {
                //     headers: {
                //         // 'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${payload}`
                //     },
                // }
            )
        );

        if (result?.data.status === true) {
            yield put({ type: actions.SET_ADD_TRAVELLER_TOKEN, payload: result.data });
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.error } })
        }
    } catch (err) {

    }
}
const updateTraveler = function* (data) {
    const { payload } = data
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/user/updateTraveler`,

                payload.data,
                {
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }

            )
        );
        if (result?.data?.status === true) {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Traveler Added Successfully' } })
            payload.navigation.goBack() 
            var token = ''
            if (token !== null) {
                yield put({ type: actions.GET_ADD_TRAVELLER_TOKEN, payload: token })
            } else {
                yield put({ type: actions.GET_ADD_TRAVELLER_TOKEN, payload: token })
            }
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Traveller Updated Failed' } })
        }

    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err} })

        // yield put({ type: actions.SET_FLIGHT_UPDATE_TRAVELLER, payload: err.data })
    }
}
const getDeleteTraveller = function* (data) {
    const { payload } = data;
    try {
        const result = yield call(() =>
            axios.post(
                `${API_URL}/user/deleteTraveler`,

                payload,
                {
                    headers: {
                        // accept: 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                }

            )
        );

        if (result?.data?.status === true) {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Traveler Deleted' } })
            yield put({ type: actions.GET_ADD_TRAVELLER_TOKEN });
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.status?.error } })
        }
    } catch (err) {
        yield put({ type: actions.GET_ADD_TRAVELLER_TOKEN });
    }
};
const getUserRegister = function* (data) {
    const { payload, navigation } = data
    try {
        const result =
         yield call(() =>
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
     
        // if (result?.data?.status === true) {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Registered Successfully' } })
            AsyncStorage.setItem('tickatrip-token', result?.data?.status?.token)
            yield put({ type: actions.SET_USER_REGISTER, payload: result?.data });
            navigation.navigate('Login')
        // } else {
        //     yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })
        // }

    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:err.response.data.message}})
        yield put({ type: actions.SET_USER_REGISTER, payload: err.data });
    }
}
const userAthentification = function* (data) {
    yield put({ type: CommonAction.COMMON_LOADER, payload: true });
    const { payload, navigation } = data
    try {
        const result =
            yield call(() =>
                axios.post(`${API_URL}/login`,
                    payload,
                    {
                        headers: {
                            accept: 'application/json',
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                ).catch(e => {
                    // yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: e } })
                })
            )
        if (result !== undefined) {
            if (result?.data?.status?.token !== null || result?.data?.status?.token !== undefined) {
                setAuthToken(result?.data?.status?.token) 
                AsyncStorage.setItem('tickatrip-token', result?.data?.status?.token)
                AsyncStorage.setItem('email', result?.data?.status?.user?.email)
                AsyncStorage.setItem('phone', result?.data?.status?.user?.phone)
                AsyncStorage.setItem('username', result?.data?.status?.user?.username)
                AsyncStorage.setItem('LoggedIn', 'Sucess')
                yield put({ type: actions.SET_USER_LOGIN, payload: result?.data?.user })
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
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Invalid Credentials' } })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false });
        }

    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:err.response.data.message}})
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
            axios.get(`${API_URL}/user/flight/mycompletedbookings`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.SET_COMPLETED_FLIGHT_TICKETS, payload: result.data })
        } else {
            yield put({ type: actions.SET_COMPLETED_FLIGHT_TICKETS, payload: result.data })

        }

        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {
        // yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        // yield put({ type: actions.SET_USER_PROFILE, payload: err.data })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err.message} })

    }
}
const getCancelledFlightTickets = function* (data) {
    const { payload } = data;

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/flight/mybookings_cancel`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.SET_CANCELLED_FLIGHT_TICKETS, payload: result.data })

        } else {
            yield put({ type: actions.SET_CANCELLED_FLIGHT_TICKETS, payload: result.data })

        }

    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err.message} })

    }
}
const getUpcomingFlightTickets = function* (data) {
    const { payload } = data;
    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/flight/mybookings`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.SET_UPCOMING_FLIGHT_TICKETS, payload: result.data })

        } else {
            yield put({ type: actions.SET_UPCOMING_FLIGHT_TICKETS, payload: result.data })

        }

    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err.message} })
    }
}
const flightTicketsDetails = function* (data) {
    const { payload } = data;
    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/flight/mybookings/detail/${payload.userId}`)
        )
        if (result?.data?.bookings !== undefined) {
            yield put({ type: actions.GET_FLIGHT_TICKETS_DETAILS, payload: result?.data?.bookings })
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
            payload.navigation.navigate('FlightTicketDetails')

        } else {
            yield put({ type: actions.GET_FLIGHT_TICKETS_DETAILS, payload: result?.data?.bookings })
            yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: result?.data?.message } })

        }
    } catch (err) {
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err } })
        yield put({ type: CommonAction.FLIGHT_LOADER, payload: false })
        yield put({ type: actions.GET_FLIGHT_TICKETS_DETAILS, payload: err.data });
    }
}
const getCompletedHotelTickets = function* (data) {
    const { payload } = data;

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

        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err.message} })
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

    }
}
const getCancelledHotelTickets = function* (data) {
    const { payload } = data;

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/user/hotel/mybookings_cancel`)
        )

        if (result?.data?.success === true) {
            yield put({ type: actions.GET_CANCELLED_HOTEL_TICKETS, payload: result.data })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        } else {
            yield put({ type: actions.GET_CANCELLED_HOTEL_TICKETS, payload: result.data })
            yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

        }

        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })
    }
}
const getUpcomingHotelTickets = function* (data) {
    const { payload } = data;

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
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message: err.message} })
        yield put({ type: CommonAction.HOTEL_LOADER, payload: false })

    }
}

const getFlightCoupons = function* (data) {
    const { payload } = data;
    yield put({ type: CommonAction.COMMON_LOADER, payload: true })

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/flight-coupons`)
        )
        if (result?.data?.status === true) {
            yield put({ type: actions.SET_ALL_FLIGHT_COUPON, payload: result.data })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })

        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:`${result?.data?.message} for Flights`}})
            yield put({ type: actions.SET_ALL_FLIGHT_COUPON, payload:[]})
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })

        }
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:err}})

    }
}

const getHotelCoupons = function* (data) {
    const { payload } = data;
    yield put({ type: CommonAction.COMMON_LOADER, payload: true })

    try {
        const result = yield call(() =>
            axios.get(`${API_URL}/hotel-coupons`)
        )
        if (result?.data?.status === true) {
            yield put({ type: actions.SET_ALL_HOTEL_COUPON, payload: result.data })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        } else {
            yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:`${result?.data?.message} for Hotels`}})
            yield put({ type: actions.SET_ALL_HOTEL_COUPON, payload: [] })
            yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        }
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
    } catch (err) {
        yield put({ type: CommonAction.COMMON_LOADER, payload: false })
        yield put({ type: CommonAction.SET_ALERT, payload: { status: true, message:err}})
    }
}

export default userSaga