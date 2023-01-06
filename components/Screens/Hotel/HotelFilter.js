/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableHighlight } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons'
import color from '../../../constants/color';
import font from '../../../constants/font';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const HotelFilter = (props) => {
    const { setOpenFilter } = props
    const [checkFecility, setCheckFecility] = useState(null);
    const [selectFecility, setSelectFecility] = useState([])
    const [checkLocality, setCheckLocality] = useState(null)
    const [selectLocality, setSelectLocality] = useState([])
    const [shortBy, setShortBy] = useState(null)
    const [rating, setRating] = useState(null)
    const [advisorRating, setAdvisorRating] = useState(null)
    const [fareType, setfareType] = useState(null)
    const [propertyType, setPropertyType] = useState(null)


    const CheckFecilityValues = [
        {
            label: 'Internet access',
            value: 'Internet access',
        },
        {
            label: 'Room Service',
            value: 'Room Service',
        },
        {
            label: 'Laundry Service',
            value: 'Laundry Service',
        },
        {
            label: 'Air conditioning',
            value: 'Air conditioning',
        }
    ]
    const CheckLocalityValues = [
        {
            label: 'Locality',
            value: 'locality',
        },
        {
            label: 'Region',
            value: 'region',
        }
    ]
    console.log('selectLocality', selectLocality)
    return (
        <View>
            <View style={style.filterFieldGroup}>
                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Min</Text>
                    <TextInput style={style.filterFieldInput} placeholder='Enter min price' />
                </View>
                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Max</Text>
                    <TextInput style={style.filterFieldInput} placeholder='Enter max price' />
                </View>
                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Sory By</Text>
                    <Dropdown
                        style={style.dropdown}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={data}

                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select sory by"
                        searchPlaceholder="Search..."
                        value={shortBy}
                        onChange={item => {
                            setShortBy(item.value);
                        }}
                    />
                </View>

                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Rating</Text>
                    <Dropdown
                        style={style.dropdown}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select sory by"
                        searchPlaceholder="Search..."
                        value={rating}
                        onChange={item => {
                            setRating(item.value);
                        }}
                    />
                </View>

                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Trip Advisor Rating</Text>
                    <Dropdown
                        style={style.dropdown}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select sory by"
                        searchPlaceholder="Search..."
                        value={advisorRating}
                        onChange={item => {
                            setAdvisorRating(item.value);
                        }}
                    />
                </View>

                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Fare Type</Text>
                    <Dropdown
                        style={style.dropdown}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={data}

                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select sory by"
                        searchPlaceholder="Search..."
                        value={fareType}
                        onChange={item => {
                            setfareType(item.value);
                        }}
                    />
                </View>

                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Property Type</Text>
                    <Dropdown
                        style={style.dropdown}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={data}

                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select sory by"
                        searchPlaceholder="Search..."
                        value={propertyType}
                        onChange={item => {
                            setPropertyType(item.value);
                        }}
                    />
                </View>
                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Facility</Text>
                    <View style={style.checkBoxGrop}>

                        {
                            CheckFecilityValues.map((val, index) => (
                                <View style={style.checkBox} key={index}>
                                    <TouchableHighlight underlayColor='transparent' onPress={() => {
                                        if (!selectFecility.includes(val.value)) {
                                            setCheckFecility(!val.value)
                                            setSelectFecility([...selectFecility, val.value])
                                        } else {
                                            setCheckFecility(null)
                                            setSelectFecility(selectFecility.filter((item) => item !== val.value))
                                        }
                                    }}>
                                        <View style={style.checkBox}>
                                            {selectFecility.includes(val.value) ?
                                                < Ionicons style={style.checkInputIcon} name='checkbox-sharp' />
                                                :
                                                <Ionicons style={style.checkInputIcon} name='checkbox-outline' />
                                            }
                                            <Text style={style.checkInputLabel}>{val.label}</Text>
                                        </View>
                                    </TouchableHighlight>

                                </View>
                            ))
                        }

                    </View>
                </View>
                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Locality</Text>
                    <View style={style.checkBoxGrop}>
                        {CheckLocalityValues.map((val, index) => (
                            <View style={style.checkBox} key={index}>
                                <TouchableHighlight underlayColor='transparent' onPress={() => {
                                    if (!selectLocality.includes(val.value)) {
                                        setSelectLocality([...selectLocality, val.value])
                                        setCheckLocality(val.value)
                                    } else {
                                        setSelectLocality(selectLocality.filter((item) => item !== val.value))
                                        setCheckLocality(null)
                                    }
                                }}>
                                    <View style={style.checkBox}>
                                        {selectLocality.includes(val.value) ?
                                            < Ionicons style={style.checkInputIcon} name='checkbox-sharp' />
                                            :
                                            <Ionicons style={style.checkInputIcon} name='checkbox-outline' />
                                        }
                                        <Text style={style.checkInputLabel}>{val.label}</Text>
                                    </View>

                                </TouchableHighlight>
                            </View>
                        ))}
                    </View>
                </View>
                <View style={style.filterBtnGroup}>
                    <TouchableHighlight style={style.filtersubBtn} onPress={(()=>setOpenFilter(false))}>
                        <Text style={{ color: '#fff' }}>Close</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={style.filtersubBtn}>
                        <Text style={{ color: '#fff' }}>Apply</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View >
    )
}
const style = StyleSheet.create({
    filtersubBtn: {
        backgroundColor: color.colorBtn,
        paddingVertical: 7,
        paddingHorizontal: 20,
    },
    filterBtnGroup: {
        marginBottom: 50,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    checkInputIcon: {
        color: color.colorBtn,
        fontSize: 18,
    },
    checkInputLabel: {
        fontFamily: font.mediam,
        letterSpacing: 0.5,
        fontSize: 13,
        marginLeft: 5,
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterFieldLabel: {
        color: '#333333',
        fontSize: 13,
        fontFamily: font.fontSemi,
        letterSpacing: 0.5,
        textTransform: 'capitalize',
    },
    dropdown: {
        borderColor: '#dadce0',
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 14,
        marginBottom: 10,
    },
    filterFieldInput: {
        borderColor: '#dadce0',
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 14,
        marginBottom: 10,
        paddingVertical: 5,
    }
})
export default HotelFilter