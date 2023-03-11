import React, { useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';
import COLORS from '../../../constants/color';
import FONTS from '../../../constants/font';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import userAction from '../../../../redux/user/actions';
import moment from 'moment';
import FlightIcon from '../../../../Assert/Images/icon/flight-airplane-svgrepo-com.svg';
import FlightDetails from '../FlightTicket/FlightDetails';
import FlightAction from '../../../../redux/common/actions'
import { useDispatch } from 'react-redux';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default function FlightCard({ item, navigation, type }) {
const dispatch = useDispatch()
    return (
        <View style={style.card}>
            <View style={style.cardView}>
                <View style={{ paddingHorizontal: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={style.place}>{item?.DepartureAirportLocationCode}</Text>
                    <View style={style.DividerHR} />
                    <FlightIcon height={30} width={30} />
                    <View style={style.DividerHR} />

                    <Text style={style.place}>{item?.ArrivalAirportLocationCode}</Text>
                </View>
                <View style={style.cardText}>
                    <Text style={style.title}>PNR : {item?.AirlinePNR}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={style.depatureTime}>Depature : {moment(item?.DepartureDateTime).format('hh:mm a')}</Text>
                            <Text style={style.depatureTime}>Boarding : {moment(item?.ArrivalDateTime).format('hh:mm a')}</Text>

                        </View>
                        {
                       (type === 'upcoming')? 
                        <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                        <Text style={style.cancelbtn}>Cancel</Text>
                    </TouchableHighlight>:<View/>
                    }
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={style.bookingDate}>{moment(item?.DepartureDateTime).format('DD/MM/YYYY')}</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <TouchableHighlight
                                underlayColor='transparent'
                                onPress={() => {

                                    dispatch({
                                        type: userAction.SET_FLIGHT_TICKETS_DETAILS, payload: {
                                            "userId": item.id,
                                            navigation: navigation
                                        },
                                    });
                                    dispatch({ type: FlightAction.FLIGHT_LOADER, payload: true })
                                }}>
                                <Text style={style.viewDetail}>View Ticket</Text>
                            </TouchableHighlight>
                            <ArrowIcon name='down' size={12} color='#0041F2' />
                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
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
        fontFamily: FONTS.fontBold,
        color: COLORS.colorText,
        width: width * 0.6,
        fontSize: height * 0.023
    },
    cancelbtn: {
        backgroundColor: 'red',
        fontFamily: FONTS.font,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 2,
        color: 'white',
        marginRight: 10,
        fontSize: height * 0.02
    },
    viewDetail: {
        fontFamily: FONTS.font,
        fontSize: height * 0.017,
        color: '#0041F2',
        textDecorationLine: 'underline'
    },
    depatureTime:{ fontFamily: FONTS.font, fontSize: height * 0.02, color: '#898989' },
    DividerHR:{ width: 1, backgroundColor: 'grey', height: height * 0.02, marginVertical: 3 },
    place:{ fontFamily: FONTS.font,color:'grey' },
    bookingDate:{ fontFamily: FONTS.font, color: '#FE712A', fontSize: height * 0.02 }
  
   

})