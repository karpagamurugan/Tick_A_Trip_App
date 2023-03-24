/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ImageBackground, Modal, Pressable, Button, ScrollView, Image } from 'react-native';
import Appbar from '../common/Appbar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Flight from '../../Assert/Images/icon/flight-2.svg';
import Filter from '../../Assert/Images/icon/Icon feather-filter.svg';
import FONTS from '../constants/font';
import BackArrow from '../../Assert/Images/icon/arrow.svg';
import FromArrow from '../../Assert/Images/icon/arrow2.svg'
import FlightIcon from '../../Assert/Images/icon/flight-airplane-svgrepo-com.svg';
import FromIcon from '../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../Assert/Images/icon/take-off-2.svg';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment/moment';
import { API_IMG_URL } from "../constants/constApi";
import COLORS from '../constants/color';
import actions from '../../redux/Flight/actions';
import FlightFilter from './FlightFilter';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default function FlightResult({ navigation,route }) {
    const { Flight_search_result } = useSelector((state) => state.FlightSearchReducer)

    const dispatch =useDispatch();
    var [showFilter, setShowFilter] = useState(false); //show filter modal
    var [priceRange, setPriceRange] = useState(); //set price range for filter
  
    function timeConvert(n) {
        var num = n;
        var hours = Math.floor(num / 60) > 0 ? Math.floor(num / 60) + "H " : "";
        var rminutes =
            n - Math.floor(num / 60) * 60 > 0
                ? n - Math.floor(num / 60) * 60 + "M"
                : "";
        return hours + rminutes;
    }

    return (
        <View style={styles.mainContainer}>

            {/* appbar */}
            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <MaterialIcons name='keyboard-arrow-left' size={35} color={COLORS.textBlue} />
                </TouchableHighlight>
                <Flight height={30} width={30} />
                <View style={styles.appbarPlaceContainer}>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FromIcon height={15} width={15} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>{route?.params?.prefs?.fromCity}</Text>
                                <Text style={styles.appBarTraveller}>{route?.params?.prefs?.adult_flight} adult, {route?.params?.prefs?.child_flight} child, {route?.params?.prefs?.infant_flight} Infant</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                            <ToIcon height={19} width={19} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>{route?.params?.prefs?.toCity}</Text>
                                <Text style={styles.appBarTraveller}>{route?.params?.prefs?.class}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


            <Modal
                transparent={true}
                visible={showFilter}
            >
                <View>
                    <FlightFilter navigation={navigation} setShowFilter={setShowFilter} />
                </View>
            </Modal>

            <View style={styles.filterView}>
                <View/>
                <Text style={styles.FlightText}>{Flight_search_result?.message?.length}  Flights</Text>
                <View style={styles.filter}>

                    <TouchableHighlight onPress={() => setShowFilter(!showFilter)} underlayColor='transparent'>
                        <Filter height={20} width={20} />
                    </TouchableHighlight>
                </View>
            </View>


            <View style={{ backgroundColor: 'grey', height: 0.3 }} />

            <ImageBackground source={require('../../Assert/Images/map.jpg')} style={{ height: height, width: width, paddingBottom: 20 }}>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View>
                        {
                            Flight_search_result?.message?.map((item, index) => (
                                <View style={styles.card} key={index}>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            {/* <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: 'red' }} /> */}
                                            
                                            {
                                                
                                                (item?.flightUrl === null || item?.flightUrl === undefined ||item?.flightUrl === '')?<View style={{ height: 40, width: 40, borderRadius: 100,backgroundColor:'red' }}/>
                                                :<Image style={{ height: 40, width: 40, borderRadius: 100 }} source={{
                                                    uri: API_IMG_URL + '/server/flightimage/' + item?.flightUrl
                                                }}/>
                                                }
                                            <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.021, width: width * 0.2,paddingLeft:5 }}>{item?.flightName}</Text>
                                            {
                                                item?.flight_details?.map((data, ind) => (
                                                    //   data?.flights?.map((e)=>(
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} key={ind}>
                                                        <View style={{ alignItems: 'center' }}>
                                                            <Text style={styles.Textlite}> {data.flights[0].departureLocation}(
                                                                {
                                                                    data.flights[0].flightList
                                                                        .DepartureAirportLocationCode
                                                                }
                                                                )</Text>

                                                            <Text style={styles.Text}>{moment(
                                                                data.flights[0].flightList
                                                                    .DepartureDateTime
                                                            )
                                                                ?.format("hh:mm:ss a")
                                                                .substring(0, 5)}</Text>
                                                            <Text style={styles.Textlite}>{moment(
                                                                data.flights[0].flightList
                                                                    .DepartureDateTime
                                                            )
                                                                ?.format("hh:mm:ss a")
                                                                .substring(9, 11)
                                                                ?.toUpperCase()}</Text>
                                                        </View>
                                                        <FromArrow />
                                                        <View style={{ alignItems: 'center' }}>
                                                            <Text style={styles.Text}> {timeConvert(
                                                                data.flights.reduce(
                                                                    (total, val) =>
                                                                    (total =
                                                                        total +
                                                                        parseFloat(
                                                                            val.flightList.JourneyDuration
                                                                                ? parseFloat(
                                                                                    val.flightList
                                                                                        .JourneyDuration
                                                                                )
                                                                                : 0
                                                                        )),
                                                                    0
                                                                )
                                                            )}</Text>
                                                            <FlightIcon />
                                                            <Text key={index} style={styles.Text}>{data?.totalStops} stop</Text>


                                                        </View>
                                                        <BackArrow />
                                                        <View style={{ alignItems: 'center' }}>
                                                            <Text style={styles.Textlite}>{
                                                                data.flights[
                                                                    data.flights.length - 1
                                                                ].arrivalLocation
                                                            } (
                                                                {
                                                                    data.flights[
                                                                        data.flights.length - 1
                                                                    ].flightList
                                                                        .ArrivalAirportLocationCode
                                                                }
                                                                )</Text>
                                                            <Text style={styles.Text}>{moment(
                                                                data.flights[
                                                                    data.flights.length - 1
                                                                ].flightList.ArrivalDateTime
                                                            )
                                                                ?.format("hh:mm:ss a")
                                                                .substring(0, 5)}</Text>
                                                            <Text style={styles.Textlite}>{moment(
                                                                data.flights[
                                                                    data.flights.length - 1
                                                                ].flightList.ArrivalDateTime
                                                            )
                                                                ?.format("hh:mm:ss a")
                                                                .substring(9, 11)
                                                                ?.toUpperCase()}</Text>
                                                        </View>
                                                    </View>
                                                    //   ) )
                                                ))
                                            }

                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'flex-end' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: FONTS.font, color: COLORS.colorText }}>Rs:</Text>
                                                <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.025, paddingLeft: 5 }}>{item?.totalFare}</Text>
                                            </View>
                                            <View style={{ width: 1, height: height * 0.06, backgroundColor: 'grey' }} />
                                            <View style={styles.booknowBtn}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={() =>{
                                                    dispatch({type:actions.SET_REVALIDATE,payload:{'fare_source_code':item?.FareSourceCode}})
                                                    console.log(item?.FareSourceCode)

                                                     navigation.navigate('flightBooking',{flightInfo:route?.params?.prefs,itemInfo: item})
                                                     }}>
                                                    <Text style={styles.booknowText}>BOOK NOW</Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.listBottom}>
                                        <Text style={[styles.listBtnText, { color: COLORS.colorText }]}>{item?.journeytype}</Text>
                                        <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.navigate('FlightDetails', { item: item })}>
                                            <Text style={[styles.listBtnText, { color: COLORS.textBlue }]}>View Flight Details</Text>

                                        </TouchableHighlight>
                                    </View>
                                </View>
                            ))
                        }
                    </View>
                </ScrollView>
            </ImageBackground>


        </View>
    )
}

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        backgroundColor: COLORS.AppbarColor,
        height: height * 0.09,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15
    },
    appbarPlaceContainer: { backgroundColor: 'white', width: width * 0.75, height: 40, marginLeft: 10, borderRadius: 30 },
    appbarPlace: { fontFamily: FONTS.font, fontSize: height * 0.018 },
    appBarTraveller: { fontFamily: FONTS.font, marginTop: -6, fontSize: height * 0.016 },
    mainContainer: { height: height, width: width, backgroundColor: 'white' },
    filter: {
        // alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
        backgroundColor: COLORS.AppbarColor,
        padding: 10,
        borderRadius: 100,
        marginBottom: 7,
        flexDirection: 'row'
    },
    filterText: { fontFamily: FONTS.font, paddingLeft: 10 },
    card: {
        backgroundColor: COLORS.AppbarColor,
        marginHorizontal: 15,
        paddingTop: 10,
        elevation: 2,
        borderRadius: 5,
        marginBottom: 15
    },
    Text: { fontFamily: FONTS.fontSemi, color: COLORS.colorText, fontSize: height * 0.012 },
    Textlite: { fontFamily: FONTS.font, color: 'grey', fontSize: height * 0.012 },
    booknowText: {
        color: 'white',
        fontFamily: FONTS.mediam,
        paddingVertical: 3,
        paddingHorizontal: 10,
        fontSize: height * 0.014

    },
    booknowBtn: { alignItems: 'center', backgroundColor: COLORS.textBlue, borderRadius: 30 },
    priceText: {
        fontFamily: FONTS.fontSemi,
        color: 'white',
        backgroundColor: COLORS.textBlue,
        paddingVertical: 1,
        paddingHorizontal: 7,
        borderRadius: 5,
        fontSize: height * 0.025,
        marginTop: 5,
        marginRight: 15
    },
    priceTitle: { fontFamily: FONTS.fontSemi, color: 'black', fontSize: height * 0.025, paddingTop: 5, paddingLeft: 5 },
    priceValue: { fontFamily: FONTS.font, color: 'black' },
    priceContainer: { flexDirection: 'row', paddingLeft: 5, justifyContent: 'space-between', paddingBottom: 5 },
    filterView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'

    },
    filterApply: {
        // alignItems: 'center',
        backgroundColor: COLORS.colorBtn,
        // marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5
    },
    FilterTitle: { fontFamily: FONTS.fontBold, color: COLORS.colorText },
    modalContainer: { flex: 1, justifyContent: 'center', marginTop: 20, marginHorizontal: 20, borderRadius: 50 },
    modalBg: { width: '100%', flexDirection: 'column', borderRadius: 20, alignSelf: 'center' },
    modalTitle: { fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.027 },
    listBottom: {
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
        justifyContent: 'space-between', borderBottomRightRadius: 5, marginTop: 10,
        borderBottomLeftRadius: 5
    },
    listBtnText: { fontFamily: FONTS.font, fontSize: height * 0.016, },
    FlightText:{color:'black',fontFamily:FONTS.fontBold}


})