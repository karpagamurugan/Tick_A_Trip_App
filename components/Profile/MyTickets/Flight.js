/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';
import color from '../../../constants/color';
import font from '../../../constants/font';
import Appbar from '../../common/Appbar';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/user/actions';
import moment from 'moment';
import FlightIcon from '../../../Assert/Images/icon/flight-airplane-svgrepo-com.svg';


let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default function Flight() {

    useEffect(() => {
        dispatch({
            type: actions.GET_UPCOMING_FLIGHT_TICKETS
        })

        dispatch({
            type: actions.GET_CANCELLED_FLIGHT_TICKETS
        })

        dispatch({
            type: actions.GET_COMPLETED_FLIGHT_TICKETS
        })
    },[])

    const dispatch = useDispatch();
    const { Completed_flight, Cancelled_flight, Upcoming_flight } = useSelector((state) => state.userReducer)

    var [selectedTab, setSelectedTab] = useState(1);

    let DataList = [
        { id: '1', title: 'Arena Beach Hotel', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaYRXqU-1tpipQxZoicIgjb-wxZRUOo0wPHA&usqp=CAU" },
        { id: '2', title: 'Air Asia', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ZPS893k69xL-ZIJ6Ke8oClDpwfo5aS8f5w&usqp=CAU' },
        { id: '3', title: 'Arena Beach Hotel', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh3OR7_YQuvpGVlxZIHRPAO5wfkCpz1WCppQ&usqp=CAU' },
        { id: '4', title: 'Air Asia', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_ShUmE0GjAvuNQWQyLz0OHyuFj-1y_MMXA6o202XPmzJ5np0Gn500crzKeyQhqqKnH8&usqp=CAU' },
        { id: '5', title: 'Arena Beach Hotel', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7cS6Loa2JeG-dx5PVfEgxNC3QaRZugod_Q&usqp=CAU' }
    ]


    // setting tab item backgroundColor
    const hadleClick = (index) => {
        setSelectedTab(index)
    }


    return (
        <View style={style.mainContainer}>
            <Appbar title={'FLIGHT BOOKINGS'} />
            {/* tab bar */}
            <View style={style.tabsBar}>
                <TouchableHighlight onPress={() => hadleClick(0)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn, { backgroundColor: selectedTab === 0 ? 'white' : 'transparent', }]}
                >
                    <Text style={[style.tabText, { color: selectedTab === 0 ? 'black' : 'gray' }]}>Upcoming Trip</Text>
                </TouchableHighlight>

                {/* tab bar */}
                <TouchableHighlight onPress={() => hadleClick(1)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn, { backgroundColor: selectedTab === 1 ? 'white' : 'transparent', }]}
                >
                    <Text style={[style.tabText, { color: selectedTab === 1 ? 'black' : 'gray' }]}>Cancelled Trip</Text>
                </TouchableHighlight>

                {/* tab bar */}
                <TouchableHighlight onPress={() => hadleClick(2)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn, { backgroundColor: selectedTab === 2 ? 'white' : 'transparent', }]}
                >
                    <Text style={[style.tabText, { color: selectedTab === 2 ? 'black' : 'gray' }]}>Completed Trip</Text>
                </TouchableHighlight>
            </View>

            {
                (selectedTab === 0) ?
                    <ScrollView>
                        <View style={style.listView}>
                            {(Upcoming_flight?.bookings?.length === 0) ?
                                <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                    <Image style={{ height: 150, width: 200, resizeMode: 'cover' }} source={require('../../../Assert/loader/flightTicketEmpty.gif')} />
                                    <Text style={{fontFamily:font.font,paddingVertical:5,color:'black'}}>You Don't have any bookings</Text>
                                    <TouchableHighlight underlayColor={'transparent'} style={{alignSelf:'center',borderColor:'black',borderWidth:1}}>
                                        <Text style={{fontFamily:font.font,paddingVertical:5,color:'black',paddingHorizontal:5}} >Go to Booking</Text>
                                    </TouchableHighlight>
                                </View>
                                :

                                Upcoming_flight?.bookings?.map((item, index) => (
                                    <View style={style.card} key={index}>
                                        <View style={style.cardView}>
                                            {/* <Image source={{ uri: item?.url }} style={{ width: width * 0.22, borderRadius: 7 }} /> */}
                                            <View style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: font.font }}>{item?.DepartureAirportLocationCode}</Text>
                                                <View style={{ width: 1, backgroundColor: 'grey', height: height * 0.02, marginVertical: 3 }} />
                                                <FlightIcon height={30} width={30} />
                                                <View style={{ width: 1, backgroundColor: 'grey', height: height * 0.02, marginVertical: 3 }} />

                                                <Text style={{ fontFamily: font.font }}>{item?.ArrivalAirportLocationCode}</Text>
                                            </View>
                                            <View style={style.cardText}>
                                                <Text style={style.title}>PNR : {item?.AirlinePNR}</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View>
                                                        <Text style={{ fontFamily: font.font, fontSize: height * 0.02, color: '#898989' }}>Depature : {moment(item?.DepartureDateTime).format('hh:mm a')}</Text>
                                                        <Text style={{ fontFamily: font.font, fontSize: height * 0.02, color: '#898989' }}>Boarding : {moment(item?.ArrivalDateTime).format('hh:mm a')}</Text>

                                                    </View>
                                                    <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                                        <Text style={style.cancelbtn}>Cancel</Text>
                                                    </TouchableHighlight>
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontFamily: font.font, color: '#FE712A', fontSize: height * 0.02 }}>{moment(item?.DepartureDateTime).format('DD/MM/YYYY')}</Text>

                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <TouchableHighlight>
                                                            <Text style={style.viewDetail}>View Ticket</Text>
                                                        </TouchableHighlight>
                                                        <ArrowIcon name='down' size={12} color='#0041F2' />
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))

                            }



                        </View>
                    </ScrollView> : (selectedTab === 1) ? <ScrollView>
                        <View style={style.listView}>

                            {
                                (Cancelled_flight?.bookings?.length === 0) ?
                                <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                    <Image style={{ height: 150, width: 200, resizeMode: 'cover' }} source={require('../../../Assert/loader/flightTicketEmpty.gif')} />
                                    <Text style={{fontFamily:font.font,paddingVertical:5,color:'black'}}>You Don't have any bookings</Text>
                                    <TouchableHighlight underlayColor={'transparent'} style={{alignSelf:'center',borderColor:'black',borderWidth:1}}>
                                        <Text style={{fontFamily:font.font,paddingVertical:5,color:'black',paddingHorizontal:5}} >Go to Booking</Text>
                                    </TouchableHighlight>
                                </View>
                                :

                                Cancelled_flight?.bookings?.map((item, index) => (
                                    <View style={style.card} key={index}>
                                        <View style={style.cardView}>
                                            {/* <Image source={{ uri: item?.url }} style={{ width: width * 0.22, borderRadius: 7 }} /> */}
                                            <View style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: font.font }}>{item?.DepartureAirportLocationCode}</Text>
                                                <View style={{ width: 1, backgroundColor: 'grey', height: height * 0.02, marginVertical: 3 }} />
                                                <FlightIcon height={30} width={30} />
                                                <View style={{ width: 1, backgroundColor: 'grey', height: height * 0.02, marginVertical: 3 }} />

                                                <Text style={{ fontFamily: font.font }}>{item?.ArrivalAirportLocationCode}</Text>
                                            </View>
                                            <View style={style.cardText}>
                                                <Text style={style.title}>PNR : {item?.AirlinePNR}</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <View>
                                                        <Text style={{ fontFamily: font.font, fontSize: height * 0.02, color: '#898989' }}>Depature : {moment(item?.DepartureDateTime).format('hh:mm a')}</Text>
                                                        <Text style={{ fontFamily: font.font, fontSize: height * 0.02, color: '#898989' }}>Boarding : {moment(item?.ArrivalDateTime).format('hh:mm a')}</Text>

                                                    </View>
                                                    {/* <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                                        <Text style={style.cancelbtn}>Cancel</Text>
                                                    </TouchableHighlight> */}
                                                </View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontFamily: font.font, color: '#FE712A', fontSize: height * 0.02 }}>{moment(item?.DepartureDateTime).format('DD/MM/YYYY')}</Text>

                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <TouchableHighlight>
                                                            <Text style={style.viewDetail}>View Ticket</Text>
                                                        </TouchableHighlight>
                                                        <ArrowIcon name='down' size={12} color='#0041F2' />
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                ))
                            }

                        </View>
                    </ScrollView> : (selectedTab === 2) ?
                        <ScrollView>
                            <View style={style.listView}>

                                {
                                     (Completed_flight?.bookings?.length === 0) ?
                                     <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                         <Image style={{ height: 150, width: 200, resizeMode: 'cover' }} source={require('../../../Assert/loader/flightTicketEmpty.gif')} />
                                         <Text style={{fontFamily:font.font,paddingVertical:5,color:'black'}}>You Don't have any bookings</Text>
                                         <TouchableHighlight underlayColor={'transparent'} style={{alignSelf:'center',borderColor:'black',borderWidth:1}}>
                                             <Text style={{fontFamily:font.font,paddingVertical:5,color:'black',paddingHorizontal:5}} >Go to Booking</Text>
                                         </TouchableHighlight>
                                     </View>
                                     :
                                    Completed_flight?.bookings?.map((item, index) => (
                                        <View style={style.card} key={index}>
                                            <View style={style.cardView}>
                                                {/* <Image source={{ uri: item?.url }} style={{ width: width * 0.22, borderRadius: 7 }} /> */}
                                                <View style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ fontFamily: font.font }}>{item?.DepartureAirportLocationCode}</Text>
                                                    <View style={{ width: 1, backgroundColor: 'grey', height: height * 0.02, marginVertical: 3 }} />
                                                    <FlightIcon height={30} width={30} />
                                                    <View style={{ width: 1, backgroundColor: 'grey', height: height * 0.02, marginVertical: 3 }} />

                                                    <Text style={{ fontFamily: font.font }}>{item?.ArrivalAirportLocationCode}</Text>
                                                </View>
                                                <View style={style.cardText}>
                                                    <Text style={style.title}>PNR : {item?.AirlinePNR}</Text>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <View>
                                                            <Text style={{ fontFamily: font.font, fontSize: height * 0.02, color: '#898989' }}>Depature : {moment(item?.DepartureDateTime).format('hh:mm a')}</Text>
                                                            <Text style={{ fontFamily: font.font, fontSize: height * 0.02, color: '#898989' }}>Boarding : {moment(item?.ArrivalDateTime).format('hh:mm a')}</Text>

                                                        </View>
                                                        <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                                            <Text style={style.cancelbtn}>Cancel</Text>
                                                        </TouchableHighlight>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Text style={{ fontFamily: font.font, color: '#FE712A', fontSize: height * 0.02 }}>{moment(item?.DepartureDateTime).format('DD/MM/YYYY')}</Text>

                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <TouchableHighlight>
                                                                <Text style={style.viewDetail}>View Ticket</Text>
                                                            </TouchableHighlight>
                                                            <ArrowIcon name='down' size={12} color='#0041F2' />
                                                        </View>

                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ))
                                }


                            </View>
                        </ScrollView> : null

            }

        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: { height: height, width: width, backgroundColor: 'white' },
    listView: { marginBottom: height * 0.15 },
    // tabsBar: {
    //     flexDirection: 'row',
    //     justifyContent: "space-around",
    //     backgroundColor: '#E3E7F0',
    //     margin: 12,
    //     borderRadius: 25,
    //     padding: 8,
    //     width: "60%",
    //     alignSelf: 'center',
    // },
    tabText: { fontSize: 12.5, fontFamily: font.font, alignSelf: 'center' },
    card: {
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: 'black',
        marginVertical: 7,
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 10
    },
    cardView: { flexDirection: 'row' },
    cardText: { paddingLeft: 15 },
    title: {
        fontFamily: font.fontBold,
        color: color.colorText,
        width: width * 0.6,
        fontSize: height * 0.023
    },
    cancelbtn: {
        backgroundColor: 'red',
        fontFamily: font.font,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 2,
        color: 'white',
        marginRight: 10,
        fontSize: height * 0.02
    },
    viewDetail: {
        fontFamily: font.font,
        fontSize: height * 0.017,
        color: '#0041F2',
        textDecorationLine: 'underline'
    },
    tabsBar: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: '#E3E7F0',
        margin: 12,
        padding: 8,
        width: "100%",
        alignSelf: 'center',
    },
    // tabText: { fontSize: 12.5, fontFamily: font.font, alignSelf: 'center' },
    tabBtn: {
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        alignItems: 'center'
    },

})