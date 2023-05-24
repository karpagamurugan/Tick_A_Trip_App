import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Dimensions, StyleSheet, ImageBackground, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import FONTS from '../constants/font';
import COLORS from '../constants/color';
import { useDispatch, useSelector } from "react-redux";
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import actions from '../../redux/Flight/actions';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { API_URL } from '../constants/constApi';
import axios from 'axios';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;


function FlightFilter(props) {
    const { Flight_search_result,Filtered_List } = useSelector((state) => state.FlightSearchReducer)
    const dispatch = useDispatch()
    const { setShowFilter } = props
    const { route } = props
    const { onApplied } = props;
    const { onClear } = props;
    var [priceRange, setPriceRange] = useState({min:(props?.Price?.min ==='')?'0':props?.Price.min,max:(props?.Price.max ==='')?'0':props?.Price.max}); //set price range for filter
    var [selectAirline, setSelectAirline] = useState(["All"])
    var [selectFlightStops, setSelectFlightStops] = useState(["Any"])
    const [cabin, setCabin] = useState([
        { id: 2, value: false, name: "Economy Class", selected: false },
        { id: 1, value: true, name: "Business Class", selected: false },
        { id: 3, value: false, name: "Premium Class", selected: false },
    ]);

    var [cabinIndex, setCabinIndex] = useState(0);

    var [multiSliderValue, setMultiSliderValue] = useState([0, 0]);
    var[minMaxSlider,setMinMaxSlider] =useState({MinItem:'',MaxItem:''})
    multiSliderValuesChange = values => setMultiSliderValue(values);

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

    useEffect(() => {
        axios.post(
            `${API_URL}/filter`,{'filter_type':'flight'}, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        }
        ).then((res) => {
          setMinMaxSlider(minMaxSlider = { MinItem: res.data.filter.min, MaxItem: res.data.filter.max })
          setMultiSliderValue([res.data.filter.min, res.data.filter.max])
        }).catch(err => {
           
        })
    }, []);

    const CheckFlightStopsName = [
        {
            label: 'Any',
            value: 'Any',
        },
        {
            label: 'Non-stop',
            value: 'Nonstop',
        },
        {
            label: '1 Stop',
            value: 'OneStop',
        },
        {
            label: '2 Stop',
            value: 'TwoStop',
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

    const onAppliedClick = (min,max, Airline, cabin, stops) => {
        onApplied(min,max , Airline, cabin, stops);
    }


    const ClearFilter=(min,max, Airline, cabin, stops)=>{
        onClear(min,max, Airline, cabin, stops)
    
    }

    return (
        <View style={{ backgroundColor: '#000000ba', width: width, height: height,}}>
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
                }}/>
            {/* <View style={styles.modalContainer}> */}
         
                  <ScrollView style={styles.filterModelSec}>
                  <View style={{ padding: 10, borderRadius: 20,paddingBottom:30}}>
                        <Text style={styles.modalTitle}>Refine Result</Text>
                        <View style={{ height: 0.5, backgroundColor: 'grey' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, paddingHorizontal: 5 }}>
                            <Text style={styles.FilterTitle}>Price</Text>
                            {/* <Text style={styles.priceRangeText}>{priceRange?.min}</Text> */}
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <MultiSlider
                                values={[multiSliderValue[0], multiSliderValue[1]]}
                                sliderLength={width * 0.75}
                                onValuesChange={multiSliderValuesChange}
                                min={parseInt(minMaxSlider.MinItem)}
                                max={parseInt(minMaxSlider.MaxItem)}
                                step={20}
                                allowOverlap
                                snapped
                                customMarkerLeft={{ color: { bg: 'red', color: 'red' } }}
                                selectedStyle={{
                                    backgroundColor: '#0041F2',
                                }}
                                unselectedStyle={{
                                    backgroundColor: '#d0d7de',
                                }}
                                color={'#009385'}
                            />
                        </View>
                      
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceValue}>{multiSliderValue[0]} </Text>
                            <Text style={styles.priceValue}>{multiSliderValue[1]}</Text>
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
                                        <View style={styles.radioButtonContainer} key={index}>
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
                            <View style={{ paddingLeft: 10,}}>
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
                            <TouchableHighlight style={styles.filterbtns} onPress={() =>ClearFilter()} underlayColor='#BBBBBB66'>
                                <Text style={styles.filterbtnText}>Clear</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.filterbtns} onPress={() =>setShowFilter(false)} underlayColor='#BBBBBB66'>
                                <Text style={styles.filterbtnText}>close</Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={styles.filterbtns} onPress={() => onAppliedClick(multiSliderValue[0],multiSliderValue[1],selectAirline,cabin[cabinIndex].name,selectFlightStops)} underlayColor='#1B5CB74D'>
                                <Text style={styles.filterbtnText}>Apply</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                  </ScrollView>
            {/* </View> */}
        </View>
    )
}



const styles = StyleSheet.create({
    filterModelSec: {
        backgroundColor: '#E9F3FF',
        position: 'absolute',
        width: width * 0.9,
        alignSelf: 'center',
        top: height * 0.1,
        paddingHorizontal: 5,
        paddingTop: 20,
        borderRadius: 10,
        height: height * 0.8,
        alignContent: 'center',
    },
    modalContainer: { marginHorizontal: 20, borderRadius: 10 , backgroundColor: '#E9F3FF',marginTop:0,alignContent:'center',alignItems:'center',alignSelf:'center'},
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
    },
    sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    priceRange: {
        fontFamily: FONTS.fontSemi,
        color: '#666666',
        paddingVertical: 1,
        fontSize: height * 0.015,
    },

})


export default FlightFilter