import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ScrollView, Image, FlatList } from 'react-native';
import Appbar from '../../../common/Appbar';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../../../../redux/user/actions';
import font from '../../../constants/font';
import color from '../../../constants/color';
import moment from 'moment'

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

            <ScrollView style={{height:height}}>
                <View>
                    {
                        (selectedTab === 0) ?
                            <ScrollView>
                                <View>
                                    <View style={{ alignSelf: 'center', marginTop: 30, alignItems: "center", }}>
                                        {/* <View style={style.borderLine}>
                                            <Text style={{ paddingBottom: 8, letterSpacing: 2, fontSize: 12, fontWeight: "700" }}>RESERVATION CONFIRMATION</Text>
                                        </View> */}
                                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                                            <Text style={{ fontSize: 15, color: "#003AA8", fontFamily: font.mediam, }}>Your Supplier Confirmation No :</Text>
                                            <Text style={{ fontFamily: font.mediam, }}> {Hotel_details?.message?.supplierConfirmationNum}</Text>
                                        </View>
                                        <Image style={{ height: 180, width: 350, resizeMode: 'cover', marginTop: 15, borderRadius: 5 }} source={{ uri: Hotel_details?.message?.image }} />
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
                                                    { color: "#65C14F", fontFamily: font.fontBold, fontSize: 20 }]}
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
                                                <Text style={[style.bookingListContent, { color: "#00065E", fontFamily: font.fontBold, fontSize: 19 }]}>{Hotel_details?.message?.roomBookDetails?.hotelName}</Text>
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={[style.bookingTitle,]}>Hotel Address</Text>
                                                <Text style={[style.bookingListContent,]}>{Hotel_details?.message?.roomBookDetails?.address}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", paddingBottom: 10 }}>
                                                <View style={{ width: "60%" }}>
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
                                            {(Hotel_details?.message?.roomBookDetails?.fareType===''||Hotel_details?.message?.roomBookDetails?.fareType===undefined||Hotel_details?.message?.roomBookDetails?.fareType===null)?<View/>:
                                                <View style={[style.paddBottom10]}>
                                                <Text style={style.bookingTitle}>Fair Type</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.fareType}</Text>
                                            </View>
                                            }
                                           {(Hotel_details?.message?.roomBookDetails?.customerEmail===''||Hotel_details?.message?.roomBookDetails?.customerEmail===undefined||Hotel_details?.message?.roomBookDetails?.customerEmail===null)?<View />:
                                             <View style={[style.paddBottom10]}>
                                             <Text style={style.bookingTitle}>Customer Email</Text>
                                             <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.customerEmail}</Text>
                                         </View>
                                           }
                                            {(Hotel_details?.message?.roomBookDetails?.customerPhone===''||Hotel_details?.message?.roomBookDetails?.customerPhone===undefined||Hotel_details?.message?.roomBookDetails?.customerPhone===null)?<View />:
                                                <View style={[style.paddBottom10]}>
                                                <Text style={style.bookingTitle}>Customer Phone</Text>
                                                <Text style={style.bookingListContent}>{Hotel_details?.message?.roomBookDetails?.customerPhone}</Text>
                                            </View>
                                            }
                                        </View>
                                        <Text style={style.centerLine}></Text>
                                        <View style={{paddingBottom:20}}>
                                            <Text style={style.bookingTitle}>Cancellation Policy</Text>
                                            <Text style={[style.bookingListContent,{fontSize:14}]}>{Hotel_details?.message?.roomBookDetails?.cancellationPolicy}</Text>
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
                                            <Text style={style.holderName}>{val?.paxDetails?.name[0]} + {val?.paxDetails?.name?.length}</Text>
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
        backgroundColor: "#E9F3FF",
        marginVertical: 10,
    },
    bookingTitle: {
        fontSize: 15,
        fontWeight: "500",
        color: "#003AA8",
        paddingBottom: 6,
        flex: 1,
        fontFamily: font.font,
    },
    bookingListContent: {
        fontSize: 18,
        color: "#222222",
        flex: 1,
        fontFamily: font.mediam,
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
    },
    bookingDetailStyl: {
        color: "#003AA8",
        fontSize: 20,
        textAlign: "center",
        fontFamily: font.fontBold,
    },
    paddBottom10: {
        paddingBottom: 10
    }
})