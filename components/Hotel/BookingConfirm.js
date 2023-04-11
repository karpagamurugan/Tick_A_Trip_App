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

    return (

        <View style={{ backgroundColor: 'white' }}>
            {/* <Text>Booking Confirm</Text> */}
            <Appbar title={'Your ticket information'} />
            <View style={{height:height *0.83}}>
            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                 <View >
                 <Image source={{uri:(BookingInfo?.roomBookDetails?.image ===null)?'data:image/jpeg;base64,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':BookingInfo?.roomBookDetails?.image}} style={{height:height*0.25,width:width}}/>
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
