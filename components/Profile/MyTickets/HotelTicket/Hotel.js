/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight,FlatList } from 'react-native';
import color from '../../../constants/color';
import font from '../../../constants/font';
import Appbar from '../../../common/Appbar';
import ArrowIcon from 'react-native-vector-icons/AntDesign';
import actions from '../../../../redux/user/actions';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons'
import HotelTicketView from '../HotelTicket/HotelCard';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


export default function Hotel({navigation}) {
    var [selectedTab, setSelectedTab] = useState(0);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type: actions.GET_UPCOMING_HOTEL_TICKETS
        })

        dispatch({
            type: actions.GET_CANCELLED_HOTEL_TICKETS
        })

        dispatch({
            type: actions.GET_COMPLETED_HOTEL_TICKETS
        })
    }, [])

    const { Completed_hotel, Cancelled_hotel, Upcoming_hotel } = useSelector((state) => state.userReducer)

    // console.log('completed',Upcoming_hotel)

    let DataList = [
        { id: '1', title: 'Arena Beach Hotel', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM1pZ3DnvfSaEHuHUB1OKCf_gbkQlvM-AUNQ&usqp=CAU" },
        { id: '2', title: 'Air Asia', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPDQqFgErfPNOw3jtU3GmCroBKOoO1XNqAAw&usqp=CAU' },
        { id: '3', title: 'Arena Beach Hotel', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTimgFyJTQ2c4JolnAYPa6x3kQQGKo5oRqqGQ&usqp=CAU' },
        { id: '4', title: 'Air Asia', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW57pI-v6ZLj1zeP29UVR0_E6y568VX_jTuw&usqp=CAU' },
        { id: '5', title: 'Arena Beach Hotel', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj7QlOTboF9eI4QfNXoSgCyxG9Mn50CjDm9A&usqp=CAU' }
    ]


    // setting tab item backgroundColor
    const hadleClick = (index) => {

        setSelectedTab(index)
    }



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



            <ScrollView>
                <View style={style.listView}>
                    {
                        (selectedTab === 0) ?
                            <ScrollView>
                                <View style={style.listView}>
                                    {(Upcoming_hotel?.bookings?.length === 0) ?
                                        <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                            <Image style={{ height: 150, width: 250, resizeMode: 'cover' }} source={require('../../../../Assert/loader/hotelTicketEmpty.gif')} />
                                            <Text style={{ fontFamily: font.font, paddingVertical: 5, color: 'black' }}>You Don't have any bookings</Text>
                                            <TouchableHighlight underlayColor={'transparent'} style={{ alignSelf: 'center', borderColor: 'black', borderWidth: 1 }}>
                                                <Text style={{ fontFamily: font.font, paddingVertical: 5, color: 'black', paddingHorizontal: 5 }} >Go to Booking</Text>
                                            </TouchableHighlight>
                                        </View>
                                        :
                                        // Upcoming_hotel?.bookings?.map((item, index) =>
                                        //    <HotelTicketView item={item} key={index}/>
                                        // )
                                        <FlatList 
                                        keyExtractor={(index) => index.toString()}
                                        // horizontal 
                                        data={Upcoming_hotel?.bookings}  
                                        renderItem={({item}) =>  
                                        <HotelTicketView item={item} navigation={navigation} type={'upcoming'}/>
                                                }  
                                        // ItemSeparatorComponent={this.renderSeparator}  
                                    />  
                                    }
                                </View>
                            </ScrollView> : (selectedTab === 1) ?
                                <ScrollView>
                                    <View style={style.listView}>
                                        {(Cancelled_hotel?.bookings?.length === 0) ?
                                            <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                                <Image style={{ height: 150, width: 250, resizeMode: 'cover' }} source={require('../../../../Assert/loader/hotelTicketEmpty.gif')} />
                                                <Text style={{ fontFamily: font.font, paddingVertical: 5, color: 'black' }}>You Don't have any bookings</Text>
                                                <TouchableHighlight underlayColor={'transparent'} style={{ alignSelf: 'center', borderColor: 'black', borderWidth: 1 }}>
                                                    <Text style={{ fontFamily: font.font, paddingVertical: 5, color: 'black', paddingHorizontal: 5 }} >Go to Booking</Text>
                                                </TouchableHighlight>
                                            </View>
                                            :
                                            Cancelled_hotel?.bookings?.map((item, index) => (
                                                <HotelTicketView item={item} navigation={navigation} type={'cancelled'}/>
                                                ))
                                        }
                                    </View>
                                </ScrollView> :
                                selectedTab === 2 ?
                                    <ScrollView>
                                        <View style={style.listView}>
                                            {(Completed_hotel?.bookings?.length === 0) ?
                                                <View style={{ alignSelf: 'center', marginTop: 50 }}>
                                                    <Image style={{ height: 150, width: 250, resizeMode: 'cover' }} source={require('../../../../Assert/loader/hotelTicketEmpty.gif')} />
                                                    <Text style={{ fontFamily: font.font, paddingVertical: 5, color: 'black' }}>You Don't have any bookings</Text>
                                                    <TouchableHighlight underlayColor={'transparent'} style={{ alignSelf: 'center', borderColor: 'black', borderWidth: 1 }}>
                                                        <Text style={{ fontFamily: font.font, paddingVertical: 5, color: 'black', paddingHorizontal: 5 }} >Go to Booking</Text>
                                                    </TouchableHighlight>
                                                </View>
                                                :
                                                Completed_hotel?.bookings?.map((item, index) => (
                                                    <HotelTicketView item={item} navigation={navigation} type={'completed'}/>
                                                    ))
                                            }
                                        </View>
                                    </ScrollView> : <View />
                    }

                </View>
            </ScrollView>

        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: { height: height, width: width, backgroundColor: 'white' },
    listView: { height: height, marginBottom: 50 },
    tabsBar: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: '#E3E7F0',
        margin: 12,
        padding: 8,
        width: "100%",
        alignSelf: 'center',
    },
    tabText: { fontSize: 12.5, fontFamily: font.font, alignSelf: 'center' },
    tabBtn: {
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        alignItems: 'center'
    },

})