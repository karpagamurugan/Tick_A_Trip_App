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
function BookingConfirm() {
    

    const { BookingInfo } = useSelector((state) => state.HotelReducer)

    console.log('BookingInfo',BookingInfo)

    return (

        <View style={{ backgroundColor: 'white', height: height }}>
            {/* <Text>Booking Confirm</Text> */}
            <Appbar title={'Your ticket information'} />
            <View>
                <ScrollView>
                 <View style={{height:height*0.9}}>
                 <Image source={{uri:BookingInfo?.roomBookDetails?.image}} style={{height:height*0.25,width:width}}/>
                    <View style={style.bgStyle}>
                        <View style={{ alignItems: 'center',paddingTop:10 }}>
                            <Success />
                            <Text style={style.booking}>BOOKING CONFIRMED</Text>
                        </View>

                        <View style={style.subContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:10 }}>
                                <View>
                                    <Text  style={style.from}>Check In</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.025}]}>{moment(BookingInfo?.checkIn).format('dd M yyyy')}</Text>
                                </View>
                                {/* <FlightBg/> */}
                                {/* <FlightImg /> */}
                                <View>
                                    <Text style={style.from}>CheckOut</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.025}]}>{moment(BookingInfo?.checkOut).format('dd M yyyy')}</Text>
                                </View>

                            </View>


                            <View style={style.contentView}>
                            <View>
                                    <Text style={style.from}>Hotel Name</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.023}]}>{BookingInfo?.roomBookDetails?.currency} {BookingInfo?.roomBookDetails?.hotelName}</Text>
                                </View>
                            <View>
                                    <Text style={style.from}>Total Price</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.023}]}>{BookingInfo?.roomBookDetails?.currency} {BookingInfo?.roomBookDetails?.NetPrice}</Text>
                                </View>
                                <View>
                                    <Text style={style.from}>Supplier Confirmation Number</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.023}]}>{BookingInfo?.supplierConfirmationNum}</Text>
                                </View>

                                <View>
                                    <Text style={style.from}>Address</Text>
                                    <Text style={[style.Depature,{fontSize:height*0.022}]}>{BookingInfo?.roomBookDetails?.address}</Text>
                                </View>
                            
                            </View>
                        </View>

                    </View>
                 </View>
                </ScrollView>
            </View>
        </View>
        // <View style={{ backgroundColor: 'white', height: height }}>
        //     {/* <Text>Booking Confirm</Text> */}
        //     <Appbar title={'Your ticket information'} />


        //     <View>
        //         <ScrollView>
        //             <View style={style.contentTitle}>
        //                 <View>
        //                     <Text style={style.subTitle}>
        //                         TravelDate
        //                     </Text>
        //                     <Text style={style.dateText}>
        //                         30 Sep 22
        //                     </Text>
        //                 </View>
        //                 <View style={{ height: height * 0.05, width: 2.5, backgroundColor:COLORS.TextGrey }} />
        //                 <View>
        //                     <Text style={style.subTitle}>Flight Company</Text>
        //                     <View style={style.flightText}>
        //                         {/* <Text>img</Text> */}
        //                         <View style={{backgroundColor:'red',height:25,width:25,borderRadius:50,elevation:10,shadowColor:COLORS.BtnColor}}/>
        //                         <Text style={style.dateText}>
        //                             Indio
        //                         </Text>
        //                     </View>
        //                 </View>

        //             </View>

        //             <View style={style.bgStyle}>
        //                 <View style={{ alignItems: 'center',paddingTop:10 }}>
        //                     <Success />
        //                     <Text style={style.booking}>BOOKING CONFIRMED</Text>
        //                 </View>

        //                 <View style={style.subContainer}>
        //                     <View style={{ flexDirection: 'row', justifyContent: 'space-between',paddingHorizontal:10 }}>
        //                         <View>
        //                             <Text  style={style.from}>from</Text>
        //                             <Text style={style.Depature}>CBE</Text>
        //                         </View>
        //                         {/* <FlightBg/> */}
        //                         <FlightImg />
        //                         <View>
        //                             <Text style={style.from}>to</Text>
        //                             <Text style={style.Depature}>CBE</Text>
        //                         </View>

        //                     </View>

        //                     <View style={{height:15}}/>


        //                     <View style={style.contentView}>
        //                         <View>
        //                             <Text style={style.from}>Departure</Text>
        //                             <Text style={[style.Depature,{fontSize:height*0.027}]}>8:00</Text>
        //                         </View>
        //                         <View>
        //                             <Text style={style.from}>arrival</Text>
        //                             <Text style={[style.Depature,{fontSize:height*0.027}]}>8:00</Text>
        //                         </View>
        //                     </View>



        //                     <View style={style.contentView}>
        //                         <View>
        //                             <Text style={style.from}>Class</Text>
        //                             <Text style={[style.Depature,{fontSize:height*0.027}]}>8:00</Text>
        //                         </View>
        //                         <View>
        //                             <Text style={style.from}>arrival</Text>
        //                             <Text style={[style.Depature,{fontSize:height*0.027}]}>8:00</Text>
        //                         </View>
        //                     </View>


        //                     <View style={style.contentView}>
        //                         <View>
        //                             <Text style={style.from}>Flight No</Text>
        //                             <Text style={[style.Depature,{fontSize:height*0.027}]}>8:00</Text>
        //                         </View>
        //                         <View>
        //                             <Text style={style.from}>arrival</Text>
        //                             <Text style={[style.Depature,{fontSize:height*0.027}]}>8:00</Text>
        //                         </View>
        //                     </View>
                            


        //                 </View>

        //             </View>
        //         </ScrollView>
        //     </View>
        // </View>
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
        // shadowColor:COLORS.AppbarColor
        // padding:10,
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
        // flexDirection:'row',
        // justifyContent:'space-between',
        paddingHorizontal:10
    }

})

export default BookingConfirm
