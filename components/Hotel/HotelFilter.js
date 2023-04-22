/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableHighlight, Pressable, ScrollView, FlatList } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons'
import COLORS from '../constants/color';
import FONTS from '../constants/font';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import hotelActions from '../../redux/Hotel/actions';
import commonActions from '../../redux/common/actions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import { API_URL } from '../constants/constApi';

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

const RatingList = [
    { label: 'Less than 3', value: '2,1' },
    { label: '3', value: '3' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
]
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelFilter = (props) => {

    const dispatch = useDispatch()
    const { setOpenFilter,openFilter } = props
    const { hotelSessionId, getHotelSearchResult } = useSelector((state) => state.HotelReducer)
    const { handleSubmit, control, formState: { errors }, reset, register, setValue, getValues } = useForm();
    var [checkFecility, setCheckFecility] = useState(null);
    var [selectFecility, setSelectFecility] = useState([])
    var [selectRating, setSelectRating] = useState([])
    var [selectAdvisorRating, setSelectAdvisorRating] = useState([])
    const [checkLocality, setCheckLocality] = useState(null)
    const [selectLocality, setSelectLocality] = useState([])
    var [shortBy, setShortBy] = useState(null)
    const [fareType, setfareType] = useState(null)
    var [propertyType, setPropertyType] = useState(null)
    var [priceRange, setPriceRange] = useState();
    var [startRating, setStartRating] = useState();
    var [multiSliderValue, setMultiSliderValue] = useState([0, 0]);
    var[minMaxSlider,setMinMaxSlider] =useState({MinItem:'',MaxItem:''})
    var [facilityShow, setFacilityShow] = useState(false);


    multiSliderValuesChange = values => setMultiSliderValue(values);
    const CheckFecilityAllValues = [
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
        },
        {
            label: 'Pub',
            value: 'Pub',
        },
        {
            label: 'Bath',
            value: 'Bath',
        },
        {
            label: '24-hour check-in',
            value: '24-hour check-in',
        },
        {
            label: 'Wi-Fi',
            value: 'Wi-Fi',
        },
        {
            label: 'Medical Assistance',
            value: 'Medical Assistance',
        },
        {
            label: 'Bar',
            value: 'Bar',
        },
        {
            label: 'Shower',
            value: 'Shower',
        },
        {
            label: 'Wheelchair',
            value: 'Wheelchair',
        },
        {
            label: 'Currency Exchange',
            value: 'Currency Exchange',
        },
        {
            label: 'Housekeeping',
            value: 'Housekeeping',
        },
        {
            label: 'TV Room',
            value: 'TV Room',
        },
        {
            label: 'Car Park',
            value: 'Car Park',
        },
        {
            label: 'WLAN acces',
            value: 'WLAN acces',
        },
        {
            label: 'Conference Room',
            value: 'Conference Room',
        },
        {
            label: 'Restaurant',
            value: 'Restaurant',
        },
        {
            label: 'Games room',
            value: 'Games room',
        },
        {
            label: 'Casino',
            value: 'Casino',
        },
        {
            label: 'Theatre',
            value: 'Theatre',
        },
        {
            label: 'Nightclub',
            value: 'Nightclub',
        },
        {
            label: 'Shops',
            value: 'Shops',
        },
        {
            label: 'Cafe',
            value: 'Cafe',
        },
        {
            label: 'Lift',
            value: 'Lift',
        },
        {
            label: 'Cafe',
            value: 'Cafe',
        },
        {
            label: '24-hour reception',
            value: '24-hour reception',
        },
    ]
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

    const ClearFilter = () => {
        setSelectFecility(selectFecility = [])
        setSelectRating(selectRating = [])
        setPropertyType(propertyType = '')
        setShortBy(shortBy = '')
        setSelectAdvisorRating(selectAdvisorRating = [])

        reset({
            propertyType: '',
            sortBy: '',
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
        let tempFilter = {
            filters: {
                price: {
                    min: multiSliderValue[0],
                    max: multiSliderValue[1],
                },
            }
        }

        if (selectAdvisorRating?.length === 0) {
            tempFilter = tempFilter;
        } else {
            tempFilter = {
                ...tempFilter,
                filters: {
                    ...tempFilter?.filters,
                    tripadvisorRating: selectAdvisorRating?.toString()
                }
            }
        }




        if (data?.sortBy === undefined || data?.sortBy === null || data?.sortBy === '') {
            tempFilter = tempFilter;
        } else {
            tempFilter = {
                ...tempFilter,
                filters: {
                    ...tempFilter?.filters,
                    sorting: data?.sortBy
                }
            }
        }
        if (data?.propertyType === undefined || data?.propertyType === null || data?.propertyType === '') {
            tempFilter = tempFilter;
        } else {
            tempFilter = {
                ...tempFilter,
                filters: {
                    ...tempFilter?.filters,
                    propertyType: data?.propertyType
                }
            }
        }
        if (selectFecility?.length === 0 || selectFecility === undefined || selectFecility === null) {
            tempFilter = tempFilter;
        } else {
            tempFilter = {
                ...tempFilter,
                filters: {
                    ...tempFilter?.filters,
                    facility: selectFecility?.toString()
                }
            }
        }

        if (data?.propertyType === undefined || data?.propertyType === null || data?.propertyType === '') {
            tempFilter = tempFilter;
        } else {

            tempFilter = {
                ...tempFilter,
                filters: {
                    ...tempFilter?.filters,
                    propertyType: data?.propertyType
                }
            }
        }

        dispatch({ type: commonActions.HOTEL_LOADER, payload: true })
        dispatch({
            type: hotelActions.GET_HOTEL_FILTER,
            payload: {
                sessionId: hotelSessionId,
                // maxResult: getHotelSearchResult?.length,
                maxResult: 100000,
                ...tempFilter
            },
            openFile: setOpenFilter,
        })

    }
    useEffect(() => {
        axios.post(
            `${API_URL}/filter`,{'filter_type':'hotel'}, {
            headers: {
                accept: 'application/json',
                // 'Content-Type': 'multipart/form-data',
            },
        }
        ).then((res) => {
       
        //    setMinMaxSlider(res.data.filter.max)
         
          setMinMaxSlider(minMaxSlider = { MinItem: res.data.filter.min, MaxItem: res.data.filter.max })
          setMultiSliderValue([res.data.filter.min, res.data.filter.max])
        }).catch(err => {
           
        })

    }, []);

    return (
        <View style={{ backgroundColor: '#000000ba', width: width, height: height }}>
            <Pressable
                style={[style.filterCloseBtn]}
                onPress={() => setOpenFilter(false)}>
                <AntDesign style={style.filterIcon} name='filter' />
            </Pressable>
            <ScrollView style={style.filterModelSec}>

                <View style={style.filterField}>
                    <Text style={style.filterFieldLabel}>Select Price Range</Text>
                    <View style={{ paddingHorizontal: 0 }}>
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
                        }}

                    />
                </View> */}



                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }}>
                    <View style={style.filterField}>
                        <Text style={style.filterFieldLabel}>Star Rating</Text>
                        <View style={[style.checkBoxGrop, { flexDirection: 'row' }]}>
                            {
                                RatingList.map((val, index) => (
                                    <View style={[style.checkBox, { paddingHorizontal: 7 }]} key={index}>
                                        <TouchableHighlight underlayColor='transparent' onPress={() => {
                                            if (!selectRating.includes(val.value)) {
                                                setSelectRating(selectRating = [...selectRating, val.value])
                                            } else {
                                                setSelectRating(selectRating.filter((item) => item !== val.value))
                                            }
                                        }}>
                                            <View style={style.checkBox}>
                                                {selectRating.includes(val.value) ?
                                                    <View style={[style.custmCheckBox, { backgroundColor: COLORS.colorBtn }]}>
                                                        <Ionicons name='checkmark' color={'white'} />
                                                    </View>
                                                    :
                                                    <View style={[style.custmCheckBox, { backgroundColor: 'white' }]} />
                                                }
                                                <Text style={[style.checkInputLabel, { paddingLeft: 7 }]}>{val.label} </Text>
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
                        {/* <Text style={style.priceRange}>{advisorRating}</Text> */}
                    </View>
                    {/* <Slider
                        style={{ paddingVertical: 5, width: width*0.85, height: 20 }}
                        minimumValue={0}
                        maximumValue={6}
                        step={0.5}
                        minimumTrackTintColor={COLORS.colorBtn}
                        thumbTintColor={COLORS.colorBtn}
                        onValueChange={(val) => {
                            setAdvisorRating(advisorRating = val)
                        }}

                    /> */}


                    <View style={[style.checkBoxGrop, { flexDirection: 'row' }]}>
                        {
                            RatingList.map((val, index) => (
                                <View style={[style.checkBox, { paddingHorizontal: 7 }]} key={index}>
                                    <TouchableHighlight underlayColor='transparent' onPress={() => {
                                        if (!selectAdvisorRating.includes(val.value)) {
                                            setSelectAdvisorRating(selectAdvisorRating = [...selectAdvisorRating, val.value])
                                        } else {
                                            setSelectAdvisorRating(selectAdvisorRating.filter((item) => item !== val.value))
                                        }
                                    }}>
                                        <View style={style.checkBox}>
                                            {selectAdvisorRating.includes(val.value) ?
                                                <View style={[style.custmCheckBox, { backgroundColor: COLORS.colorBtn }]}>
                                                    <Ionicons name='checkmark' color={'white'} />
                                                </View>
                                                :
                                                <View style={[style.custmCheckBox, { backgroundColor: 'white' }]} />
                                            }
                                            <Text style={[style.checkInputLabel, { paddingLeft: 7 }]}>{val.label}</Text>
                                        </View>
                                    </TouchableHighlight>

                                </View>
                            ))
                        }

                    </View>
                </View>


                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 10 }}>
                    <View style={style.filterField}>
                        <Text style={style.filterFieldLabel}>Facility</Text>
                        <View style={style.checkBoxGrop}>
                            <FlatList
                                scrollEnabled={false}
                                horizontal={false}
                                data={(facilityShow === true) ? CheckFecilityAllValues : CheckFecilityValues}
                                renderItem={(val) => {
                                    return (
                                        <View style={[style.checkBox, { width: width * 0.42 }]}>
                                            <TouchableHighlight underlayColor='transparent' onPress={() => {
                                                if (!selectFecility.includes(val?.item?.value)) {
                                                    setCheckFecility(!val?.item?.value)
                                                    setSelectFecility([...selectFecility, val?.item?.value])
                                                } else {
                                                    setCheckFecility(null)
                                                    setSelectFecility(selectFecility.filter((item) => item !== val?.item?.value))
                                                }
                                            }}>
                                                <View style={style.checkBox}>
                                                    {selectFecility.includes(val?.item?.value) ?
                                                        <View style={[style.custmCheckBox, { backgroundColor: COLORS.colorBtn }]}>
                                                            <Ionicons name='checkmark' color={'white'} />
                                                        </View>
                                                        :
                                                        <View style={[style.custmCheckBox, { backgroundColor: 'white' }]} />
                                                    }
                                                    <Text style={style.checkInputLabel}>{val?.item?.label}</Text>
                                                </View>
                                            </TouchableHighlight>

                                        </View>
                                    )
                                }

                                }
                                // keyExtractor={(item,index) => index}
                                numColumns={2}
                            />

                        </View>

                        <TouchableHighlight underlayColor={'transparent'} onPress={() => setFacilityShow(!facilityShow)}>
                            <Text style={{ fontFamily: FONTS.font, color: COLORS.TextDarkGrey, textDecorationLine: 'underline' }}>{(facilityShow === true) ? 'See Less' : 'See More'}</Text>
                        </TouchableHighlight>
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
                    <TouchableHighlight underlayColor={'transparent'} style={style.filtersubBtn} onPress={(() => ClearFilter())}>
                        <Text style={{ color: '#fff', fontFamily: FONTS.mediam, }}>Clear Filter</Text>
                    </TouchableHighlight>
                    <TouchableHighlight underlayColor={'transparent'} style={style.filtersubBtn} onPress={(() => setOpenFilter(!openFilter) )}>
                        <Text style={{ color: '#fff', fontFamily: FONTS.mediam, }}>Close</Text>
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
        borderRadius: 2,
        fontSize: 18,
    },
    checkInputLabel: {
        fontFamily: FONTS.mediam,
        letterSpacing: 0.5,
        fontSize: 13,
        marginLeft: 5,
        color: 'black'
    },
    checkBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 2,
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
        paddingHorizontal: 20,
        paddingTop: 20,
        borderRadius: 10,
        height: height * 0.8,
        alignContent: 'center',
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
    placeholderStyle: {
        color: 'grey'
    },
    custmCheckBox: { height: 16, width: 16, borderRadius: 2, borderColor: 'grey', borderWidth: 0.6, alignItems: 'center' }

})
export default HotelFilter