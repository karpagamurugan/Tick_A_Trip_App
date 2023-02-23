import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableHighlight, TextInput } from 'react-native';
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Appbar from '../common/Appbar';
import FromIcon from '../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../Assert/Images/icon/take-off-2.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Flight from '../../Assert/Images/icon/flight-2.svg';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from "react-redux";


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

export default function FlightBooking({ navigation, route }) {
    const { get_Revalidate } = useSelector((state) => state.FlightSearchReducer)

    console.log('get_Revalidate',get_Revalidate)
    return (
        <View style={{ backgroundColor: 'white', height: height * 0.92 }}>
            {/* appbar */}
            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <MaterialIcons name='keyboard-arrow-left' size={35} color={COLORS.textBlue} />
                </TouchableHighlight>
                <Flight height={34} width={34} />
                <View style={styles.appbarPlaceContainer}>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FromIcon height={15} width={15} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>{route?.params?.flightInfo?.fromCity}</Text>
                                <Text style={styles.appBarTraveller}>{route?.params?.flightInfo?.adult_flight} adult, {route?.params?.flightInfo?.child_flight} child, {route?.params?.flightInfo?.infant_flight} Infant</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                            <ToIcon height={19} width={19} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>{route?.params?.flightInfo?.toCity}</Text>
                                <Text style={styles.appBarTraveller}>{route?.params?.flightInfo?.class}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


            {/*  */}


            <ScrollView>
                {/* <View style={{ height: height }}> */}
                <View >
                    {/* <View style={styles.details}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <View>
                                <Text style={styles.title}>Depart On</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.departure_date}</Text>
                                </View>
                            </View>
                            {
                                (route?.params?.flightInfo?.return_date === null ||route?.params?.flightInfo?.return_date ===undefined||route?.params?.flightInfo?.return_date ==='')?
                                <View/>:
                                <View>
                                <Text style={styles.title}>Return</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.return_date}</Text>
                                </View>
                            </View>
                            }
                          
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                            <View>
                                <Text style={styles.title}>Adult</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.adult_flight} Adult</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Kids</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.child_flight} Kids</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Infant</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.infant_flight} Infant</Text>
                                </View>
                            </View>
                        </View>
                    </View> */}

                    <View style={{flexDirection:'row',flex:1}}>
                        <View style={{flex:1}}>
                            <Text style={styles.title}>Depart On</Text>
                            <View style={{ flexDirection: 'row',alignItems:'center' }}>
                                <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                <Text style={styles.text}>{route?.params?.flightInfo?.departure_date}</Text>
                                <AntDesign name="down" style={{paddingLeft:5}}/>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Depart On</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                <Text style={styles.text}>{route?.params?.flightInfo?.departure_date}</Text>
                            </View>
                        </View>
                    </View>


                    <View style={styles.couponCode}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <TextInput
                                style={{ height: 35 }}
                                placeholder='Add a coupon Code'
                            />
                            <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                <Text style={styles.applyCoupon}>Apply</Text>
                            </TouchableHighlight>

                        </View>
                    </View>

                    <View style={styles.bg}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Base Fare</Text>
                            <Text style={styles.priceTag}> Rs: <Text style={styles.price}>{get_Revalidate?.BaseFareAmount}/-</Text></Text>
                        </View>
                        <View style={{backgroundColor:'white',height:0.5,marginVertical:7}}/>

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Taxes</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>{get_Revalidate?.TotalTaxAmount}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Discounts & {'\n'} Adjustments</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>0,00/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Other charges</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>0000/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />


                        <View style={styles.total}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text>:</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>{get_Revalidate?.TotalFareAmount}/-</Text></Text>

                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{ alignItems: 'center' }}>
                <TouchableHighlight>
                    <Text style={{ backgroundColor: 'red' }}>Confirm & Book</Text>
                </TouchableHighlight>
            </View>

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
    appbarPlaceContainer: { backgroundColor: 'white', width: width * 0.75, height: 40, marginLeft: 10, borderRadius: 30 },
    appbarPlace: { fontFamily: FONTS.font, fontSize: height * 0.018 },
    appBarTraveller: { fontFamily: FONTS.font, marginTop: -6, fontSize: height * 0.016 },
    title: { fontFamily: FONTS.font, color: 'grey', fontSize: height * 0.022 },
    text: { fontFamily: FONTS.font, paddingLeft: 10, color: COLORS.colorText, fontSize: height * 0.02 },
    details: { flexDirection: 'column', backgroundColor: COLORS.lightGrey, paddingBottom: 15, paddingTop: 5 },
    couponCode: {
        borderRadius: 7, borderWidth: 1, borderColor: COLORS.borderColor, paddingVertical: 0, paddingHorizontal: 7,
        marginHorizontal: 15, marginTop: 10, backgroundColor: COLORS.AppbarColor, elevation: 1
    },
    applyCoupon: { fontFamily: FONTS.font, color: COLORS.textBlue, marginTop: 5 },
    bg: { backgroundColor: COLORS.bg, padding: 20, margin: 10, borderRadius: 7, elevation: 5, shadowColor: COLORS.bg },
    amountContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    amountName: { fontFamily: FONTS.light, color: 'white', fontSize: height * 0.025 },
    price: { fontFamily: FONTS.mediam, color: 'white', fontSize: height * 0.027 },
    priceTag: { fontFamily: FONTS.font, color: 'white' },
    total: {
        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.darkblue,
        paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20, alignItems: 'center'
    },
    totalText: { fontFamily: FONTS.font, color: 'white' }
})