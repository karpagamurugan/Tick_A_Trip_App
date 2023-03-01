import React, { useState } from "react";
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import Appbar from "../../common/Appbar";
import font from "../../constants/font";
import TakeOn from "../../../Assert/Icons/take-on.svg";
import TakeOff from "../../../Assert/Icons/take-off.svg";
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import { useSelector } from "react-redux";
import COLORS from "../../constants/color";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function Flightdetail({ navigation }) {
    const [PassengerList, setPassengerList] = useState(false)
    const { get_Revalidate } = useSelector((state) => state.FlightSearchReducer)
    return (
        <View>
            <Appbar title={'Flight Details'} />
            <ScrollView style={{ height: height * 0.83 }}>
                <View style={{ paddingHorizontal: 15 }}>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        paddingVertical: 30,
                    }}>
                        <View>
                            <Text style={[style.CountryShortName]}>DXB</Text>
                            <Text style={[style.CountryNameTitle]}>DUBAI</Text>
                        </View>
                        <Text style={[style.ToName]}>To</Text>
                        <View>
                            <Text style={[style.CountryShortName]}>AMS</Text>
                            <Text style={[style.CountryNameTitle]}>AMSTERDAM</Text>
                        </View>
                    </View>
                    <View style={[style.FlightBannerSec]}>
                        <Image style={{ width: 350, height: 200 }} source={require('../../../Assert/Images/Asset5.png')} />
                        <View style={[style.cartBackgroundDesign, { marginTop: 10 }]}>
                            <View style={[style.LeftCircle]} />
                            <View style={[style.RightCircle]} />
                            <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
                                <View>
                                    <View style={[style.cartPaddingSpace]}>
                                        <Text style={[style.cartTitle]}>PNR No</Text>
                                        <Text style={[style.cartContent]}>54W5FOU</Text>
                                    </View>
                                    <View style={[style.cartPaddingSpace]}>
                                        <Text style={[style.cartTitle]}>DEPARTURE</Text>
                                        <Text style={[style.cartContent]}>09-01-2023</Text>
                                    </View>
                                    <View style={[style.cartPaddingSpace]}>
                                        <Text style={[style.cartTitle]}>PAYMENT ID</Text>
                                        <Text style={[style.cartContent]}>pay_L21s88Cw4wkz1W</Text>
                                    </View>
                                </View>
                                <View>
                                    <View style={[style.cartPaddingSpace]}>
                                        <Text style={[style.cartTitle]}>STATUS</Text>
                                        <Text style={[style.cartContent]}>BOOKED</Text>
                                    </View>
                                    <View style={[style.cartPaddingSpace]}>
                                        <Text style={[style.cartTitle]}>ARRIVAL</Text>
                                        <Text style={[style.cartContent]}>09-01-2023</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 25 }}>
                        <View>
                            <Text style={[style.commonTitle]}>Flight Detail</Text>
                        </View>
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
                        <View style={[style.FlightStopingCart]} >
                            <Text style={{ fontSize: height * 0.021, fontFamily: font.mediam, color: '#000' }}>Dubai International Airport - DXB</Text>
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
                                    <Text style={{ fontFamily: font.mediam, color: '#000' }}>Jan 9, 2023</Text>
                                </View>
                                <Text style={{ fontFamily: font.mediam, color: '#000' }}>Dubai</Text>
                            </View>
                        </View>
                    </View>

                    <View>
                        <Text style={[style.commonTitle]}>Passenger List</Text>
                    </View>
                    {(PassengerList === false) ?
                        <View style={{ backgroundColor: '#EEEEEE', paddingVertical: 10, }}>
                            <Pressable
                                onPress={() => setPassengerList(!PassengerList)}
                                style={[style.DownAndUpIcons]}>
                                <AntDesignIcon name='downcircleo' style={{ color: '#1B5CB7', fontSize: height * 0.023, }} />
                            </Pressable>
                            <View style={[style.passengerListBox]}>
                                <FontAwesomeIcon name='user-o' style={{ paddingRight: 10, color: '#1B5CB7', fontSize: height * 0.025, }} />
                                <Text style={[style.passengerList]}>Miss Durga devi</Text>
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
                                <Text style={[style.passengerList]}>Miss Durga devi</Text>
                            </View>
                            <View style={[style.passengerListBox]}>
                                <IoniconsIcon name='md-call-outline' style={{ paddingRight: 10, color: '#1B5CB7', fontSize: height * 0.025, }} />
                                <Text style={[style.passengerList]}>+91 98765 48243</Text>
                            </View>
                            <View style={[style.passengerListBox]}>
                                <IoniconsIcon name='md-mail-outline' style={{ paddingRight: 10, color: '#1B5CB7', fontSize: height * 0.025, }} />
                                <Text style={[style.passengerList]}>durgadev.per@gmail.com</Text>
                            </View>
                            <View style={[style.passengerListBox]}>
                                <IoniconsIcon name='wallet-outline' style={{ paddingRight: 10, color: '#1B5CB7', fontSize: height * 0.025, }} />
                                <Text style={[style.passengerList]}>486612346984</Text>
                            </View>
                        </View>
                    }


                    <View>
                        <Text style={[style.commonTitle,{paddingTop:20}]}>Payment Details</Text>
                    </View>
                    <View style={style.bg}>
                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Base Fare</Text>
                            <Text style={style.priceTag}> Rs: <Text style={style.price}>3,996/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Taxes</Text>
                            <Text style={style.priceTag}> Rs : <Text style={style.price}>1,793/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Discounts & {'\n'}Adjustments</Text>
                            <Text style={style.priceTag}> Rs : <Text style={style.price}>-500/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={style.amountContainer}>
                            <Text style={style.amountName}>Other charges</Text>
                            <Text style={style.priceTag}> Rs : <Text style={style.price}>299/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />


                        <View style={style.total}>
                            <Text style={style.totalText}>Total</Text>
                            <Text style={{ color: 'white', fontFamily: font.fontBold }}>:</Text>
                            <Text style={style.priceTag}> Rs  <Text style={[style.price, { fontSize: height * 0.03 }]}>5,992</Text></Text>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const style = StyleSheet.create({
    CountryShortName: {
        fontFamily: font.fontBold,
        textAlign: "center",
        color: '#3B8ACF',
        fontSize: height * 0.030,
    },
    CountryNameTitle: {
        fontSize: height * 0.016,
        textAlign: "center",
        color: '#333333',
        fontFamily: font.mediam,
    },
    ToName: {
        fontSize: height * 0.030,
        fontFamily: font.fontBold,
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
        fontFamily: font.fontBold,
    },
    cartContent: {
        color: '#FFFFFF',
        fontSize: height * 0.019,
        fontFamily: font.mediam,
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
        fontFamily: font.mediam,
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
        paddingVertical: 2,
        paddingHorizontal: 9,
        backgroundColor: '#fff',
        color: '#1B5CB7',
        fontSize: height * 0.019,
    },
    backBorder: {
        borderWidth: 1,
        width: width * 0.35,
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
        fontFamily: font.font,
        paddingVertical: 5,
    },
    FlightStopingListDark: {
        fontFamily: font.fontBold,
    },
    timeAnddate: {
        backgroundColor: '#4C94F2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        color: '#fff',
        fontFamily: font.mediam,
        fontSize: height * 0.015,
        borderRadius: 6,
        marginRight: 10,
    },
    passengerList: {
        color: '#212529',
        fontFamily: font.mediam,
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
    amountName: { fontFamily: font.light, color: 'white', fontSize: height * 0.022 },
    price: { fontFamily: font.mediam, color: 'white', fontSize: height * 0.026 },
    priceTag: { fontFamily: font.font, color: 'white', fontSize: height * 0.017 },
    total: {
        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.darkblue,
        paddingHorizontal: 15, paddingVertical: 3, borderRadius: 22, alignItems: 'center'
    },
    totalText: { fontFamily: font.fontBold, color: 'white', fontSize: height * 0.022 },
})