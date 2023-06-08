/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight, FlatList } from 'react-native';
import COLORS from '../../../constants/color';
import FONTS from '../../../constants/font';
import Appbar from '../../../common/Appbar';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import userAction from '../../../../redux/user/actions';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HotelTicketView from './HotelTicketView';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


 function Hotel({ navigation }) {
    var [selectedTab, setSelectedTab] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: userAction.GET_UPCOMING_HOTEL_TICKETS
        })

        dispatch({
            type: userAction.GET_CANCELLED_HOTEL_TICKETS
        })

        dispatch({
            type: userAction.GET_COMPLETED_HOTEL_TICKETS
        })
    }, [dispatch])

    const { Completed_hotel, Cancelled_hotel, Upcoming_hotel } = useSelector((state) => state.userReducer)

    // setting tab item backgroundColor
    const hadleClick = (index) => {

        setSelectedTab(index)
    }

    var [bookingList,setBookingList]=useState(bookingList={completed: Completed_hotel?.bookings?.reverse(),cancelled: Cancelled_hotel?.bookings?.reverse(),upcoming:Upcoming_hotel?.bookings?.reverse()})


    useEffect(()=>{
        setBookingList(bookingList={completed: Completed_hotel?.bookings?.reverse(),cancelled: Cancelled_hotel?.bookings?.reverse(),upcoming:Upcoming_hotel?.bookings?.reverse()})
    },[])

    return (
        <View style={style.mainContainer}>
            <Appbar title={'HOTEL BOOKINGS'} />
            {/* tab bar */}
            <View style={style.tabsBar}>
                <TouchableHighlight onPress={() => hadleClick(0)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn, { backgroundColor: selectedTab === 0 ? 'white' : 'transparent' }]}>
                    <Text style={[style.tabText, { color: selectedTab === 0 ? 'black' : 'gray' }]}>Upcoming Trip</Text>
                </TouchableHighlight>

                {/* tab bar */}
                <TouchableHighlight onPress={() => hadleClick(1)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn, { backgroundColor: selectedTab === 1 ? 'white' : 'transparent', }]}>
                    <Text style={[style.tabText, { color: selectedTab === 1 ? 'black' : 'gray' }]}>Cancelled Trip</Text>
                </TouchableHighlight>

                {/* tab bar */}
                <TouchableHighlight onPress={() => hadleClick(2)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn, { backgroundColor: selectedTab === 2 ? 'white' : 'transparent', }]}>
                    <Text style={[style.tabText, { color: selectedTab === 2 ? 'black' : 'gray' }]}>Completed Trip</Text>
                </TouchableHighlight>
            </View>



            <View style={style.listView}>
                {
                    (selectedTab === 0) ?
                    <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                    <View >
                                {(Upcoming_hotel?.bookings?.length === 0) ?
                                    <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                        <Image style={style.EmptyImg} source={require('../../../../Assert/loader/hotelTicketEmpty.gif')} />
                                        <Text style={style.EmptyText}>You Don't have any bookings</Text>
                                        <TouchableHighlight underlayColor={'transparent'} style={{ alignSelf: 'center', borderColor: 'black', borderWidth: 1 }}>
                                            <Text style={style.bookingText} >Go to Booking</Text>
                                        </TouchableHighlight>
                                    </View>
                                    :
                                  Upcoming_hotel?.bookings?.map((item, index) => (
                                        <HotelTicketView key={index} item={item} navigation={navigation} type={'upcoming'} />
                                    ))
                                }
                            </View>
                        </ScrollView> : (selectedTab === 1) ?
                            <View >
                                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                                    <View>
                                        {
                                            (Cancelled_hotel?.bookings?.length === 0) ?
                                                <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                                    <Image style={style.EmptyImg} source={require('../../../../Assert/loader/hotelTicketEmpty.gif')} />
                                                    <Text style={style.EmptyText}>You Don't have any bookings</Text>
                                                    <TouchableHighlight underlayColor={'transparent'} style={{ alignSelf: 'center', borderColor: 'black', borderWidth: 1 }}>
                                                        <Text style={style.bookingText} >Go to Booking</Text>
                                                    </TouchableHighlight>
                                                </View>
                                                :
                                              Cancelled_hotel?.bookings?.map((item, index) => (
                                                    <HotelTicketView key={index} item={item} navigation={navigation} type={'cancelled'} />
                                                ))
                                        }
                                    </View>
                                </ScrollView>

                            </View> :
                            selectedTab === 2 ?
                                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                                    <View >
                                        {(Completed_hotel?.bookings?.length === 0) ?
                                            <View style={{ alignSelf: 'center', }}>
                                                <Image style={style.EmptyImg} source={require('../../../../Assert/loader/hotelTicketEmpty.gif')} />
                                                <Text style={style.EmptyText}>You Don't have any bookings</Text>
                                                <TouchableHighlight underlayColor={'transparent'} style={{ alignSelf: 'center', borderColor: 'black', borderWidth: 1 }}>
                                                    <Text style={style.bookingText} >Go to Booking</Text>
                                                </TouchableHighlight>
                                            </View>
                                            :
                                          Completed_hotel?.bookings?.map((item, index) => (
                                                <HotelTicketView key={index} item={item} navigation={navigation} type={'completed'} />
                                            ))
                                        }
                                    </View>
                                </ScrollView>
                                : <View />
                }

            </View>

        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: { height: height, width: width, backgroundColor: 'white' },
    listView: { height: height * 0.75, paddingBottom: 10 },
    tabsBar: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: '#E3E7F0',
        margin: 12,
        padding: 8,
        width: "100%",
        alignSelf: 'center',
    },
    tabText: { fontSize: 12.5, fontFamily: FONTS.font, alignSelf: 'center' },
    tabBtn: {
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        alignItems: 'center'
    },
    EmptyImg: { height: 150, width: 250, resizeMode: 'cover' },
    EmptyText: { fontFamily: FONTS.font, paddingVertical: 5, color: 'black' },
    bookingText: { fontFamily: FONTS.font, paddingVertical: 5, color: 'black', paddingHorizontal: 5 }

})
export default React.memo(Hotel)