/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ImageBackground, Modal, Pressable } from 'react-native';
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


var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default function FlightResult({ navigation }) {

    var [showFilter, setShowFilter] = useState(false);
    const FilterList = [
        Airlines = [
            { value: 'All' },
            { value: 'Spicejet' },
            { value: 'Indigo Airlines' },
            { value: 'Air India' },
            { value: 'Vistara' },
        ],
        Cabin = [
            { value: 'Business class' },
            { value: 'Economy class' },
        ],
        Stops = [
            { value: 'Any' },
            { value: 'Non-stop' },
            { value: '1 Stop' },
            { value: '2 Stop' },
        ],
    ]

    return (
        <View style={styles.mainContainer}>
            {/* <Appbar title={'Search Flight'}/> */}
            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <MaterialIcons name='keyboard-arrow-left' size={35} color={color.textBlue} />
                </TouchableHighlight>
                <Flight height={25} width={25} />
                <View style={{ backgroundColor: 'white', width: width * 0.75, height: 40, marginLeft: 10, borderRadius: 30 }}>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FromIcon height={15} width={15} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ fontFamily: font.font, fontSize: height * 0.018 }}>Coimbatore</Text>
                                <Text style={{ fontFamily: font.font, marginTop: -6, fontSize: height * 0.016 }}>3 adult</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                            <ToIcon height={19} width={19} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={{ fontFamily: font.font, fontSize: height * 0.018 }}>Coimbatore</Text>
                                <Text style={{ fontFamily: font.font, marginTop: -6, fontSize: height * 0.016 }}>3 adult</Text>
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



                <View style={{ flex: 1, justifyContent: 'center', marginTop: 20 }} >
                    <View style={{
                        width: '90%', borderRadius: 10, backgroundColor: color.AppbarColor, flexDirection: 'column', height: '65%',
                        alignSelf: 'center'
                    }}>
                        <ImageBackground source={require('../../../Assert/Images/map.jpg')}
                            style={{ height: '100%', width: '100%', borderRadius: 50, opacity: 0.5 }}>
                            <View>
                           

                            </View>

                        </ImageBackground>
                    </View>
                </View>
            </Modal>

            <View style={styles.filter}>
                <TouchableHighlight onPress={() => setShowFilter(!showFilter)} underlayColor='transparent'>
                    <Filter height={20} width={20} />
                </TouchableHighlight>
            </View>
            <View style={{ backgroundColor: 'grey', height: 0.3 }} />
            <ImageBackground source={require('../../../Assert/Images/map.jpg')} style={{ height: height * 0.7, width: width, paddingTop: 20 }}>

                <View style={styles.card}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: 'red' }} />
                            <Text style={{ fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.025 }}>Air Asia</Text>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.Textlite}>CBE</Text>
                                <Text style={styles.Text}>CBE</Text>
                                <Text style={styles.Textlite}>CBE</Text>
                            </View>
                            <FromArrow />
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.Text}>1 H 30m</Text>
                                <FlightIcon />
                                <Text style={styles.Text}>1 stop</Text>
                            </View>
                            <BackArrow />
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.Textlite}>CBE</Text>
                                <Text style={styles.Text}>CBE</Text>
                                <Text style={styles.Textlite}>CBE</Text>
                            </View>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, alignItems: 'flex-end' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontFamily: font.font, color: color.colorText }}>Rs:</Text>
                                <Text style={{ fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.027, paddingLeft: 5 }}>9999</Text>
                            </View>
                            <View style={{ width: 1, height: height * 0.06, backgroundColor: 'grey' }} />
                            <View style={styles.booknowBtn}>
                                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.navigate('FlightResult')}>
                                    <Text style={styles.booknowText}>BOOK NOW</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
                        justifyContent: 'space-between', borderBottomRightRadius: 5, marginTop: 10,
                        borderBottomLeftRadius: 5
                    }}>
                        <Text style={{ fontFamily: font.font, fontSize: height * 0.018, color: color.colorText }}>Business Class</Text>
                        <Text style={{ fontFamily: font.font, fontSize: height * 0.018, color: color.textBlue }}>View Flight Details</Text>
                    </View>
                </View>

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
    mainContainer: {
        height: height,
        width: width,
        backgroundColor: 'white'
    },
    filter: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 10,
        backgroundColor: color.AppbarColor,
        padding: 10,
        borderRadius: 100,
        marginBottom: 7
    },
    card: {
        backgroundColor: color.AppbarColor,
        marginHorizontal: 15,
        paddingTop: 10,
        elevation: 2,
        borderRadius: 5

    },
    Text: {
        fontFamily: font.fontSemi,
        color: color.colorText
    },
    Textlite: {
        fontFamily: font.font,
        color: 'grey',
        fontSize: height * 0.015
    },
    booknowText: {
        color: 'white',
        fontFamily: font.mediam,
        paddingVertical: 3,
        paddingHorizontal: 10,
        fontSize: height * 0.018

    },
    booknowBtn: {
        alignItems: 'center',
        backgroundColor: color.textBlue,
        // marginHorizontal: 40,
        // marginBottom: 20,
        // marginTop: 20,
        borderRadius: 30
    },


})