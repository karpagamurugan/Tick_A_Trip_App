/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';
import FONTS from '../../../constants/font';
import Appbar from '../../../common/Appbar';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/user/actions';
import moment from 'moment';
import FlightIcon from '../../../../Assert/Images/icon/flight-airplane-svgrepo-com.svg';
import FlightDetails from '../FlightTicket/FlightDetails';
import { CommonActions } from '@react-navigation/native';
import FlightAction from '../../../../redux/common/actions'
import FlightCard from './FlightCard';
import COLORS from '../../../constants/color';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default function Flight({ navigation }) {
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
    }, [])

    const dispatch = useDispatch();

    const { Completed_flight, Cancelled_flight, Upcoming_flight } = useSelector((state) => state.userReducer)

    var [selectedTab, setSelectedTab] = useState(0);

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
                                    <Image  style={style.LoaderImg} source={require('../../../../Assert/loader/flightTicketEmpty.gif')} />
                                    <Text style={style.LoaderEmptyText}>You Don't have any bookings</Text>
                                    <TouchableHighlight underlayColor={'transparent'} style={{ alignSelf: 'center', borderColor: 'black', borderWidth: 1 }}>
                                        <Text style={style.bookingBtn} >Go to Booking</Text>
                                    </TouchableHighlight>
                                </View>
                                :

                                Upcoming_flight?.bookings?.reverse()?.map((item, index) => (
                                    <FlightCard item={item} navigation={navigation} type={'upcoming'} key={index} />

                                ))

                            }



                        </View>
                    </ScrollView> : (selectedTab === 1) ? <ScrollView>
                        <View style={style.listView}>

                            {
                                (Cancelled_flight?.bookings?.length === 0) ?
                                    <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                        <Image  style={style.LoaderImg} source={require('../../../../Assert/loader/flightTicketEmpty.gif')} />
                                        <Text style={style.LoaderEmptyText}>You Don't have any bookings</Text>
                                        <TouchableHighlight underlayColor={'transparent'} style={{ alignSelf: 'center', borderColor: 'black', borderWidth: 1 }}>
                                            <Text style={style.bookingBtn} >Go to Booking</Text>
                                        </TouchableHighlight>
                                    </View>
                                    :

                                    Cancelled_flight?.bookings?.reverse()?.map((item, index) => (
                                        <FlightCard item={item} navigation={navigation} type={'cancelled'} key={index} />

                                    ))
                            }

                        </View>
                    </ScrollView> : (selectedTab === 2) ?
                        <ScrollView>
                            <View style={style.listView}>

                                {
                                    (Completed_flight?.bookings?.length === 0) ?
                                        <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                            <Image style={style.LoaderImg} source={require('../../../../Assert/loader/flightTicketEmpty.gif')} />
                                            <Text style={style.LoaderEmptyText}>You Don't have any bookings</Text>
                                            <TouchableHighlight underlayColor={'transparent'} style={{ alignSelf: 'center', borderColor: 'black', borderWidth: 1 }}>
                                                <Text style={style.bookingBtn} >Go to Booking</Text>
                                            </TouchableHighlight>
                                        </View>
                                        :
                                        Completed_flight?.bookings?.reverse()?.map((item, index) => (
                                            <FlightCard item={item} navigation={navigation} type={'completed'} key={index} />

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
    tabText: { fontSize: 12.5, fontFamily: FONTS.font, alignSelf: 'center' },
    tabsBar: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: '#E3E7F0',
        margin: 12,
        padding: 8,
        width: "100%",
        alignSelf: 'center',
    },
    tabBtn: {
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        alignItems: 'center'
    },
    LoaderImg:{ height: 150, width: 200, resizeMode: 'cover' },
    LoaderEmptyText:{ fontFamily: FONTS.font, paddingVertical: 5, color: 'black' },
    bookingBtn:{ fontFamily: FONTS.font, paddingVertical: 5, color: 'black', paddingHorizontal: 5 }

})