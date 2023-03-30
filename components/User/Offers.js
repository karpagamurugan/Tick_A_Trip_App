import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import Appbar from "../common/Appbar";
import userAction from '../../redux/user/actions'
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard';
import CommonAction from '../../redux/common/actions';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import HotelOffer from '../../Assert/Icons/hotel_offer.png';
import FlightOffer from '../../Assert/Icons/flight_offer.png';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

function Offers() {
    const TEXT_LENGTH = 40
    const TEXT_HEIGHT = 14
    const OFFSET = TEXT_LENGTH / 2 - TEXT_HEIGHT / 2
    const dispatch = useDispatch()
    const { flight_Coupons, hotel_Coupons } = useSelector((state) => state.userReducer)
    const [selectColor, setSelectColor] = useState([])
    

    useEffect(() => {
        dispatch({ type: userAction.GET_ALL_FLIGHT_COUPON })
        dispatch({ type: userAction.GET_ALL_HOTEL_COUPON })
    }, [])
    
    var colorValues = [
        { color: "#0041f2" },
        { color: "#71b7e3" },
        { color: "#0b7d97" },
        { color: "#10ab87" },
    ]
    const selectRandomColor = () => {
        let selectColor = colorValues
        // let colorValues = ["#0041f2", "#71b7e3", "#10ab87", "#0b7d97"];
        // setSelectColor(colorValues)
        // // let colorValues = ["#0041f2", "#71b7e3", "#10ab87","#0b7d97"];
        // // return colorValues[Math.floor(Math.random() * colorValues.length).toString(3).padStart(1, '0')];
        // // const randomColor = Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        // // return `#${randomColor}`;
    }
useEffect(()=>{

    // console.log(flight_Coupons?.message?.length)
       
    for(let i=0;i<hotel_Coupons?.message?.length; i++){
        // console.log(hotel_Coupons?.message[i])2
        // selectColor.push()
        for(let j=0;j<colorValues?.length;j++){
            selectColor.push(colorValues[j])

        }


    }

    console.log('selectColor',selectColor)



},[])
    return (
        <View>
            <View style={style.mainContainer}>
                <Appbar title={'Offers'} />
                <View style={{ marginTop: 20 }}>

                    {colorValues.map((val,index) => {
                        return (
                            <View key={index} >
                                {
                                    flight_Coupons?.message?.map((item, index) => {
                                        return (
                                            <View key={index} >
                                                <View style={style.cardView}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>

                                                        <View style={[style.discountText, { backgroundColor: val.color }]}>
                                                            <Text style={[style.verticalText]}>t</Text>
                                                            <Text style={[style.verticalText]}>n</Text>
                                                            <Text style={[style.verticalText]}>u</Text>
                                                            <Text style={[style.verticalText]}>o</Text>
                                                            <Text style={[style.verticalText]}>c</Text>
                                                            <Text style={[style.verticalText]}>s</Text>
                                                            <Text style={[style.verticalText]}>i</Text>
                                                            <Text style={[style.verticalText]}>D</Text>
                                                        </View>

                                                        <View style={{ paddingHorizontal: 20, }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                                                                <Image source={HotelOffer} style={{ height: 45, width: 45, marginRight: 10 }} />
                                                                <Text style={style.textBold}> {item?.coupon_description} For Hotel Booking </Text>
                                                            </View>
                                                            <View style={style.code}>
                                                                <View>
                                                                    <Text style={[style.textBold, { fontSize: height * 0.019 }]}> {item?.coupon_code}</Text>
                                                                </View>
                                                                <TouchableHighlight
                                                                    underlayColor={false}
                                                                    onPress={() => {
                                                                        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Code Copied to Clipboard' } })
                                                                        Clipboard.setString(item?.coupon_code)
                                                                    }}>
                                                                    <FeatherIcon name="copy" size={22} style={{ color: COLORS.textBlue, }} />
                                                                </TouchableHighlight>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                                                                <Text style={{ fontSize: 13, paddingTop: 3, paddingRight: 5, fontFamily: FONTS.fontSemi }}>Expires:</Text>
                                                                <Text style={{ fontSize: height * 0.02, fontFamily: FONTS.fontSemi, color: COLORS.textBlue, }}>{item?.coupon_valid_upto}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
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
                        )
                    })}

                    {
                        hotel_Coupons?.message?.map((item, index) => {
                            return (
                                <View key={index} >
                                    <View style={style.cardView}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                            <View style={[style.discountText, { backgroundColor: selectRandomColor() }]}>
                                                <Text style={[style.verticalText]}>t</Text>
                                                <Text style={[style.verticalText]}>n</Text>
                                                <Text style={[style.verticalText]}>u</Text>
                                                <Text style={[style.verticalText]}>o</Text>
                                                <Text style={[style.verticalText]}>c</Text>
                                                <Text style={[style.verticalText]}>s</Text>
                                                <Text style={[style.verticalText]}>i</Text>
                                                <Text style={[style.verticalText]}>D</Text>
                                            </View>
                                            <View style={{ paddingHorizontal: 20, }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', }}>
                                                    <Image source={FlightOffer} style={{ height: 45, width: 45, marginRight: 10 }} />
                                                    <Text style={style.textBold}> {item?.coupon_description} For Hotel Booking </Text>
                                                </View>
                                                <View style={style.code}>
                                                    <View>
                                                        <Text style={[style.textBold, { fontSize: height * 0.019 }]}> {item?.coupon_code}</Text>
                                                    </View>
                                                    <TouchableHighlight
                                                        underlayColor={false}
                                                        onPress={() => {
                                                            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Code Copied to Clipboard' } })
                                                            Clipboard.setString(item?.coupon_code)
                                                        }}>
                                                        <FeatherIcon name="copy" size={22} style={{ color: COLORS.textBlue, }} />
                                                    </TouchableHighlight>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'flex-start', paddingTop: 10 }}>
                                                    <Text style={{ fontSize: 13, paddingTop: 3, paddingRight: 5, fontFamily: FONTS.fontSemi }}>Expires:</Text>
                                                    <Text style={{ fontSize: height * 0.02, fontFamily: FONTS.fontSemi, color: COLORS.textBlue, }}>{item?.coupon_valid_upto}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
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
        width: width,
    },
    cardView: {
        backgroundColor: COLORS.AppbarColor,
        marginHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10
        // position: 'relative',
        // height:height*0.20

    },
    circle: {
        height: 22,
        width: 22,
        borderRadius: 100,
        backgroundColor: 'white'
    },
    designCircle: {
        position: 'absolute',
        top: height * 0.09,
        marginLeft: 10,
    },
    textStyle: {
        fontFamily: FONTS.font,
        color: 'white',
        fontSize: height * 0.018
    },
    textBold: {
        fontFamily: FONTS.fontBold,
        color: COLORS.textBlue,
        fontSize: height * 0.021,
        flex: 1
    },
    code: {
        width: width * 0.6,
        borderWidth: 1,
        borderColor: '#003c7c4d',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderStyle: 'dashed',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    discountText: {
        paddingHorizontal: 25,
        paddingVertical: 20,
        // backgroundColor: '#703c89',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
    },
    verticalText: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        transform: [{ rotate: '-90deg' }],
        textTransform: 'uppercase',
        fontFamily: FONTS.mediam,
        height: height * 0.02
    },
    // offersTexts:{
    //     flexDirection:'row',
    //     alignItems:'flex-start'
    // },
    // paddingTop:7,paddingRight:6,color:COLORS.textBlue
    offerIcons: {
        position: 'absolute',
        top: 0,
        left: 50
    }
})



export default Offers