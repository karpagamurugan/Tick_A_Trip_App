import React, { useEffect } from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../common/Appbar";
import userAction from '../../redux/user/actions'
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

function Offers() {
    const dispatch = useDispatch()
    const { flight_Coupons, hotel_Coupons } = useSelector((state) => state.userReducer)

    useEffect(() => {
        dispatch({ type: userAction.GET_ALL_FLIGHT_COUPON })
        dispatch({ type: userAction.GET_ALL_HOTEL_COUPON })
    }, [])
    // https://cdn.iconscout.com/icon/free/png-256/apply-coupon-code-1851536-1569261.png
    // data:image/png;base64,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
    // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR12vzg1cb1-YIxchdMDfctJ2afE7UPa9WmCg&usqp=CAU
    return (
        <View>
            <View style={style.mainContainer}>
                <Appbar title={'Offers'} />

              <View style={{marginTop:15}}>
              {
                    flight_Coupons?.message?.map((item, index) => {
                        return (
                            <View key={index} >
                                <LinearGradient start={{x: 0.4, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={['#0e367c', '#0e367c','#15479e',]}  style={style.cardView}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start'}}>

                                        <View style={{ alignItems: 'center', alignSelf: 'center',paddingLeft:15}}>
                                            <Image style={{ width: width * 0.14, height: height * 0.04}} source={require('../../Assert/Icons/flightOffer.png')} />
                                            <View style={{height:7}}/>

                                            <Text style={style.textStyle}>Valid Till</Text>
                                            <Text style={[style.textStyle,{fontSize:height*0.015}]}>{item?.coupon_valid_upto}</Text>
                                        </View>
                                        <View style={{backgroundColor:'#fff',width:1 ,marginHorizontal:20,opacity:0.4}} />

                                        <View>
                                            <Text style={style.textBold}>{item?.coupon_description}</Text>

                                            <View style={style.code}>
                                                <View>
                                                    <Text style={[style.textBold, { fontSize: height * 0.019 }]}> {item?.coupon_code}</Text>
                                                </View>
                                                <TouchableHighlight onPress={()=>null}>
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
                                <LinearGradient start={{x: 0.4, y: 0.25}} end={{x: 0.5, y: 1.0}} colors={['#0e367c', '#0e367c','#15479e',]}  style={style.cardView}>

                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                        <View style={{ alignItems: 'center', alignSelf: 'center',paddingLeft:15}}>
                                            <Image style={{ width: width * 0.14, height: height * 0.04 }} source={require('../../Assert/Icons/hotelOffer.png')} />
                                            <View style={{height:7}}/>
                                            <Text style={style.textStyle}>Valid Till</Text>
                                            <Text style={[style.textStyle,{fontSize:height*0.015}]}>{item?.coupon_valid_upto}</Text>
                                        </View>

                                        <View style={{backgroundColor:'#fff',width:1 ,marginHorizontal:20,opacity:0.4}} />
                                        <View>
                                            <Text style={style.textBold}>{item?.coupon_description}</Text>

                                            <View style={style.code}>
                                                <View>
                                                    <Text style={[style.textBold, { fontSize: height * 0.019 }]}> {item?.coupon_code}</Text>
                                                </View>
                                                <TouchableHighlight onPress={()=>  Clipboard.setString('hello world')}>
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
        backgroundColor:COLORS.darkblue,
        // padding: 10,
        paddingTop:15,
        paddingBottom:8,
        paddingHorizontal:10,
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
        width:width*0.5,
        borderWidth: 1,
        borderColor: '#fff',
        paddingHorizontal: 10,
        paddingTop: 7,
        paddingBottom: 3,
        borderStyle: 'dashed',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
        // backgroundColor:'white'
    }
})



export default Offers