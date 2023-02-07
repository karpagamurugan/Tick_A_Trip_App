import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ScrollView, Image, FlatList } from 'react-native';
import Appbar from '../../common/Appbar';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../redux/user/actions';
import font from '../../../constants/font';
import color from '../../../constants/color';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default function HotelTicketDetails({ item, navigation }) {
    var [selectedTab, setSelectedTab] = useState(0);


    const { Hotel_details } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    // console.log("hotel details",Hotel_details)

    const hadleClick = (index) => {

        setSelectedTab(index)
    }
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

            <ScrollView>
                <View>
                    {
                        (selectedTab === 0) ?
                            <ScrollView>
                                <View>
                                    <View style={{ alignSelf: 'center', marginTop: 30, alignItems: "center", }}>
                                        <View style={style.borderLine}>
                                            <Text style={{ paddingBottom: 8, letterSpacing: 2, fontSize: 12, fontWeight: "700" }}>RESERVATION CONFIRMATION</Text>
                                        </View>
                                        <Text style={{ paddingTop: 8, fontSize: 15, fontWeight: "700", }}>Your Supplier Confirmation No : {Hotel_details?.message?.supplierConfirmationNum}</Text>
                                        <Image style={{ height: 180, width: 350, resizeMode: 'cover', marginTop: 15, borderRadius: 5 }} source={{ uri: Hotel_details?.message?.image }} />
                                    </View>

                                    <View style={{ marginHorizontal: 10, marginTop: 20, }}>
                                        <View style={{ flexDirection: "column" }}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Booking Status</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.status}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Booking Time </Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.bookingDateTime}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Check In</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.checkIn}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Check Out</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.checkOut}</Text>
                                            </View>

                                            <Text style={style.centerLine}></Text>

                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Booking Days</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.days}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Net Price</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.currency} {Hotel_details?.message?.roomBookDetails?.NetPrice}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Fare Type</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.fareType}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Customer Email</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.customerEmail}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Customer Phone</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.customerPhone}</Text>
                                            </View>

                                            <Text style={style.centerLine}></Text>

                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Hotel Name</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.hotelName}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={[style.bookingTitle,]}>Hotel Address</Text>
                                                <Text style={[style.bookingListContent,]}>{Hotel_details?.message?.roomBookDetails?.address}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>City</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.city}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Country</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.country}</Text>
                                            </View>
                                            <Text style={style.centerLine}></Text>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                                <Text style={style.bookingTitle}>Cancellation Policy</Text>
                                                <Text style={[style.bookingListContent,]}>{Hotel_details?.message?.roomBookDetails?.cancellationPolicy}</Text>
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </ScrollView> : (selectedTab === 1) ?
                                <ScrollView style={{ marginHorizontal: 10, marginTop: 20, }}>
                                    {Hotel_details?.message?.roomBookDetails?.rooms?.map((val, index) => (
                                        <View style={{ borderRadius: 10, padding: 15, borderWidth: 1, borderColor: '#bbb', }} key={index}>
                                            <Text style={style.RoomText}>Room : 1</Text>
                                            <View style={style.yellowBox}>
                                                <Text style={style.RoomListText}>Name: <Text style={{ color: "#565656", }}>{val?.name}</Text></Text>
                                                <Text style={style.RoomListText}>BoardType: <Text style={{ color: "#565656", }}>{val?.boardType}</Text></Text>
                                                <Text style={style.RoomListText}>Description: <Text style={{ color: "#565656", }}>{val?.description}</Text></Text>
                                            </View>
                                            {/* {val?.paxDetails?.name[0]?.map((item, index) => ( */}
                                            <Text key={index} style={style.holderName}>{val?.paxDetails?.name[0]} + {val?.paxDetails?.name?.length}</Text>
                                            {/* ))} */}
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
    tabText: { fontSize: 12.5, fontFamily: font.font, alignSelf: 'center' },
    tabBtn: {
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        alignItems: 'center'
    },
    borderLine: {
        borderBottomWidth: 3,
        borderColor: "#37383d",
        width: 280,
        alignItems: "center",
    },
    centerLine: {
        width: "100%",
        height: 1,
        backgroundColor: "#e0e0e0",
        marginVertical: 15,
    },
    bookingTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#5e5e5e",
        paddingBottom: 10,
        flex: 1,
        paddingLeft:10,
    },
    bookingListContent: {
        fontSize: 15,
        fontWeight: "500",
        color: "#a1a1a1",
        flex: 1,
    },
    RoomText: {
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        borderBottomWidth: 1,
        borderColor: "#e0e0e0",
        paddingBottom: 10,
    },
    yellowBox: {
        backgroundColor: "#f6c22036",
        padding: 15,
        marginTop: 10,
        borderBottomWidth: 2,
        borderColor: "#c5c5c5",
        borderRadius: 10,
    },
    RoomListText: {
        fontSize: 17,
        fontWeight: "500",
        color: "#161616",
        lineHeight: 35,
    },
    holderName: {
        fontSize: 17,
        fontWeight: "500",
        color: "#919aa3",
        marginTop: 15,
        padding: 15,
        borderLeftWidth: 4,
        borderRightWidth: 4,
        borderColor: "#f6c220",
        width: "70%",
        borderRadius: 10,


    }

})