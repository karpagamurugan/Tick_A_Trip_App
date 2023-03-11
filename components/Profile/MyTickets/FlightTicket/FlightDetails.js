import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import Appbar from "../../../common/Appbar";
import FONTS from "../../../constants/font";
import TakeOn from "../../../../Assert/Icons/take-on.svg";
import TakeOff from "../../../../Assert/Icons/take-off.svg";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import COLORS from "../../../constants/color";
import moment from 'moment'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function FlightTicketDetails({ navigation }) {
    var [stopTab, setStopTab] = useState(0)
    const [PassengerList, setPassengerList] = useState(false)
    // const { get_Revalidate } = useSelector((state) => state.FlightSearchReducer)
    const { flight_tickets_details } = useSelector((state) => state.userReducer)

    const stopHandleClick = (index) => {
        setStopTab(index)
    }

    return (
        <View>
            <Appbar title={'Flight Details'} />
            <ScrollView style={{ height: height * 0.83 }}>
                <View style={{ paddingHorizontal: 15 }}>
                    {flight_tickets_details?.flightTripDetails?.map((item, index) => {
                        return (
                            <View key={index}>
                                <View style={{
                                    flexDirection: "row",
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
                                    paddingVertical: 30,
                                }}>
                                    <View style={{ width: "40%" }}>
                                        <Text style={[style.CountryShortName, { flex: 1 }]}>{item?.DepartureAirportLocationCode}</Text>
                                        <Text style={[style.CountryNameTitle, { flex: 1 }]}>{item?.DepartureAirportCity}</Text>
                                    </View>
                                    <Text style={[style.ToName, { width: "10%" }]}>To</Text>
                                    <View style={{ width: "40%" }}>
                                        <Text style={[style.CountryShortName, { flex: 1 }]}>{item?.ArrivalAirportLocationCode}</Text>
                                        <Text style={[style.CountryNameTitle, { flex: 1 }]}>{item?.ArrivalAirportCity}</Text>
                                    </View>
                                </View>
                                <View style={[style.FlightBannerSec]}>
                                    <Image style={{ width: 350, height: 200 }} source={require('../../../../Assert/Images/Asset5.png')} />
                                    <View style={[style.cartBackgroundDesign, { marginTop: 10 }]}>
                                        <View style={[style.LeftCircle]} />
                                        <View style={[style.RightCircle]} />
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
                                            <View>
                                                <View style={[style.cartPaddingSpace]}>
                                                    <Text style={[style.cartTitle]}>PNR No</Text>
                                                    <Text style={[style.cartContent]}>{item?.AirlinePNR}</Text>
                                                </View>
                                                <View style={[style.cartPaddingSpace]}>
                                                    <Text style={[style.cartTitle]}>DEPARTURE</Text>
                                                    <Text style={[style.cartContent]}>{moment(item?.DepartureDateTime)?.format('DD-MM-YYYY')}</Text>
                                                </View>
                                                <View style={[style.cartPaddingSpace]}>
                                                    <Text style={[style.cartTitle]}>PAYMENT ID</Text>
                                                    <Text style={[style.cartContent]}>{flight_tickets_details?.bookingDetails?.paymentTransactionId}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={[style.cartPaddingSpace]}>
                                                    <Text style={[style.cartTitle]}>STATUS</Text>
                                                    <Text style={[style.cartContent]}>{flight_tickets_details?.bookingDetails?.status}</Text>
                                                </View>
                                                <View style={[style.cartPaddingSpace]}>
                                                    <Text style={[style.cartTitle]}>ARRIVAL</Text>
                                                    <Text style={[style.cartContent]}>{moment(item?.ArrivalDateTime)?.format('DD-MM-YYYY')}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        );

                    })}

                    <View style={{ paddingVertical: 25 }}>
                        <View>
                            <Text style={[style.commonTitle]}>Flight Detail</Text>
                        </View>
                        { }
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 35, paddingVertical: 20, }}>
                            <TouchableOpacity style={[style.FlightTakeOnIcon]}>
                                <TakeOn height={30} width={30} fill='red' />
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity>
                                <Text style={[style.flightCount]}>0</Text>
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity style={[style.FlightTakeOnIcon]}>
                                <TakeOff height={30} width={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 45, paddingVertical: 20, }}>
                            <TouchableOpacity style={[style.FlightTakeOnIcon]}>
                                <TakeOn height={30} width={30} fill='red' />
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity>
                                <Text style={[style.flightCount]}>1</Text>
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity>
                                <Text style={[style.flightCount]}>2</Text>
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity style={[style.FlightTakeOnIcon]}>
                                <TakeOff height={30} width={30} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-around', paddingHorizontal: 55, paddingVertical: 20, }}>
                            <TouchableOpacity style={[style.FlightTakeOnIcon]}>
                                <TakeOn height={30} width={30} fill='red' />
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity>
                                <Text style={[style.flightCount]}>1</Text>
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity>
                                <Text style={[style.flightCount]}>2</Text>
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity>
                                <Text style={[style.flightCount]}>3</Text>
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity>
                                <Text style={[style.flightCount]}>4</Text>
                            </TouchableOpacity>
                            <View style={[style.backBorder]} />
                            <TouchableOpacity style={[style.FlightTakeOnIcon]}>
                                <TakeOff height={30} width={30} />
                            </TouchableOpacity>
                        </View>

                        <View style={[style.FlightStopingCart]} >
                            <Text style={{ fontSize: height * 0.021, fontFamily: FONTS.mediam, color: '#000' }}>Dubai International Airport - DXB</Text>
                            <View style={{}}>
                                <Text style={[style.FlightStopingList]}>Baggage -</Text>
                                <Text style={[style.FlightStopingList]}>Flight Number - <Text style={[style.FlightStopingListDark]}>6902</Text></Text>
                                <Text style={[style.FlightStopingList]}>Journey Duration - <Text style={[style.FlightStopingListDark]}>9H 5M</Text></Text>
                                <Text style={[style.FlightStopingList]}>Marketing Airline Code - <Text style={[style.FlightStopingListDark]}>Transavia Airlines</Text></Text>
                                <Text style={[style.FlightStopingList]}>Operating Airline Code - <Text style={[style.FlightStopingListDark]}>Transavia Airlines</Text></Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
                                <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', }}>
                                    <Text style={[style.timeAnddate]}>5:30 PM</Text>
                                    <Text style={{ fontFamily: FONTS.mediam, color: '#000' }}>Jan 9, 2023</Text>
                                </View>
                                <Text style={{ fontFamily: FONTS.mediam, color: '#000' }}>Dubai</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={[style.commonTitle]}>Passenger List</Text>
                    </View>
                    {flight_tickets_details?.customerDetails?.map((item, index) => {
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
                            <Text style={style.priceTag}> Rs: <Text style={style.price}>{flight_tickets_details?.priceDetails?.EquiFare?.Amount}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Taxes</Text>
                            <Text style={style.priceTag}> Rs : <Text style={style.price}>{flight_tickets_details?.priceDetails?.Tax?.Amount}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Service Tax</Text>
                            <Text style={style.priceTag}> Rs : <Text style={style.price}>{flight_tickets_details?.priceDetails?.ServiceTax?.Amount}-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        {/* <View style={style.amountContainer}>
                            <Text style={style.amountName}>Other charges</Text>
                            <Text style={style.priceTag}> Rs : <Text style={style.price}>299/-</Text></Text>
                        </View> */}
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />
                        <View style={style.total}>
                            <Text style={style.totalText}>Total</Text>
                            <Text style={{ color: 'white', fontFamily: FONTS.fontBold }}>:</Text>
                            <Text style={style.priceTag}> Rs  <Text style={[style.price, { fontSize: height * 0.03 }]}>{flight_tickets_details?.priceDetails?.TotalFare?.Amount}</Text></Text>
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
        backgroundColor: '#eee',
        paddingVertical: 10,
        paddingHorizontal: 15,
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
})