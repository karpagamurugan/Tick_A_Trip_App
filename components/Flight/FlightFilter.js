import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Dimensions, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import FONTS from '../constants/font';
import COLORS from '../constants/color';
import { useDispatch, useSelector } from "react-redux";
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;


function FlightFilter(props) {
    const { Flight_search_result } = useSelector((state) => state.FlightSearchReducer)
    const dispatch = useDispatch()
    const { setShowFilter } = props
    const { route } = props
    const { onApplied } = props;
    console.log('route', route)
    var [priceRange, setPriceRange] = useState(); //set price range for filter
    var [selectAirline, setSelectAirline] = useState([])
    var [selectFlightStops, setSelectFlightStops] = useState([])
    const [cabin, setCabin] = useState([
        { id: 2, value: false, name: "Economy Class", selected: false },
        { id: 1, value: true, name: "Business Class", selected: false },
        { id: 3, value: false, name: "Premium Class", selected: false },
    ]);
    var [cabinIndex, setCabinIndex] = useState(0);

    const CheckAirlineName = [
        {
            label: 'All',
            value: 'All',
        },
        {
            label: 'Spicejet',
            value: 'Spicejet',
        },
        {
            label: 'Indigo Airlines',
            value: 'Indigo Airlines',
        },
        {
            label: 'Air India',
            value: 'Air India',
        },
        {
            label: 'Vistara',
            value: 'Vistara',
        }
    ]

    const CheckFlightStopsName = [
        {
            label: 'Any',
            value: 'Any',
        },
        {
            label: 'Non-stop',
            value: 'Non-stop',
        },
        {
            label: '1 Stop',
            value: '1 Stop',
        },
        {
            label: '2 Stop',
            value: '2 Stop',
        }
    ]

    useEffect(() => {
        const cls = route.params.prefs.class
        cabin.findIndex(e => e.name.includes(cls))
        onRadioBtnClick(cabinIndex = cabin.findIndex(e => e.name.includes(cls)))
    }, [])

    const onRadioBtnClick = (i) => {
        setCabinIndex(cabinIndex = i)
    };

    const onAppliedClick = (price , Airline, cabin, stops) => {
        onApplied(price , Airline, cabin, stops);
    }

    return (
        <View style={{ backgroundColor: '#000000ba', width: width, height: height }}>
            <Pressable
                onPress={() => setShowFilter(false)}
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
                <ImageBackground source={require('../../Assert/Images/map.jpg')}
                    style={styles.modalBg}>
                    <View style={{ padding: 10, borderRadius: 20 }}>
                        <Text style={styles.modalTitle}>Refine Result</Text>
                        <View style={{ height: 0.5, backgroundColor: 'grey' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10, paddingHorizontal: 5 }}>
                            <Text style={styles.FilterTitle}>Price</Text>
                            <Text style={styles.priceRangeText}>{priceRange}</Text>
                        </View>
                        <Slider
                            minimumValue={0}
                            maximumValue={100000}
                            minimumTrackTintColor={COLORS.colorBtn}
                            thumbTintColor={COLORS.colorBtn}
                            onValueChange={(val) => {
                                setPriceRange(priceRange = val)
                            }}

                        />
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceValue}>0</Text>
                            <Text style={styles.priceValue}>100000</Text>
                        </View>

                        <View style={{ height: 0.5, backgroundColor: 'grey' }} />

                        <View style={{ marginTop: 6, paddingLeft: 5 }}>
                            <Text style={styles.FilterTitle}>Airlines</Text>
                            <View style={{ paddingLeft: 10 }}>
                                {
                                    CheckAirlineName.map((val, index) => (
                                        <View style={[styles.checkBox]} key={index}>
                                            <TouchableHighlight underlayColor='transparent' onPress={() => {
                                                if (!selectAirline.includes(val.value)) {
                                                    setSelectAirline(selectAirline = [...selectAirline, val.value])
                                                } else {
                                                    setSelectAirline(selectAirline.filter((item) => item !== val.value))
                                                }
                                            }}>
                                                <View style={styles.checkBox}>
                                                    {selectAirline.includes(val.value) ?
                                                        <View style={[styles.custmCheckBox, { backgroundColor: COLORS.colorBtn }]}>
                                                            <Ionicons name='checkmark' color={'white'} />
                                                        </View>
                                                        :
                                                        <View style={[styles.custmCheckBox, { backgroundColor: 'white' }]} />
                                                    }
                                                    <Text style={styles.checkInputLabel}>{val.label}</Text>
                                                </View>
                                            </TouchableHighlight>

                                        </View>
                                    ))
                                }
                            </View>

                            <View style={{ paddingTop: 10 }}>
                                <Text style={styles.FilterTitle}>Cabin</Text>
                                <View style={{ paddingLeft: 10 }}>
                                    {cabin.map((item, index) => (
                                        <View style={styles.radioButtonContainer}>
                                            <TouchableOpacity onPress={() => onRadioBtnClick(index)} style={styles.radioButton}>
                                                {/* <View style={styles.radioButtonIcon} /> */}

                                                {
                                                    (cabinIndex === index) ?
                                                        <FontistoIcon name="radio-btn-active" size={15} style={{ color: COLORS.colorBtn }} />
                                                        :
                                                        <FontistoIcon name="radio-btn-passive" size={15} />
                                                }
                                            </TouchableOpacity>
                                            <TouchableHighlight underlayColor='transparent' onPress={() => onRadioBtnClick(index)}>
                                                <Text style={styles.radioButtonText}>{item.name}</Text>
                                            </TouchableHighlight>
                                        </View>
                                    ))}
                                </View>
                            </View>

                            <Text style={[styles.FilterTitle, { paddingTop: 10 }]}>Stops</Text>
                            <View style={{ paddingLeft: 10 }}>
                                {
                                    CheckFlightStopsName.map((val, index) => (
                                        <View style={[styles.checkBox]} key={index}>
                                            <TouchableHighlight underlayColor='transparent' onPress={() => {
                                                if (!selectFlightStops.includes(val.value)) {
                                                    setSelectFlightStops(selectFlightStops = [...selectFlightStops, val.value])
                                                } else {
                                                    setSelectFlightStops(selectFlightStops.filter((item) => item !== val.value))
                                                }
                                            }}>
                                                <View style={styles.checkBox}>
                                                    {selectFlightStops.includes(val.value) ?
                                                        <View style={[styles.custmCheckBox, { backgroundColor: COLORS.colorBtn }]}>
                                                            <Ionicons name='checkmark' color={'white'} />
                                                        </View>
                                                        :
                                                        <View style={[styles.custmCheckBox, { backgroundColor: 'white' }]} />
                                                    }
                                                    <Text style={styles.checkInputLabel}>{val.label}</Text>
                                                </View>
                                            </TouchableHighlight>

                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 10 }}>
                            <TouchableHighlight style={styles.filterbtns} onPress={() => null} underlayColor='#BBBBBB66'>
                                <Text style={styles.filterbtnText}>Clear</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.filterbtns} onPress={() => onAppliedClick(priceRange,selectAirline,cabin[cabinIndex].name,selectFlightStops)} underlayColor='#1B5CB74D'>
                                <Text style={styles.filterbtnText}>Apply</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', marginTop: 20, marginHorizontal: 20, borderRadius: 50 },
    modalBg: { width: '100%', flexDirection: 'column', borderRadius: 20, alignSelf: 'center' },
    modalTitle: { fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.027, },
    listBottom: {
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
        justifyContent: 'space-between', borderBottomRightRadius: 5, marginTop: 10,
        borderBottomLeftRadius: 5
    },
    listBtnText: { fontFamily: FONTS.font, fontSize: height * 0.016, },
    FlightText: { color: 'black', fontFamily: FONTS.fontBold },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: 10
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2
    },
    custmCheckBox: { height: 16, width: 16, borderRadius: 2, borderColor: 'grey', borderWidth: 0.6, alignItems: 'center' },
    FilterTitle: {
        fontSize: height * 0.020,
        fontFamily: FONTS.fontSemi,
    },
    priceRangeText: {
        fontSize: height * 0.018,
        fontFamily: FONTS.fontSemi,
    },
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: 45
    },
    radioButtonText: {
        fontSize: 16,
        marginLeft: 5,
        lineHeight: 30
    },
    filterbtns: {
        paddingHorizontal: 20,
        paddingVertical: 7,
        backgroundColor: '#C2CAD585',
        marginTop: 10,
        borderRadius: 5
    },
    filterbtnText: {
        color: '#0041F2',
        fontSize: height * 0.016,
        fontFamily: FONTS.fontBold,
    },
    checkInputLabel: {
        paddingLeft: 10,
        fontSize: height * 0.017,
        lineHeight: 25,
    }

})


export default FlightFilter