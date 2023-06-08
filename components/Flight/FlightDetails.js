import React, { useState } from "react";
import { View, Text, ImageBackground, ScrollView, StyleSheet, Dimensions, Image, TouchableHighlight } from 'react-native';
import color from '../constants/color';
import font from '../constants/font';
import BackArrow from '../../Assert/Images/icon/arrow.svg';
import FromArrow from '../../Assert/Images/icon/arrow2.svg'
import FlightIcon from '../../Assert/Images/icon/flight-airplane-svgrepo-com.svg';
import moment from 'moment/moment';
import { API_IMG_URL } from "../constants/constApi";
import Appbar from '../common/Appbar'
import RenderHtml from 'react-native-render-html';
import { useDispatch, useSelector } from "react-redux";
import actions from '../../redux/Flight/actions';
import COLORS from "../constants/color";

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

function FlightDetails(props) {
    let data = props.route?.params?.item;
    var [selectedTab, setSelectedTab] = useState(0);
    const dispatch = useDispatch()
    const { Fare_rules } = useSelector((state) => state.FlightSearchReducer)
    function timeConvert(n) {
        var num = n;
        var hours = Math.floor(num / 60) > 0 ? Math.floor(num / 60) + "H " : "";
        var rminutes =
            n - Math.floor(num / 60) * 60 > 0
                ? n - Math.floor(num / 60) * 60 + "M"
                : "";
        return hours + rminutes;
    }

    const hadleClick = (index) => {
        setSelectedTab(index)
    }

    const sourceFile = {
        html: `${Fare_rules?.message?.toString()}`
    };
    return (
        <View>
            <Appbar title={'Flight details'} />
            <ImageBackground source={require('../../Assert/Images/map.jpg')} style={{ height: height, width: width, paddingBottom: 20 }}>
                <View style={styles.tabsBar}>
                    <TouchableHighlight onPress={() => hadleClick(0)}
                        activeOpacity={0.2}
                        underlayColor={"#dddddd"}
                        style={[styles.tabBtn, { backgroundColor: selectedTab === 0 ? 'white' : 'transparent', }]}
                    >
                        <Text style={[styles.tabText, { color: selectedTab === 0 ? 'black' : 'gray' }]}>FLIGHT DETAILS</Text>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={() => {
                        dispatch({
                            type: actions.SET_FARE_RULES,
                            payload: {
                                fareSourceCode: data?.FareSourceCode
                            }
                        })
                        hadleClick(1)
                    }}
                        activeOpacity={0.2}
                        underlayColor={"#dddddd"}
                        style={[styles.tabBtn, { backgroundColor: selectedTab === 1 ? 'white' : 'transparent', }]}
                    >
                        <Text style={[styles.tabText, { color: selectedTab === 1 ? 'black' : 'gray' }]}>REFUND RULES</Text>
                    </TouchableHighlight>
                </View>

                <View style={{ height: height * 0.75, marginHorizontal: 10 }}>
                    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                        <View style={{ marginTop: 10 }}>

                            {
                                (selectedTab === 0) ?
                                    <View>
                                        {
                                            data?.flight_details?.map((item) => (
                                                item?.flights?.map((item1, index) => (
                                                    <View style={styles.card} key={index}>
                                                        <View style={{ paddingHorizontal: 10 }}>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                <View style={{ alignItems: 'center' }}>

                                                                    {

                                                                        (data?.flightUrl === null || data?.flightUrl === undefined || data?.flightUrl === '') ?
                                                                            <View style={{ height: 40, width: 40, borderRadius: 100, backgroundColor: COLORS.textBlue }}>
                                                                                <Image style={{ height: 40, width: 40, borderRadius: 100 }} source={require('../../Assert/Icons/flight_offer.png')} />
                                                                            </View>
                                                                            : <Image style={{ height: 40, width: 40, borderRadius: 100 }} source={{
                                                                                uri: API_IMG_URL + '/server/flightimage/' + data?.flightUrl
                                                                            }} />
                                                                    }

                                                                    <Text style={{ fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.021, width: width * 0.2 }}>{data?.flightName}</Text>

                                                                </View>
                                                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                                    <View style={{ alignItems: 'center' }}>
                                                                        <Text style={styles.Textlite}> {item1.departureLocation} {'\n'}(
                                                                            {
                                                                                item1.flightList
                                                                                    .DepartureAirportLocationCode
                                                                            }
                                                                            )</Text>

                                                                        <Text style={styles.Text}>{moment(
                                                                            item1.flightList
                                                                                .DepartureDateTime
                                                                        )
                                                                            ?.format("HH:mm:ss a")
                                                                            .substring(0, 5)}</Text>

                                                                    </View>
                                                                    <FromArrow />
                                                                    <View style={{ alignItems: 'center' }}>
                                                                        <Text style={styles.Text}> {timeConvert(
                                                                            item1.flightList
                                                                                .JourneyDuration
                                                                        )}</Text>
                                                                        <FlightIcon />


                                                                    </View>
                                                                    <BackArrow />
                                                                    <View style={{ alignItems: 'center' }}>
                                                                        <Text style={styles.Textlite}>{
                                                                            item1.arrivalLocation
                                                                        }{'\n'} (
                                                                            {
                                                                                item1.flightList
                                                                                    .ArrivalAirportLocationCode
                                                                            }
                                                                            )</Text>
                                                                        <Text style={styles.Text}>{moment(
                                                                            item1.flightList.ArrivalDateTime
                                                                        )
                                                                            ?.format("HH:mm:ss a")
                                                                            .substring(0, 5)}</Text>

                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>
                                                ))

                                            ))
                                        }

                                    </View>
                                    :

                                    <RenderHtml

                                        contentWidth={width * 0.8}
                                        source={sourceFile}
                                    />






                            }
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>
    )

}




const styles = StyleSheet.create({
    card: {
        backgroundColor: color.AppbarColor,
        marginHorizontal: 15,
        paddingVertical: 10,
        elevation: 2,
        borderRadius: 5,
        marginBottom: 15
    },
    Text: { fontFamily: font.fontSemi, color: color.colorText, fontSize: height * 0.012 },
    Textlite: { fontFamily: font.font, color: 'grey', fontSize: height * 0.0135, },
    tabBtn: {
        fontFamily: font.font,
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        alignItems: 'center',
        marginHorizontal: 10
    },
    tabText: { fontSize: 12.5, fontFamily: font.font, alignSelf: 'center' },
    tabsBar: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: '#E3E7F0',
        margin: 12,
        borderRadius: 25,
        padding: 8,
        width: "70%",
        alignSelf: 'center',
    },
})

export default React.memo(FlightDetails)