import React from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, ImageBackground,Image } from 'react-native';
import Appbar from "../common/Appbar";
import COLORS from "../constants/color";
import Success from '../../Assert/Icons/check-svgrepo-com.svg';
import FlightBg from '../../Assert/Icons/Ellipse 164.svg';
import FlightImg from '../../Assert/Icons/airline.svg';
import FONT_FAMILY from "../constants/font";
import { useSelector } from "react-redux";
import moment from "moment";



const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
function HotelBookingConfirm() {
    

    const { BookingInfo } = useSelector((state) => state.HotelReducer)

    return (

        <View style={{ backgroundColor: 'white' }}>
            <Appbar title={'Your booking information'} />
            <View style={{height:height *0.83}}>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                 <View >
                 <Image source={{uri:(BookingInfo?.roomBookDetails?.image ===null)?'https://www.freepnglogos.com/uploads/hotel-logo-png/download-building-hotel-clipart-png-33.png':BookingInfo?.roomBookDetails?.image}} style={{height:height*0.25,width:width}}/>
                    <View style={style.bgStyle}>
                        <View style={{ alignItems: 'center',paddingTop:10 }}>
                            <Success />
                            <Text style={style.booking}>BOOKING CONFIRMED</Text>
                        </View>

                        <View style={style.subContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:10 }}>
                                <View>
                                    <Text  style={style.from}>Check In</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.025}]}>{moment(BookingInfo?.check_in).format('dd M yyyy')}</Text>
                                </View>
                             
                                <View>
                                    <Text style={style.from}>CheckOut</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.025}]}>{moment(BookingInfo?.check_out).format('dd M yyyy')}</Text>
                                </View>

                            </View>


                            <View style={style.contentView}>
                            <View>
                                    <Text style={style.from}>Hotel Name</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.023}]}>
                                        {BookingInfo?.hotel_name}</Text>
                                </View>
                            <View>
                                    <Text style={style.from}>Total Price</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.023}]}>
                                    {BookingInfo?.net_price}</Text>
                                </View>
                                <View>
                                    <Text style={style.from}>Supplier Confirmation Number</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.023}]}>
                                        {BookingInfo?.supplier_confirmation_no}</Text>
                                </View>

                                <View>
                                    <Text style={style.from}>Address</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.022}]}>{BookingInfo?.hotel_address}</Text>
                                </View>
                            
                            </View>
                        </View>

                    </View>
                 </View>
                </ScrollView>
            </View>
        </View>


        
    )
}

const style = StyleSheet.create({
    contentTitle: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 15,
        alignItems:'center'
    },
    flightText: {
        flexDirection: 'row',
        justifyContent:'space-evenly'
    },
    bgStyle: {
        marginTop:10,
        backgroundColor: COLORS.AppbarColor,
        flex: 1,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5,
        shadowColor: COLORS.BtnColor,
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    subContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        marginTop:5
    },
    subTitle:{
        fontFamily:FONT_FAMILY.mediam,
        color:'black'
    },
    booking:{
        fontFamily:FONT_FAMILY.fontBold,
        color:'black',
        fontSize:height*0.022
    },
    dateText:{
        fontFamily:FONT_FAMILY.fontBold,
        color:'black',
        fontSize:height*0.025
    },
    from:{
        fontFamily:FONT_FAMILY.font,
        color:'grey'
    },
    Depature:{
        fontFamily:FONT_FAMILY.fontBold,
        color:'black',
        fontSize:height*0.03
    },
    contentView:{
        paddingHorizontal:10
    }

})

export default React.memo(HotelBookingConfirm)
