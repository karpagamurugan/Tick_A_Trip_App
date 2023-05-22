import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native';
import Appbar from '../../../common/Appbar';
import { useDispatch, useSelector } from 'react-redux';
import FONTS from '../../../constants/font';
import COLORS from '../../../constants/color';
import moment from 'moment'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default function HotelTicketDetails({ item, navigation }) {
    var [selectedTab, setSelectedTab] = useState(0);
    const { Hotel_details } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const hadleClick = (index) => {
        setSelectedTab(index)
    }

    console.log('Hotel_details',Hotel_details.message)
    return (
        <View style={[style.mainContainer,]}>
            <Appbar title={'Booking Details'} />
            <View style={style.tabsBar}>
                <TouchableHighlight onPress={() => hadleClick(0)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn, { backgroundColor: selectedTab === 0 ? 'white' : 'transparent' }]}>
                    <Text style={[style.tabText, { color: selectedTab === 0 ? 'black' : 'gray' }]}>Room Booking Details</Text>
                </TouchableHighlight>

                {/* tab bar */}
                <TouchableHighlight onPress={() => hadleClick(1)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn, { backgroundColor: selectedTab === 1 ? 'white' : 'transparent', }]}>
                    <Text style={[style.tabText, { color: selectedTab === 1 ? 'black' : 'gray' }]}>Room Details</Text>
                </TouchableHighlight>
            </View>

            <ScrollView style={{ height: height }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View>
                    {
                        (selectedTab === 0) ?
                            <ScrollView>
                                <View>
                                    <View style={{ alignSelf: 'center', marginTop: 30, alignItems: "center", }}>

                                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                                            <Text style={{ fontSize: 15, color: "#003AA8", fontFamily: FONTS.mediam, }}>Your Supplier Confirmation No :</Text>
                                            <Text style={{ fontFamily: FONTS.mediam, }}> {Hotel_details?.message?.supplierConfirmationNum}</Text>
                                        </View>
                                       {
                                        (Hotel_details?.message?.roomBookDetails?.image ===null ||Hotel_details?.message?.roomBookDetails?.image ===undefined)?
                                        <Image style={{ height: 180, width: 350, resizeMode: 'cover', marginTop: 15, borderRadius: 5 }} source={{ uri: 'https://www.freepnglogos.com/uploads/hotel-logo-png/download-building-hotel-clipart-png-33.png' }} />

                                        :
                                        <Image style={{ height: 180, width: 350, resizeMode: 'cover', marginTop: 15, borderRadius: 5 }} source={{ uri: Hotel_details?.message?.roomBookDetails?.image }} />
                                       }
                                    </View>

                                    <Text style={[style.bookingDetailStyl]}>BOOKING DETAILS</Text>
                                    <View style={{ paddingHorizontal: 20 }}>
                                        <Text style={style.centerLine}></Text>
                                    </View>
                                    <View style={{ marginHorizontal: 20, }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                            <View>
                                                <View style={{ paddingBottom: 10 }}>
                                                    <Text style={style.bookingTitle}>Booking Status</Text>
                                                    <Text style={[style.bookingListContent,
                                                    { color: "#65C14F", fontFamily: FONTS.fontBold, fontSize: 20 }]}
                                                    >{Hotel_details?.message?.status}</Text>
                                                </View>
                                                <View style={{ paddingBottom: 10 }}>
                                                    <Text style={style.bookingTitle}>Check Out</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.checkOut}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{ paddingBottom: 10 }}>
                                                    <Text style={style.bookingTitle}>Booking Time </Text>
                                                    <Text style={style.bookingListContent}>{moment(Hotel_details?.message?.roomBookDetails?.bookingDateTime).format('mm:ss A')}</Text>
                                                </View>
                                                <View style={{ paddingBottom: 10 }}>
                                                    <Text style={style.bookingTitle}>Check In</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.checkIn}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View>
                                            <Text style={[style.bookingDetailStyl, { paddingTop: 30 }]}>HOTEL DETAILS</Text>
                                            <View style={{ paddingHorizontal: 20 }}>
                                                <Text style={style.centerLine}></Text>
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={style.bookingTitle}>Hotel Name</Text>
                                                <Text style={[style.bookingListContent, { color: "#00065E", fontFamily: FONTS.fontBold, fontSize: 19 }]}>{Hotel_details?.message?.roomBookDetails?.hotelName}</Text>
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={[style.bookingTitle,]}>Hotel Address</Text>
                                                <Text style={[style.bookingListContent,]}>{Hotel_details?.message?.roomBookDetails?.address}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", paddingBottom: 10,justifyContent:'space-between' }}>
                                                <View>
                                                    <Text style={style.bookingTitle}>City</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.city}</Text>
                                                </View>
                                                <View>
                                                    <Text style={style.bookingTitle}>Country</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.country}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ paddingTop: 30 }}>
                                            <Text style={[style.bookingDetailStyl]}>BILLING DETAILS</Text>
                                            <View style={{ paddingHorizontal: 20 }}>
                                                <Text style={style.centerLine}></Text>
                                            </View>
                                            <View style={[style.paddBottom10]}>
                                                <Text style={style.bookingTitle}>Booking Days</Text>
                                                <Text style={style.bookingListContent}>
                                                    {Hotel_details?.message?.roomBookDetails?.days}
                                                </Text>
                                            </View>
                                            <View style={[style.paddBottom10]}>
                                                <Text style={style.bookingTitle}>Net Price</Text>
                                                <Text style={style.bookingListContent}>
                                                    {Hotel_details?.message?.roomBookDetails?.currency}
                                                    {Hotel_details?.message?.roomBookDetails?.NetPrice}
                                                </Text>
                                            </View>
                                            {(Hotel_details?.message?.roomBookDetails?.fareType === '' || Hotel_details?.message?.roomBookDetails?.fareType === undefined || Hotel_details?.message?.roomBookDetails?.fareType === null) ? <View /> :
                                                <View style={[style.paddBottom10]}>
                                                    <Text style={style.bookingTitle}>Fair Type</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.fareType}</Text>
                                                </View>
                                            }
                                            {(Hotel_details?.message?.roomBookDetails?.customerEmail === '' || Hotel_details?.message?.roomBookDetails?.customerEmail === undefined || Hotel_details?.message?.roomBookDetails?.customerEmail === null) ? <View /> :
                                                <View style={[style.paddBottom10]}>
                                                    <Text style={style.bookingTitle}>Customer Email</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.customerEmail}</Text>
                                                </View>
                                            }
                                            {(Hotel_details?.message?.roomBookDetails?.customerPhone === '' || Hotel_details?.message?.roomBookDetails?.customerPhone === undefined || Hotel_details?.message?.roomBookDetails?.customerPhone === null) ? <View /> :
                                                <View style={[style.paddBottom10]}>
                                                    <Text style={style.bookingTitle}>Customer Phone</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.customerPhone}</Text>
                                                </View>
                                            }
                                        </View>
                                        <Text style={style.centerLine}></Text>
                                        <View style={{ paddingBottom: 20 }}>
                                            <Text style={style.bookingTitle}>Cancellation Policy</Text>
                                            <Text style={[style.bookingListContent, { fontSize: 14 }]}>{Hotel_details?.message?.roomBookDetails?.cancellationPolicy}</Text>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView> : (selectedTab === 1) ?
                                <ScrollView style={{ marginHorizontal: 10, marginTop: 20, }}>
                                    {Hotel_details?.message?.roomBookDetails?.rooms?.map((val, index) => (
                                        <View style={{ borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#D6E6F9', }} key={index}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ paddingRight: 10 }}>

                                                    {(Hotel_details?.message?.roomBookDetails?.image === null || Hotel_details?.message?.roomBookDetails?.image === undefined) ?
                                                        <Image
                                                            style={{ width: 140, height: 145, borderRadius: 5, }}
                                                            source={{uri:'https://cdn-icons-png.flaticon.com/128/489/489870.png'}}
                                                        /> :
                                                        <Image source={Hotel_details?.message?.roomBookDetails?.image} />
                                                    }
                                                </View>
                                                <View style={{ width: '100%', flex: 1 }} key={index} >
                                                    <Text style={style.RoomText}>Room : 1</Text>
                                                    <View>
                                                        <Text style={style.RoomListText}>Name: <Text style={{ color: "#000000", fontSize: 17, textTransform: 'capitalize' }}>{val?.name}</Text></Text>
                                                        <Text style={style.RoomListText}>BoardType: <Text style={{ color: "#000000", fontSize: 17, textTransform: 'capitalize' }}>{val?.boardType}</Text></Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <Text style={style.RoomListText}>Description: <Text style={{ color: "#000000", fontSize: 17, textTransform: 'capitalize' }}>{val?.description}</Text></Text>
                                            <Text style={[style.CoustomerName]}>{val?.paxDetails?.name[0]} + {val?.paxDetails?.name?.length}</Text>
                                        </View>
                                    ))}
                                </ScrollView> :
                                <View />
                    }

                </View>
            </ScrollView>
        </View>
    )
}


const style = StyleSheet.create({
    mainContainer: { height: height * 0.9, width: width, backgroundColor: 'white' },
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

    centerLine: {
        width: "100%",
        height: 1,
        backgroundColor: "#E9F3FF",
        marginVertical: 10,
    },
    bookingTitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#003AA8",
        paddingBottom: 6,
        flex: 1,
        fontFamily: FONTS.font,
    },
    bookingListContent: {
        fontSize: 18,
        color: "#222222",
        flex: 1,
        fontFamily: FONTS.mediam,
    },
    RoomText: {
        fontSize: 25,
        fontWeight: "700",
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#E9F3FF",
        paddingBottom: 10,
        color: '#0050A6',
        width: '100%',
    },

    RoomListText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#0050A6",
        lineHeight: 35,
        paddingTop: 6,
    },

    bookingDetailStyl: {
        color: "#003AA8",
        fontSize: 20,
        textAlign: "center",
        fontFamily: FONTS.fontBold,
    },
    paddBottom10: {
        paddingBottom: 10
    },
    CoustomerName: {
        fontSize: 19,
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: '#E9F3FF',
        marginTop: 8
    }
})