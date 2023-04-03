/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableHighlight, Pressable, ScrollView } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../constants/color';
import FONTS from '../constants/font';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import hotelActions from '../../redux/Hotel/actions';
import commonActions from '../../redux/common/actions';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Fontisto from 'react-native-vector-icons/Fontisto';

const sortByOption = [
    { label: 'Price low high', value: 'price-low-high' },
    { label: 'Price high low', value: 'price-high-low' },
    { label: 'Rating low high', value: 'rating-low-high' },
    { label: 'Rating high low', value: 'rating-high-low' },
    { label: 'Alpha A Z', value: 'alpha-A-Z' },
    { label: 'Alpha Z-A', value: 'alpha-Z-A' },
    { label: 'Distance low high', value: 'distance-low-high' },
    { label: 'Distance high low', value: 'distance-high-low' },
];
const RatingOption = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
];
const AdvicerRatingOption = [
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
];
const fareTypeOption = [
    { label: 'Refundable', value: 'Refundable' },
    { label: 'Non-Refundable', value: 'Non-Refundable' },
];
const propertyTypeOption = [
    { label: 'HOTELS', value: 'HOTELS' },
    { label: 'RESORTS', value: 'RESORTS' },
    { label: 'APARTMENTS', value: 'APARTMENTS' },
]

const RatingList =[
    {label:'Less than 3',value:'2,1'},
    {label:'3',value:'3'},
    {label:'4',value:'4'},
    {label:'5',value:'5'},
]
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelFilter = (props) => {

    const dispatch = useDispatch()
    const { setOpenFilter } = props
    const { hotelSessionId, getHotelSearchResult } = useSelector((state) => state.HotelReducer)
    const { handleSubmit, control, formState: { errors }, reset, register, setValue, getValues } = useForm();
    var [checkFecility, setCheckFecility] = useState(null);
    var [selectFecility, setSelectFecility] = useState([])
    var [selectRating, setSelectRating] = useState([])
    const [checkLocality, setCheckLocality] = useState(null)
    const [selectLocality, setSelectLocality] = useState([])
    var [shortBy, setShortBy] = useState(null)
    // const [rating, setRating] = useState()
    // const [advisorRating, setAdvisorRating] = useState(null)
    const [fareType, setfareType] = useState(null)
    var [propertyType, setPropertyType] = useState(null)
    var [priceRange, setPriceRange] = useState();
    var [startRating, setStartRating] = useState();
    var [advisorRating, setAdvisorRating] = useState();
    const [multiSliderValue, setMultiSliderValue] = useState([0, 10000]);
    multiSliderValuesChange = values => setMultiSliderValue(values);
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

   const  ClearFilter =()=>{
    setAdvisorRating(advisorRating = 0)
    setSelectFecility(selectFecility = [])
    setSelectRating(selectRating=[])
    setPropertyType(propertyType = '')
    setShortBy(shortBy = '')

    reset({
        propertyType: '',
        sortBy:'',
    })

    }
    const onSubmit = (data) => {
        // let tempFilter = {
        //     filters: {
        //         price: {
        //             min: multiSliderValue[0],
        //             max: multiSliderValue[1],
        //         },
        //         rating:selectRating?.length !==0?selectRating.toString:'',
        //         // tripadvisorRating: tempAdvisorRating.length ? tempAdvisorRating : '',
        //         // faretype: data?.fareType ? data?.fareType : '',
        //         propertyType: data?.propertyType ? data?.propertyType : '',
        //         facility: selectFecility.length !== 0 ? selectFecility?.toString : '',
        //         sorting: data?.sortBy ? data?.sortBy:'' ,
        //         locality: selectLocality.length !== 0 ? selectLocality : '',
        //     }
        // }
            let tempFilter ={
                filters: {
                            price: {
                                min: multiSliderValue[0],
                                max: multiSliderValue[1],
                            },
                        }
            }

                if(advisorRating === 0){
                    tempFilter =tempFilter
                }else{
                    tempFilter = {
                        ...tempFilter,
                       filters:{
                        ...tempFilter?.filters,
                        tripadvisorRating:advisorRating
                    }
                    }
                }

                if(data?.sortBy === undefined ||data?.sortBy === null ||data?.sortBy === '' ){
                    tempFilter=tempFilter;
                }else {
                    tempFilter = {
                        ...tempFilter,
                       filters:{
                        ...tempFilter?.filters,
                         sorting: data?.sortBy 
                       }
                    }
                }
                if(data?.propertyType === undefined ||data?.propertyType === null ||data?.propertyType === '' ){
                    tempFilter=tempFilter;
                }else{
                
                    tempFilter = {
                        ...tempFilter,
                       filters:{
                        ...tempFilter?.filters,
                        propertyType: data?.propertyType
                       }
                    }
                }
                if(selectFecility?.length === 0 ||selectFecility ===undefined ||selectFecility === null){
                    tempFilter=tempFilter;
                }else{
                    tempFilter = {
                        ...tempFilter,
                       filters:{
                        ...tempFilter?.filters,
                        facility:selectFecility?.toString()
                       }
                    }
                }

                if(selectRating?.length === 0){
                    tempFilter=tempFilter;
                }else{
                    tempFilter = {
                        ...tempFilter,
                       filters:{
                        ...tempFilter?.filters,
                        rating:selectRating?.toString()
                       }
                    }
                }
                console.log('selectRating',advisorRating)

        dispatch({ type: commonActions.HOTEL_LOADER, payload: true })
                dispatch({
                    type: hotelActions.GET_HOTEL_FILTER, 
                    payload: {
                        sessionId: hotelSessionId,
                        // maxResult: getHotelSearchResult?.length,
                        maxResult: 100000,
                        ...tempFilter
                    },
                    openFile:setOpenFilter,
                })
        console.log('tempFilter',tempFilter)
    }
    return (
        <View style={{ backgroundColor: '#000000ba', width: width, height: height }}>
            <Pressable
                style={[style.filterCloseBtn]}
                onPress={() => setOpenFilter(false)}>
                <AntDesign style={style.filterIcon} name='filter' />
            </Pressable>
            <ScrollView style={style.filterModelSec}>

                {/* <Controller
                    control={control}
                    name="min"
                    rules={{
                        required: {
                            value: true,
                            message: 'Enter min price!',
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput {...register("min")}
                            name="min" onChangeText={value => onChange(value)} value={value} style={style.filterFieldInput} placeholder='Enter min price' />
                    )}
                /> */}
                {errors.min && (
                    <Text style={style.errorMessage}>{errors.min.message}</Text>
                )}
                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Select Price Range</Text>
                    <View style={{ paddingHorizontal: 0 }}>
                        <View style={{alignItems:'center'}}>
                        <MultiSlider
                            values={[multiSliderValue[0], multiSliderValue[1]]}
                            sliderLength={width*0.75}
                            onValuesChange={multiSliderValuesChange}
                            min={0}
                            max={100000}
                            step={100}
                            allowOverlap
                            snapped
                            customMarkerLeft={{color:{bg:'red',color:'red'}}}
                            selectedStyle={{
                                backgroundColor: '#0041F2',    
                              }}
                              unselectedStyle={{
                                backgroundColor: '#d0d7de',
                              }}
                              color={'#009385'}
                        />
                        </View>
                       
                        <View style={style.sliderOne}>
                            <Text style={style.priceRange}>{multiSliderValue[0]} </Text>
                            <Text style={style.priceRange}>{multiSliderValue[1]}</Text>
                        </View>
                    </View>
                </View>

                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Sory By</Text>
                    <Controller
                        control={control}
                        name="sortBy"
                        rules={{
                            required: {
                                value: false,
                                message: 'Select your gender!',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={style.dropdown}
                                placeholderStyle={style.placeholderStyle}
                                selectedTextStyle={style.selectedTextStyle}
                                inputSearchStyle={style.inputSearchStyle}
                                iconStyle={style.iconStyle}
                                containerStyle={{ fontFamily: FONTS.mediam }}
                                data={sortByOption}
                                {...register("sortBy")}
                                name="sortBy"
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select sory by"
                                searchPlaceholder="Search..."
                                value={shortBy}
                                onChange={item => {
                                    onChange(item.value)
                                    setShortBy(item.value);
                                }}
                            />
                        )}
                    />
                    {/* {errors.sortBy && (
        <Text style={style.errorMessage}>{errors.sortBy.message}</Text>
    )} */}
                </View>

                {/* <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Rating</Text>
                    <Controller
                        control={control}
                        name="rating"
                        rules={{
                            required: {
                                value: false,
                                message: 'Select rating!',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={style.dropdown}
                                placeholderStyle={style.placeholderStyle}
                                selectedTextStyle={style.selectedTextStyle}
                                inputSearchStyle={style.inputSearchStyle}
                                iconStyle={style.iconStyle}
                                data={RatingOption}
                                {...register("rating")}
                                name="rating"
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select sory by"
                                searchPlaceholder="Search..."
                                value={rating}
                                onChange={item => {
                                    onChange(item.value)
                                    setRating(item.value);
                                }}
                            />
                        )}
                    />
                </View> */}

                {/* <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Trip Advisor Rating</Text>
                    <Controller
                        control={control}
                        name="advisorRating"
                        rules={{
                            required: {
                                value: false,
                                message: 'Select Trip Advisor Rating!',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={style.dropdown}
                                placeholderStyle={style.placeholderStyle}
                                selectedTextStyle={style.selectedTextStyle}
                                inputSearchStyle={style.inputSearchStyle}
                                iconStyle={style.iconStyle}
                                data={AdvicerRatingOption}
                                {...register("advisorRating")}
                                name="advisorRating"
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select sory by"
                                searchPlaceholder="Search..."
                                value={advisorRating}
                                onChange={item => {
                                    onChange(item.value)
                                    setAdvisorRating(item.value);
                                }}
                            />
                        )}
                    />
                </View> */}

                {/* <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Fare Type</Text>
                    <Controller
                        control={control}
                        name="fareType"
                        rules={{
                            required: {
                                value: false,
                                message: 'Select fareType!',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={style.dropdown}
                                // placeholderStyle={style.placeholderStyle}
                                // selectedTextStyle={style.selectedTextStyle}
                                // inputSearchStyle={style.inputSearchStyle}
                                placeholderStyle={{fontFamily:FONTS.mediam}}
                                inputSearchStyle={{fontFamily:FONTS.mediam}}
                                selectedTextStyle={{fontFamily:FONTS.mediam}}
                                iconStyle={style.iconStyle}
                                data={fareTypeOption}
                                {...register("fareType")}
                                name="fareType"
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select sory by"
                                searchPlaceholder="Search..."
                                value={fareType}
                                onChange={item => {
                                    onChange(item.value)
                                    setfareType(item.value);
                                }}
                            />
                        )}
                    />
                </View> */}

                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Property Type</Text>
                    <Controller
                        control={control}
                        name="propertyType"
                        rules={{
                            required: {
                                value: false,
                                message: 'Select your Property Type!',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={style.dropdown}
                                placeholderStyle={style.placeholderStyle}
                                selectedTextStyle={style.selectedTextStyle}
                                inputSearchStyle={style.inputSearchStyle}
                                iconStyle={style.iconStyle}
                                data={propertyTypeOption}
                                {...register("propertyType")}
                                name="propertyType"
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Select Property type"
                                searchPlaceholder="Search..."
                                value={propertyType}
                                onChange={item => {
                                    onChange(item.value)
                                    setPropertyType(item.value);
                                }}
                            />
                        )}
                    />
                </View>

                {/* <View style={style.filterField}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={style.filterFieldLabel}>Rating</Text>
                        <Text style={style.priceRange}>{startRating}</Text>
                    </View>
                    <Slider

                        style={{ paddingVertical: 5, width: width, height: 20 }}
                        minimumValue={0}
                        maximumValue={6}
                        step={0.5}
                        minimumTrackTintColor={color.colorBtn}
                        thumbTintColor={color.colorBtn}
                        onValueChange={(val) => {
                            setStartRating(startRating = val)
                            // console.log("price Value",val)
                        }}

                    />
                </View> */}



<View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }}>
                    <View style={style.filterField}>
                        <Text style={style.filterFieldLabel}>Rating</Text>
                        <View style={[style.checkBoxGrop,{flexDirection:'row'}]}>
                            {
                                RatingList.map((val, index) => (
                                    <View style={[style.checkBox,{paddingHorizontal:7}]} key={index}>
                                        <TouchableHighlight underlayColor='transparent' onPress={() => {
                                            if (!selectRating.includes(val.value)) {
                                                console.log(selectRating,'djcejfdeo')
                                                setSelectRating(selectRating=[...selectRating, val.value])
                                            } else {
                                                console.log(selectRating,'djcejfdeo')
                                                setSelectRating(selectRating.filter((item) => item !== val.value))
                                            }
                                        }}>
                                            <View style={style.checkBox}>
                                                {selectRating.includes(val.value) ?
                                                    // < Fontisto style={style.checkInputIcon} name='checkbox-active' />
                                                    <View style={[style.custmCheckBox,{backgroundColor:COLORS.colorBtn}]}>
                                                        <Ionicons name='checkmark' color={'white'}/>
                                                        </View>
                                                    :
                                                    // <Fontisto style={style.checkInputIcon} name='checkbox-passive' />
                                                    <View style={[style.custmCheckBox,{backgroundColor:'white'}]}/>
                                                }
                                                <Text style={[style.checkInputLabel,{paddingLeft:7}]}>{val.label}</Text>
                                            </View>
                                        </TouchableHighlight>

                                    </View>
                                ))
                            }

                        </View>
                    </View>
                    {/* <View style={style.filterField}>
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
                        </View> */}
                </View>


                <View style={style.filterField}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={style.filterFieldLabel}>Trip Advisor Rating</Text>
                        <Text style={style.priceRange}>{advisorRating}</Text>
                    </View>
                    <Slider
                        style={{ paddingVertical: 5, width: width*0.85, height: 20 }}
                        minimumValue={0}
                        maximumValue={6}
                        step={0.5}
                        minimumTrackTintColor={COLORS.colorBtn}
                        thumbTintColor={COLORS.colorBtn}
                        onValueChange={(val) => {
                            setAdvisorRating(advisorRating = val)
                            // console.log("price Value",val)
                        }}

                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }}>
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
                                                    // < Fontisto style={style.checkInputIcon} name='checkbox-active' />
                                                    <View style={[style.custmCheckBox,{backgroundColor:COLORS.colorBtn}]}>
                                                    <Ionicons name='checkmark' color={'white'}/>
                                                    </View>
                                                    :
                                                    // <Fontisto style={style.checkInputIcon} name='checkbox-passive' />
                                                    <View style={[style.custmCheckBox,{backgroundColor:'white'}]}/>
                                                }
                                                <Text style={style.checkInputLabel}>{val.label}</Text>
                                            </View>
                                        </TouchableHighlight>

                                    </View>
                                ))
                            }

                        </View>
                    </View>
                    {/* <View style={style.filterField}>
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
                        </View> */}
                </View>
                <View style={style.filterBtnGroup}>
                    <TouchableHighlight underlayColor={'transparent'} style={style.filtersubBtn} onPress={(() =>ClearFilter())}>
                        <Text style={{ color: '#fff', fontFamily: FONTS.mediam, }}>Clear Filter</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'} onPress={handleSubmit(onSubmit)} style={style.filtersubBtn}>
                        <Text style={{ color: '#fff', fontFamily: FONTS.mediam, }}>Apply</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>

        </View>
    )
}
const style = StyleSheet.create({
    errorMessage: {
        color: 'red'
    },
    filterField: {
        paddingBottom: 5,
    },
    filtersubBtn: {
        backgroundColor: COLORS.colorBtn,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
    filterBtnGroup: {
        marginBottom: 20,
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    checkInputIcon: {
        // color: COLORS.colorBtn,
        color: 'grey',
        borderRadius:2, 
        fontSize: 18,
    },
    checkInputLabel: {
        fontFamily: FONTS.mediam,
        letterSpacing: 0.5,
        fontSize: 13,
        marginLeft: 5,
        color:'black'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical:2
    },
    filterFieldLabel: {
        color: '#333333',
        fontSize: 14,
        fontFamily: FONTS.fontSemi,
        letterSpacing: 0.5,
        textTransform: 'capitalize',
    },
    dropdown: {
        borderColor: '#dadce0',
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: FONTS.mediam,
        marginBottom: 10,
    },
    filterFieldInput: {
        borderColor: '#dadce0',
        borderWidth: 1,
        paddingLeft: 10,
        fontSize: 14,
        fontFamily: FONTS.mediam,
        marginBottom: 10,
        paddingVertical: 5,
    },
    priceRange: {
        fontFamily: FONTS.fontSemi,
        color: '#666666',
        paddingVertical: 1,
        borderRadius: 5,
        fontSize: height * 0.015,
    },
    priceTitle: { fontFamily: FONTS.fontSemi, color: 'black', fontSize: height * 0.025, paddingTop: 5, paddingLeft: 5 },
    priceValue: { fontFamily: FONTS.font, color: 'black' },
    priceContainer: { flexDirection: 'row', paddingLeft: 5, justifyContent: 'space-between', paddingBottom: 5 },
    filterIcon: {
        fontSize: 22,
        color: '#0050A6',
        padding: 5,
        backgroundColor: '#E9F3FF',
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

    },
    filterCloseBtn: {
        position: "absolute",
        top: 40,
        right: 20,
    },
    filterModelSec: {
        backgroundColor: '#E9F3FF',
        position: 'absolute',
        width: width * 0.9,
        alignSelf: 'center',
        top: height * 0.1,
        // padding: 20,
        paddingHorizontal:20,
        paddingTop:20,
        // height: height * 0.75,
        borderRadius: 10,
    },
    selectedTextStyle: {
        fontFamily: FONTS.mediam,
    },
    inputSearchStyle: {
        fontFamily: FONTS.mediam,
    },
    sliderOne: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    placeholderStyle:{
        color:'grey'
    },
    custmCheckBox:{height:16,width:16,borderRadius:2,borderColor:'grey',borderWidth:0.6,alignItems:'center'}

})
export default HotelFilter