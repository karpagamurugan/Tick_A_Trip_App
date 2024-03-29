import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native';
import Appbar from '../../../common/Appbar';
import { useDispatch, useSelector } from 'react-redux';
import FONTS from '../../../constants/font';
import COLORS from '../../../constants/color';
import moment from 'moment'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

function HotelTicketDetails({ item, navigation }) {


    var [selectedTab, setSelectedTab] = useState(0);
    const { Hotel_details } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
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

            <ScrollView style={{ height: height }} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View>
                    {
                        (selectedTab === 0) ?
                            <ScrollView>
                                <View>
                                    <View style={{ alignSelf: 'center', marginTop: 30, alignItems: "center", }}>

                                        <View style={{ flexDirection: "row", alignItems: "center", }}>
                                            <Text style={{ fontSize: 15, color: "#003AA8", fontFamily: FONTS.mediam, }}>Your Supplier Confirmation No :</Text>
                                            <Text style={{ fontFamily: FONTS.mediam, }}> {Hotel_details?.message?.supplier_confirmation_no}</Text>
                                        </View>
                                        {
                                            (Hotel_details?.message?.roomBookDetails?.image === null || Hotel_details?.message?.roomBookDetails?.image === undefined) ?
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
                                                    >{Hotel_details?.message?.booking_status}</Text>
                                                </View>
                                                <View style={{ paddingBottom: 10 }}>
                                                    <Text style={style.bookingTitle}>Check Out</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.check_out}</Text>
                                                </View>
                                            </View>
                                            <View>
                                                <View style={{ paddingBottom: 10 }}>
                                                    <Text style={style.bookingTitle}>Booking Time </Text>
                                                    <Text style={style.bookingListContent}>{moment(Hotel_details?.message?.booking_time).format('mm:ss A')}</Text>
                                                </View>
                                                <View style={{ paddingBottom: 10 }}>
                                                    <Text style={style.bookingTitle}>Check In</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.check_in}</Text>
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
                                                <Text style={[style.bookingListContent, { color: "#00065E", fontFamily: FONTS.fontBold, fontSize: 19 }]}>{Hotel_details?.message?.hotel_name}</Text>
                                            </View>
                                            <View style={{ paddingBottom: 10 }}>
                                                <Text style={[style.bookingTitle,]}>Hotel Address</Text>
                                                <Text style={[style.bookingListContent,]}>{Hotel_details?.message?.hotel_address}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row", paddingBottom: 10, justifyContent: 'space-between' }}>
                                                <View>
                                                    <Text style={style.bookingTitle}>City</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.city}</Text>
                                                </View>
                                                <View>
                                                    <Text style={style.bookingTitle}>Country</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.country}</Text>
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
                                                    {Hotel_details?.message?.booking_days}
                                                </Text>
                                            </View>
                                            <View style={[style.paddBottom10]}>
                                                <Text style={style.bookingTitle}>Net Price</Text>
                                                <Text style={style.bookingListContent}>
                                                    {/* {Hotel_details?.message?.roomBookDetails?.currency} */}
                                                    {Hotel_details?.message?.net_price}
                                                </Text>
                                            </View>
                                            {(Hotel_details?.message?.fare_type === '' || Hotel_details?.message?.fare_type === undefined || Hotel_details?.message?.fare_type === null) ? <View /> :
                                                <View style={[style.paddBottom10]}>
                                                    <Text style={style.bookingTitle}>Fair Type</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.fare_type}</Text>
                                                </View>
                                            }
                                            {(Hotel_details?.message?.customer_email === '' || Hotel_details?.message?.customer_email === undefined || Hotel_details?.message?.customer_email === null) ? <View /> :
                                                <View style={[style.paddBottom10]}>
                                                    <Text style={style.bookingTitle}>Customer Email</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.customer_email}</Text>
                                                </View>
                                            }
                                            {(Hotel_details?.message?.customer_phone === '' || Hotel_details?.message?.customer_phone === undefined || Hotel_details?.message?.customer_phone === null) ? <View /> :
                                                <View style={[style.paddBottom10]}>
                                                    <Text style={style.bookingTitle}>Customer Phone</Text>
                                                    <Text style={style.bookingListContent}>{Hotel_details?.message?.customer_phone}</Text>
                                                </View>
                                            }
                                        </View>
                                        <Text style={style.centerLine}></Text>
                                        <View style={{ paddingBottom: 20 }}>
                                            <Text style={style.bookingTitle}>Cancellation Policy</Text>
                                            <Text style={[style.bookingListContent, { fontSize: 14 }]}>{Hotel_details?.message?.cancellation_policy}</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <View>
                                            <Text style={[style.commonTitle, { paddingTop: 20, paddingLeft: 15 }]}>Payment Details</Text>
                                        </View>
                                        <View style={style.bg}>
                                            <View style={style.amountContainer}>
                                                <Text style={style.amountName}>Base Fare</Text>
                                                <Text style={style.priceTag}><Text style={style.price}>{Hotel_details?.message?.total_amount_paid}/-</Text></Text>
                                            </View>
                                            <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                                            <View style={style.amountContainer}>
                                                <Text style={style.amountName}>Taxes</Text>
                                                <Text style={style.priceTag}> <Text style={style.price}>{Hotel_details?.message?.tax}/-</Text></Text>
                                            </View>
                                            <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                                            <View style={style.amountContainer}>
                                                <Text style={style.amountName}>Convenience Fee</Text>
                                                <Text style={style.priceTag}> <Text style={style.price}>{Hotel_details?.message?.convenience_fee}/-</Text></Text>
                                            </View>


                                            <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                                            <View style={style.amountContainer}>
                                                <Text style={style.amountName}>Discount & Adjusment</Text>
                                                <Text style={style.price}>{(Hotel_details?.message?.discount_amount === null || Hotel_details?.message?.discount_amount === 0 || Hotel_details?.message?.discount_amount === '0') ? '0' : ("-" + Hotel_details?.message?.discount_amount)}/-</Text>
                                            </View>

                                            <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />
                                            <View style={style.total}>
                                                <Text style={style.totalText}>Total</Text>
                                                <Text style={{ color: 'white', fontFamily: FONTS.fontBold }}>:</Text>
                                                <Text style={style.priceTag}> {Hotel_details?.message?.currency}  <Text style={[style.price, { fontSize: height * 0.03 }]}>{Hotel_details?.message?.order_amount}</Text></Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </ScrollView> : (selectedTab === 1) ?
                                <ScrollView style={{ marginHorizontal: 10, marginTop: 20, }}>
                                    {(Hotel_details?.message?.room_details === false || Hotel_details?.message?.room_details === 'false' || Hotel_details?.message?.room_details === undefined || Hotel_details?.message?.room_details.length === 0) ?
                                        <View /> :
                                        Hotel_details?.message?.room_details.map((val, index) => (
                                            <View style={{ borderRadius: 10, padding: 10, borderWidth: 1, borderColor: '#D6E6F9', }} key={index}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ paddingRight: 10 }}>

                                                        {(Hotel_details?.message?.roomBookDetails?.image === null || Hotel_details?.message?.roomBookDetails?.image === undefined) ?
                                                            <Image
                                                                style={{ width: 140, height: 145, borderRadius: 5, }}
                                                                source={{ uri: 'https://cdn-icons-png.flaticon.com/128/489/489870.png' }}
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
                                                <Text style={[style.CoustomerName]}>{val?.paxDetails?.name[0]} + {val?.paxDetails?.name?.length - 1}</Text>
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
    },
    commonTitle: {
        color: '#212529',
        fontSize: height * 0.025,
        fontFamily: FONTS.mediam,
    },
    bg: { backgroundColor: COLORS.bg, padding: 20, margin: 10, borderRadius: 7, elevation: 5, shadowColor: COLORS.bg },
    amountContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    amountName: { fontFamily: FONTS.light, color: 'white', fontSize: height * 0.022 },
    price: { fontFamily: FONTS.mediam, color: 'white', fontSize: height * 0.026 },
    priceTag: { fontFamily: FONTS.font, color: 'white', fontSize: height * 0.017 },
    total: {
        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.darkblue,
        paddingHorizontal: 15, paddingVertical: 3, borderRadius: 22, alignItems: 'center'
    },
    totalText: { fontFamily: FONTS.fontBold, color: 'white', fontSize: height * 0.022 },
})

export default React.memo(HotelTicketDetails)