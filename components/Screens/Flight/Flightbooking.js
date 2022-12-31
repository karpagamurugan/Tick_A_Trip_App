import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableHighlight, TextInput } from 'react-native';
import color from "../../../constants/color";
import font from "../../../constants/font";
import Appbar from '../../common/Appbar';
import FromIcon from '../../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../../Assert/Images/icon/take-off-2.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Flight from '../../../Assert/Images/icon/flight-2.svg';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

export default function FlightBooking() {
    return (
        <View style={{ backgroundColor: 'white' }}>
            {/* appbar */}
            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <MaterialIcons name='keyboard-arrow-left' size={35} color={color.textBlue} />
                </TouchableHighlight>
                <Flight height={25} width={25} />
                <View style={styles.appbarPlaceContainer}>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FromIcon height={15} width={15} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>Coimbatore</Text>
                                <Text style={styles.appBarTraveller}>3 adult</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                            <ToIcon height={19} width={19} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>Coimbatore</Text>
                                <Text style={styles.appBarTraveller}>3 adult</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


            {/*  */}


            <ScrollView>
                <View style={{ height: height }}>
                    <View style={styles.details}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <View>
                                <Text style={styles.title}>Depart On</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <SimpleLineIcons name="calendar" color={color.colorBtn} size={20} />
                                    <Text style={styles.text}>Mar-05-2022</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Depart On</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={color.colorBtn} />
                                    <Text style={styles.text}>Mar-05-2022</Text>
                                </View>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5 }}>
                            <View>
                                <Text style={styles.title}>Adult</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <AntDesign name="addusergroup" size={20} color={color.colorBtn} />
                                    <Text style={styles.text}>2 Adults</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Kids</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={color.colorBtn} />
                                    <Text style={styles.text}>2 Kids</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Infant</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={color.colorBtn} />
                                    <Text style={styles.text}>2 Infant</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.couponCode}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                            <TextInput
                                style={{ height: 35 }}
                                placeholder='Add a coupon Code'
                            />
                         <TouchableHighlight onPress={()=>null} underlayColor='transparent'>
                         <Text style={styles.applyCoupon}>Apply</Text>
                         </TouchableHighlight>

                        </View>
                    </View>

                    <View style={styles.bg}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Base Fare</Text>
                            <Text style={styles.priceTag}> Rs: <Text style={styles.price}>3,996/-</Text></Text>
                        </View>
                        <View style={{backgroundColor:'white',height:0.5,marginVertical:7}}/>

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Taxes</Text>
                            <Text style={styles.priceTag}> Rs: <Text style={styles.price}>3,996/-</Text></Text>
                        </View>
                        <View style={{backgroundColor:'white',height:0.5,marginVertical:7}}/>

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Discounts & Adjustments</Text>
                            <Text style={styles.priceTag}> Rs: <Text style={styles.price}>3,996/-</Text></Text>
                        </View>
                        <View style={{backgroundColor:'white',height:0.5,marginVertical:7}}/>

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Other charges</Text>
                            <Text style={styles.priceTag}> Rs: <Text style={styles.price}>3,996/-</Text></Text>
                        </View>
                        <View style={{backgroundColor:'white',height:0.5,marginVertical:7}}/>


                        <View style={styles.total}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text>:</Text>
                            <Text style={styles.priceTag}> Rs: <Text style={styles.price}>3,996/-</Text></Text>

                        </View>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        backgroundColor: color.AppbarColor,
        height: height * 0.09,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15
    },
    appbarPlaceContainer: { backgroundColor: 'white', width: width * 0.75, height: 40, marginLeft: 10, borderRadius: 30 },
    appbarPlace: { fontFamily: font.font, fontSize: height * 0.018 },
    appBarTraveller: { fontFamily: font.font, marginTop: -6, fontSize: height * 0.016 },
    title: { fontFamily: font.font, color: 'grey', fontSize: height * 0.023 },
    text: { fontFamily: font.font, paddingLeft: 10, color: color.colorText, fontSize: height * 0.02 },
    details: { flexDirection: 'column', backgroundColor: color.lightGrey, paddingBottom: 15, paddingTop: 5 },
    couponCode: {
        borderRadius: 7, borderWidth: 1, borderColor: color.borderColor, paddingVertical: 0, paddingHorizontal: 7,
        marginHorizontal: 15, marginTop: 10, backgroundColor: color.AppbarColor,elevation:1
    },
    applyCoupon: { fontFamily: font.font, color: color.textBlue, marginTop: 5 },
    bg:{backgroundColor:color.bg,padding:20,margin:10,borderRadius:7,elevation:5,shadowColor:color.bg},
    amountContainer:{flexDirection:'row',justifyContent:'space-between'},
    amountName:{fontFamily:font.font,color:'white',fontSize:height*0.025},
    price:{fontFamily:font.font,color:'white',fontSize:height*0.027},
    priceTag:{fontFamily:font.font,color:'white'},
    total:{flexDirection:'row',justifyContent:'space-between',backgroundColor:color.darkblue,
    paddingHorizontal:10,paddingVertical:5,borderRadius:20,alignItems:'center'},
    totalText:{fontFamily:font.font,color:'white'}
})