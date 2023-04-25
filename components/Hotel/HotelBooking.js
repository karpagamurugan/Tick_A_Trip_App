import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, ScrollView, TextInput, Image, KeyboardAvoidingView } from 'react-native'
import Appbar from "../common/Appbar";
import HotelAppbar from "../common/HotelAppbar";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from "moment";
import FromIcon from '../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../Assert/Images/icon/take-off-2.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Flight from '../../Assert/Images/icon/flight-2.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import Fontisto from 'react-native-vector-icons/Fontisto'
import userActions from '../../redux/user/actions'
import RazorpayCheckout from "react-native-razorpay";
import { RAZOR_KEY, RAZOR_KEY_SECRET, CURRENCY, TIMEOUT, API_URL } from '../../components/constants/constApi';
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import CommonAction from '../../redux/common/actions';
import hotelActions from "../../redux/Hotel/actions";
import style from "../common/commonStyle";
import Clipboard from "@react-native-clipboard/clipboard";
import AsyncStorage from "@react-native-async-storage/async-storage";


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;


function HotelBooking({ route, navigation, props }) {

    // var copyCouponKey = props.couponCopyText
    // console.log('copyCouponKey',copyCouponKey)

    const dispatch = useDispatch()
    const [HotelDetail, setHotelDetail] = useState(route?.params?.detail)
    const [RoomType, setRoomType] = useState(route?.params?.value)
    var [policyBox, setPolicyBox] = useState(false);
    const { handleSubmit, register, control, formState: { errors }, reset, setValue } = useForm();

    const { userProfileData, isLogin } = useSelector((state) => state.userReducer)
    const { RoomGuestPlace, hotelSessionId } = useSelector((state) => state.HotelReducer)

    var [couponCode, setCouponCode] = useState('')
    var [totalFare, setTotaFare] = useState({ MainTotalFare: '', SubTotalFare: '' })
    var [discountPrice, setDiscountPrice] = useState('0')

    const [title, setTitle] = useState();
    // async function copyCouponKey() {
    //     // const text = await Clipboard.getString()
    //     console.log('text1111', text)
    // }
    // console.log('dkjsf', hotel_Coupons?.message.length)
    useEffect(() => {
        // copyCouponKey()
        AsyncStorage.getItem('ClipboardCoupon').then((res) => setCouponCode(res))

    }, [])
    const onSubmit = (data) => {
        if (policyBox !== true) {
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Accept the Privacy Policy' } })
        } else {
            // PaymentGateWay()

            var options = {
                key: RAZOR_KEY,
                key_secret: RAZOR_KEY_SECRET,
                amount: parseFloat(parseFloat(totalFare?.MainTotalFare) * 100),
                currency: CURRENCY,
                name: data?.FirstName,
                description: "Payment Tick A Trip",
                timeout: TIMEOUT,
                // order_id:'TickATrip_'+generateUUID(8),
                prefill: {
                    email: data?.Email,
                    contact: data?.Phone,
                    name: data?.FirstName
                },
                notes: {
                    address: "",
                },
                theme: {
                    color: "#0543e9",
                },
            };
            RazorpayCheckout.open(options).then((res) => {

                var dataList = {
                    sessionId: hotelSessionId,
                    productId: RoomType?.productId,
                    tokenId: HotelDetail?.tokenId,
                    hotelId: HotelDetail?.hotelId,
                    rateBasisId: RoomType?.rateBasisId,
                    clientRef: RoomType?.productId,
                    customerName: data?.FirstName,
                    customerEmail: data?.Email,
                    customerPhone: data?.Phone,
                    customerGst: "",
                    transactionId: res?.razorpay_payment_id,
                    paymentStatus: "true",
                    bookingNote: "Remark",
                    paxDetails: [
                        {
                            room_no: 1,
                            adult: {
                                "title": ["Mr", "Mr"],
                                "firstName": [data?.FirstName, data?.FirstName],
                                "lastName": ["MindMade", "MindMade"]
                            },
                            "child": { "title": [], "firstName": [], "lastName": [] }
                        }],
                    hotelName: HotelDetail?.hotelName,
                    hotelCity: HotelDetail?.city,
                    hotelCountry: HotelDetail?.country,
                    hotelAddress: HotelDetail?.address,
                    TotalFare: parseFloat(parseFloat(totalFare?.MainTotalFare) * 100),
                }
                dispatch({ type: hotelActions.SET_HOTEL_BOOKING, payload: dataList, navigation: navigation })
            }).catch((error) => {
                dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Payment Action Failed' } })
            });
        }
    }
    const PaymentGateWay = () => {
        var options = {
            key: RAZOR_KEY,
            key_secret: RAZOR_KEY_SECRET,
            amount: parseFloat(parseFloat(totalFare?.MainTotalFare) * 100),
            currency: CURRENCY,
            name: userProfileData?.first_name,
            description: "Payment Tick A Trip",
            timeout: TIMEOUT,
            // order_id:'TickATrip_'+generateUUID(8),
            prefill: {
                email: userProfileData?.email,
                contact: userProfileData?.phone,
                name: userProfileData?.first_name
            },
            // handler: function (response) {
            //   if (response.razorpay_payment_id) {
            //     // bookingData['paymentTransactionId'] = response.razorpay_payment_id;
            //     // bookingData['TotalFare'] = parseFloat(fareMethod?.TotalFareAmount ? fareMethod?.TotalFareAmount : 0);
            //     // dispatch({ type: flightActions.SET_FLIGHT_LOADER, payload: true });
            //     // dispatch({
            //     //   type: flightActions.GET_BOOKIG_TRAVELLER_DATA,
            //     //   history: history,
            //     //   payload: bookingData
            //     // });
            //   }
            // },
            // prefill: {
            //   name: paymenterDetails.bphone,
            //   email: paymenterDetails.bemail,
            //   conatct: paymenterDetails.bphone,
            // },
            notes: {
                address: "",
            },
            theme: {
                color: "#0543e9",
            },
        };
        RazorpayCheckout.open(options).then((data) => {

            var dataList = {
                sessionId: hotelSessionId,
                productId: RoomType?.productId,
                tokenId: HotelDetail?.tokenId,
                hotelId: HotelDetail?.hotelId,
                rateBasisId: RoomType?.rateBasisId,
                clientRef: RoomType?.productId,
                customerName: userProfileData?.first_name,
                customerEmail: userProfileData?.email,
                customerPhone: userProfileData?.phone,
                customerGst: "",
                transactionId: data.razorpay_payment_id,
                paymentStatus: "true",
                bookingNote: "Remark",
                paxDetails: [
                    {
                        room_no: 1,
                        adult: {
                            "title": ["Mr", "Mr"],
                            "firstName": [userProfileData?.first_name, userProfileData?.first_name],
                            "lastName": ["MindMade", "MindMade"]
                        },
                        "child": { "title": [], "firstName": [], "lastName": [] }
                    }],
                hotelName: HotelDetail?.hotelName,
                hotelCity: HotelDetail?.city,
                hotelCountry: HotelDetail?.country,
                hotelAddress: HotelDetail?.address,
                TotalFare: parseFloat(parseFloat(totalFare?.MainTotalFare) * 100),
            }
            dispatch({ type: hotelActions.SET_HOTEL_BOOKING, payload: dataList, navigation: navigation })
        }).catch((error) => {
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Payment Action Failed' } })
            console.log('error', error)
        });

    }

    useEffect(() => {
        // dispatch({ type: commonAction.COMMON_LOADER, payload: true })
        dispatch({ type: userActions.GET_USER_PROFILE })
        setTotaFare(totalFare = { MainTotalFare: RoomType?.netPrice, SubTotalFare: RoomType?.netPrice })
        setDiscountPrice(discountPrice = '0')
    }, [])

    useEffect(() => {
        let defaultFirstName = { FirstName: userProfileData?.first_name }
        let defaultLastName = { LastName: userProfileData?.last_name }
        let defaultEmail = { Email: userProfileData?.email }
        let defaultPhone = { Phone: userProfileData?.phone }
        reset({ ...defaultLastName, ...defaultFirstName, ...defaultEmail, ...defaultPhone })
    }, [])


    function generateUUID(digits) {
        let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
        let uuid = [];
        for (let i = 0; i < digits; i++) {
            uuid.push(str[Math.floor(Math.random() * str.length)]);
        }
        return uuid.join('');
    }

    const selectTitle = [
        { name: 'Title', value: 'Title' },
        { name: 'Mr', value: 'Mr' },
        { name: 'Miss', value: 'Miss' },
        { name: 'Mrs', value: 'Mrs' },
        { name: 'Lord', value: 'Lord' },
        { name: 'Lady', value: 'Lady' },
    ]

    const ApplyCoupon = () => {

        dispatch({ type: CommonAction.COMMON_LOADER, payload: true });
        axios.get(
            `${API_URL}/hotel-coupon/${couponCode}`
        ).then((res) => {
            if (res?.data?.message?.status == true) {
                if (isLogin === true) {
                    if (res?.data?.message?.coupon?.for_guest === 0) {
                        var applyCoupon = res?.data?.message?.coupon?.coupon_discount;
                        var disFare = totalFare?.MainTotalFare / 100
                        var finalFare = disFare * applyCoupon
                        setDiscountPrice(discountPrice = finalFare.toFixed(0))
                        if (parseInt(RoomType?.netPrice) >= parseInt(discountPrice)) {
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
                    console.log('res?.data?.message?.coupon', res?.data?.message?.coupon)
                    if (res?.data?.message?.coupon?.for_guest === 1) {
                        var applyCoupon = res?.data?.message?.coupon?.coupon_discount;
                        var disFare = totalFare?.MainTotalFare / 100
                        var finalFare = disFare * applyCoupon
                        setDiscountPrice(discountPrice = finalFare.toFixed(0))
                        console.log('parseInt(RoomType?.netPrice)', parseInt(RoomType?.netPrice))
                        console.log('parseInt(discountPrice))', parseInt(discountPrice))
                        console.log(parseInt(RoomType?.netPrice) > parseInt(discountPrice))

                        if (parseInt(RoomType?.netPrice) >= parseInt(discountPrice)) {
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
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: err?.response?.data?.message } })
            dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
        })
    }

    return (
        <View style={{ height: height * 0.92, backgroundColor: 'transparent' }}>
            {/* <Appbar title={'Hotel Booking'}/> */}
            <HotelAppbar title={'Hotel Booking'} />
            <KeyboardAvoidingView behavior="height">

                <ScrollView style={{ height: height * 0.74 }}>
                    <Image source={{ uri: HotelDetail?.thumbNailUrl }} style={{ height: height * 0.27, marginTop: 15 }} />
                    <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                        <View>
                            <Text style={[styles.HotelName, { color: 'black' }]}>{HotelDetail?.hotelName}</Text>
                            <Text style={[styles.HotelName, { color: COLORS.starFill }]}>{HotelDetail?.hotelRating} <AntDesign name="star" color={COLORS.starFill} /> <Text style={[styles.HotelName, { color: 'grey' }]}> reviews</Text></Text>
                        </View>
                        <View>
                            <View style={{ backgroundColor: COLORS.lightGrey }}>
                                <View style={{ flexDirection: "row", alignItems: 'center', }}>
                                    <Text style={styles.HotelDetailHotelPrice}>{RoomType?.netPrice}</Text>
                                    {/* <View style={{ paddingHorizontal: 5 }}>
                                    <Text style={styles.HotelPriceList}>Rs</Text>
                                    <Text style={styles.HotelPriceList}>Per Day</Text>
                                </View> */}
                                </View>
                                <Text style={styles.HotelDetailHotelTax}>including tax {RoomType?.netPrice}</Text>

                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                        <IoniconsIcon style={style.searchPlaceIcon} name='location-outline' size={18} color={COLORS.colorTheme} />
                        <Text style={{ width: width * 0.9, marginLeft: 5, ontSize: height * 0.017, color: COLORS.BtnColor, fontFamily: FONTS.font }}>{HotelDetail?.address}</Text>

                    </View>

                    <View >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 20, paddingTop: 10 }}>
                            <View>
                                <Text style={styles.titleStyle}>Depart On</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                    <Text style={styles.text}>{moment(RoomGuestPlace?.depatureDate).format('YYYY-MM-DD')}</Text>
                                    {/* <AntDesign name="down" style={{paddingLeft:5}}/> */}
                                </View>
                            </View>
                            <View>
                                <Text style={styles.titleStyle}>Return</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                    <Text style={styles.text}>{moment(RoomGuestPlace?.arrivalDate).format('YYYY-MM-DD')}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 25 }}>
                            <View>
                                <Text style={styles.titleStyle}>Rooms</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{RoomGuestPlace?.room}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.titleStyle}>Guest</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{RoomGuestPlace?.Guest}</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white' }}>
                        <View style={styles.couponCode}>
                            <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', paddingHorizontal:10 }}>
                                <TextInput
                                    style={{ width: width * 0.60, color: 'black' }}
                                    placeholderTextColor={'grey'}
                                    placeholder='Add a coupon Code'
                                    onChangeText={e => {
                                        if (e?.length === 0) {
                                            setTotaFare(totalFare = { MainTotalFare: RoomType?.netPrice, SubTotalFare: totalFare?.SubTotalFare })
                                            setDiscountPrice(discountPrice = '0')
                                        }
                                        setCouponCode(couponCode = e)
                                    }
                                    }
                                />
                                {/* <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }} > */}
                                    {/* <TouchableHighlight
                                        style={styles.offersStyl}
                                        onPress={() => navigation.navigate('offers', { type: 'bookingType' })} >
                                        <View>
                                            <Text style={{ fontSize: height * 0.015, fontFamily: FONTS.fontBold, color: COLORS.textBlue }}>OFFERS</Text>
                                        </View>
                                    </TouchableHighlight> */}

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
                                {/* </View> */}

                            </View>
                        </View>

                        <View style={styles.bg}>
                            <View style={styles.amountContainer}>
                                <Text style={styles.amountName}>Base Fare</Text>
                                <Text style={styles.priceTag}> Rs: <Text style={styles.price}>{RoomType?.netPrice}/-</Text></Text>
                            </View>
                            <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />


                            <View style={styles.amountContainer}>
                                <Text style={styles.amountName}>Discounts & {'\n'}Adjustments</Text>
                                <Text style={styles.priceTag}> Rs : <Text style={styles.price}>{(discountPrice === '0') ? discountPrice : - discountPrice}/-</Text></Text>
                            </View>
                            <View style={{ backgroundColor: 'white', height: 1, opacity: 0.2, marginVertical: 7 }} />


                            <View style={styles.total}>
                                <Text style={styles.totalText}>Total</Text>
                                <Text style={{ color: 'white', fontFamily: FONTS.fontBold }}>:</Text>
                                <Text style={styles.priceTag}> Rs  <Text style={[styles.price, { fontSize: height * 0.03 }]}>{totalFare?.MainTotalFare}</Text></Text>

                            </View>
                        </View>


                        <View style={{ marginHorizontal: 20, marginTop: 10 }}>

                            <Text style={{ fontFamily: FONTS.font, color: COLORS.BtnColorDark }}>Fill Billing Details</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                <View style={styles.editTextBorder}>
                                    <Controller
                                        control={control}
                                        name="Title"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Select Your Title',
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Dropdown
                                                showsVerticalScrollIndicator={true}
                                                placeholder="Title"
                                                data={selectTitle}
                                                labelField="name"
                                                valueField="value"
                                                value={title}
                                                name="Title"
                                                {...register("Title")}
                                                onChange={(item) => {
                                                    onChange(item.value)
                                                    setTitle(item.value)
                                                }
                                                }

                                                selectedTextProps={{
                                                    style: {
                                                        width: width * 0.12,
                                                        // fontSize: 13,
                                                        fontWeight: '500',
                                                        fontFamily: FONTS.font,
                                                        letterSpacing: 0.5,
                                                        paddingTop: 10,
                                                        paddingHorizontal: 3,
                                                        // width:width*0.1
                                                        color: 'black',
                                                    },
                                                }}
                                                style={[styles.inputeEditor, { paddingHorizontal: 5 }]}
                                                renderRightIcon={() => (
                                                    <IoniconsIcon
                                                        name="chevron-down"
                                                        size={25}
                                                        style={{ fontSize: 18, color: COLORS.colorTheme, }}
                                                    />)}
                                            />
                                        )}
                                    />
                                    {errors.Title && (
                                        <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.Title.message}</Text>
                                    )}
                                </View>

                                <View style={[styles.editTextBorder, { width: width * 0.68 }]}>
                                    <Controller
                                        control={control}
                                        name="FirstName"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "First Name"
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                placeholderTextColor={"gray"}
                                                // style={styles.inputeEditor}
                                                name='FirstName'
                                                placeholder="First Name"
                                                keyboardType='default'
                                                {...register("FirstName")}
                                                value={value}
                                                style={{ marginLeft: 10 }}
                                                onChangeText={value => onChange(value)}
                                            />
                                        )}
                                    />
                                    {errors.FirstName && (
                                        <Text style={[styles.errormessage]}>{errors.FirstName.message}</Text>
                                    )}
                                </View>

                            </View>

                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name="LastName"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Enter Your LastName"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            // style={styles.inputeEditor}
                                            name='LastName'
                                            placeholder="Last Name"
                                            keyboardType='default'
                                            {...register("LastName")}
                                            value={value}
                                            style={{ marginLeft: 10 }}
                                            onChangeText={value => onChange(value)}
                                        />
                                    )}
                                />
                                {errors.LastName && (
                                    <Text style={[styles.errormessage]}>{errors.LastName.message}</Text>
                                )}
                            </View>

                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name="Email"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Enter Your Email"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            // style={styles.inputeEditor}
                                            name='Email'
                                            placeholder="Email"
                                            keyboardType='email-address'
                                            {...register("Email")}
                                            value={value}
                                            style={{ marginLeft: 10 }}
                                            onChangeText={value => onChange(value)}
                                        />
                                    )}
                                />
                                {errors.Email && (
                                    <Text style={[styles.errormessage]}>{errors.Email.message}</Text>
                                )}
                            </View>

                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name="Phone"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Enter Your Phone"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            // style={styles.inputeEditor}
                                            name='Phone'
                                            placeholder="Phone"
                                            keyboardType='phone-pad'
                                            {...register("Phone")}
                                            value={value}
                                            maxLength={10}
                                            style={{ marginLeft: 10 }}
                                            onChangeText={value => onChange(value)}
                                        />
                                    )}
                                />
                                {errors.Phone && (
                                    <Text style={[styles.errormessage]}>{errors.Phone.message}</Text>
                                )}
                            </View>

                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name="GST"
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            // style={styles.inputeEditor}
                                            name='GST'
                                            placeholder="GST No (Optional)"
                                            keyboardType='default'
                                            {...register("GST")}
                                            value={value}
                                            style={{ marginLeft: 10, }}
                                            onChangeText={value => onChange(value)}
                                        />
                                    )}
                                />
                            </View>
                        </View>


                        <View>
                            <View style={{ flexDirection: 'row', marginHorizontal: 20, justifyContent: 'space-between', marginTop: 5, alignItems: 'center' }}>
                                <TouchableHighlight onPress={() => setPolicyBox(!policyBox)} underlayColor='transparent'>
                                    <View>
                                        {policyBox === true ?
                                            <Fontisto
                                                name='checkbox-active'
                                                size={15}
                                                style={{ color: COLORS.BtnColorDark }}
                                            />
                                            :
                                            <Fontisto
                                                name='checkbox-passive'
                                                size={15}
                                                style={{ color: COLORS.BtnColorDark }}
                                            />
                                        }
                                    </View>
                                </TouchableHighlight>
                                <Text style={styles.terms}>
                                    By completing this booking you agree to the booking terms and privacy policy.*
                                </Text>
                            </View>
                            {/* 
                        <View style={{marginTop:5,flexDirection:'row',marginHorizontal:20,justifyContent:'space-between'}}>
                            <Text>Box</Text>
                                    <Text style={styles.terms}>
                                    Send me travel offers, deals, and news by email & message 
                                     </Text>
                        </View> */}

                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={{ backgroundColor: '#fff', paddingTop: 10, paddingBottom: 10 }}>
                <View style={styles.ConfirmBtn}>
                    <TouchableHighlight underlayColor={'transparent'}
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Text style={styles.confirmBook}>Confirm & Book</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}
export default HotelBooking

const styles = StyleSheet.create({
    ConfirmBtn: {
        alignItems: 'center',
        backgroundColor: COLORS.borderColor,
        marginHorizontal: 20,
        // marginBottom: 10,
        borderRadius: 30,
        paddingVertical: 10,
    },
    confirmBook: { fontFamily: FONTS.mediam, color: 'white', fontSize: height * 0.027 },
    HotelDetailHotelPrice: {
        color: 'black',
        fontFamily: FONTS.fontBold,
        fontSize: height * 0.025,
    },
    HotelDetailHotelTax: {
        color: '#818181',
        fontFamily: FONTS.font,
        fontSize: height * 0.013,
    },
    HotelPriceList: {
        fontFamily: FONTS.font,
        fontSize: 9,
        color: '#818181',
        lineHeight: 13,
        fontWeight: "500",
    },
    text: { fontFamily: FONTS.fontBold, paddingLeft: 10, color: COLORS.colorText, fontSize: height * 0.017 },
    couponCode: {
        borderRadius: 5, borderWidth: 0.9, borderColor: COLORS.borderColor,
        marginHorizontal: 15, marginTop: 10, backgroundColor: COLORS.AppbarColor, elevation: 1
    },
    applyCoupon: { fontFamily: FONTS.fontBold, color: COLORS.textBlue },
    bg: { backgroundColor: COLORS.bg, padding: 20, margin: 10, borderRadius: 7, elevation: 5, shadowColor: COLORS.bg },
    amountContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    amountName: { fontFamily: FONTS.light, color: 'white', fontSize: height * 0.022 },
    price: { fontFamily: FONTS.mediam, color: 'white', fontSize: height * 0.026 },
    priceTag: { fontFamily: FONTS.font, color: 'white', fontSize: height * 0.017 },
    total: {
        flexDirection: 'row', justifyContent: 'space-between',
        paddingHorizontal: 15, paddingVertical: 3, borderRadius: 22, alignItems: 'center'
    },
    totalText: { fontFamily: FONTS.fontBold, color: 'white', fontSize: height * 0.022 },
    editTextBorder: { borderWidth: 0.7, height: 50, borderRadius: 4, borderColor: COLORS.borderColor, marginTop: 10, marginBottom: 5, backgroundColor: COLORS.AppbarColor },
    terms: {
        fontFamily: FONTS.font,
        color: 'black',
        fontSize: height * 0.015,
        width: width * 0.8,
        marginVertical: 10
    },
    HotelName: { fontFamily: FONTS.font, width: width * 0.5 },
    errormessage: {
        color: "red",
        fontSize: 10,
        fontWeight: "500",
        paddingTop: 2,
    },
    titleStyle: {
        fontFamily: FONTS.font,
        color: COLORS.TextDarkGrey
    },
    // offersStyl: {
    //     paddingHorizontal: 10,
    //     backgroundColor: '#1B5CB74D',
    //     paddingVertical: 16,

    // },
    // applyStyl: {
    //     paddingHorizontal: 10,
    //     backgroundColor: '#3D8EFF91',
    //     paddingVertical: 15
    // }
})