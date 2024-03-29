import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native';
import { useDispatch } from "react-redux";
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import FlightIcon from '../../Assert/Images/icon/flight-airplane-svgrepo-com.svg';
import BackArrow from '../../Assert/Images/icon/arrow.svg';
import { API_IMG_URL } from "../constants/constApi";
import FromIcon from '../../Assert/Images/icon/take-off.svg';
import actions from '../../redux/Flight/actions';
import moment from 'moment/moment';
import FromArrow from '../../Assert/Images/icon/arrow2.svg'

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

function FlightCard(props) {
    var item = props?.item;
    var navigation = props.navigation;
    const dispatch = useDispatch()

    function timeConvert(n) {
        var num = n;
        var hours = Math.floor(num / 60) > 0 ? Math.floor(num / 60) + "H " : "";
        var rminutes =
            n - Math.floor(num / 60) * 60 > 0
                ? n - Math.floor(num / 60) * 60 + "M"
                : "";
        return hours + rminutes;
    }

    return (
        <View style={styles.card} >
            <View style={{ paddingHorizontal: 2 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {

                        (item?.flightUrl === null || item?.flightUrl === undefined || item?.flightUrl === '') ?
                            <View style={{ height: 40, width: 40, borderRadius: 100, backgroundColor: COLORS.textBlue }}>
                                <Image style={{ height: 40, width: 40, borderRadius: 100 }} source={require('../../Assert/Icons/flight_offer.png')} />
                            </View>
                            : <Image style={{ height: 40, width: 40, borderRadius: 100 }} source={{
                                uri: API_IMG_URL + '/server/flightimage/' + item?.flightUrl
                            }} />


                    }
                    <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.021, width: width * 0.2, paddingLeft: 5 }}>{item?.flightName}</Text>
                    {
                        item?.flight_details?.map((data, ind) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} key={ind}>
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={styles.Textlite}> {data?.flights[0].departureLocation} {'\n'} (
                                        {
                                            data.flights[0].flightList
                                                .DepartureAirportLocationCode
                                        }
                                        ) </Text>

                                    <Text style={styles.Text}>{moment(
                                        data.flights[0].flightList
                                            .DepartureDateTime
                                    )
                                        ?.format("HH:mm:ss a")
                                        .substring(0, 5)}</Text>

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

                                </View>
                            </View>
                        ))
                    }

                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: FONTS.font, color: COLORS.colorText }}>{item?.CurrencyCode} :</Text>
                        <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.025, paddingLeft: 5 }}>{item?.totalFare}</Text>
                    </View>
                    <View style={{ width: 1, height: height * 0.06, backgroundColor: 'grey' }} />
                    <View style={styles.booknowBtn}>
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => {
                            dispatch({
                                type: actions.SET_REVALIDATE,
                                payload: { 'fare_source_code': item?.FareSourceCode },
                                navigation: navigation,
                                flightInfo: props?.prefs,
                                itemInfo: item
                            })
                        }}>
                            <Text style={styles.booknowText}>BOOK NOW</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>

            <View style={styles.listBottom}>
                <Text style={[styles.listBtnText, { color: COLORS.colorText }]}>{item?.journeytype}</Text>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.navigate('FlightDetails', { item: item })}>
                    <Text style={[styles.listBtnText, { color: COLORS.textBlue }]}>Fare details / Rules</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.AppbarColor,
        marginHorizontal: 10,
        paddingTop: 10,
        elevation: 2,
        borderRadius: 5,
        marginBottom: 15
    },
    Text: { fontFamily: FONTS.fontSemi, color: COLORS.colorText, fontSize: height * 0.012 },
    Textlite: { fontFamily: FONTS.font, color: 'grey', fontSize: height * 0.012 },
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
        backgroundColor: COLORS.colorBtn,
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
export default React.memo(FlightCard)