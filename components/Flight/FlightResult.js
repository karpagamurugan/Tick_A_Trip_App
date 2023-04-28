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
import FlightCard from './FlightCard';
import { forEach } from 'lodash';
import CommonAction from '../../redux/common/actions';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default function FlightResult({ navigation, route }) {
    const { Flight_search_result,Filtered_List} = useSelector((state) => state.FlightSearchReducer)
    const dispatch = useDispatch();
    var [showFilter, setShowFilter] = useState(false); //show filter modal
    const [dropdown, setDropdown] = useState([]);
    var [mainList, setMainList] = useState(Flight_search_result)


    var [priceRange, setPriceRange] = useState({min:'',max:''});
    var [selectAirline, setSelectAirline] = useState([])
    var [selectFlightStops, setSelectFlightStops] = useState([])

    function timeConvert(n) {
        var num = n;
        var hours = Math.floor(num / 60) > 0 ? Math.floor(num / 60) + "H " : "";
        var rminutes =
            n - Math.floor(num / 60) * 60 > 0
                ? n - Math.floor(num / 60) * 60 + "M"
                : "";
        return hours + rminutes;
    }

    const handleDropdown = (index) => {
        if (dropdown.includes(index)) {
            setDropdown(dropdown.filter(el => el !== index));
        } else {
            setDropdown([...dropdown, index]);
        }
    }

    const FilterFlight = (min,max, Airline, cabin, stops) => {
        var tempAllFilterList = []
        var tempPriceList=[]
        var tempAirLineList=[]

        // if (price !== undefined || price !== null || price?.length) {
        //     Flight_search_result.filter((el) => {
        //        if(price === 0){
        //         tempPriceList.push(el)
        //        }else{
        //         if (parseInt(el[0]?.totalFare) > 0 && parseInt(el[0]?.totalFare) <= parseInt(price)) {
        //             tempPriceList.push(el)
        //         }else{
        //         }
        //        }
       
        //     })
        // }





        if (Airline !== undefined || Airline !== null || Airline?.length) {
            tempPriceList.filter((el) => {
                if (Airline.includes(el[0]?.flightName)) {
                    tempAirLineList.push(el)
                }else if(Airline.includes('All')){
                    tempAirLineList.push(el)
                }
                // else{
                //     tempAirLineList.push(el) 
                // }
            })
        }


        if(stops!==undefined ||stops!== null ||stops?.length){
            tempAirLineList.forEach(el => {
                if ((stops.includes("Nonstop") && el[0]?.flight_details?.every(val => val.totalStops === 0))) {
                    tempAllFilterList.push(el);
                } else if ((stops.includes("OneStop") && el[0]?.flight_details?.every(val => val.totalStops === 1))) {
                    tempAllFilterList.push(el);
                } else if ((stops.includes("TwoStop") && el[0]?.flight_details?.every(val => val.totalStops === 2))) {
                    tempAllFilterList.push(el);
                } else if (stops.includes("Any")) {
                    tempAllFilterList.push(el);
                }
                // else{
                //     tempAllFilterList.push(el);
                // }
              });
        }

        dispatch({
            type: actions.SET_FLIGHT_FILTERED_LIST, payload: {
                show:true,
                data:tempAllFilterList
            }
          });
        setShowFilter(false)
    }


    const FlightSearch = (min,max, Airline, cabin, stops) => {
        dispatch({ type: CommonAction.FLIGHT_LOADER, payload: true });
        const payloaddata = {
          journey_type: route?.params?.prefs?.journey_type,
          airport_from_code: route?.params?.prefs?.airport_from_code,
          airport_to_code:route?.params?.prefs?.airport_to_code,
          departure_date: moment(route?.params?.prefs?.departure_date).format('YYYY-MM-DD'),
                // return_date: (oneTrip === true) ? "" : moment(route?.params?.prefs?.airport_to_code).format('YYYY-MM-DD'),
          adult_flight: JSON.parse(route?.params?.prefs?.adult_flight),
          child_flight: JSON.parse(route?.params?.prefs?.child_flight),
          infant_flight: JSON.parse(route?.params?.prefs?.infant_flight),
          class:cabin.split(' ')[0] ,
          target: "Test"
        }
        dispatch({
          type: actions.SET_FLIGHT_SEARCH,
          payload: {
            data: payloaddata,  
            navigation: navigation,
            prefs:{
              airport_from_code: route?.params?.prefs?.airport_from_code,
              airport_to_code: route?.params?.prefs?.airport_to_code,
              adult_flight:  JSON.parse(route?.params?.prefs?.adult_flight),
              child_flight: JSON.parse(route?.params?.prefs?.child_flight),
              infant_flight:JSON.parse(route?.params?.prefs?.infant_flight),
              fromCity:route?.params?.prefs?.fromCity,
              toCity:route?.params?.prefs?.toCity,
              class: cabin.split(' ')[0],
              departure_date: moment(route?.params?.prefs?.departure_date).format('YYYY-MM-DD'),
                     //  return_date: (oneTrip === true) ? "" : moment(ToDate).format('YYYY-MM-DD'),
              journey_type:route?.params?.prefs?.journey_type
            }
          }
        })
        setShowFilter(false)
        FilterFlight(min,max, Airline, cabin, stops)
      }

    return (
        <View style={styles.mainContainer}>

            {/* appbar */}
            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'}
                 onPress={() =>{
                    dispatch({
                        type: actions.SET_FLIGHT_FILTERED_LIST, payload: {
                            show:false,
                            data:[]
                        }
                      });
                     navigation.goBack()
                     }}>
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
                    <FlightFilter
                        navigation={navigation}
                        route={route}
                        setShowFilter={setShowFilter}
                        Price={priceRange}
                        AirLine={selectAirline}
                        Stops={selectFlightStops}
                        onApplied={(min,max, Airline, cabin, stops) => {
                            if(route?.params?.prefs?.class !== cabin.split(' ')[0]){
                                FlightSearch(min,max, Airline, cabin, stops)
                            }else{
                            FilterFlight(min,max, Airline, cabin, stops)
                            }
                            setPriceRange(priceRange={min:min,max:max})
                            setSelectAirline(selectAirline=Airline)
                             setSelectFlightStops(selectFlightStops=stops)
                        }}
                        onClear={(min,max,Airline, cabin, stops)=>{
                                    dispatch({
                                        type: actions.SET_FLIGHT_FILTERED_LIST, payload: {
                                            show:false,
                                            data:[]
                                        }
                                        });
                                    setShowFilter(false)
                                    setPriceRange({min:0,max:0})
                                    setSelectAirline([])
                                    setSelectFlightStops([])
                        }}
                    />
                </View>
            </Modal>


            <View style={styles.filterView}>
                <View />
                <Text style={styles.FlightText}>{(Filtered_List?.show ===true)?Filtered_List?.data?.length:Flight_search_result?.length}  Flights</Text>
                <View style={styles.filter}>

                    <TouchableHighlight onPress={() => setShowFilter(!showFilter)} underlayColor='transparent'>
                        <Filter height={20} width={20} />
                    </TouchableHighlight>
                </View>
            </View>


            <View style={{ backgroundColor: 'grey', height: 0.3 }} />

            <ImageBackground source={require('../../Assert/Images/map.jpg')} style={{ height: height * 0.8, width: width, paddingBottom: 20, marginTop: 10, }}>
                <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
                    <View style={{ paddingBottom: 50 }}>
                        {
                            (Filtered_List?.show ===true &&Filtered_List?.data?.length === 0 ||Flight_search_result.length === 0&&Filtered_List?.show ===false)?
                            <View style={{alignItems:'center',alignSelf:'center'}}>
                                <Image source={require('../../Assert/loader/emptyResult.png')} style={{height:height*0.3,width:width*0.5}}/>
                                </View>:
                            (route?.params?.type === 'OneWay') ?
                            ((Filtered_List?.show ===true)?Filtered_List?.data:Flight_search_result)?.map((e, index) => {
                                    return (
                                        <View key={index} >
                                            {
                                                <View style={styles.card} >
                                                    <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            {

                                                                (e[0]?.flightUrl === null || e[0]?.flightUrl === undefined || e[0]?.flightUrl === '') ? <View style={{ height: 40, width: 40, borderRadius: 100, backgroundColor: 'red' }} />
                                                                    : <Image style={{ height: 40, width: 40, borderRadius: 100 }} source={{
                                                                        uri: API_IMG_URL + '/server/flightimage/' + e[0]?.flightUrl
                                                                    }} />
                                                            }
                                                            <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.021, width: width * 0.2, paddingLeft: 5 }}>{e[0]?.flightName}</Text>
                                                            {
                                                                e[0]?.flight_details?.map((data, ind) => (
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} key={ind}>
                                                                        <View style={{ alignItems: 'center' }}>

                                                                            <Text style={styles.Textlite}> {data.flights[0].departureLocation} {'\n'}(
                                                                                {
                                                                                    data.flights[0].flightList
                                                                                        .DepartureAirportLocationCode
                                                                                }
                                                                                )</Text>

                                                                            <Text style={styles.Text}>{moment(
                                                                                data.flights[0].flightList
                                                                                    .DepartureDateTime
                                                                            )
                                                                                ?.format("HH:mm:ss a")
                                                                                .substring(0, 5)}</Text>
                                                                            {/* <Text style={styles.Textlite}>{moment(
                                                                                data.flights[0].flightList
                                                                                    .DepartureDateTime
                                                                            )
                                                                                ?.format("HH:mm:ss a")
                                                                                .substring(9, 11)
                                                                                ?.toUpperCase()}</Text> */}
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
                                                                            <Text style={styles.Text}>{data?.totalStops} stop</Text>


                                                                        </View>
                                                                        <BackArrow />
                                                                        <View style={{ alignItems: 'center' }}>
                                                                            <Text style={styles.Textlite}>{
                                                                                data.flights[
                                                                                    data.flights.length - 1
                                                                                ].arrivalLocation
                                                                            } {'\n'} (
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
                                                                                ?.format("HH:mm:ss a")
                                                                                .substring(0, 5)}</Text>
                                                                            {/* <Text style={styles.Textlite}>{moment(
                                                                                data.flights[
                                                                                    data.flights.length - 1
                                                                                ].flightList.ArrivalDateTime
                                                                            )
                                                                                ?.format("HH:mm:ss a")
                                                                                .substring(9, 11)
                                                                                ?.toUpperCase()}</Text> */}
                                                                        </View>
                                                                    </View>
                                                                ))
                                                            }

                                                        </View>

                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'flex-end' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Text style={{ fontFamily: FONTS.font, color: COLORS.colorText }}>Rs:</Text>
                                                                <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.025, paddingLeft: 5 }}>{e[0]?.totalFare}</Text>
                                                            </View>
                                                            <View style={{ width: 1, height: height * 0.06, backgroundColor: 'grey' }} />
                                                            <View style={styles.booknowBtn}>
                                                                <TouchableHighlight underlayColor={'transparent'} onPress={() => {
                                                                    // dispatch({type:actions.SET_REVALIDATE,payload:{'fare_source_code':e[0]?.FareSourceCode}})

                                                                    //  navigation.navigate('flightBooking',{flightInfo:route?.params?.prefs,itemInfo: e[0]})
                                                                    handleDropdown(e[0]?.FareSourceCode)
                                                                }}>
                                                                    <Text style={styles.booknowText}>{dropdown?.includes(e[0]?.FareSourceCode) ? 'Hide Details' : 'View Details'}</Text>
                                                                </TouchableHighlight>
                                                            </View>
                                                        </View>
                                                    </View>



                                                    {
                                                        dropdown?.includes(e[0]?.FareSourceCode) ?
                                                            e.map((item1, ind) => {
                                                                return (
                                                                    <View style={{ backgroundColor: 'white', paddingTop: 7 }} key={ind}>
                                                                        <FlightCard prefs={route?.params?.prefs} key={index} item={item1} navigation={navigation} />
                                                                    </View>
                                                                );
                                                            }) : <></>
                                                    }

                                                </View>
                                            }
                                        </View>

                                    )
                                })
                                :
                                ((Filtered_List?.show ===true)?Filtered_List?.data:Flight_search_result).map((e, index) => {
                                    return (
                                        <View key={index} >
                                            {
                                                <View style={styles.card} >
                                                    <View style={{ paddingHorizontal: 10, paddingBottom: 10 }}>
                                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                            {

                                                                (e?.flightUrl === null || e?.flightUrl === undefined || e?.flightUrl === '') ? <View style={{ height: 40, width: 40, borderRadius: 100, backgroundColor: 'red' }} />
                                                                    : <Image style={{ height: 40, width: 40, borderRadius: 100 }} source={{
                                                                        uri: API_IMG_URL + '/server/flightimage/' + e[0]?.flightUrl
                                                                    }} />
                                                            }
                                                            <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.021, width: width * 0.2, paddingLeft: 5 }}>{e[0]?.flightName}</Text>
                                                            {
                                                                e?.flight_details?.map((data, ind) => 
                                                                    {
                                                                        return (ind === 0)? (
                                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} key={ind}>
                                                                        <View style={{ alignItems: 'center' }}>

                                                                            <Text style={styles.Textlite}> {data.flights[0].departureLocation} {'\n'}(
                                                                                {
                                                                                    data.flights[0].flightList
                                                                                        .DepartureAirportLocationCode
                                                                                }
                                                                                )</Text>

                                                                            <Text style={styles.Text}>{moment(
                                                                                data.flights[0].flightList
                                                                                    .DepartureDateTime
                                                                            )
                                                                                ?.format("HH:mm:ss a")
                                                                                .substring(0, 5)}</Text>
                                                                            {/* <Text style={styles.Textlite}>{moment(
                                                                                data.flights[0].flightList
                                                                                    .DepartureDateTime
                                                                            )
                                                                                ?.format("HH:mm:ss a")
                                                                                .substring(9, 11)
                                                                                ?.toUpperCase()}</Text> */}
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
                                                                            <Text style={styles.Text}>{data?.totalStops} stop</Text>


                                                                        </View>
                                                                        <BackArrow />
                                                                        <View style={{ alignItems: 'center' }}>
                                                                            <Text style={styles.Textlite}>{
                                                                                data.flights[
                                                                                   0
                                                                                ].arrivalLocation
                                                                            } {'\n'} (
                                                                                {
                                                                                    data.flights[
                                                                                        0
                                                                                    ].flightList
                                                                                        .ArrivalAirportLocationCode
                                                                                }
                                                                                )</Text>
                                                                            <Text style={styles.Text}>{moment(
                                                                                data.flights[
                                                                                    0
                                                                                ].flightList.ArrivalDateTime
                                                                            )
                                                                                ?.format("HH:mm:ss a")
                                                                                .substring(0, 5)}</Text>
                                                                            {/* <Text style={styles.Textlite}>{moment(
                                                                                data.flights[
                                                                                    data.flights.length - 1
                                                                                ].flightList.ArrivalDateTime
                                                                            )
                                                                                ?.format("HH:mm:ss a")
                                                                                .substring(9, 11)
                                                                                ?.toUpperCase()}</Text> */}
                                                                        </View>
                                                                    </View>
                                                                        ):<></>
                                                                    }
                                                                )
                                                            }
                                                        </View>

                                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'flex-end' }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Text style={{ fontFamily: FONTS.font, color: COLORS.colorText }}>Rs:</Text>
                                                                <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.025, paddingLeft: 5 }}>{e?.totalFare}</Text>
                                                            </View>
                                                            <View style={{ width: 1, height: height * 0.06, backgroundColor: 'grey' }} />
                                                            <View style={styles.booknowBtn}>
                                                                <TouchableHighlight underlayColor={'transparent'} onPress={() => {
                                                                    // dispatch({type:actions.SET_REVALIDATE,payload:{'fare_source_code':e[0]?.FareSourceCode}})

                                                                    //  navigation.navigate('flightBooking',{flightInfo:route?.params?.prefs,itemInfo: e[0]})
                                                                    // handleDropdown(e[0]?.FareSourceCode)
                                                                }}>
                                                                    <Text style={styles.booknowText}>Book Now</Text>
                                                                </TouchableHighlight>
                                                            </View>
                                                        </View>
                                                    </View>

                                                </View>
                                            }
                                        </View>
                                        

                                    )                         
                                        })
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
    Textlite: { fontFamily: FONTS.font, color: 'grey', fontSize: height * 0.012, },
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
    filterView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

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
    FlightText: { color: 'black', fontFamily: FONTS.fontBold }


})