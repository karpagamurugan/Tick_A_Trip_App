import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableHighlight, TextInput, Keyboard, TouchableOpacity, Pressable, Button } from 'react-native';
import COLORS from "../constants/color";
import FONTS from "../constants/font";
import Appbar from '../common/Appbar';
import FromIcon from '../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../Assert/Images/icon/take-off-2.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import Flight from '../../Assert/Images/icon/flight-2.svg';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import userAction from '../../redux/user/actions'
import moment from "moment";
import { useForm, Controller } from "react-hook-form";
import userActions from '../../redux/user/actions'
import { debounce, filter } from "lodash";
import { Dropdown } from 'react-native-element-dropdown';
import DatePicker from 'react-native-date-picker';
import EditIcon from '../../Assert/Images/icon/Edit_Icon.svg';
import DeleteIcon from '../../Assert/Images/icon/Delete_Icon.svg';
import ProfileIcon from '../../Assert/Images/Profile.svg';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

export default function FlightBooking({ navigation, route }) {
    const dispatch = useDispatch()
    const { get_Revalidate } = useSelector((state) => state.FlightSearchReducer)
    const { userProfileData, AddTravaller_country_code, AddTravaller_nationality, travelers_list } = useSelector((state) => state.userReducer)
    var [travelRec, setTravelRec] = useState({ CountryCode: false, Nationality: false })
    var [selectedCountryCode, setSelectedCountryCode] = useState({ CountryCode: '', Nationality: '', })
    var [selectedNationality, setSelectedNationality] = useState({ CountryCode: '', Nationality: '', })
    var [getSelectId, setGetSelectId] = useState({ CountryCode: '' })
    var [iconDownUp, setIconsDownUp] = useState(true);
    var [addIconDownUp, setAddIconsDownUp] = useState(true);
    var [checkBoxOne, setCheckBoxOne] = useState(false);
    var [checkBoxTwo, setCheckBoxTwo] = useState(false);
    var [travellerEdit, setTravellerEdit] = useState(true);

    var [adult, setAdult] = useState(route?.params?.flightInfo?.adult_flight?.toString()) //set adult count
    var [child, setchild] = useState(route?.params?.flightInfo?.child_flight?.toString()) //set child count
    var [infant, setInfant] = useState(route?.params?.flightInfo?.infant_flight?.toString()) //set infant count
    const { handleSubmit, register, control, formState: { errors }, reset, setValue } = useForm();
    const [gender, setGender] = useState();
    const [open, setOpen] = useState(false);
    let [dobDate, setDobDate] = useState(new Date());
    const [selectType, setSelectType] = useState();
    const [title, setTitle] = useState();

    console.log('flight route', route?.params?.flightInfo?.adult_flight)

    console.log('adult', adult)

    const handleDebugger = useCallback(
        debounce((e) => console.log(e), 400)
        , []);

    const handleSelectionCode = (e) => {
        console.log('value', e)
        Keyboard.dismiss()
        setSelectedCountryCode(selectedCountryCode = { CountryCode: e.dial_code + "-" + e.name });
        setGetSelectId(getSelectId = { CountryCode: e.id });
        dispatch({
            type: userAction.GET_ADD_TRAVELLER_COUNTRY_CODE,
            payload: []
        })
        setTravelRec(travelRec = { CountryCode: true });
        console.log(travelRec.CountryCode)
        handleDebugger()
    }

    const handleSelectNationality = (e) => {
        Keyboard.dismiss()
        setSelectedNationality(selectedNationality = { CountryCode: selectedNationality.CountryCode, IssuingName: selectedNationality.IssuingName, Nationality: e.name });
        setGetSelectId(getSelectId = { CountryCode: getSelectId.CountryCode, IssuingName: getSelectId.IssuingName, Nationality: e.id, });
        dispatch({
            type: userAction.GET_ADD_TRAVELLER_NATIONALITY,
            payload: []
        })
        setTravelRec(travelRec = { CountryCode: travelRec.CountryCode, IssuingName: travelRec.IssuingName, Nationality: true });
        handleDebugger()
    }
    console.log('travelers_list', travelers_list.travelers[0])

    useEffect(() => {

        dispatch({ type: userActions.GET_USER_PROFILE })
        let defaultName = { Name: userProfileData?.name }
        let defaultEmail = { Email: userProfileData?.email }
        let defaultPhone = { Phone: userProfileData?.phone }
        reset({ ...defaultName, ...defaultEmail, ...defaultPhone, })
    }, [])

    const EditTravelDetails = (item) => {
        console.log('lzsjodksghu', item.last_name)
        setTravellerEdit(!travellerEdit)
        dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN })
        let addSelectedType = { selectedType: item.type }
        let addTravelName = { firstName: item.first_name }
        let addTravelTitle = { firstName: item.first_name }
        reset({ ...addSelectedType, ...addTravelName, ...addTravelTitle })
    }

    const selectAdult = [
        { name: 'Adult', value: 'Adult' },
        { name: 'Children', value: 'Children' },
        { name: 'Infant', value: 'Infant' },
    ]
    const selectTitleName = [
        { name: 'Mr', value: 'Mr' },
        { name: 'Miss', value: 'Miss' },
        { name: 'Mrs', value: 'Mrs' },
        { name: 'Lord', value: 'Lord' },
        { name: 'Lady', value: 'Lady' },
        { name: 'Inf', value: 'Inf' },
    ]
    const selectGender = [
        { name: 'Male', value: 'Male' },
        { name: 'Female', value: 'Female' },
    ]
    let AdultCount = [
        { value: '0', labelField: "0 Adult" },
        { value: '1', labelField: "1 Adult" },
        { value: '2', labelField: "2 Adult" },
        { value: '3', labelField: "3 Adult" },
        { value: '4', labelField: "4 Adult" },
        { value: '5', labelField: "5 Adult" },
        { value: '6', labelField: "6 Adult" },
        { value: '7', labelField: "7 Adult" },
        { value: '8', labelField: "8 Adult" },
        { value: '9', labelField: "9 Adult" },
    ] //Adult count

    let ChildCount = [
        { value: '0', labelField: "0 Child" },
        { value: '1', labelField: "1 Child" },
        { value: '2', labelField: "2 Child" },
        { value: '3', labelField: "3 Child" },
        { value: '4', labelField: "4 Child" },
        { value: '5', labelField: "5 Child" },
        { value: '6', labelField: "6 Child" },
    ] //Child count

    let InfantCount = [
        { value: '0', labelField: "0 Infant" },
        { value: '1', labelField: "1 Infant" },
        { value: '2', labelField: "2 Infant" },
        { value: '3', labelField: "3 Infant" },
        { value: '4', labelField: "4 Infant" },
        { value: '5', labelField: "5 Infant" },
        { value: '6', labelField: "6 Infant" },
    ] //Child count

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>
            {/* appbar */}
            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <MaterialIcons name='keyboard-arrow-left' size={35} color={COLORS.textBlue} />
                </TouchableHighlight>
                <Flight height={34} width={34} />
                <View style={styles.appbarPlaceContainer}>
                    <View style={{ paddingHorizontal: 15, flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FromIcon height={15} width={15} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>{route?.params?.flightInfo?.fromCity}</Text>
                                <Text style={styles.appBarTraveller}>{route?.params?.flightInfo?.adult_flight} adult, {route?.params?.flightInfo?.child_flight} child, {route?.params?.flightInfo?.infant_flight} Infant</Text>
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
                            <ToIcon height={19} width={19} />
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={styles.appbarPlace}>{route?.params?.flightInfo?.toCity}</Text>
                                <Text style={styles.appBarTraveller}>{route?.params?.flightInfo?.class}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View>
                    <View style={{ backgroundColor: '#F7F7F7' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingVertical: 25 }}>
                            <View>
                                <Text style={styles.title}>Depart On</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                    <Text style={styles.text}>{moment(get_Revalidate?.DepartureDateTime).format('DD-MM-YYYY')}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Return</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                    <Text style={styles.text}>{moment(get_Revalidate?.ArrivalDateTime).format('DD-MM-YYYY')}</Text>
                                </View>
                            </View>
                        </View>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', paddingBottom: 25 }}>
                            <View>
                                <Text style={styles.title}>Adult</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <View style={styles.dropDown}>
                                        <Dropdown
                                            data={AdultCount}
                                            labelField="labelField"
                                            valueField="value"
                                            value={adult}
                                            showsVerticalScrollIndicator={true}
                                            name="adult"
                                            placeholder=''
                                            onChange={(item) => {
                                                setAdult(item?.value)
                                                // console.log('item', item)
                                            }}
                                            selectedTextProps={{
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: '500',
                                                    fontFamily: FONTS.fontBold,
                                                    letterSpacing: 0.5,
                                                    padding: 0,
                                                    color: '#101010',
                                                },
                                            }}
                                            style={styles.text}
                                        //   renderRightIcon={() => (
                                        //     <MaterialIcon
                                        //       name="chevron-down-circle-outline"
                                        //       size={25}
                                        //       style={styles.dropIcon}
                                        //     />)}
                                        />
                                    </View>

                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Child</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <View style={styles.dropDown}>
                                        <Dropdown
                                            data={ChildCount}
                                            labelField="labelField"
                                            valueField="value"
                                            value={child}
                                            showsVerticalScrollIndicator={true}
                                            name="child"
                                            placeholder=''
                                            onChange={(item) => {
                                                setchild(item.value)
                                            }}
                                            selectedTextProps={{
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: '500',
                                                    fontFamily: FONTS.fontBold,
                                                    letterSpacing: 0.5,
                                                    padding: 0,
                                                    color: '#101010',
                                                },
                                            }}
                                            style={styles.text}
                                        />
                                    </View>

                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Infant</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <View style={styles.dropDown}>
                                        <Dropdown
                                            data={InfantCount}
                                            labelField="labelField"
                                            valueField="value"
                                            value={infant}
                                            showsVerticalScrollIndicator={true}
                                            name="infant"
                                            placeholder=''
                                            onChange={(item) => {
                                                setInfant(item.value)
                                            }}
                                            selectedTextProps={{
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: '500',
                                                    fontFamily: FONTS.fontBold,
                                                    letterSpacing: 0.5,
                                                    padding: 0,
                                                    color: '#101010',
                                                },
                                            }}
                                            style={styles.text}
                                        />
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.couponCode}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                            <TextInput
                                placeholder='Add a coupon Code'
                            />
                            <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                <Text style={styles.applyCoupon}>APPLY</Text>
                            </TouchableHighlight>

                        </View>
                    </View>

                    <View style={styles.bg}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Base Fare</Text>
                            <Text style={styles.priceTag}> Rs: <Text style={styles.price}>{get_Revalidate?.BaseFareAmount}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Taxes</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>{get_Revalidate?.TotalTaxAmount}/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Discounts & {'\n'}Adjustments</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>0,00/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Other charges</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>0000/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />


                        <View style={styles.total}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={{ color: 'white', fontFamily: FONTS.fontBold }}>:</Text>
                            <Text style={styles.priceTag}> Rs  <Text style={[styles.price, { fontSize: height * 0.03 }]}>{get_Revalidate?.TotalFareAmount}</Text></Text>

                        </View>
                    </View>
                </View>

                <View style={{ marginHorizontal: 25, paddingTop: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[styles.formTitle]}>Fill Contact Details *</Text>
                        <TouchableOpacity onPress={() => setIconsDownUp(!iconDownUp)}>
                            <AntDesign name={iconDownUp ? 'upcircleo' : 'downcircleo'} style={{ color: '#2B64FF', fontSize: height * 0.022, paddingRight: 15 }} />
                        </TouchableOpacity>
                    </View>
                    {(iconDownUp === true) ?
                        <View>
                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name="Name"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Enter Your Name"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            name='Name'
                                            placeholder="Name"
                                            keyboardType='default'
                                            {...register("Name")}
                                            value={value}
                                            onChangeText={value => onChange(value.toLowerCase())}
                                        />
                                    )}
                                />
                                {errors.Name && (
                                    <Text style={[styles.errormessage]}>{errors.Name.message}</Text>
                                )}
                            </View>
                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name="Email"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Enter Your Email"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            name='Email'
                                            placeholder="Email"
                                            keyboardType='default'
                                            {...register("Email")}
                                            value={value}
                                            onChangeText={value => onChange(value.toLowerCase())}
                                        />
                                    )}
                                />
                                {errors.Email && (
                                    <Text style={[styles.errormessage]}>{errors.Email.message}</Text>
                                )}
                            </View>
                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name="Phone"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Enter Your Phone"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            name='Phone'
                                            placeholder="Phone"
                                            keyboardType='default'
                                            {...register("Phone")}
                                            value={value}
                                            onChangeText={value => onChange(value.toLowerCase())}
                                        />
                                    )}
                                />
                                {errors.Phone && (
                                    <Text style={[styles.errormessage]}>{errors.Phone.message}</Text>
                                )}
                            </View>
                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name="GST"

                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            name='GST'
                                            placeholder="GST Nonstop (Optional)"
                                            keyboardType='default'
                                            {...register("GST")}
                                            value={value}
                                            onChangeText={value => onChange(value.toLowerCase())}
                                        />
                                    )}
                                />
                            </View>
                            <View>
                                <View style={[styles.editTextBorder]}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            height: 35,
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    >

                                        <TextInput
                                            keyboardType={'default'}
                                            placeholder={'Select...'}
                                            placeholderTextColor="gray"
                                            numberOfLines={1}
                                            name="add_countrycode"
                                            value={selectedCountryCode?.CountryCode}
                                            onChangeText={(e) => {
                                                if (e === '') {
                                                    setTravelRec(travelRec = { CountryCode: true });
                                                }
                                                if (e?.length >= 3) {
                                                    dispatch({
                                                        type: userAction.SET_ADD_TRAVELLER_SEARCH_BY_NAME,
                                                        payload: {
                                                            name: e,
                                                            type: 'country-code',
                                                        }
                                                    })
                                                    setSelectedCountryCode(selectedCountryCode = { CountryCode: e })
                                                } else {
                                                    setSelectedCountryCode(selectedCountryCode = { CountryCode: e })
                                                    dispatch({
                                                        type: userAction.GET_ADD_TRAVELLER_COUNTRY_CODE,
                                                        payload: []
                                                    })
                                                }
                                            }}
                                            style={{
                                                color: 'black',
                                                width: width * 0.9,
                                                paddingTop: 8,
                                                paddingLeft: 5,
                                                paddingBottom: 0,
                                            }}
                                        />
                                        {
                                            selectedCountryCode?.CountryCode !== "" ?
                                                <TouchableHighlight
                                                    underlayColor={'transparent'}
                                                    onPress={() => {
                                                        setSelectedCountryCode(selectedCountryCode = { CountryCode: '' })
                                                        dispatch({
                                                            type: userAction.GET_ADD_TRAVELLER_COUNTRY_CODE,
                                                            payload: []
                                                        })
                                                        setTravelRec(travelRec = { CountryCode: false });

                                                    }}
                                                >
                                                    <AntDesign name="closecircle" size={18} color="gray" style={{
                                                        marginLeft: 10, marginRight: 10, position: 'absolute', right: 20, top: -4
                                                    }} />
                                                </TouchableHighlight> : <></>
                                        }
                                    </View>
                                </View>
                                {
                                    (AddTravaller_country_code?.message === undefined && selectedCountryCode?.CountryCode !== '' && travelRec.CountryCode === false) ?
                                        <View style={{
                                            backgroundColor: 'white',
                                            width: '100%',
                                            alignSelf: 'center',
                                            position: 'relative',
                                            zIndex: 2,
                                            borderRadius: 5,
                                            elevation: 10,
                                            maxHeight: height * 0.35
                                        }}>
                                            <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, }}>No Options found</Text>
                                        </View> : <View style={{
                                            backgroundColor: 'white',
                                            width: '100%',
                                            alignSelf: 'center',
                                            position: 'relative',
                                            zIndex: 2,
                                            borderRadius: 10,
                                            elevation: 10,
                                            maxHeight: height * 0.35
                                        }}>

                                            <ScrollView
                                                showsVerticalScrollIndicator={true}
                                                nestedScrollEnabled
                                                keyboardShouldPersistTaps='handled'
                                            >
                                                {
                                                    AddTravaller_country_code?.message?.map((e, i) => {
                                                        return (
                                                            <TouchableHighlight
                                                                underlayColor={"transparent"}
                                                                onPress={() => handleSelectionCode(e)}
                                                                key={i}>
                                                                <Text
                                                                    style={{
                                                                        color: 'black',
                                                                        paddingHorizontal: 9,
                                                                        fontSize: 13,
                                                                        paddingVertical: 2,
                                                                    }}>{e?.dial_code} - {e?.name}</Text>
                                                            </TouchableHighlight>
                                                        )
                                                    })
                                                }
                                            </ScrollView>
                                        </View>
                                }
                            </View>
                        </View> : <></>
                    }
                </View>

                <View style={{ marginHorizontal: 25, paddingTop: 15 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={[styles.formTitle]}>Add Traveller Details *</Text>
                        <TouchableOpacity onPress={() => setAddIconsDownUp(!addIconDownUp)}>
                            <AntDesign name={addIconDownUp ? 'upcircleo' : 'downcircleo'} style={{ color: '#2B64FF', fontSize: height * 0.022, paddingRight: 15 }} />
                        </TouchableOpacity>
                    </View>
                    {(addIconDownUp === true) ?
                        <View>
                            <View style={[styles.editTextBorder]}>
                                <Controller
                                    control={control}
                                    name="selectedType"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Select Your Type"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <Dropdown
                                            showsVerticalScrollIndicator={true}
                                            placeholder="Type"
                                            labelField="value"
                                            valueField="value"
                                            name="Adult"
                                            data={selectAdult}
                                            value={selectType}
                                            {...register('selectedType')}
                                            onChange={(item) => {
                                                onChange(item.value)
                                                setSelectType(item.value)
                                            }}
                                            selectedTextProps={{
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: '500',
                                                    letterSpacing: 0.5,
                                                    paddingTop: 5,
                                                },
                                            }}
                                            style={[styles.inputeEditor, { paddingHorizontal: 5, }]}
                                            renderRightIcon={() => (
                                                <IoniconsIcon
                                                    name="chevron-down"
                                                    size={25}
                                                    style={{ fontSize: 18, }}
                                                />)}
                                        />
                                    )}
                                />
                                {errors.selectedType && (
                                    <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.selectedType.message}</Text>
                                )}
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={[styles.editTextBorder, { width: "20%" }]}>
                                    <Controller
                                        control={control}
                                        name="nametitle"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: 'Select Your Title',
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Dropdown
                                                showsVerticalScrollIndicator={true}
                                                placeholder="Title"
                                                data={selectTitleName}
                                                labelField="name"
                                                valueField="value"
                                                value={title}
                                                name="nametitle"
                                                {...register("nametitle")}
                                                onChange={(item) => {
                                                    onChange(item.value)
                                                    setTitle(item.value)
                                                }}
                                                selectedTextProps={{
                                                    style: {
                                                        fontSize: 13,
                                                        fontWeight: '500',
                                                        letterSpacing: 0.5,
                                                        paddingTop: 10,
                                                    },
                                                }}
                                                style={[styles.inputeEditor, { paddingHorizontal: 5 }]}
                                                renderRightIcon={() => (
                                                    <IoniconsIcon
                                                        name="chevron-down"
                                                        size={25}
                                                        style={{ fontSize: 18 }}
                                                    />)}
                                            />
                                        )}
                                    />
                                    {errors.nametitle && (
                                        <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.nametitle.message}</Text>
                                    )}
                                </View>
                                <View style={[styles.editTextBorder, { width: "78%" }]}>
                                    <Controller
                                        control={control}
                                        name="firstName"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Enter Your First Name"
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                placeholderTextColor={"gray"}
                                                style={styles.inputeEditor}
                                                placeholder="First Name"
                                                keyboardType='default'
                                                {...register("firstName")}
                                                value={value}
                                                onChangeText={value => onChange(value.toLowerCase())}
                                            />
                                        )}
                                    />
                                    {errors.firstName && (
                                        <Text style={[styles.errormessage]}>{errors.firstName.message}</Text>
                                    )}
                                </View>
                            </View>
                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name='lastName'
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Enter Your Last Name!"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="Last Name"
                                            keyboardType='default'
                                            value={value}
                                            {...register('lastName')}
                                            onChangeText={value => onChange(value.toLowerCase())}
                                        />
                                    )}
                                />
                                {errors.lastName && (
                                    <Text style={[styles.errormessage]}>{errors.lastName.message}</Text>
                                )}
                            </View>

                            <View style={styles.editTextBorder}>
                                <Controller
                                    control={control}
                                    name="selectedgender"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Select Your Gender"
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <Dropdown
                                            showsVerticalScrollIndicator={true}
                                            placeholder="Gender"
                                            labelField="value"
                                            valueField="value"
                                            data={selectGender}
                                            value={gender}
                                            {...register('selectedgender')}
                                            onChange={(item) => {
                                                onChange(item.value)
                                                setGender(item.value)
                                            }}
                                            selectedTextProps={{
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: '500',
                                                    letterSpacing: 0.5,
                                                    paddingTop: 10,
                                                },
                                            }}
                                            style={[styles.inputeEditor, { paddingHorizontal: 5, }]}
                                            renderRightIcon={() => (
                                                <IoniconsIcon
                                                    name="chevron-down"
                                                    size={25}
                                                    style={{ fontSize: 18 }}
                                                />)}
                                        />
                                    )}
                                />
                                {errors.selectedgender && (
                                    <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.selectedgender.message}</Text>
                                )}
                            </View>
                            <View style={[styles.editTextBorder]}>
                                <TouchableHighlight underlayColor={'transparent'} onPress={() => setOpen(!open)} style={{ paddingRight: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ color: 'gray', paddingVertical: 10, paddingLeft: 7, }}>
                                            {moment(dobDate).format('DD/MM/YYYY').toString()}
                                        </Text>
                                        <AntDesign Icon name="calendar" size={25} color="gray" />
                                    </View>
                                </TouchableHighlight>
                                {errors.dob && (
                                    <Text style={[styles.errormessage]}>{errors.dob.message}</Text>
                                )}
                            </View>
                            <View>
                                <View style={[styles.editTextBorder]}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            height: 35,
                                            width: '100%',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <TextInput
                                            keyboardType={'default'}
                                            placeholder={'Nationality'}
                                            placeholderTextColor="gray"
                                            numberOfLines={1}
                                            name="add_nationality"
                                            value={selectedNationality?.Nationality}
                                            onChangeText={(e) => {
                                                if (e === '') {
                                                    setTravelRec(travelRec = { Nationality: true })
                                                }
                                                if (e?.length >= 3) {
                                                    dispatch({
                                                        type: userAction.SET_ADD_TRAVELLER_SEARCH_BY_NAME,
                                                        payload: {
                                                            name: e,
                                                            type: 'nationality',
                                                        }
                                                    })
                                                    setSelectedNationality(selectedNationality = { Nationality: e })
                                                } else {
                                                    setSelectedNationality(selectedNationality = { Nationality: e })
                                                    dispatch({
                                                        type: userAction.GET_ADD_TRAVELLER_NATIONALITY,
                                                        payload: []
                                                    })
                                                }
                                            }}
                                            style={{
                                                color: 'black',
                                                width: width * 0.9,
                                                paddingTop: 5,
                                                paddingBottom: 0,
                                            }}
                                        />
                                        {
                                            selectedNationality?.Nationality !== "" ?
                                                <TouchableHighlight
                                                    underlayColor={'transparent'}
                                                    onPress={() => {
                                                        setSelectedNationality(selectedNationality = { Nationality: '' })
                                                        dispatch({
                                                            type: userAction.GET_ADD_TRAVELLER_NATIONALITY,
                                                            payload: []
                                                        })
                                                        setTravelRec(travelRec = { Nationality: false });
                                                    }}
                                                >
                                                    <AntDesign name="closecircle" size={18} color="gray" style={{
                                                        marginLeft: 10, marginRight: 10, position: 'absolute', right: 20, top: -4
                                                    }} />
                                                </TouchableHighlight> : <></>
                                        }
                                    </View>
                                </View>
                                {(AddTravaller_nationality?.message === undefined && selectedNationality?.Nationality !== '' && travelRec?.Nationality === false) ?
                                    <View style={{
                                        backgroundColor: 'white',
                                        width: '100%',
                                        alignSelf: 'center',
                                        position: 'relative',
                                        zIndex: 2,
                                        borderRadius: 5,
                                        elevation: 10,
                                        maxHeight: height * 0.35
                                    }}>
                                        <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, }}>No Options found</Text>
                                    </View> : <View style={{
                                        backgroundColor: 'white',
                                        width: '100%',
                                        alignSelf: 'center',
                                        position: 'relative',
                                        zIndex: 2,
                                        borderRadius: 10,
                                        elevation: 10,
                                        maxHeight: height * 0.35
                                    }}>

                                        <ScrollView
                                            showsVerticalScrollIndicator={true}
                                            nestedScrollEnabled
                                            keyboardShouldPersistTaps='handled'
                                        >
                                            {
                                                AddTravaller_nationality?.message?.map((e, i) => {
                                                    return (
                                                        <TouchableHighlight
                                                            underlayColor={"transparent"}
                                                            key={i}
                                                            onPress={() => handleSelectNationality(e)}
                                                        >
                                                            <Text
                                                                style={{
                                                                    color: 'black',
                                                                    paddingHorizontal: 9,
                                                                    fontSize: 13,
                                                                    paddingVertical: 2,
                                                                }}>{e?.name}</Text>
                                                        </TouchableHighlight>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                                }
                            </View>
                            <View style={{ marginVertical: 20, width: '90%', alignSelf: 'center' }}>
                                {(travellerEdit === true) ?
                                    <TouchableOpacity
                                        onPress={() => EditTravelDetails()}
                                        style={[styles.clickBtn]}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: FONTS.mediam, }}>Add</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={[styles.clickBtn]}>
                                        <Text style={{ color: '#FFFFFF', fontSize: 18, fontFamily: FONTS.mediam, }}>Update</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View> : <></>
                    }

                </View>
                <View style={{ marginHorizontal: 25, paddingTop: 15 }}>
                    {travelers_list?.travelers?.filter((el) => el.type === 'Adult')?.slice(0, route?.params?.flightInfo?.adult_flight)?.map((item, index) => {
                        return (
                            <View key={index} style={[styles.travellerDetails, { marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <ProfileIcon height={22} width={22} />
                                    </View>
                                    <Text style={{ fontSize: 17, fontFamily: FONTS.mediam, color: '#1B5CB7' }}>{item?.title} {item?.first_name} {item?.last_name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => EditTravelDetails(item)}
                                        style={{ marginRight: 20 }}>
                                        <EditIcon height={22} width={22} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <DeleteIcon height={22} width={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}
                    {travelers_list?.travelers?.filter((el) => el.type === 'Child')?.slice(0, route?.params?.flightInfo?.child_flight)?.map((item, index) => {
                        return (
                            <View key={index} style={[styles.travellerDetails, { marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <ProfileIcon height={22} width={22} />
                                    </View>
                                    <Text style={{ fontSize: 17, fontFamily: FONTS.mediam, color: '#1B5CB7' }}>{item?.title} {item?.first_name} {item?.last_name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => setTravellerEdit(!travellerEdit)} style={{ marginRight: 20 }}>
                                        <EditIcon height={22} width={22} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <DeleteIcon height={22} width={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}

                    {travelers_list?.travelers?.filter((el) => el.type === 'Infant')?.slice(0, route?.params?.flightInfo?.infant_flight)?.map((item, index) => {
                        return (
                            <View key={index} style={[styles.travellerDetails, { marginBottom: 20 }]}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <ProfileIcon height={22} width={22} />
                                    </View>
                                    <Text style={{ fontSize: 17, fontFamily: FONTS.mediam, color: '#1B5CB7' }}>{item?.title} {item?.first_name} {item?.last_name}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity onPress={() => setTravellerEdit(!travellerEdit)} style={{ marginRight: 20 }}>
                                        <EditIcon height={22} width={22} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <DeleteIcon height={22} width={22} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        );
                    })}



                    <View style={{ width: "90%", alignSelf: "center" }} >
                        <View style={{ flexDirection: 'row', alignItems: "flex-start", paddingBottom: 15 }}>
                            <Pressable onPress={() => setCheckBoxOne(!checkBoxOne)}>
                                <MaterialIcons style={[styles.checkBoxStyl]} name={checkBoxOne ? "check-box" : "check-box-outline-blank"} />
                            </Pressable>
                            <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center', alignSelf: 'center' }}>
                                <Text style={{ color: "#333333", fontSize: 14, fontFamily: FONTS.font, flex: 1 }}>By completing this booking you agree to the
                                    <TouchableOpacity><Text style={[styles.policystyl]}> booking terms</Text></TouchableOpacity> <Text> and</Text>
                                    <TouchableOpacity><Text style={[styles.policystyl]}> privacy policy.</Text></TouchableOpacity><Text style={{ color: '#C80505' }}>*</Text></Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: "flex-start" }}>
                            <Pressable onPress={() => setCheckBoxTwo(!checkBoxTwo)}>
                                <MaterialIcons style={[styles.checkBoxStyl]} name={checkBoxTwo ? "check-box" : "check-box-outline-blank"} />
                            </Pressable>
                            <Text style={{ color: "#333333", fontSize: 14, fontFamily: FONTS.font, flex: 1 }}>Send me travel offers, deals, and news by email & message</Text>
                        </View>
                    </View>
                </View>
                <Controller
                    control={control}
                    name="dob"
                    rules={{
                        required: {
                            value: true,
                            message: 'Select your dob!',
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <DatePicker
                            modal
                            open={open}
                            date={dobDate}
                            mode="date"
                            {...register("dob")}
                            name="dob"
                            value={value}
                            onConfirm={(DOB) => {
                                onChange(dobDate = DOB)
                                setOpen(!open);
                                setDobDate(dobDate = DOB);
                            }}
                            onCancel={() => {
                                setOpen(!open);
                            }}
                        />
                    )}
                />

            </ScrollView>
            <TouchableOpacity style={styles.ConfirmBtn} onPress={() => { }}>
                <Text style={styles.confirmBook}>Confirm & Book</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        backgroundColor: COLORS.AppbarColor,
        height: height * 0.07,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15
    },
    appbarPlaceContainer: { backgroundColor: 'white', width: width * 0.75, height: 40, marginLeft: 10, borderRadius: 30 },
    appbarPlace: { fontFamily: FONTS.font, fontSize: height * 0.018 },
    appBarTraveller: { fontFamily: FONTS.font, marginTop: -6, fontSize: height * 0.016 },
    title: { fontFamily: FONTS.font, color: 'grey', fontSize: height * 0.0162 },
    text: { fontFamily: FONTS.fontBold, paddingLeft: 10, color: COLORS.colorText, fontSize: height * 0.017 },
    details: { flexDirection: 'column', backgroundColor: COLORS.lightGrey, paddingBottom: 15, paddingTop: 5 },
    couponCode: {
        borderRadius: 7, borderWidth: 0.9, borderColor: COLORS.borderColor, paddingVertical: 0, paddingHorizontal: 7,
        marginHorizontal: 15, marginTop: 10, backgroundColor: COLORS.AppbarColor, elevation: 1
    },
    applyCoupon: { fontFamily: FONTS.fontBold, color: COLORS.textBlue },
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

    ConfirmBtn: {
        alignItems: 'center',
        backgroundColor: COLORS.borderColor,
        marginHorizontal: 20,
        marginBottom: 10,
        // marginTop: 20,
        borderRadius: 30,
        paddingVertical: 10
    },
    confirmBook: { fontFamily: FONTS.mediam, color: 'white', fontSize: height * 0.027 },
    editTextBorder: { backgroundColor: '#E9F3FF', borderWidth: 1, height: 50, borderRadius: 3, borderColor: '#2B64FF', marginTop: 8, marginBottom: 5, paddingHorizontal: 5, },
    formTitle: {
        fontSize: height * 0.020,
        color: '#2B64FF',
        fontFamily: FONTS.mediam,
    },
    clickBtn: {
        backgroundColor: '#0D367E',
        alignItems: "center",
        paddingVertical: 9,
        borderRadius: 100,
        justifyContent: 'center'
    },
    checkBoxStyl: {
        fontSize: 28,
        paddingRight: 10,
        color: '#2B64FF',
    },
    policystyl: {
        color: '#0566C8',
        borderBottomWidth: 1,
        borderBottomColor: '#0566C8',
    },
    travellerDetails: {
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 5
    }
})