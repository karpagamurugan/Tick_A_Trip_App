/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ImageBackground, Modal, Pressable, Button, ScrollView } from 'react-native';
import Appbar from '../../common/Appbar';
import color from '../../../constants/color';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Flight from '../../../Assert/Images/icon/flight-2.svg';
import Filter from '../../../Assert/Images/icon/Icon feather-filter.svg';
import font from '../../../constants/font';
import BackArrow from '../../../Assert/Images/icon/arrow.svg';
import FromArrow from '../../../Assert/Images/icon/arrow2.svg'
import FlightIcon from '../../../Assert/Images/icon/flight-airplane-svgrepo-com.svg';
import FromIcon from '../../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../../Assert/Images/icon/take-off-2.svg';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import { useDispatch, useSelector } from 'react-redux';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default function FlightResult({ navigation }) {
    const { Flight_search_result } = useSelector((state) => state.FlightSearchReducer)

    var [showFilter, setShowFilter] = useState(false); //show filter modal
    var [priceRange, setPriceRange] = useState(); //set price range for filter
    const FilterList = {
        Airlines: [
            { value: 'All' },
            { value: 'Spicejet' },
            { value: 'Indigo Airlines' },
            { value: 'Air India' },
            { value: 'Vistara' },
        ],
        Cabin: [
            { value: 'Business class' },
            { value: 'Economy class' },
        ],
        Stops: [
            { value: 'Any' },
            { value: 'Non-stop' },
            { value: '1 Stop' },
            { value: '2 Stop' },
        ],
    }

    return (
        <View style={styles.mainContainer}>

            {/* appbar */}
            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <MaterialIcons name='keyboard-arrow-left' size={35} color={color.textBlue} />
                </TouchableHighlight>
                <Flight height={25} width={25} />
                <View style={styles.appbarPlaceContainer}>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FromIcon height={15} width={15} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>Coimbatore</Text>
                                <Text style={styles.appBarTraveller}>3 adult</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                            <ToIcon height={19} width={19} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>Coimbatore</Text>
                                <Text style={styles.appBarTraveller}>3 adult</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>


            <Modal
                transparent={true}
                visible={showFilter}
            >
                <Pressable
                    onPress={() => setShowFilter(!showFilter)}
                    style={{
                        position: 'absolute',
                        backgroundColor: '#000000',
                        opacity: 0.3,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }} />
                <View style={styles.modalContainer} >
                    <ImageBackground source={require('../../../Assert/Images/map.jpg')}
                        style={styles.modalBg}>
                        <View style={{ padding: 10, borderRadius: 20 }}>
                            <Text style={styles.modalTitle}>Refine Result</Text>
                            <View style={{ height: 0.5, backgroundColor: 'grey' }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.priceTitle}>Price</Text>
                                <Text style={styles.priceText}>{priceRange}</Text>
                            </View>
                            <Slider
                                style={{ paddingVertical: 5 }}
                                minimumValue={0}
                                maximumValue={100000}
                                minimumTrackTintColor={color.colorBtn}
                                thumbTintColor={color.colorBtn}
                                onValueChange={(val) => {
                                    setPriceRange(priceRange = val)
                                }}

                            />
                            <View style={styles.priceContainer}>
                                <Text style={styles.priceValue}>0</Text>
                                <Text style={styles.priceValue}>100000</Text>

                            </View>

                            <View style={{ height: 0.5, backgroundColor: 'grey' }} />

                            <View style={{ marginTop: 6, paddingLeft: 10 }}>
                                <Text style={styles.FilterTitle}>Airlines</Text>
                                {
                                    FilterList?.Airlines?.map((item, index) => (
                                        <View key={index} style={{ paddingTop: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Fontisto name='checkbox-passive' size={15} />
                                                {/* <Fontisto name='checkbox-active' size={15} /> */}
                                                <Text style={styles.filterText}>{item.value}</Text>

                                            </View>
                                        </View>
                                    ))
                                }

                                <Text style={styles.FilterTitle}>Cabin</Text>
                                {
                                    FilterList?.Cabin?.map((item, index) => (
                                        <View key={index} style={{ paddingTop: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Fontisto name='radio-btn-passive' size={15} />
                                                {/* <Fontisto name='radio-btn-active' size={15} /> */}
                                                <Text style={styles.filterText}>{item.value}</Text>

                                            </View>
                                        </View>
                                    ))
                                }

                                <Text style={styles.FilterTitle}>Stops</Text>
                                {
                                    FilterList?.Stops?.map((item, index) => (
                                        <View key={index} style={{ paddingTop: 5 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Fontisto name='checkbox-passive' size={15} />
                                                {/* <Fontisto name='checkbox-active' size={15} /> */}
                                                <Text style={styles.filterText}>{item.value}</Text>

                                            </View>
                                        </View>
                                    ))
                                }
                            </View>
                            <TouchableHighlight style={styles.filterApply} onPress={() => null} underlayColor='transparent'>
                                <Text style={{ color: 'white', fontFamily: font.fontBold, padding: 5 }}>Apply</Text>
                            </TouchableHighlight>
                        </View>
                    </ImageBackground>
                </View>
            </Modal>


            <View style={styles.filter}>
                <TouchableHighlight onPress={() => setShowFilter(!showFilter)} underlayColor='transparent'>
                    <Filter height={20} width={20} />
                </TouchableHighlight>
            </View>

            <View style={{ backgroundColor: 'grey', height: 0.3 }} />

            <ImageBackground source={require('../../../Assert/Images/map.jpg')} style={{ height: height * 0.7, width: width, paddingTop: 20 }}>
                <ScrollView>
                    <View>
                        {
                            Flight_search_result?.message?.map((item, index) => (
                                <View style={styles.card} key={index}>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: 'red' }} />
                                            <Text style={{ fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.025, width: width * 0.3 }}>{item?.flightName}</Text>
                                            {
                                                item?.flight_details?.map((data) => (
                                                  data?.flight?.map((e)=>(
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={styles.Textlite}>CBE</Text>
                                                        <Text style={styles.Text}>CBE</Text>
                                                        <Text style={styles.Textlite}>CBE</Text>
                                                    </View>
                                                    <FromArrow />
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={styles.Text}>1 H 30m</Text>
                                                        <FlightIcon />
                                                        <Text key={index} style={styles.Text}>{data?.totalStops} stop</Text>


                                                    </View>
                                                    <BackArrow />
                                                    <View style={{ alignItems: 'center' }}>
                                                        <Text style={styles.Textlite}>CBE</Text>
                                                        <Text style={styles.Text}>CBE</Text>
                                                        <Text style={styles.Textlite}>CBE</Text>
                                                    </View>
                                                </View>
                                                  ))
                                                ))
                                            }

                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'flex-end' }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ fontFamily: font.font, color: color.colorText }}>Rs:</Text>
                                                <Text style={{ fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.027, paddingLeft: 5 }}>{item?.totalFare}</Text>
                                            </View>
                                            <View style={{ width: 1, height: height * 0.06, backgroundColor: 'grey' }} />
                                            <View style={styles.booknowBtn}>
                                                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.navigate('flightBooking')}>
                                                    <Text style={styles.booknowText}>BOOK NOW</Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>
                                    </View>

                                    <View style={styles.listBottom}>
                                        <Text style={[styles.listBtnText, { color: color.colorText }]}>{item?.journeytype}</Text>
                                        <Text style={[styles.listBtnText, { color: color.textBlue }]}>View Flight Details</Text>
                                    </View>
                                </View>

                            ))
                        }
                    </View>
                </ScrollView>
            </ImageBackground>


        </View>
    )
}

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        backgroundColor: color.AppbarColor,
        height: height * 0.09,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15
    },
    appbarPlaceContainer: { backgroundColor: 'white', width: width * 0.75, height: 40, marginLeft: 10, borderRadius: 30 },
    appbarPlace: { fontFamily: font.font, fontSize: height * 0.018 },
    appBarTraveller: { fontFamily: font.font, marginTop: -6, fontSize: height * 0.016 },
    mainContainer: { height: height, width: width, backgroundColor: 'white' },
    filter: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
        backgroundColor: color.AppbarColor,
        padding: 10,
        borderRadius: 100,
        marginBottom: 7
    },
    filterText: { fontFamily: font.font, paddingLeft: 10 },
    card: {
        backgroundColor: color.AppbarColor,
        marginHorizontal: 15,
        paddingTop: 10,
        elevation: 2,
        borderRadius: 5,
        marginBottom: 15
    },
    Text: { fontFamily: font.fontSemi, color: color.colorText },
    Textlite: { fontFamily: font.font, color: 'grey', fontSize: height * 0.015 },
    booknowText: {
        color: 'white',
        fontFamily: font.mediam,
        paddingVertical: 3,
        paddingHorizontal: 10,
        fontSize: height * 0.018

    },
    booknowBtn: { alignItems: 'center', backgroundColor: color.textBlue, borderRadius: 30 },
    priceText: {
        fontFamily: font.fontSemi,
        color: 'white',
        backgroundColor: color.textBlue,
        paddingVertical: 1,
        paddingHorizontal: 7,
        borderRadius: 5,
        fontSize: height * 0.025,
        marginTop: 5,
        marginRight: 15
    },
    priceTitle: { fontFamily: font.fontSemi, color: 'black', fontSize: height * 0.025, paddingTop: 5, paddingLeft: 5 },
    priceValue: { fontFamily: font.font, color: 'black' },
    priceContainer: { flexDirection: 'row', paddingLeft: 5, justifyContent: 'space-between', paddingBottom: 5 },
    filterApply: {
        alignItems: 'center',
        backgroundColor: color.colorBtn,
        marginHorizontal: 20,
        marginVertical: 5,
        borderRadius: 5
    },
    FilterTitle: { fontFamily: font.fontBold, color: color.colorText },
    modalContainer: { flex: 1, justifyContent: 'center', marginTop: 20, marginHorizontal: 20, borderRadius: 50 },
    modalBg: { width: '100%', flexDirection: 'column', borderRadius: 20, alignSelf: 'center' },
    modalTitle: { fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.027 },
    listBottom: {
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
        justifyContent: 'space-between', borderBottomRightRadius: 5, marginTop: 10,
        borderBottomLeftRadius: 5
    },
    listBtnText: { fontFamily: font.font, fontSize: height * 0.018, }


})