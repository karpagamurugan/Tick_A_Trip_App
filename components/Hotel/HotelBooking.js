import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, ScrollView, TextInput, Image } from 'react-native'
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
import {RAZOR_KEY,RAZOR_KEY_SECRET,CURRENCY,TIMEOUT} from '../../components/constants/constApi';


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
function HotelBooking({ route, navigation }) {
    // const {details} =props;
        const dispatch =useDispatch()
    const [HotelDetail, setHotelDetail] = useState(route?.params?.detail)
    const [RoomType, setRoomType] = useState(route?.params?.value)
    var [policyBox, setPolicyBox] = useState(false);
    const { handleSubmit, register, control, formState: { errors }, reset, setValue } = useForm();

    const { userProfileData } = useSelector((state) => state.userReducer)

    // console.log('details', HotelDetail)
    // console.log('RoomType', RoomType)

        const onSubmit =(data)=>{
            console.log(data)
        }

       
        // console.log('userProfileData',userProfileData)
        useEffect((async) => {
            // dispatch({ type: commonAction.COMMON_LOADER, payload: true })
            dispatch({ type: userActions.GET_USER_PROFILE })
        }, [dispatch])


        useEffect(()=>{
            let defaultFirstName = {FirstName:userProfileData?.first_name}
        reset({...defaultFirstName})
        let defaultLastName = {LastName:userProfileData?.last_name}
        reset({...defaultLastName})
        let defaultEmail = {Email:userProfileData?.email}
        reset({...defaultEmail})
        let defaultPhone = {Phone:userProfileData?.phone}
        reset({...defaultPhone})
        },[])

        function generateUUID(digits) {
            let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVXZ';
            let uuid = [];
            for (let i = 0; i < digits; i++) {
                uuid.push(str[Math.floor(Math.random() * str.length)]);
            }
            return uuid.join('');
        }
    return (
        <View style={{ height: height * 0.92, backgroundColor: 'transparent' }}>
            {/* <Appbar title={'Hotel Booking'}/> */}
            <HotelAppbar title={'Hotel Booking'} />


            <ScrollView>
                {/* <View style={{ height: height * 0.25, backgroundColor: COLORS.BtnColor, marginTop: 10 }} /> */}
                <Image source={{ uri: HotelDetail?.thumbNailUrl }} style={{ height: height * 0.27, marginTop: 15 }} />
                <View style={{ marginTop:10,flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20 }}>
                    <View>
                        <Text style={[styles.HotelName,{color:'black'}]}>{HotelDetail?.hotelName}</Text>
                        <Text style={styles.HotelName}>{HotelDetail?.hotelRating} Reviews</Text>
                    </View>
                    <View>
                        <View style={{ backgroundColor: COLORS.lightGrey }}>
                            <View style={{ flexDirection: "row", alignItems: 'center', }}>
                                <Text style={styles.HotelDetailHotelPrice}>{RoomType?.netPrice}</Text>
                                <View style={{ paddingHorizontal: 5 }}>
                                    <Text style={styles.HotelPriceList}>Rs</Text>
                                    <Text style={styles.HotelPriceList}>Per Day</Text>
                                </View>
                            </View>
                            <Text style={styles.HotelDetailHotelTax}>including tax 6,220</Text>

                        </View>
                    </View>
                </View>
                <Text style={{width:width*0.9,marginHorizontal:20,fontSize:height*0.017,color:COLORS.BtnColor,fontFamily:FONTS.font}}>{HotelDetail?.address}</Text>


                <View >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 25 }}>
                        <View>
                            <Text style={styles.title}>Depart On</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                <Text style={styles.text}>2023-2-28</Text>
                                {/* <AntDesign name="down" style={{paddingLeft:5}}/> */}
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Return</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                <Text style={styles.text}>2023-2-28</Text>
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 25 }}>
                        <View>
                            <Text style={styles.title}>Adult</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                <Text style={styles.text}>2 Rooms</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Kids</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                <Text style={styles.text}>1 Kids</Text>
                            </View>
                        </View>

                    </View>
                </View>

                <View style={{ backgroundColor: 'white' }}>

                    <View style={styles.couponCode}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                            <TextInput
                                // style={{ height: 35 }}
                                placeholder='Add a coupon Code'
                            />
                            <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                <Text style={styles.applyCoupon}>APPLY</Text>
                            </TouchableHighlight>

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
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>0,00/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 1, opacity: 0.2, marginVertical: 7 }} />


                        <View style={styles.total}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={{ color: 'white', fontFamily: FONTS.fontBold }}>:</Text>
                            <Text style={styles.priceTag}> Rs  <Text style={[styles.price, { fontSize: height * 0.03 }]}>{RoomType?.netPrice}</Text></Text>

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
                                            message: "Title"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            // style={styles.inputeEditor}
                                            name='Title'
                                            placeholder="Title"
                                            keyboardType='default'
                                            {...register("Title")}
                                            value={value}
                                            style={{ marginHorizontal: 5 }}
                                            onChangeText={value => onChange(value.toLowerCase())}
                                        />
                                    )}
                                />
                                {errors.Title && (
                                    <Text style={[styles.errormessage]}>{errors.Title.message}</Text>
                                )}
                            </View>
                            <View style={[styles.editTextBorder, { width: width * 0.75 }]}>
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
                                            onChangeText={value => onChange(value.toLowerCase())}
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
                                        onChangeText={value => onChange(value.toLowerCase())}
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
                                        keyboardType='default'
                                        {...register("Email")}
                                        value={value}
                                        style={{ marginLeft: 10 }}
                                        onChangeText={value => onChange(value.toLowerCase())}
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
                                        keyboardType='default'
                                        {...register("Phone")}
                                        value={value}
                                        style={{ marginLeft: 10 }}
                                        onChangeText={value => onChange(value.toLowerCase())}
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
                                        onChangeText={value => onChange(value.toLowerCase())}
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
           

            <View style={styles.ConfirmBtn}>
                <TouchableHighlight underlayColor={'transparent'}
                        // onPress={()=>{
                        //    console.log('TickATrip_'+generateUUID(8))                           

                        // }}
                //  onPress={handleSubmit(onSubmit)}
                onPress={()=>{
                 console.log('TickATrip_'+generateUUID(8))                           
                    // var options = {
                    //     key: RAZOR_KEY,
                    //     key_secret: RAZOR_KEY_SECRET,
                    //     amount: parseFloat(parseFloat(RoomType?.netPrice) * 100),
                    //     currency: CURRENCY,
                    //     name: userProfileData?.first_name,
                    //     description: "Payment Tick A Trip",
                    //     timeout: TIMEOUT,
                    //     order_id:'TickATrip_'+generateUUID(8),
                    //          prefill: {
                    //       email: userProfileData?.email,
                    //       contact: userProfileData?.phone,
                    //       name: userProfileData?.first_name
                    //     },
                    //     // handler: function (response) {
                    //     //   if (response.razorpay_payment_id) {
                    //     //     console.log(response.razorpay_payment_id);
                    //     //     console.log(response.razorpay_order_id);
                    //     //     console.log(response.razorpay_signature);
                    //     //     console.log(response.razorpay_status);
                    //     //     // bookingData['paymentTransactionId'] = response.razorpay_payment_id;
                    //     //     // bookingData['TotalFare'] = parseFloat(fareMethod?.TotalFareAmount ? fareMethod?.TotalFareAmount : 0);
                    //     //     // dispatch({ type: flightActions.SET_FLIGHT_LOADER, payload: true });
                    //     //     // dispatch({
                    //     //     //   type: flightActions.GET_BOOKIG_TRAVELLER_DATA,
                    //     //     //   history: history,
                    //     //     //   payload: bookingData
                    //     //     // });
                    //     //   }
                    //     // },
                    //     // prefill: {
                    //     //   name: paymenterDetails.bphone,
                    //     //   email: paymenterDetails.bemail,
                    //     //   conatct: paymenterDetails.bphone,
                    //     // },
                    //     notes: {
                    //       address: "",
                    //     },
                    //     theme: {
                    //       color: "#0543e9",
                    //     },
                    //   };
                    //     RazorpayCheckout.open(options).then((data) => {
                    //         console.log('data...',data)
                    //         // handle success
                    //         alert(`Success: ${data.razorpay_payment_id}`);
                    //       }).catch((error) => {
                    //         // handle failure
                    //         alert(`Error: ${error.code} | ${error.description}`);
                    //       });
                    
                    // var headers = {
                    //     'Content-Type': 'application/json',
                    //     'Authorization': 'Basic ${base64Encode(utf8.encode('${RAZOR_KEY}:${RAZOR_KEY_SECRET}'))}'
                    //   };
                    //  axios.post('https://api.razorpay.com/v1/orders').then((res)=>{
                    //     console.log('res',res)
                    //  })
                    //   {
                    //     "amount":parseFloat(parseFloat(RoomType?.netPrice) * 100),
                    //     "currency": CURRENCY,
                    //     "receipt": "Receipt",
                    //     "notes": {
                    //       "notes_key_1": "From TickATrip",
                    //       // "notes_key_2": "Order for $cakeName"
                    //     }
                    //   }
                
                    //   http.StreamedResponse response = await request.send();
                
                    //   if (response.statusCode == 200) {
                    //     var res = jsonDecode(await response.stream.bytesToString());
                    //     print(res);
                    //     _handleFinalPayment(res['amount'].toString() , res['id']);
                    //     Navigator.pop(context);
                    //   }
                
                }}
                >
                    <Text style={styles.confirmBook}>Confirm & Book</Text>
                </TouchableHighlight>
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
        marginBottom: 10,
        // marginTop: 20,
        borderRadius: 30,
        paddingVertical: 10
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
        flexDirection: 'row', justifyContent: 'space-between',
        paddingHorizontal: 15, paddingVertical: 3, borderRadius: 22, alignItems: 'center'
    },
    totalText: { fontFamily: FONTS.fontBold, color: 'white', fontSize: height * 0.022 },
    editTextBorder: { borderWidth: 0.7, height: 45, borderRadius: 7, borderColor: COLORS.borderColor, marginTop: 20, marginBottom: 5, backgroundColor: COLORS.AppbarColor },
    terms: {
        fontFamily: FONTS.font,
        color: 'black',
        fontSize: height * 0.015,
        width: width * 0.8,
        marginVertical: 10
    },
    HotelName:{fontFamily:FONTS.font,width:width*0.5},
    errormessage: {
        color: "red",
        fontSize: 10,
        fontWeight: "500",
        paddingTop: 2,
    }
})