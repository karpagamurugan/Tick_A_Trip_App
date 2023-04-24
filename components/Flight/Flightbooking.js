import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableHighlight, TextInput, Keyboard, TouchableOpacity, Pressable, Button } from 'react-native';
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Appbar from '../common/Appbar';
import FromIcon from '../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../Assert/Images/icon/take-off-2.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Flight from '../../Assert/Images/icon/flight-2.svg';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import userAction from '../../redux/user/actions'
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import userActions from '../../redux/user/actions'
import { debounce, filter, result } from "lodash";
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import EditIcon from '../../Assert/Images/icon/Edit_Icon.svg';
import DeleteIcon from '../../Assert/Images/icon/Delete_Icon.svg';
import ProfileIcon from '../../Assert/Images/Profile.svg';
import ContactInfo from "./ContactInfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonAction from '../../redux/common/actions';
import { RAZOR_KEY, RAZOR_KEY_SECRET, CURRENCY, TIMEOUT, API_URL } from '../../components/constants/constApi';
import RazorpayCheckout from "react-native-razorpay";
import FlightAction from "../../redux/Flight/actions";
import axios from "axios";


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

export default function FlightBooking({ navigation, route }) {
    const dispatch = useDispatch()
    const { get_Revalidate, } = useSelector((state) => state.FlightSearchReducer)
    const { AddTravaller_nationality, travelers_list, userProfileData, isLogin } = useSelector((state) => state.userReducer)
    var [travelRec, setTravelRec] = useState({ CountryCode: false, Nationality: false })
    var [selectedNationality, setSelectedNationality] = useState({ CountryCode: '', Nationality: '', })
    var [getSelectId, setGetSelectId] = useState({ CountryCode: '', Nationality: '', })
    var [showAddTraveller, setShowAddTraveller] = useState(isLogin ? false : true);
    var [checkBoxOne, setCheckBoxOne] = useState(false);
    var [checkBoxTwo, setCheckBoxTwo] = useState(false);
    var [travellerEdit, setTravellerEdit] = useState(false);
    var [adult, setAdult] = useState(route?.params?.flightInfo?.adult_flight?.toString()) //set adult count
    var [child, setchild] = useState(route?.params?.flightInfo?.child_flight?.toString()) //set child count
    var [infant, setInfant] = useState(route?.params?.flightInfo?.infant_flight?.toString()) //set infant count
    var [travellerSelectType, setTravellerSelectType] = useState([]);
    const { handleSubmit, register, control, formState: { errors }, reset, setValue } = useForm();
    const { register: register2, formState: { errors: errors2 }, handleSubmit: handleSubmit2, control: control2, reset: reset2, setValue: setValue2 } = useForm();
    const [gender, setGender] = useState();
    const [showDatePicker, setShowDatePicker] = useState(false);
    let [dobDate, setDobDate] = useState(new Date());
    const [selectType, setSelectType] = useState();
    const [title, setTitle] = useState();

    var [selectedUser, setSelectedUser] = useState()
    var [flightInfoType, setFlightInfoType] = useState({ flightAdultList: '', flightChildList: '', flightInfantList: '' });

    var [cuntryCode, setCountryCode] = useState({ CountryCode: '' })

    var [allTravellerList, setAllTravellerList] = useState([]);
    var [editedIndex, setEditedIndex] = useState();

    var [couponCode, setCouponCode] = useState('')
    var [totalFare, setTotaFare] = useState({ MainTotalFare: '', SubTotalFare: '' })
    var [discountPrice, setDiscountPrice] = useState('0')

    const selectTitleName = [
        { name: 'Mr', value: 'Mr' },
        { name: 'Miss', value: 'Miss' },
        { name: 'Mrs', value: 'Mrs' },
        { name: 'Lord', value: 'Lord' },
        { name: 'Lady', value: 'Lady' },
        { name: 'Inf', value: 'Inf' },
    ]
    const selectGender = [
        { name: 'Male', value: 'Male' },
        { name: 'Female', value: 'Female' },
    ]
    useEffect(() => {
        const travel = async () => {
            await AsyncStorage.getItem('tickatrip-token').then(
                (res) => {
                    if (res !== null) {
                        dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN, payload: res })
                    } else {
                        dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN, payload: res })
                    }
                }
            )
        }
        travel();
    }, []);

    useEffect(() => {
        dispatch({ type: userActions.GET_USER_PROFILE })
        setTotaFare(totalFare = { MainTotalFare: get_Revalidate?.TotalFareAmount, SubTotalFare: get_Revalidate?.TotalFareAmount })
        setDiscountPrice(discountPrice = '0')

    }, [])

    const ApplyCoupon = () => {

        dispatch({ type: CommonAction.COMMON_LOADER, payload: true });
        axios.get(
            `${API_URL}/flight-coupon/${couponCode}`
        ).then((res) => {
            if (res?.data?.message?.status == true) {
                if (isLogin === true) {
                    if (res?.data?.message?.coupon?.for_guest === 0) {
                        var applyCoupon = res?.data?.message?.coupon?.coupon_discount;
                        var disFare = totalFare?.MainTotalFare / 100
                        var finalFare = disFare * applyCoupon
                        setDiscountPrice(discountPrice = finalFare.toFixed(0))
                        if (parseInt(totalFare?.MainTotalFare) >= parseInt(discountPrice)) {
                            setDiscountPrice(discountPrice = 0)
                            dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
                            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Coupon not apllicable' } })
                        } else {
                            setTotaFare(totalFare = { MainTotalFare: (totalFare?.MainTotalFare - finalFare).toFixed(0), SubTotalFare: totalFare?.SubTotalFare })
                            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Coupon Applied' } })
                            dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
                        }
                    } else {
                        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Coupon not Found' } })
                        dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
                    }

                } else if (isLogin === false) {
                    if (res?.data?.message?.coupon?.for_guest === 1) {
                        var applyCoupon = res?.data?.message?.coupon?.coupon_discount;
                        var disFare = totalFare?.MainTotalFare / 100
                        var finalFare = disFare * applyCoupon
                        setDiscountPrice(discountPrice = finalFare.toFixed(0))
                        if (parseInt(totalFare?.MainTotalFare) >= parseInt(discountPrice)) {
                            setDiscountPrice(discountPrice = 0)
                            dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
                            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Coupon not apllicable' } })

                        } else {
                            setTotaFare(totalFare = { MainTotalFare: (totalFare?.MainTotalFare - finalFare).toFixed(0), SubTotalFare: totalFare?.SubTotalFare })
                            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Coupon Applied' } })
                            dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
                        }
                    } else {
                        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Invalid Coupon Code' } })
                        dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
                    }
                } else {
                    dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Coupon not Found' } })
                    dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
                }
            } else {
                dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Invalid Coupon Code' } })
                dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
            }

        }).catch(err => {
            console.log('errrr', err)
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: err?.response?.data?.message } })
            dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
        })
    }

    const TypeDropDownList = () => {

        var list = []
        var filteredAdultList = allTravellerList.filter((item) => item?.type.toLowerCase() === 'adult')
        var filteredChildList = allTravellerList.filter((item) => item?.type.toLowerCase() === 'child')
        var filteredInfantList = allTravellerList.filter((item) => item?.type.toLowerCase() === 'infant')

        if (filteredAdultList?.length !== parseInt(adult)) {
            list.push({ name: 'Adult', value: 'Adult' },)
        } else {
            console.log('else...')
        }

        if (filteredChildList?.length !== parseInt(child)) {
            list.push({ name: 'Child', value: 'Child' },)

        } else {
            console.log('else2....')
        }

        if (filteredInfantList?.length !== parseInt(infant)) {
            list.push({ name: 'Infant', value: 'Infant' },)

        } else {
            console.log('else3....')
        }



        setTravellerSelectType(list)

    }

    const TravellerList = () => {
        var adultList = travelers_list?.travelers?.filter((el) => el.type === 'Adult')?.slice(0, route?.params?.flightInfo?.adult_flight)
        var childList = travelers_list?.travelers?.filter((el) => el.type === 'Child')?.slice(0, route?.params?.flightInfo?.child_flight)
        var infantList = travelers_list?.travelers?.filter((el) => el.type === 'Infant')?.slice(0, route?.params?.flightInfo?.infant_flight)
        var tempList = [];
        for (let i = 0; i < adultList?.length; i++) {
            tempList.push(adultList[i])
        }
        for (let j = 0; j < childList?.length; j++) {
            tempList.push(childList[j])

        }
        for (let k = 0; k < infantList?.length; k++) {
            tempList.push(infantList[k])

        }
        setAllTravellerList(allTravellerList = tempList)
        setFlightInfoType(flightInfoType = { flightAdultList: adultList?.length, flightChildList: childList?.length, flightInfantList: infantList?.length })
        TypeDropDownList()
    }

    useEffect(() => {
        TravellerList()
    }, []);


    const handleSelectNationality = (e) => {
        Keyboard.dismiss()
        setSelectedNationality(selectedNationality = { CountryCode: selectedNationality.CountryCode, IssuingName: selectedNationality.IssuingName, Nationality: e.name });
        setGetSelectId(getSelectId = { CountryCode: getSelectId.CountryCode, IssuingName: getSelectId.IssuingName, Nationality: e.id, });
        dispatch({
            type: userAction.GET_ADD_TRAVELLER_NATIONALITY,
            payload: []
        })
        setTravelRec(travelRec = { CountryCode: travelRec.CountryCode, IssuingName: travelRec.IssuingName, Nationality: true });
    }


    const EditTravelDetails = (item, index) => {
        setShowAddTraveller(true)
        setEditedIndex(editedIndex = index)
        setSelectedUser(item)
        setTravellerEdit(true)
        dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN })

        let addTravelFirstName = { firstName: item.first_name }
        let addTravelLastName = { lastName: item.last_name }

        setSelectedNationality({ getSelectId: item.nationality.id, Nationality: item.nationality.name })
        setTravelRec({ Nationality: true })
        setDobDate(new Date(item.dob))
        setTitle(item.title)
        setSelectType(item.type)
        if (item?.gender?.toLowerCase() === 'm') {
            setGender('Male')
        } else if (item?.gender?.toLowerCase() === 'f') {
            setGender('Female')
        } else {
            setGender(item.gender)
        }
        reset({ ...addTravelFirstName, ...addTravelLastName, })
    }


    const updateBtn = (data) => {
        allTravellerList[editedIndex] = {
            type: data?.selectedType,
            title: data?.nametitle,
            first_name: data?.firstName,
            last_name: data?.lastName,
            gender: data?.selectedgender,
            dob: data?.dob,
            nationality: getSelectId?.Nationality,
        }

        TypeDropDownList()

        setTitle("");
        setGender("");
        setSelectType("");
        setDobDate(new Date());
        setSelectedNationality("");
        setTravellerEdit(false)
        let addTravelFirstName = { firstName: '' }
        let addTravelLastName = { lastName: '' }
        reset({ ...addTravelFirstName, ...addTravelLastName, })
    }


    const deleteTraveller = (item) => {
        var DeletedList = []
        DeletedList = allTravellerList.filter((data) => data?.id !== item?.id)
        setAllTravellerList(allTravellerList = DeletedList)
        TypeDropDownList()
    }

    const SubmitAddBtn = (data) => {

        const currentYear = new Date().getFullYear();
        var dobDate = data?.dob?.getFullYear()
        var age = currentYear - dobDate


        if (data?.selectedType.toLowerCase() === 'adult') {

            if (age < 12) {
                dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Adult Age does not match' } })
            } else {
                TravellerAddBtn(data)
            }

        } else if (data?.selectedType.toLowerCase() === 'child') {
            if (age > 12 && age < 2) {
                dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Child Age does not match' } })
            } else {
                TravellerAddBtn(data)
            }

        } else if (data?.selectedType.toLowerCase() === 'infant') {
            if (age > 2) {
                dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Infant Age does not match' } })

            } else {
                TravellerAddBtn(data)


            }
        }
    }

    const TravellerAddBtn = (data) => {

        var AddedAdult = {
            type: data?.selectedType,
            title: data?.nametitle,
            first_name: data?.firstName,
            last_name: data?.lastName,
            gender: data?.selectedgender,
            // dob: moment(data.dobDate).format('YYYY-MM-DD'),
            dob: data?.dob,
            nationality: getSelectId?.Nationality,
            passport: data?.passportNumber,
            // id:'ID'+Math.floor((Math.random() * 10) + 1)

        }
        setAllTravellerList(allTravellerList = [...allTravellerList, AddedAdult])

        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Traveller added Successfully' } })

        TypeDropDownList()

        setTitle("");
        setGender("");
        setSelectType("");
        setDobDate(new Date());
        setSelectedNationality("");

        let addTravelFirstName = { firstName: '' }
        let addTravelLastName = { lastName: '' }
        reset({ ...addTravelFirstName, ...addTravelLastName, })
    }

    const ConfirmBooking = (data) => {
        var filteredAdultList = allTravellerList.filter((item) => item?.type.toLowerCase() === 'adult')
        var filteredChildList = allTravellerList.filter((item) => item?.type.toLowerCase() === 'child')
        var filteredInfantList = allTravellerList.filter((item) => item?.type.toLowerCase() === 'infant')


        if (filteredAdultList?.length !== parseInt(adult) || filteredChildList?.length !== parseInt(child) || filteredInfantList?.length !== parseInt(infant)) {
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Add a Traveller ' } })
        } else if (checkBoxOne !== true) {
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Accept the Privacy Policy' } })
        } else {

            var options = {
                key: RAZOR_KEY,
                key_secret: RAZOR_KEY_SECRET,
                amount: parseFloat(parseFloat(totalFare?.MainTotalFare) * 100),
                currency: CURRENCY,
                name: data?.Name,
                description: "Payment Tick A Trip",
                timeout: TIMEOUT,
                // order_id:'TickATrip_'+generateUUID(8),
                prefill: {
                    email: data?.Email,
                    contact: data?.Phone,
                    name: data?.Name
                },
                notes: {
                    address: "",
                },
                theme: {
                    color: "#0543e9",
                },
            };
            RazorpayCheckout.open(options).then((val) => {
                var bookingData = {
                    IsPassportMandatory: get_Revalidate?.IsPassportMandatory,
                    PostCode: data?.PostalCode,
                    TotalFare: totalFare?.MainTotalFare,
                    adult_flight: adult,
                    area_code: 758,
                    child_flight: child,
                    country_code: data?.CountryCode,
                    customerEmail: userProfileData?.email,
                    customerName: userProfileData?.name,
                    customerPhone: userProfileData?.phone,
                    email_id: data?.Email,
                    fare_source_code: get_Revalidate?.FareSourceCode,
                    dob: allTravellerList
                        ?.map((val) => moment(val.dob).format('YYYY-MM-DDTHH:mm:ss'))
                        .reduce((total, value, index) => {
                            return index === 0 ? moment(value).format('YYYY-MM-DDTHH:mm:ss') : moment(total).format('YYYY-MM-DDTHH:mm:ss') + "<br>" + moment(value).format('YYYY-MM-DDTHH:mm:ss');
                        }),
                    first_name: allTravellerList
                        ?.map((val) => val.first_name)
                        .reduce((total, value, index) => {
                            return index === 0 ? value : total + "<br>" + value;

                        }),
                    gender: allTravellerList
                        ?.map((val) => val.gender)
                        .reduce((total, value, index) => {
                            return index === 0 ? value : total + "<br>" + value;
                        }),
                    last_name: allTravellerList
                        ?.map((val) => val.last_name)
                        .reduce((total, value, index) => {
                            return index === 0 ? value : total + "<br>" + value;
                        }),
                    title: allTravellerList
                        ?.map((val) => val.title)
                        .reduce((total, value, index) => {
                            return index === 0 ? value : total + "<br>" + value;
                        }),
                    infant_flight: infant,
                    isRefundable: get_Revalidate?.IsRefundable,
                    mobile_no: data?.Phone,
                    nationality: data?.CountryCode,
                    paymentTransactionId: val?.razorpay_payment_id,
                    type: get_Revalidate?.FareType
                }

                dispatch({ type: FlightAction.SET_FLIGHT_BOOKING, payload: bookingData, navigation: navigation })

            }).catch((error) => {
                dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Payment Action Failed' } })
                console.log('error', error)
            });
        }
    }
    const PaymentGateWay = (value) => {

        var options = {
            key: RAZOR_KEY,
            key_secret: RAZOR_KEY_SECRET,
            amount: '1000',
            // amount: parseFloat(parseFloat(RoomType?.netPrice) * 100),
            currency: CURRENCY,
            name: data?.Name,
            description: "Payment Tick A Trip",
            timeout: TIMEOUT,
            // order_id:'TickATrip_'+generateUUID(8),
            prefill: {
                email: value?.Email,
                contact: value?.Phone,
                name: value?.Name
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#0543e9",
            },
        };
        RazorpayCheckout.open(options).then((data) => {
            // var bookingData= { 
            //     IsPassportMandatory:  get_Revalidate?.IsPassportMandatory,
            //     PostCode:value?.PostalCode,
            //     TotalFare:  get_Revalidate?.TotalFareAmount,
            //     adult_flight: adult,
            //     area_code: 758,
            //     child_flight: child,
            //     country_code: value?.CountryCode,
            //     customerEmail: userProfileData?.email,
            //     customerName: userProfileData?.name,
            //     customerPhone: userProfileData?.phone,
            //     email_id:  value?.Email,
            //     fare_source_code:get_Revalidate?.FareSourceCode,
            //     dob: allTravellerList
            //         ?.map((val) => val.dob)
            //         .reduce((total, value, index) => {
            //         return index === 0 ? value : total + "<br>" + value;
            //         }),
            //     first_name: allTravellerList
            //         ?.map((val) => val.first_name)
            //         .reduce((total, value, index) => {
            //         return index === 0 ? value : total + "<br>" + value;
            //         }),
            //     gender: allTravellerList
            //     ?.map((val) => val.gender)
            //     .reduce((total, value, index) => {
            //     return index === 0 ? value : total + "<br>" + value;
            //     }),
            //     last_name: allTravellerList
            //     ?.map((val) => val.last_name)
            //     .reduce((total, value, index) => {
            //     return index === 0 ? value : total + "<br>" + value;
            //     }),
            //     title: allTravellerList
            //     ?.map((val) => val.title)
            //     .reduce((total, value, index) => {
            //     return index === 0 ? value : total + "<br>" + value;
            //     }),
            //     infant_flight: infant,
            //     isRefundable: get_Revalidate?.IsRefundable,
            //     mobile_no:value?.Phone,
            //     nationality: getSelectId?.Nationality,
            //     paymentTransactionId: "pay_LUqKPqqPIMoDhr",
            //     type: get_Revalidate?.FareType}

            //   dispatch({type:hotelActions.SET_HOTEL_BOOKING,payload:dataList,navigation:navigation})


        }).catch((error) => {
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Payment Action Failed' } })
            console.log('error', error)
        });

    }

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            {/* appbar */}
            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <MaterialIcons name='keyboard-arrow-left' size={35} color={COLORS.textBlue} />
                </TouchableHighlight>
                <Flight height={34} width={34} />
                <View style={styles.appbarPlaceContainer}>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FromIcon height={15} width={15} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>{route?.params?.flightInfo?.fromCity}</Text>
                                {/* <Text style={styles.appBarTraveller}>{route?.params?.flightInfo?.adult_flight} Adult, {route?.params?.flightInfo?.child_flight} Child, {route?.params?.flightInfo?.infant_flight} Infant</Text> */}
                            </View>
                        </View>

                        <View style={[styles.verticalLine]} />

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <ToIcon height={19} width={19} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>{route?.params?.flightInfo?.toCity}</Text>
                                {/* <Text style={styles.appBarTraveller}>{route?.params?.flightInfo?.class}</Text> */}
                            </View>
                        </View>

                    </View>
                </View>
            </View>
            <ScrollView>
                <View>
                    <View style={{ backgroundColor: '#F7F7F7' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 25 }}>
                            <View>
                                <Text style={styles.title}>Depart On</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                    <Text style={styles.text}>{moment(get_Revalidate?.DepartureDateTime).format('DD-MM-YYYY')}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Return</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                    <Text style={styles.text}>{moment(get_Revalidate?.ArrivalDateTime).format('DD-MM-YYYY')}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Class</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <MaterialCommunityIcons name="sofa-single-outline" color={COLORS.colorBtn} size={25} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.class}</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 25 }}>
                            <View>
                                <Text style={styles.title}>Adult</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.TravellerCountShow}>{route?.params?.flightInfo?.adult_flight} Adult</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Child</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.TravellerCountShow}>{route?.params?.flightInfo?.child_flight} Child</Text>

                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Infant</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.TravellerCountShow}>{route?.params?.flightInfo?.infant_flight} Infant</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.couponCode}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                            <TextInput
                                style={{ width: width * 0.75 }}
                                placeholder='Add a coupon Code'
                                onChangeText={e => {
                                    if (e?.length === 0) {
                                        setTotaFare(totalFare = { MainTotalFare: get_Revalidate?.TotalFareAmount, SubTotalFare: totalFare?.SubTotalFare })
                                        setDiscountPrice(discountPrice = '0')
                                    }
                                    setCouponCode(couponCode = e)

                                }
                                }
                            />
                            <TouchableHighlight onPress={() => {
                                if (couponCode?.length !== 0) {
                                    if (totalFare?.MainTotalFare === totalFare?.SubTotalFare) {
                                        ApplyCoupon()

                                    } else {
                                        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Coupon applied' } })
                                    }
                                } else {
                                    dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Enter Coupon Code' } })
                                }
                            }} underlayColor='transparent'>
                                <Text style={styles.applyCoupon}>APPLY</Text>
                            </TouchableHighlight>

                        </View>
                    </View>

                    <View style={styles.bg}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Base Fare</Text>
                            <Text style={styles.priceTag}> Rs: <Text style={styles.price}>{get_Revalidate?.BaseFareAmount}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Taxes</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>{get_Revalidate?.TotalTaxAmount}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Discounts & {'\n'}Adjustments</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>{(discountPrice === '0') ? discountPrice : - discountPrice}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Other charges</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>0000/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />


                        <View style={styles.total}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={{ color: 'white', fontFamily: FONTS.fontBold }}>:</Text>
                            <Text style={styles.priceTag}> Rs  <Text style={[styles.price, { fontSize: height * 0.03 }]}>{totalFare?.MainTotalFare}</Text></Text>

                        </View>
                    </View>
                </View>



                {isLogin &&
                    <ContactInfo
                        cuntryCode={cuntryCode}
                        setCountryCode={setCountryCode}
                        register2={register2}
                        control2={control2}
                        errors2={errors2} reset2={reset2} setValue2={setValue2} />
                }

                {
                    (allTravellerList.length !== parseInt(adult) + parseInt(child) + parseInt(infant)) ?
                        <View style={{ marginHorizontal: 25, paddingTop: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[styles.formTitle]}>Add Traveller Details *</Text>
                                {/* {isLogin &&
                                    <TouchableOpacity onPress={() => setShowAddTraveller(!showAddTraveller)}>
                                        <AntDesign name={showAddTraveller ? 'upcircleo' : 'downcircleo'} style={{ color: '#2B64FF', fontSize: height * 0.022, paddingRight: 15 }} />
                                    </TouchableOpacity>
                                } */}
                            </View>
                            {/* {(showAddTraveller === true) ? */}
                                <View>
                                    <View style={[styles.editTextBorder]}>
                                        <Controller
                                            control={control}
                                            name="selectedType"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Select Your Type"
                                                }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <Dropdown
                                                    showsVerticalScrollIndicator={true}
                                                    placeholder="Type"
                                                    labelField="name"
                                                    valueField="value"
                                                    name="selectedType"
                                                    data={travellerSelectType}
                                                    value={selectType}
                                                    {...register('selectedType')}
                                                    onChange={(item) => {
                                                        onChange(item.value)
                                                        setSelectType(item.value)
                                                    }}
                                                    selectedTextProps={{
                                                        style: {
                                                            fontSize: 13,
                                                            fontWeight: '500',
                                                            letterSpacing: 0.5,
                                                            padding: 0,
                                                        },
                                                    }}
                                                    style={[styles.inputeEditor, { paddingHorizontal: 5, }]}
                                                    renderRightIcon={() => (
                                                        <IoniconsIcon
                                                            name="chevron-down"
                                                            size={25}
                                                            style={{ fontSize: 18, }}
                                                        />)}
                                                />
                                            )}
                                        />
                                        {errors.selectedType && (
                                            <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.selectedType.message}</Text>
                                        )}
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={[styles.editTextBorder, { width: "20%" }]}>
                                            <Controller
                                                control={control}
                                                name="nametitle"
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: 'Select Title',
                                                    }
                                                }}
                                                render={({ field: { onChange, value } }) => (
                                                    <Dropdown
                                                        showsVerticalScrollIndicator={true}
                                                        placeholder="Title"
                                                        data={selectTitleName}
                                                        labelField="name"
                                                        valueField="value"
                                                        value={title}
                                                        name="nametitle"
                                                        {...register("nametitle")}
                                                        onChange={(item) => {
                                                            onChange(item.value)
                                                            setTitle(item.value)
                                                        }}
                                                        selectedTextProps={{
                                                            style: {
                                                                fontSize: 13,
                                                                fontWeight: '500',
                                                                letterSpacing: 0.5,
                                                                paddingTop: 10,
                                                            },
                                                        }}
                                                        style={[styles.inputeEditor, { paddingHorizontal: 5 }]}
                                                        renderRightIcon={() => (
                                                            <IoniconsIcon
                                                                name="chevron-down"
                                                                size={25}
                                                                style={{ fontSize: 18 }}
                                                            />)}
                                                    />
                                                )}
                                            />
                                            {errors.nametitle && (
                                                <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.nametitle.message}</Text>
                                            )}
                                        </View>
                                        <View style={[styles.editTextBorder, { width: "78%" }]}>
                                            <Controller
                                                control={control}
                                                name="firstName"
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: "Enter Your First Name"
                                                    }
                                                }}
                                                render={({ field: { onChange, value } }) => (
                                                    <TextInput
                                                        placeholderTextColor={"gray"}
                                                        style={styles.inputeEditor}
                                                        placeholder="First Name"
                                                        keyboardType='default'
                                                        {...register("firstName")}
                                                        value={value}
                                                        onChangeText={value => {
                                                            onChange(value)
                                                        }}
                                                    />
                                                )}
                                            />
                                            {errors.firstName && (
                                                <Text style={[styles.errormessage]}>{errors.firstName.message}</Text>
                                            )}
                                        </View>
                                    </View>
                                    <View style={styles.editTextBorder}>
                                        <Controller
                                            control={control}
                                            name='lastName'
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Enter Your Last Name!"
                                                }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextInput
                                                    placeholderTextColor={"gray"}
                                                    style={styles.inputeEditor}
                                                    placeholder="Last Name"
                                                    keyboardType='default'
                                                    value={value}
                                                    {...register('lastName')}
                                                    onChangeText={value => {
                                                        onChange(value.toLowerCase())
                                                    }
                                                    }
                                                />
                                            )}
                                        />
                                        {errors.lastName && (
                                            <Text style={[styles.errormessage]}>{errors.lastName.message}</Text>
                                        )}
                                    </View>
                                    <View style={styles.editTextBorder}>
                                        <Controller
                                            control={control}
                                            name="selectedgender"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Select Your Gender"
                                                }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <Dropdown
                                                    showsVerticalScrollIndicator={true}
                                                    placeholder="Gender"
                                                    labelField="name"
                                                    valueField="value"
                                                    name="selectedgender"
                                                    data={selectGender}
                                                    value={gender}
                                                    {...register('selectedgender')}
                                                    onChange={(item) => {
                                                        onChange(item.value)
                                                        setGender(item.value)
                                                    }}
                                                    selectedTextProps={{
                                                        style: {
                                                            fontSize: 13,
                                                            fontWeight: '500',
                                                            letterSpacing: 0.5,
                                                            paddingTop: 10,
                                                        },
                                                    }}
                                                    style={[styles.inputeEditor, { paddingHorizontal: 5, }]}
                                                    renderRightIcon={() => (
                                                        <IoniconsIcon
                                                            name="chevron-down"
                                                            size={25}
                                                            style={{ fontSize: 18 }}
                                                        />)}
                                                />
                                            )}
                                        />
                                        {errors.selectedgender && (
                                            <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.selectedgender.message}</Text>
                                        )}
                                    </View>
                                    <View style={[styles.editTextBorder]}>
                                        <TouchableHighlight underlayColor={'transparent'} onPress={() => setShowDatePicker(!showDatePicker)} style={{ paddingRight: 5 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={{ color: 'gray', paddingVertical: 10, paddingLeft: 7, }}>
                                                    {moment(dobDate).format('DD/MM/YYYY').toString()}
                                                </Text>
                                                <AntDesign Icon name="calendar" size={25} color="gray" />
                                            </View>
                                        </TouchableHighlight>
                                        {errors.dob && (
                                            <Text style={[styles.errormessage]}>{errors.dob.message}</Text>
                                        )}
                                    </View>
                                    <View>
                                        <View style={[styles.editTextBorder]}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    height: 35,
                                                    width: '100%',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <TextInput
                                                    keyboardType={'default'}
                                                    placeholder={'Nationality'}
                                                    placeholderTextColor="gray"
                                                    numberOfLines={1}
                                                    name="add_nationality"
                                                    value={selectedNationality?.Nationality}
                                                    onChangeText={(e) => {
                                                        if (e === '') {
                                                            setTravelRec(travelRec = { Nationality: true })
                                                        }
                                                        if (e?.length >= 3) {
                                                            dispatch({
                                                                type: userAction.SET_ADD_TRAVELLER_SEARCH_BY_NAME,
                                                                payload: {
                                                                    name: e,
                                                                    type: 'nationality',
                                                                }
                                                            })
                                                            setSelectedNationality(selectedNationality = { Nationality: e })
                                                        } else {
                                                            setSelectedNationality(selectedNationality = { Nationality: e })
                                                            dispatch({
                                                                type: userAction.GET_ADD_TRAVELLER_NATIONALITY,
                                                                payload: []
                                                            })
                                                        }
                                                    }}
                                                    style={{
                                                        color: 'black',
                                                        width: width * 0.9,
                                                        paddingTop: 5,
                                                        paddingBottom: 0,
                                                    }}
                                                />
                                                {
                                                    selectedNationality?.Nationality !== "" ?
                                                        <TouchableHighlight
                                                            underlayColor={'transparent'}
                                                            onPress={() => {
                                                                setSelectedNationality(selectedNationality = { Nationality: '' })
                                                                dispatch({
                                                                    type: userAction.GET_ADD_TRAVELLER_NATIONALITY,
                                                                    payload: []
                                                                })
                                                                setTravelRec(travelRec = { Nationality: false });
                                                            }}
                                                        >
                                                            <AntDesign name="closecircle" size={18} color="gray" style={{
                                                                marginLeft: 10, marginRight: 10, position: 'absolute', right: 20, top: -4
                                                            }} />
                                                        </TouchableHighlight> : <></>
                                                }
                                            </View>
                                        </View>
                                        {(AddTravaller_nationality?.message === undefined && selectedNationality?.Nationality !== '' && travelRec?.Nationality === false) ?
                                            <View style={{
                                                backgroundColor: 'white',
                                                width: '100%',
                                                alignSelf: 'center',
                                                position: 'relative',
                                                zIndex: 2,
                                                borderRadius: 5,
                                                elevation: 10,
                                                maxHeight: height * 0.35
                                            }}>
                                                <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, }}>No Options found</Text>
                                            </View> : <View style={{
                                                backgroundColor: 'white',
                                                width: '100%',
                                                alignSelf: 'center',
                                                position: 'relative',
                                                zIndex: 2,
                                                borderRadius: 10,
                                                elevation: 10,
                                                maxHeight: height * 0.35
                                            }}>

                                                <ScrollView
                                                    showsVerticalScrollIndicator={true}
                                                    nestedScrollEnabled
                                                    keyboardShouldPersistTaps='handled'
                                                >
                                                    {
                                                        AddTravaller_nationality?.message?.map((e, i) => {
                                                            return (
                                                                <TouchableHighlight
                                                                    underlayColor={"transparent"}
                                                                    key={i}
                                                                    onPress={() => handleSelectNationality(e)}
                                                                >
                                                                    <Text
                                                                        style={{
                                                                            color: 'black',
                                                                            paddingHorizontal: 9,
                                                                            fontSize: 13,
                                                                            paddingVertical: 2,
                                                                        }}>{e?.name}</Text>
                                                                </TouchableHighlight>
                                                            )
                                                        })
                                                    }
                                                </ScrollView>
                                            </View>
                                        }
                                    </View>
                                    <View style={{ marginVertical: 20, width: '90%', alignSelf: 'center' }}>
                                        {(travellerEdit === false) ?

                                            (allTravellerList.filter((item) => item?.type.toLowerCase() === 'adult')?.length === parseInt(adult) &&
                                                allTravellerList.filter((item) => item?.type.toLowerCase() === 'child')?.length === parseInt(child) &&
                                                allTravellerList.filter((item) => item?.type.toLowerCase() === 'infant')?.length === parseInt(infant)) ?
                                                <TouchableOpacity
                                                    disabled={true}
                                                    style={[styles.clickBtn, { opacity: 0.75 }]}>
                                                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: FONTS.mediam, opacity: 0.5 }}>Disabled</Text>
                                                </TouchableOpacity> :
                                                <TouchableOpacity
                                                    onPress={handleSubmit(SubmitAddBtn)}
                                                    style={[styles.clickBtn]}>
                                                    <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: FONTS.mediam, }}>Add</Text>
                                                </TouchableOpacity>
                                            :
                                            <TouchableHighlight
                                                underlayColor='transparent'
                                                onPress={handleSubmit(updateBtn)}
                                                style={[styles.clickBtn]}>
                                                <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: FONTS.mediam, }}>Update</Text>
                                            </TouchableHighlight>
                                        }
                                    </View>
                                </View>

                        </View>
                        :
                        <></>
                }


                <View style={{ marginHorizontal: 25, paddingTop: 15 }}>
                    {allTravellerList?.map((item, index) => {
                        return (
                            <View key={index} style={[styles.travellerDetails, { marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <ProfileIcon height={22} width={22} />
                                    </View>
                                    <Text style={{ fontSize: 17, fontFamily: FONTS.mediam, color: '#1B5CB7' }}>{item?.title} {item?.first_name} {item?.last_name}
                                        <Text style={{ fontSize: height * 0.015, fontFamily: FONTS.mediam, color: 'grey' }}>
                                            ({item?.type})</Text></Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => EditTravelDetails(item, index)}
                                        style={{ marginRight: 20 }}>
                                        <EditIcon height={22} width={22} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deleteTraveller(item)}
                                    >
                                        <DeleteIcon height={22} width={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}


                    {/* {travelers_list?.travelers?.filter((el) => el.type === 'Adult')?.slice(0, route?.params?.flightInfo?.adult_flight)?.map((item, index) => {
                        return (
                            <View key={index} style={[styles.travellerDetails, { marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <ProfileIcon height={22} width={22} />
                                    </View>
                                    <Text style={{ fontSize: 17, fontFamily: FONTS.mediam, color: '#1B5CB7' }}>{item?.title} {item?.first_name} {item?.last_name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => EditTravelDetails(item)}
                                        style={{ marginRight: 20 }}>
                                        <EditIcon height={22} width={22} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deleteTraveller(item)}
                                    >
                                        <DeleteIcon height={22} width={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })} */}

                    {/* {travelers_list?.travelers?.filter((el) => el.type === 'Child')?.slice(0, route?.params?.flightInfo?.child_flight)?.map((item, index) => {
                        return (
                            <View key={index} style={[styles.travellerDetails, { marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <ProfileIcon height={22} width={22} />
                                    </View>
                                    <Text style={{ fontSize: 17, fontFamily: FONTS.mediam, color: '#1B5CB7' }}>{item?.title} {item?.first_name} {item?.last_name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => EditTravelDetails(item)} style={{ marginRight: 20 }}>
                                        <EditIcon height={22} width={22} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deleteTraveller(item)}
                                    >
                                        <DeleteIcon height={22} width={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}

                    {travelers_list?.travelers?.filter((el) => el.type === 'Infant')?.slice(0, route?.params?.flightInfo?.infant_flight)?.map((item, index) => {
                        return (
                            <View key={index} style={[styles.travellerDetails, { marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <ProfileIcon height={22} width={22} />
                                    </View>
                                    <Text style={{ fontSize: 17, fontFamily: FONTS.mediam, color: '#1B5CB7' }}>{item?.title} {item?.first_name} {item?.last_name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => EditTravelDetails(item)} style={{ marginRight: 20 }}>
                                        <EditIcon height={22} width={22} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => deleteTraveller(item)}
                                    >
                                        <DeleteIcon height={22} width={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })} */}

                    <View style={{ width: "90%", alignSelf: "center" }} >
                        <View style={{ flexDirection: 'row', alignItems: "flex-start", paddingBottom: 15 }}>
                            <Pressable onPress={() => setCheckBoxOne(!checkBoxOne)}>
                                <MaterialIcons style={[styles.checkBoxStyl]} name={checkBoxOne ? "check-box" : "check-box-outline-blank"} />
                            </Pressable>
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', alignSelf: 'center' }}>
                                <Text style={{ color: "#333333", fontSize: 14, fontFamily: FONTS.font, flex: 1 }}>By completing this booking your agree to the
                                    {/* <TouchableOpacity><Text style={[styles.policystyl]}> booking terms <Text style={[styles.policystyl]}> privacy policy.</Text></Text> </TouchableOpacity> <Text> &</Text> */}
                                    <Text style={{ color: '#C80505' }}>*</Text></Text>
                            </View>
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
                            <Pressable onPress={() => setCheckBoxTwo(!checkBoxTwo)}>
                                <MaterialIcons style={[styles.checkBoxStyl]} name={checkBoxTwo ? "check-box" : "check-box-outline-blank"} />
                            </Pressable>
                            <Text style={{ color: "#333333", fontSize: 14, fontFamily: FONTS.font, flex: 1 }}>Send me travel offers, deals, and news by email & message</Text>
                        </View> */}
                    </View>
                </View>

                <Controller register
                    control={control}
                    name="dob"
                    rules={{
                        required: {
                            value: true,
                            message: 'Select your dob!',
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <DatePicker
                            modal
                            open={showDatePicker}
                            date={dobDate}
                            mode="date"
                            {...register("dob")}
                            name="dob"
                            value={value}
                            onConfirm={(DOB) => {
                                onChange(DOB)
                                setShowDatePicker(!showDatePicker);
                                setDobDate(dobDate = DOB);
                            }}
                            onCancel={() => {
                                setShowDatePicker(!showDatePicker);
                            }}
                        />
                    )}
                />

            </ScrollView>
            <TouchableOpacity style={styles.ConfirmBtn}
                onPress={handleSubmit2(ConfirmBooking)}>
                <Text style={styles.confirmBook}>Confirm & Book</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        backgroundColor: COLORS.AppbarColor,
        height: height * 0.07,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15
    },
    appbarPlaceContainer: { backgroundColor: 'white', width: width * 0.75, marginLeft: 5, borderRadius: 30, paddingVertical: 10 },
    appbarPlace: { fontFamily: FONTS.font, fontSize: height * 0.018 },
    appBarTraveller: { fontFamily: FONTS.font, marginTop: -6, fontSize: height * 0.016 },
    title: { fontFamily: FONTS.font, color: 'grey', fontSize: height * 0.0162 },
    text: { fontFamily: FONTS.fontBold, paddingLeft: 10, color: COLORS.colorText, fontSize: height * 0.017 },
    details: { flexDirection: 'column', backgroundColor: COLORS.lightGrey, paddingBottom: 15, paddingTop: 5 },
    couponCode: {
        borderRadius: 7, borderWidth: 0.9, borderColor: COLORS.borderColor, paddingVertical: 0, paddingHorizontal: 7,
        marginHorizontal: 15, marginTop: 10, backgroundColor: COLORS.AppbarColor, elevation: 1
    },
    applyCoupon: { fontFamily: FONTS.fontBold, color: COLORS.textBlue },
    bg: { backgroundColor: COLORS.bg, padding: 20, margin: 10, borderRadius: 7, elevation: 5, shadowColor: COLORS.bg },
    amountContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    amountName: { fontFamily: FONTS.light, color: 'white', fontSize: height * 0.022 },
    price: { fontFamily: FONTS.mediam, color: 'white', fontSize: height * 0.026 },
    priceTag: { fontFamily: FONTS.font, color: 'white', fontSize: height * 0.017 },
    total: {
        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.darkblue,
        paddingHorizontal: 15, paddingVertical: 3, borderRadius: 22, alignItems: 'center'
    },
    totalText: { fontFamily: FONTS.fontBold, color: 'white', fontSize: height * 0.022 },

    ConfirmBtn: {
        alignItems: 'center',
        backgroundColor: COLORS.borderColor,
        marginHorizontal: 20,
        marginBottom: 10,
        // marginTop: 20,
        borderRadius: 30,
        paddingVertical: 10
    },
    confirmBook: { fontFamily: FONTS.mediam, color: 'white', fontSize: height * 0.027 },
    editTextBorder: { backgroundColor: '#E9F3FF', borderWidth: 1, height: 50, borderRadius: 3, borderColor: '#2B64FF', marginBottom: 15, paddingHorizontal: 5, },
    formTitle: {
        fontSize: height * 0.020,
        color: '#2B64FF',
        fontFamily: FONTS.mediam,
    },
    clickBtn: {
        backgroundColor: '#0D367E',
        alignItems: "center",
        paddingVertical: 9,
        borderRadius: 100,
        justifyContent: 'center'
    },
    checkBoxStyl: {
        fontSize: 28,
        paddingRight: 10,
        color: '#2B64FF',
    },
    policystyl: {
        color: '#0566C8',
        // borderBottomWidth: 1,
        // borderBottomColor: '#0566C8',
        fontFamily: FONTS.font,
        fontSize: height * 0.015
    },
    travellerDetails: {
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5
    },
    errormessage: {
        color: "red",
        fontSize: 10,
        fontWeight: "500",
        marginTop: 2,
    },
    TravellerCountShow: {
        fontFamily: FONTS.fontBold,
        color: '#000'
    },
    verticalLine: {
        height: height * 0.030,
        width: 1,
        backgroundColor: '#ddd'
    }
})