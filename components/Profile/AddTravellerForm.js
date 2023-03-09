import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableHighlight, Modal, Pressable, TextInput, Keyboard } from 'react-native';
import color from '../constants/color';
import font from '../constants/font';
import Appbar from '../common/Appbar';
import DatePicker from 'react-native-date-picker';
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Dropdown } from 'react-native-element-dropdown'
import style from '../common/commonStyle';
import AntIcon from 'react-native-vector-icons/AntDesign'
import moment from 'moment';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import userAction from '../../redux/user/actions'
import Snackbar from 'react-native-snackbar';
import { debounce } from 'lodash';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const AddTravellerForm = ({ innerRef }) => {
    const dispatch = useDispatch();
    const { handleSubmit, register, control, formState: { errors }, reset, setValue } = useForm();
    let [dobDate, setDobDate] = useState(new Date());
    let [passportExDate, setPassportExDate] = useState(new Date());
    const [passportExDateopen, setpassportExDateOpen] = useState(false);
    const [title, setTitle] = useState();
    const [gender, setGender] = useState();
    const [selectType, setSelectType] = useState();
    const [open, setOpen] = useState(false);
    var [listData, setListData] = useState([]);

    const { AddTravaller_form, AddTravaller_country_code, AddTravaller_country_issuing, AddTravaller_nationality } = useSelector((state) => state.userReducer);
    var [travelRec, setTravelRec] = useState({ CountryCode: false, IssuingName: false, Nationality: false })
    var [selectedCountryCode, setSelectedCountryCode] = useState({ CountryCode: '', IssuingName: '', Nationality: '', })
    var [selectedIssuing, setSelectedIssuing] = useState({ CountryCode: '', IssuingName: '', Nationality: '', })
    var [selectedNationality, setSelectedNationality] = useState({ CountryCode: '', IssuingName: '', Nationality: '', })
    var [getSelectId, setGetSelectId] = useState({ CountryCode:'' , IssuingName: '', Nationality: '', })


    const handleDebugger = useCallback(
        debounce((e) => console.log(e), 400)
        , []);

    const handleSelectionCode = (e) => {
        console.log('value', e)
        Keyboard.dismiss()
        setSelectedCountryCode(selectedCountryCode = { CountryCode: e.dial_code + "-" + e.name, IssuingName: '', Nationality: '', });
        setGetSelectId(getSelectId = { CountryCode: e.id, IssuingName: getSelectId.IssuingName, Nationality: getSelectId.Nationality, });
        dispatch({
            type: userAction.GET_ADD_TRAVELLER_COUNTRY_CODE,
            payload: []
        })
        setTravelRec(travelRec = { CountryCode: true, IssuingName: travelRec.IssuingName, Nationality: travelRec.Nationality });
        console.log(travelRec.CountryCode)
        handleDebugger()
    }

    const handleSelectIssuing = (e) => {
        Keyboard.dismiss()
        setSelectedIssuing(selectedIssuing = { CountryCode: selectedIssuing.CountryCode, IssuingName: e.name, Nationality: selectedIssuing.Nationality });
        setGetSelectId(getSelectId = { CountryCode:getSelectId.CountryCode, IssuingName: e.id, Nationality:getSelectId.Nationality, });
        dispatch({
            type: userAction.GET_ADD_TRAVELLER_COUNTRY_ISSUING,
            payload: []
        })
        setTravelRec(travelRec = { CountryCode: travelRec.CountryCode, IssuingName: true, Nationality: travelRec.Nationality });
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
    const selectAdult = [
        { name: 'Adult', value: 'Adult' },
        { name: 'Children', value: 'Children' },
        { name: 'Infant', value: 'Infant' },
    ]

    const SubmitAddBtn = (data, e) => {
        console.log('button pressed',data)
        setListData(listData = {
            title: data.nametitle,
            first_name: data.firstName,
            last_name: data.lastName,
            // select_type: data.selectedType,
            gender: data.selectedgender,
            email: data.email,
            dob: moment(data.dobDate).format('YYYY-MM-DD'),
            // phone_code: data.phoneCode,
            phone: data.mobileNumber,
            passport: data.passportNumber,
            expire_date: moment(data.passportExDate).format('YYYY-MM-DD'),
            country_code: getSelectId?.CountryCode,
            issue_country: getSelectId?.IssuingName,
            nationality: getSelectId?.Nationality,
        })
        dispatch({
            type: userAction.GET_ADD_TRAVELLER_VALUE,
            payload: listData
        })


        if (AddTravaller_form.find((List) => List?.email === data?.email) && ((List) => List?.mobileNumber === data?.mobileNumber)) {
            Snackbar.show({
                text: 'Email already exist',
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    text: 'UNDO',
                    textColor: 'red',
                    onPress: () => { /* Do something. */ },
                },
            })
        } else {
            dispatch({
                type: userAction.GET_ADD_TRAVELLER_FORM, payload: [...listData]
            })

            console.log('value not exist');

            console.log('Travaller', AddTravaller_form);
            console.log('Travaller', AddTravaller_form.length);
            reset();
            setTitle("");
            setGender("");
            setSelectType("");
            setDobDate(new Date());
            setPassportExDate(new Date());
            setSelectedCountryCode("");
            setSelectedIssuing("");
            setSelectedNationality("");
        }
       
        // dispatch({
        //     type: userAction.SET_ADD_TRAVELLER_SEARCH_BY_NAME,
        //     payload: {
        //         data: listData,
        //         // navigation: navigation
        //     }
        // })
    }


    return (
        <View style={{ width: width, height: height, backgroundColor: 'white' }}>
            <Appbar title={'Traveller'} />
            <View style={{ height: height * 0.82, width: width, paddingTop: 10 }}>
                <ScrollView>
                    <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                        <View style={styles.editTextBorder}>
                            <Text style={styles.placeHolderText}>Title</Text>
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
                                        placeholder="Choose Title"
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
                                                fontFamily: font.font,
                                                letterSpacing: 0.5,
                                                paddingTop: 10,
                                            },
                                        }}
                                        style={[styles.inputeEditor, { paddingHorizontal: 5 }]}
                                        renderRightIcon={() => (
                                            <IoniconsIcon
                                                name="chevron-down"
                                                size={25}
                                                style={{ fontSize: 18, color: color.colorTheme, }}
                                            />)}
                                    />
                                )}
                            />
                            {errors.nametitle && (
                                <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.nametitle.message}</Text>
                            )}
                        </View>
                        {/* First Name*/}
                        <View style={styles.editTextBorder}>
                            <Text style={styles.placeHolderText}>First Name</Text>
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

                        {/* last Name*/}
                        <View style={styles.editTextBorder}>
                            <Text style={styles.placeHolderText}>Last Name</Text>
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

                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                            <View style={[styles.editTextBorder, { width: "49%" }]}>
                                <Text style={styles.placeHolderText}>Type</Text>
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
                                                    fontFamily: font.font,
                                                    letterSpacing: 0.5,
                                                    paddingTop: 10,
                                                },
                                            }}
                                            style={[styles.inputeEditor, { paddingHorizontal: 5, }]}
                                            renderRightIcon={() => (
                                                <IoniconsIcon
                                                    name="chevron-down"
                                                    size={25}
                                                    style={{ fontSize: 18, color: color.colorTheme, }}
                                                />)}
                                        />
                                    )}
                                />
                                {errors.selectedType && (
                                    <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.selectedType.message}</Text>
                                )}
                            </View>
                            <View style={[styles.editTextBorder, { width: "49%" }]}>
                                <Text style={styles.placeHolderText}>Gender</Text>
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
                                                    fontFamily: font.font,
                                                    letterSpacing: 0.5,
                                                    paddingTop: 10,
                                                },
                                            }}
                                            style={[styles.inputeEditor, { paddingHorizontal: 5, }]}
                                            renderRightIcon={() => (
                                                <IoniconsIcon
                                                    name="chevron-down"
                                                    size={25}
                                                    style={{ fontSize: 18, color: color.colorTheme, }}
                                                />)}
                                        />
                                    )}
                                />
                                {errors.selectedgender && (
                                    <Text style={[styles.errormessage, { paddingTop: 10, }]}>{errors.selectedgender.message}</Text>
                                )}
                            </View>
                        </View>
                        {/* Email */}
                        <View style={styles.editTextBorder}>
                            <Text style={styles.placeHolderText}>Email</Text>

                            <Controller
                                control={control}
                                name='email'
                                rules={{
                                    required: "Enter Your Email!",
                                    pattern: {
                                        value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: "Enter Your Valid Email!"
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.inputeEditor}
                                        placeholder="Email"
                                        {...register("email")}
                                        onChangeText={value => onChange(value.toLowerCase())}
                                        value={value}
                                        keyboardType="default"
                                    />
                                )}
                            />
                            {errors.email && (
                                <Text style={[styles.errormessage]}>{errors.email.message}</Text>
                            )}

                        </View>
                        {/* personal mobile no */}
                        <View style={styles.editTextBorder}>
                            <Text style={styles.placeHolderText}>Mobile Number</Text>
                            <Controller
                                control={control}
                                name='mobileNumber'
                                rules={{
                                    required: "Enter your mobile number!",
                                    pattern: {
                                        value: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
                                        message: 'Enter valid mobile number!',
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.inputeEditor}
                                        placeholder="Number"
                                        keyboardType="numeric"
                                        numberOfLines={1}
                                        maxLength={10}
                                        {...register("mobileNumber")}
                                        onChangeText={value => onChange(value.toLowerCase())}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.mobileNumber && (
                                <Text style={[styles.errormessage]}>{errors.mobileNumber.message}</Text>
                            )}
                        </View>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                            {/* DOB */}
                            <View style={[styles.editTextBorder, { width: "49%" }]}>
                                <Text style={styles.placeHolderText}>Date of Birth</Text>
                                <TouchableHighlight underlayColor={'transparent'} onPress={() => setOpen(!open)} style={{ paddingRight: 5 }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Text style={{ fontFamily: font.font, color: 'gray', paddingVertical: 10, paddingLeft: 7, }}>
                                            {moment(dobDate).format('DD/MM/YYYY').toString()}
                                        </Text>
                                        <MaterialIcons Icon name="calendar-month-outline" size={25} color="gray" />
                                    </View>
                                </TouchableHighlight>
                                {errors.dob && (
                                    <Text style={[styles.errormessage]}>{errors.dob.message}</Text>
                                )}
                            </View>
                            <View style={[styles.editTextBorder, { width: "49%" }]}>
                                {/* optional Phone Code no */}
                                <Text style={styles.placeHolderText}>Phone Code (optional)</Text>
                                <Controller
                                    control={control}
                                    name="phoneCode"
                                    rules={{
                                        required: 'Enter your Phone Code',
                                        pattern: {
                                            value: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
                                            message: 'Enter valid Phone Code!',
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="Phone Code"
                                            keyboardType="numeric"
                                            {...register("phoneCode")}
                                            maxLength={6}
                                            onChangeText={value => onChange(value.toLowerCase())}
                                            value={value}
                                        />
                                    )}
                                />
                                {errors.phoneCode && (
                                    <Text style={[styles.errormessage]}>{errors.phoneCode.message}</Text>
                                )}
                            </View>
                        </View>

                        <View>
                            <View style={[styles.editTextBorder]}>
                                <Text style={styles.placeHolderText}>Country Code</Text>
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
                                                setTravelRec(travelRec = { CountryCode: true, IssuingName: travelRec.IssuingName, Nationality: travelRec.Nationality });
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
                                            fontFamily: font.font,
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
                                                    setTravelRec(travelRec = { CountryCode: true, IssuingName: travelRec.IssuingName, Nationality: travelRec.Nationality });

                                                }}
                                            >
                                                <AntIcon name="closecircle" size={15} color="gray" style={{
                                                    marginLeft: 10, marginRight: 10, position: 'absolute', right: 0
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
                                        <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, fontFamily: font.font }}>No Options found</Text>
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
                                                                    fontFamily: font.font,
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

                        <View>
                            <View style={[styles.editTextBorder]}>
                                <Text style={styles.placeHolderText}>Issuing Country</Text>
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
                                        name="add_issuing"
                                        value={selectedIssuing?.IssuingName}
                                        onChangeText={(e) => {
                                            if (e === '') {
                                                setTravelRec(travelRec = { IssuingName: true, CountryCode: travelRec.CountryCode, Nationality: travelRec.Nationality })
                                            }
                                            if (e?.length >= 1) {
                                                dispatch({
                                                    type: userAction.SET_ADD_TRAVELLER_SEARCH_BY_NAME,
                                                    payload: {
                                                        name: e,
                                                        type: 'issuing-country',
                                                    }
                                                })
                                                setSelectedIssuing(selectedIssuing = { IssuingName: e })
                                            } else {
                                                setSelectedIssuing(selectedIssuing = { IssuingName: e })
                                                dispatch({
                                                    type: userAction.GET_ADD_TRAVELLER_COUNTRY_CODE,
                                                    payload: []
                                                })
                                            }
                                        }}
                                        style={{
                                            color: 'black',
                                            fontFamily: font.font,
                                            width: width * 0.9,
                                            paddingTop: 5,
                                            paddingBottom: 0,
                                        }}
                                    />
                                    {
                                        selectedIssuing?.IssuingName !== "" ?
                                            <TouchableHighlight
                                                underlayColor={'transparent'}
                                                onPress={() => {
                                                    setSelectedIssuing(selectedIssuing = { IssuingName: '' })
                                                    dispatch({
                                                        type: userAction.GET_ADD_TRAVELLER_COUNTRY_ISSUING,
                                                        payload: []
                                                    })
                                                    // setTravelRec(travelRec = { selectedIssuing: true, CountryCode: travelRec.IssuingName, Nationality: travelRec.Nationality })
                                                }}
                                            >
                                                <AntIcon name="closecircle" size={15} color="gray" style={{
                                                    marginLeft: 10, marginRight: 10, position: 'absolute', right: 0
                                                }} />
                                            </TouchableHighlight> : <></>
                                    }
                                </View>
                            </View>
                            {(AddTravaller_country_issuing?.message === undefined && selectedIssuing?.IssuingName !== '' && travelRec?.IssuingName === false) ?
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
                                    <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, fontFamily: font.font }}>No Options found</Text>
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
                                            AddTravaller_country_issuing?.message?.map((e, i) => {
                                                return (
                                                    <TouchableHighlight
                                                        underlayColor={"transparent"}
                                                        key={i}
                                                        onPress={() => handleSelectIssuing(e)}
                                                    >
                                                        <Text
                                                            style={{
                                                                color: 'black',
                                                                paddingHorizontal: 9,
                                                                fontSize: 13,
                                                                fontFamily: font.font,
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

                        <View>
                            <View style={[styles.editTextBorder]}>
                                <Text style={styles.placeHolderText}>Nationality</Text>
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
                                        name="add_nationality"
                                        value={selectedNationality?.Nationality}
                                        onChangeText={(e) => {
                                            if (e === '') {
                                                setTravelRec(travelRec = { CountryCode: travelRec.CountryCode, IssuingName: travelRec.IssuingName, Nationality: true })
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
                                            fontFamily: font.font,
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
                                                    // setTravelRec(travelRec = { selectedIssuing: true, CountryCode: travelRec.IssuingName, Nationality: travelRec.Nationality })
                                                }}
                                            >
                                                <AntIcon name="closecircle" size={15} color="gray" style={{
                                                    marginLeft: 10, marginRight: 10, position: 'absolute', right: 0
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
                                    <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, fontFamily: font.font }}>No Options found</Text>
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
                                                                fontFamily: font.font,
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

                        {/* Passport Number no */}
                        <View style={styles.editTextBorder}>
                            <Text style={styles.placeHolderText}>Passport Number</Text>
                            <Controller
                                control={control}
                                name="passportNumber"
                                rules={{
                                    required: 'Enter your Phone Code',
                                    pattern: {
                                        value: true,
                                        message: 'Enter your Passport Number!',
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        style={styles.inputeEditor}
                                        placeholder="Passport Number"
                                        keyboardType="default"
                                        onChangeText={value => onChange(value.toLowerCase())}
                                        {...register("passportNumber")}
                                        value={value}
                                    />
                                )}
                            />
                            {errors.passportNumber && (
                                    <Text style={[styles.errormessage]}>{errors.passportNumber.message}</Text>
                                )}
                        </View>
                        {/*Expiry Date */}
                        <View style={[styles.editTextBorder]}>
                            <Text style={styles.placeHolderText}>Expiry Date</Text>
                            <TouchableHighlight onPress={() => setpassportExDateOpen(!passportExDateopen)} style={{ paddingRight: 5 }} underlayColor='transparent'>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: font.font, color: 'gray', paddingVertical: 10, paddingLeft: 7 }}>
                                        {moment(passportExDate).format('DD/MM/YYYY').toString()}
                                    </Text>
                                    <MaterialIcons Icon name="calendar-month-outline" size={25} color="gray" />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.updateBtn}>
                            <TouchableHighlight onPress={handleSubmit(SubmitAddBtn)} underlayColor='transparent'>
                                <Text style={styles.updateText}>
                                    Add
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
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
                <Controller
                    control={control}
                    name="dob"
                    rules={{
                        required: {
                            value: true,
                            message: 'Select your Expiry Date!',
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <DatePicker
                            modal
                            mode="date"
                            open={passportExDateopen}
                            date={passportExDate}
                            {...register("exdate")}
                            value={value}
                            name="exdate"
                            onConfirm={(EXD) => {
                                onChange(passportExDate = EXD)
                                setpassportExDateOpen(!passportExDateopen);
                                setPassportExDate(passportExDate = EXD);
                            }}
                            onCancel={() => {
                                setpassportExDateOpen(!passportExDateopen);
                            }}
                        />
                    )}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    subContainer: { flexDirection: 'column', alignItems: 'center' },
    editTextBorder: { borderWidth: 1, height: 45, borderRadius: 7, borderColor: '#067fc030', marginTop: 20, marginBottom: 5, },
    updateBtn: { backgroundColor: '#0d6efd', borderRadius: 5,  justifyContent: 'center', width: 130,alignSelf: 'flex-end', },
    updateText: { color: '#fff', fontFamily: font.font, alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 10,alignItems: 'center' },
    placeHolderText: {
        color: '#067fc0',
        position: 'absolute',
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        top: -11,
        left: 10,
        backgroundColor: '#ffffff',
        fontFamily: font.font
    },
    errormessage: {
        color: "red",
        fontSize: 10,
        fontWeight: "500",
        paddingTop: 2,
    }
})

export default AddTravellerForm;