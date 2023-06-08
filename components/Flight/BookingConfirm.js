import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableOpacity, Pressable, Animated } from 'react-native';
import Appbar from "../common/Appbar";
import FONTS from "../constants/font";
import TakeOn from "../../Assert/Icons/take_1.svg";
import TakeOff from "../../Assert/Icons/take_2.svg";
import FlightStopArch from '../../Assert/Icons/flight_stop_arch.svg';
import FlightStopIcon from '../../Assert/Icons/flight_stop.svg';
import FlightStopDownIcon from '../../Assert/Icons/Flight_down_Icon.svg';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import COLORS from "../constants/color";
import moment from 'moment'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width

 function FlightBookingConfirm() {
    var [stopTab, setStopTab] = useState(0)
    const [PassengerList, setPassengerList] = useState(false);
    const [rotateStart, setRotateStart] = useState(false);
    var [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));

    const { trip_detail } = useSelector((state) => state.FlightSearchReducer)

    const stopHandleClick = (index) => {
        setStopTab(index)
    }
    function timeConvert(n) {
        var num = n;
        var hours = Math.floor(num / 60) > 0 ? Math.floor(num / 60) + "H " : "";
        var rminutes =
            n - Math.floor(num / 60) * 60 > 0
                ? n - Math.floor(num / 60) * 60 + "M"
                : "";
        return hours + rminutes;
    }

    return (
        <View>
            <Appbar title={'Flight Details'} />
            <ScrollView style={{ height: height * 0.83 }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={{ paddingHorizontal: 15 }}>
                    <View>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            paddingVertical: 30,
                        }}>
                            <View style={{ width: "40%" }}>
                                <Text style={[style.CountryShortName, { flex: 1 }]}>{trip_detail.flightTripDetails[0]?.DepartureAirportLocationCode}</Text>
                                <Text style={[style.CountryNameTitle, { flex: 1 }]}>{trip_detail.flightTripDetails[0]?.DepartureAirportCity}</Text>
                            </View>
                            <Text style={[style.ToName, { width: "10%" }]}>To</Text>
                            <View style={{ width: "40%" }}>
                                <Text style={[style.CountryShortName, { flex: 1 }]}>{trip_detail.flightTripDetails[trip_detail.flightTripDetails.length - 1]?.ArrivalAirportLocationCode}</Text>
                                <Text style={[style.CountryNameTitle, { flex: 1 }]}>{trip_detail.flightTripDetails[trip_detail.flightTripDetails.length - 1]?.ArrivalAirportCity}</Text>
                            </View>
                        </View>
                        <View style={[style.FlightBannerSec]}>
                            <Image style={{ width: 350, height: 200 }} source={require('../../Assert/Images/Asset5.png')} />
                            <View style={[style.cartBackgroundDesign, { marginTop: 10 }]}>
                                <View style={[style.LeftCircle]} />
                                <View style={[style.RightCircle]} />
                                <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
                                    <View>
                                        <View style={[style.cartPaddingSpace]}>
                                            <Text style={[style.cartTitle]}>PNR No</Text>
                                            <Text style={[style.cartContent]}>{trip_detail.flightTripDetails[0]?.AirlinePNR}</Text>
                                        </View>
                                        <View style={[style.cartPaddingSpace]}>
                                            <Text style={[style.cartTitle]}>DEPARTURE</Text>
                                            <Text style={[style.cartContent]}>{moment(trip_detail.flightTripDetails[0]?.DepartureDateTime)?.format('DD-MM-YYYY')}</Text>
                                        </View>
                                        <View style={[style.cartPaddingSpace]}>
                                            <Text style={[style.cartTitle]}>PAYMENT ID</Text>
                                            <Text style={[style.cartContent]}>{trip_detail?.bookingDetails?.paymentTransactionId}</Text>
                                        </View>
                                    </View>
                                    <View>
                                        <View style={[style.cartPaddingSpace]}>
                                            <Text style={[style.cartTitle]}>STATUS</Text>
                                            <Text style={[style.cartContent]}>{trip_detail?.bookingDetails?.status}</Text>
                                        </View>
                                        <View style={[style.cartPaddingSpace]}>
                                            <Text style={[style.cartTitle]}>ARRIVAL</Text>
                                            <Text style={[style.cartContent]}>{moment(trip_detail.flightTripDetails[trip_detail.flightTripDetails.length - 1]?.ArrivalDateTime)?.format('DD-MM-YYYY')}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* ); */}

                    {/* })} */}

                    <View style={{ paddingVertical: 25 }}>
                        <View style={{ paddingBottom: 10 }}>
                            <Text style={[style.commonTitle]}>Flight Detail</Text>
                        </View>
                        <View style={{ position: 'absolute', top: 1, alignSelf: 'center', zIndex: 1 }}>
                            {(rotateStart === false) ?
                                <FlightStopIcon width={35} style={{}} />
                                :
                                <FlightStopDownIcon width={35} />
                            }
                        </View>
                        <View>
                            <FlightStopArch style={{ width: width * 0.90, height: height * 0.05, alignSelf: 'center', }} />
                            <TouchableOpacity style={{ justifyContent: 'center', alignSelf: 'center', flexDirection: 'row', top: 15, position: 'absolute', padding: 10 }} onPress={() => setRotateStart(!rotateStart)}>
                                <Text style={style.stopTitle}>{(rotateStart === true) ? 'Close Details' : 'View Details'}</Text>
                                <FeatherIcon name={(rotateStart === true) ? "chevron-up" : "chevron-down"} size={25} color={'#000'} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={style.LocationTitle}>
                                {trip_detail.flightTripDetails[0]?.DepartureAirportLocationCode}
                            </Text>
                            <Text style={style.LocationTitle}>
                                {trip_detail.flightTripDetails[trip_detail.flightTripDetails.length - 1]?.ArrivalAirportLocationCode}
                            </Text>
                        </View>
                      
                        {(rotateStart === true) ?
                            <View>
                                <View style={[style.FlightStopingCart]}>
                                    {trip_detail?.flightTripDetails?.map((item, index) => {
                                        return (
                                            <View key={index}>
                                                <View>
                                                    <View style={style.FlightVerticalLeftLine}></View>
                                                    <View style={{ justifyContent: 'center', top: '50%' }}>
                                                        <TakeOn width={45} height={45} style={{ position: 'absolute', left: -20, backgroundColor: '#fff', borderRadius: 50 }} />
                                                    </View>
                                                    <View style={{ paddingVertical: 20, paddingHorizontal: 20, width: "100%", paddingLeft: 40 }}>
                                                        <Text style={{ fontSize: height * 0.021, fontFamily: FONTS.mediam, color: '#000' }}>{item.DepartureAirportLocation} - {item.DepartureAirportLocationCode}</Text>
                                                        <Text style={[style.FlightStopingList]}>Flight Number - <Text style={[style.FlightStopingListDark]}>{item.FlightNumber}</Text></Text>
                                                        <Text style={[style.FlightStopingList]}>Journey Duration - <Text style={[style.FlightStopingListDark]}>
                                                            {timeConvert(item.JourneyDuration)}</Text></Text>
                                                        <Text style={[style.FlightStopingList]}>Airport City - <Text style={[style.FlightStopingListDark]}>{item.ArrivalAirportCity}</Text></Text>
                                                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
                                                            <Text style={[style.timeAnddate]}>{moment(item.DepartureDateTime).format('HH:mm')}</Text>
                                                            <Text style={{ fontFamily: FONTS.mediam, color: '#000' }}>{moment(item.DepartureDateTime).format('DD-MM-YYYY')}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={style.FlightHorizontalLine}></View>
                                                </View>
                                                <View >
                                                    <View style={style.FlightVerticalRightLine}></View>
                                                    <View style={{ justifyContent: 'center', top: '50%' }}>
                                                        <TakeOff width={45} height={45} style={{ position: 'absolute', right: -20, backgroundColor: '#fff', borderRadius: 50 }} />
                                                    </View>
                                                    <View style={{ paddingVertical: 20, paddingHorizontal: 20, width: "100%", paddingRight: 20 }}>
                                                        <Text style={{ fontSize: height * 0.021, fontFamily: FONTS.mediam, color: '#000' }}>{item.ArrivalAirportLocation} - {item.ArrivalAirportLocationCode}</Text>
                                                        <Text style={[style.FlightStopingList]}>Flight Number - <Text style={[style.FlightStopingListDark]}>{item.FlightNumber}</Text></Text>
                                                        <Text style={[style.FlightStopingList]}>Journey Duration - <Text style={[style.FlightStopingListDark]}>{timeConvert(item.JourneyDuration)}</Text></Text>
                                                        <Text style={[style.FlightStopingList]}>Airport City - <Text style={[style.FlightStopingListDark]}>{item.ArrivalAirportCity}</Text></Text>
                                                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
                                                            <Text style={[style.timeAnddate]}>{moment(item.ArrivalDateTime).format('HH:mm')} </Text>
                                                            <Text style={{ fontFamily: FONTS.mediam, color: '#000' }}>{moment(item.ArrivalDateTime).format('DD-MM-YYYY')}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={style.FlightHorizontalLine}></View>
                                                </View>
                                            </View>
                                        );
                                    })}
                                </View>
                            </View> : <></>
                        }

                    </View>

                    <View>
                        <Text style={[style.commonTitle]}>Passenger List</Text>
                    </View>
                    {trip_detail?.customerDetails?.map((item, index) => {
                        return (
                            <View key={index}>
                                {(PassengerList === false) ?
                                    <View style={{ backgroundColor: '#EEEEEE', paddingVertical: 10, }}>
                                        <Pressable
                                            onPress={() => setPassengerList(!PassengerList)}
                                            style={[style.DownAndUpIcons]}>
                                            <AntDesignIcon name='downcircleo' style={{ color: '#1B5CB7', fontSize: height * 0.023, }} />
                                        </Pressable>
                                        <View style={[style.passengerListBox]}>
                                            <FontAwesomeIcon name='user-o' style={{ paddingRight: 10, color: '#1B5CB7', fontSize: height * 0.025, }} />
                                            <Text style={[style.passengerList]}>{item?.PassengerFirstName} {item?.PassengerLastName}</Text>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ backgroundColor: '#EEEEEE', paddingVertical: 10, }}>
                                        <Pressable
                                            onPress={() => setPassengerList(!PassengerList)}
                                            style={[style.DownAndUpIcons]}>
                                            <AntDesignIcon name='upcircleo' style={{ color: '#1B5CB7', fontSize: height * 0.023, }} />
                                        </Pressable>
                                        <View style={[style.passengerListBox]}>
                                            <FontAwesomeIcon name='user-o' style={{ paddingRight: 10, color: '#1B5CB7', fontSize: height * 0.025, }} />
                                            <Text style={[style.passengerList]}>{item?.PassengerFirstName} {item?.PassengerLastName}</Text>
                                        </View>
                                        {(item?.PhoneNumber === '' || item?.PhoneNumber === undefined || item?.PhoneNumber === null) ? <View /> :
                                            <View style={[style.passengerListBox]}>
                                                <IoniconsIcon name='md-call-outline' style={{ paddingRight: 10, color: '#1B5CB7', fontSize: height * 0.025, }} />
                                                <Text style={[style.passengerList]}>{item?.PhoneNumber}</Text>
                                            </View>
                                        }
                                        {(item?.EmailAddress === '' || item?.EmailAddress === undefined || item?.EmailAddress === null) ? <View /> :
                                            <View style={[style.passengerListBox]}>
                                                <IoniconsIcon name='md-mail-outline' style={{ paddingRight: 10, color: '#1B5CB7', fontSize: height * 0.025, }} />
                                                <Text style={[style.passengerList]}>{item?.EmailAddress}</Text>
                                            </View>
                                        }
                                        {(item?.PassportNumber === '' || item?.PassportNumber === undefined || item?.PassportNumber === null) ? <View /> :
                                            <View style={[style.passengerListBox]}>
                                                <IoniconsIcon name='wallet-outline' style={{ paddingRight: 10, color: '#1B5CB7', fontSize: height * 0.025, }} />
                                                <Text style={[style.passengerList]}>{item?.PassportNumber}</Text>
                                            </View>
                                        }
                                    </View>
                                }
                            </View>
                        );
                    })}


                    <View>
                        <Text style={[style.commonTitle, { paddingTop: 20 }]}>Payment Details</Text>
                    </View>
                    <View style={style.bg}>
                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Base Fare</Text>
                            <Text style={style.priceTag}> <Text style={style.price}>{trip_detail?.bookingDetails?.total_amount_paid}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Taxes</Text>
                            <Text style={style.priceTag}>  <Text style={style.price}>{trip_detail?.bookingDetails?.tax}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Convenience Fee</Text>
                            <Text style={style.priceTag}> <Text style={style.price}>{trip_detail?.bookingDetails?.convenience_fee}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Discount & Adjusment</Text>
                            <Text style={style.price}>{(flight_tickets_details?.bookingDetails?.coupon_applied_discount_amount === null ||flight_tickets_details?.bookingDetails?.coupon_applied_discount_amount===0)?'0':('-' +trip_detail?.bookingDetails?.coupon_applied_discount_amount)}/-</Text>
                        </View>
                        
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />
                        <View style={style.total}>
                            <Text style={style.totalText}>Total</Text>
                            <Text style={{ color: 'white', fontFamily: FONTS.fontBold }}>:</Text>
                            <Text style={style.priceTag}> {trip_detail?.bookingDetails?.currency}  <Text style={[style.price, { fontSize: height * 0.03 }]}>{trip_detail?.bookingDetails?.order_amount}</Text></Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    CountryShortName: {
        fontFamily: FONTS.fontBold,
        textAlign: "center",
        color: '#3B8ACF',
        fontSize: height * 0.030,
    },
    CountryNameTitle: {
        fontSize: height * 0.016,
        textAlign: "center",
        color: '#333333',
        fontFamily: FONTS.mediam,
    },
    ToName: {
        fontSize: height * 0.030,
        fontFamily: FONTS.fontBold,
        color: '#333333',
    },
    cartBackgroundDesign: {
        backgroundColor: '#1B5CB7',
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderRadius: 15,
    },
    cartPaddingSpace: {
        paddingVertical: 5,
    },
    FlightBannerSec: {
        backgroundColor: '#E9F3FF',
        paddingHorizontal: 15,
        paddingVertical: 25,
    },
    cartTitle: {
        color: '#BEEAFC',
        fontSize: height * 0.020,
        fontFamily: FONTS.fontBold,
    },
    cartContent: {
        color: '#FFFFFF',
        fontSize: height * 0.019,
        fontFamily: FONTS.mediam,
    },
    LeftCircle: {
        width: 25,
        height: 25,
        backgroundColor: '#E9F3FF',
        borderRadius: 100,
        position: 'absolute',
        top: '50%',
        left: -10
    },
    RightCircle: {
        width: 25,
        height: 25,
        backgroundColor: '#E9F3FF',
        borderRadius: 100,
        position: 'absolute',
        top: '50%',
        right: -10
    },
    commonTitle: {
        color: '#212529',
        fontSize: height * 0.025,
        fontFamily: FONTS.mediam,
    },
    FlightTakeOnIcon: {
        backgroundColor: '#1B5CB7',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#1B5CB7',
    },
    flightCount: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#1B5CB7',
        paddingVertical: 1,
        paddingHorizontal: 7,
        backgroundColor: '#fff',
        color: '#1B5CB7',
        fontSize: height * 0.017,
    },
    backBorder: {
        borderWidth: 1,
        width: width * 0.32,
        borderColor: '#1B5CB7',
        zIndex: -1,
    },
    FlightStopingCart: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginVertical: 15,
    },
    FlightStopingList: {
        color: '#777',
        fontSize: height * 0.018,
        fontFamily: FONTS.font,
        paddingVertical: 5,
    },
    FlightStopingListDark: {
        fontFamily: FONTS.fontBold,
    },
    timeAnddate: {
        backgroundColor: '#4C94F2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: '#fff',
        fontFamily: FONTS.mediam,
        fontSize: height * 0.015,
        borderRadius: 6,
        marginRight: 10,
    },
    passengerList: {
        color: '#212529',
        fontFamily: FONTS.mediam,
        fontSize: height * 0.020,
    },
    passengerListBox: {
        flexDirection: "row", alignItems: 'center',
        paddingHorizontal: 25, paddingVertical: 5,
    },
    DownAndUpIcons: {
        position: 'absolute',
        top: 15,
        right: 15
    },
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
    LocationTitle: {
        fontSize: height * 0.026,
        fontWeight: '900',
        color: '#003AA8',
    },
    stopTitle: {
        fontSize: height * 0.020,
        color: '#000',
        fontFamily: FONTS.fontSemi,
    },
    FlightVerticalLeftLine: {
        width: 3,
        height: '100%',
        position: 'absolute',
        backgroundColor: '#3D8EFF91',
        left: 0,
    },
    FlightHorizontalLine: {
        height: 3,
        width: '100%',
        position: 'absolute',
        backgroundColor: '#3D8EFF91',
        bottom: 0,
    },
    FlightVerticalRightLine: {
        width: 3,
        height: '100%',
        position: 'absolute',
        backgroundColor: '#3D8EFF91',
        right: 0,
    }
})

export default React.memo(FlightBookingConfirm)