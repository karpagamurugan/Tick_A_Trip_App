import React, { useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../common/Appbar";
import userAction from '../../redux/user/actions'
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';
import CommonAction from '../../redux/common/actions'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

function Offers() {
    const dispatch = useDispatch()
    const { flight_Coupons, hotel_Coupons } = useSelector((state) => state.userReducer)

    useEffect(() => {
        dispatch({ type: userAction.GET_ALL_FLIGHT_COUPON })
        dispatch({ type: userAction.GET_ALL_HOTEL_COUPON })
    }, [])
    return (
        <View>
            <View style={style.mainContainer}>
                <Appbar title={'Offers'} />

                <View style={{ marginTop: 15 }}>
                    {
                        flight_Coupons?.message?.map((item, index) => {
                            return (
                                <View key={index} >
                                    <LinearGradient start={{ x: 0.4, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#0e367c', '#0e367c', '#15479e',]} style={style.cardView}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                            <View style={{ alignItems: 'center', alignSelf: 'center', paddingLeft: 15 }}>
                                                <Image style={{ width: width * 0.15, height: height * 0.08 }} source={require('../../Assert/Icons/flightOffer.png')} />
                                                <View style={{ height: 7 }} />

                                                <Text style={style.textStyle}>Valid Till</Text>
                                                <Text style={[style.textStyle, { fontSize: height * 0.015 }]}>{item?.coupon_valid_upto}</Text>
                                            </View>
                                            <View style={{ backgroundColor: '#fff', width: 1, marginHorizontal: 20, opacity: 0.4 }} />

                                            <View style={{ marginTop: -5 }}>
                                                <Text style={style.textBold}>{item?.coupon_description}</Text>

                                                <View style={style.code}>
                                                    <View>
                                                        <Text style={[style.textBold, { fontSize: height * 0.019 }]}> {item?.coupon_code}</Text>
                                                    </View>
                                                    <TouchableHighlight
                                                        onPress={() => {
                                                            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Code Copied to Clipboard' } })
                                                            Clipboard.setString(item?.coupon_code)
                                                        }}>
                                                        <Image style={{ height: 20, width: 20 }} source={require('../../Assert/Icons/copy.png')} />
                                                    </TouchableHighlight>
                                                </View>
                                            </View>
                                        </View>
                                    </LinearGradient>


                                    <View style={style.designCircle}>
                                        <View style={style.circle} />
                                    </View>
                                    <View style={[style.designCircle, { marginRight: 20, right: -10 }]}>
                                        <View style={[style.circle]} />
                                    </View>

                                </View>
                            )
                        })
                    }


                    {
                        hotel_Coupons?.message?.map((item, index) => {
                            return (
                                <View key={index} >
                                    <LinearGradient start={{ x: 0.4, y: 0.25 }} end={{ x: 0.5, y: 1.0 }} colors={['#0e367c', '#0e367c', '#15479e',]} style={style.cardView}>

                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                            <View style={{ alignItems: 'center', alignSelf: 'center', paddingLeft: 15 }}>
                                                <Image style={{ width: width * 0.15, height: height * 0.08 }} source={require('../../Assert/Icons/hotelOffer.png')} />
                                                <View style={{ height: 7 }} />
                                                <Text style={style.textStyle}>Valid Till</Text>
                                                <Text style={[style.textStyle, { fontSize: height * 0.015 }]}>{item?.coupon_valid_upto}</Text>
                                            </View>

                                            <View style={{ backgroundColor: '#fff', width: 1, marginHorizontal: 20, opacity: 0.4 }} />
                                            <View style={{ marginTop: -5 }}>
                                                <Text style={style.textBold}>{item?.coupon_description}</Text>

                                                <View style={style.code}>
                                                    <View>
                                                        <Text style={[style.textBold, { fontSize: height * 0.019 }]}> {item?.coupon_code}</Text>
                                                    </View>
                                                    <TouchableHighlight underlayColor={'transparent'}
                                                        onPress={() => {
                                                            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Code Copied to Clipboard' } })
                                                            Clipboard.setString(item?.coupon_code)
                                                        }}>
                                                        <Image style={{ height: 20, width: 20 }} source={require('../../Assert/Icons/copy.png')} />
                                                    </TouchableHighlight>
                                                </View>
                                            </View>
                                        </View>


                                    </LinearGradient>


                                    <View style={style.designCircle}>
                                        <View style={style.circle} />
                                    </View>
                                    <View style={[style.designCircle, { marginRight: 20, right: -10 }]}>
                                        <View style={[style.circle]} />
                                    </View>

                                </View>
                            )
                        })
                    }
                </View>

            </View>

        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {
        height: height,
        backgroundColor: 'white',
        width: width
    },
    cardView: {
        // backgroundColor: '#0d377c',
        backgroundColor: COLORS.darkblue,
        // padding: 10,
        paddingTop: 15,
        paddingBottom: 8,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 7,
        // alignItems:'center'

    },
    circle: {
        height: 22,
        width: 22,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    designCircle: {
        position: 'absolute',
        top: height * 0.06,
        marginLeft: 10,
    },
    textStyle: {
        fontFamily: FONTS.font,
        color: 'white',
        fontSize: height * 0.018
    },
    textBold: {
        fontFamily: FONTS.fontBold,
        color: 'white',
        fontSize: height * 0.025
    },
    code: {
        width: width * 0.5,
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 7,
        paddingBottom: 3,
        borderStyle: 'dashed',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10

        // backgroundColor:'white'
    }
})



export default Offers