import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, TouchableHighlight, Modal, Pressable, TextInput, Keyboard, Platform } from 'react-native';
import COLORS from '../constants/color';
import FONTS from '../constants/font';
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
import { debounce } from 'lodash';
import CommonAction from '../../redux/common/actions'

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

const AddTravellerForm = ({ navigation, route }) => {
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
    var [placeholderCountryCode, setPlaceholderCountryCode] = useState();
    var [placeholderIssuing, setPlaceholderIssuing] = useState();
    var [placeholderNationality, setPlaceholderNationality] = useState();
    var [travellerId, setTravellerId] = useState();
    const { AddTravaller_form, AddTravaller_country_code, AddTravaller_country_issuing, AddTravaller_nationality } = useSelector((state) => state.userReducer);
    var [travelRec, setTravelRec] = useState({ CountryCode: false, IssuingName: false, Nationality: false })
    var [selectedCountryCode, setSelectedCountryCode] = useState({ CountryCode: '', IssuingName: '', Nationality: '', })
    var [selectedIssuing, setSelectedIssuing] = useState({ CountryCode: '', IssuingName: '', Nationality: '', })
    var [selectedNationality, setSelectedNationality] = useState({ CountryCode: '', IssuingName: '', Nationality: '', })
    var [getSelectId, setGetSelectId] = useState({ CountryCode: '', IssuingName: '', Nationality: '', })
    const [minAgeLimit, setMinAgeLimit] = useState('');
    const [maxAgeLimit, setMaxAgeLimit] = useState('');


  
    const handleSelectionCode = (e) => {
        Keyboard.dismiss()
        setSelectedCountryCode(selectedCountryCode = { CountryCode: e.dial_code + "-" + e.name, IssuingName: '', Nationality: '', });
        setGetSelectId(getSelectId = { CountryCode: e.id, IssuingName: getSelectId.IssuingName, Nationality: getSelectId.Nationality, });
        dispatch({
            type: userAction.GET_ADD_TRAVELLER_COUNTRY_CODE,
            payload: []
        })
        setTravelRec(travelRec = { CountryCode: true, IssuingName: travelRec.IssuingName, Nationality: travelRec.Nationality });

    }
    const handleSelectIssuing = (e) => {
        Keyboard.dismiss()
        setSelectedIssuing(selectedIssuing = { CountryCode: selectedIssuing.CountryCode, IssuingName: e.name, Nationality: selectedIssuing.Nationality });
        setGetSelectId(getSelectId = { CountryCode: getSelectId.CountryCode, IssuingName: e.id, Nationality: getSelectId.Nationality, });
        dispatch({
            type: userAction.GET_ADD_TRAVELLER_COUNTRY_ISSUING,
            payload: []
        })
        setTravelRec(travelRec = { CountryCode: travelRec.CountryCode, IssuingName: true, Nationality: travelRec.Nationality });
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
    }

    const AdultTypes = (item) => {
        if(item === "Adult"){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear() - 14;
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            today = yyyy + '-' + mm + '-' + dd;
            const dateadult = new Date(today);
            setDobDate(dateadult)
            setMaxAgeLimit(dateadult);
            setMinAgeLimit(null);

        }else if(item === "Child") {
            var todayCM = new Date();
            var ddCM = todayCM.getDate();
            var mmCM = todayCM.getMonth() + 1;
            var yyyyCM = todayCM.getFullYear() - 14;
            if (ddCM < 10) {
                ddCM = '0' + ddCM
            }
            if (mmCM < 10) {
                mmCM = '0' + mmCM
            }
            todayCM = yyyyCM + '-' + mmCM + '-' + ddCM;
            const dateChildMin = new Date(todayCM);
            setDobDate(dateChildMin)
            setMinAgeLimit(dateChildMin)
     
            var todayCMX = new Date();
            var ddCMX = todayCMX.getDate();
            var mmCMX = todayCMX.getMonth() + 1;
            var yyyyCMX = todayCMX.getFullYear() - 2;
            if (ddCMX < 10) {
                ddCMX = '0' + ddCMX
            }
            if (mmCMX < 10) {
                mmCMX = '0' + mmCMX
            }
            todayCMX = yyyyCMX + '-' + mmCMX + '-' + ddCMX;
            const dateChildMax = new Date(todayCMX);
            setDobDate(dateChildMax)
            setMaxAgeLimit(dateChildMax)

        }else if(item === "Infant"){
            var todayI = new Date();
            var ddI = todayI.getDate();
            var mmI = todayI.getMonth() + 1;
            var yyyyI = todayI.getFullYear() - 2;
            if (ddI < 10) {
                ddI = '0' + ddI
            }
            if (mmI < 10) {
                mmI = '0' + mmI
            }
            todayI = yyyyI + '-' + mmI + '-' + ddI;
            const date4 = new Date(todayI);
            setMinAgeLimit(date4)
            setMaxAgeLimit(new Date())
        }
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
        { name: 'Child', value: 'Child' },
        { name: 'Infant', value: 'Infant' },
    ]
    const SubmitAddBtn = (data) => {

        if (route.params != undefined) {

        } else {
            setListData(listData = {
                title: data.nametitle,
                first_name: data.firstName,
                last_name: data.lastName,
                type: data.selectedType,
                gender: data.selectedgender,
                email: data.email,
                area_code: data.phoneCode,
                dob: moment(data.dobDate).format('YYYY-MM-DD'),
                phone: data.mobileNumber,
                passport: data.passportNumber,
                expire_date: moment(data.passportExDate).format('YYYY-MM-DD'),
                country_code: getSelectId?.CountryCode,
                issue_country: getSelectId?.IssuingName,
                nationality: getSelectId?.Nationality,
            })


            if (AddTravaller_form.find((List) => List?.email === data?.email) && ((List) => List?.mobileNumber === data?.mobileNumber)) {

                dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Email already exist' } })

            } else {
                dispatch({
                    type: userAction.GET_ADD_TRAVELLER_VALUE,
                    payload: { data: listData, navigation: navigation }
                })

                // dispatch({
                //     type: userAction.GET_ADD_TRAVELLER_FORM, payload: [...listData]
                // })
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

        }
    }

    const travellerUpdateBtn = (data) => {
        var updateList = {
            traveler_id: travellerId,
            title: data?.nametitle,
            first_name: data?.firstName,
            last_name: data?.lastName,
            gender: data?.selectedgender,
            type: data?.selectedType,
            email: data?.email,
            phone: data?.mobileNumber,
            dob: data?.dob,
            area_code: data?.phoneCode,
            passport: data?.passportNumber,
            nationality: getSelectId?.Nationality,
            country_code: getSelectId?.CountryCode,
            issue_country: getSelectId?.IssuingName,
            expire_date: data?.exdate,
        }
        dispatch({
            type: userAction.SET_FLIGHT_UPDATE_TRAVELLER,
            payload: { data: updateList, navigation: navigation }
        })
    }

    useEffect(() => {
        if (route.params != undefined) {
            const data = route.params.data;
            const firstName = data?.first_name
            const nametitle = data?.title
            const lastName = data?.last_name
            const email = data?.email
            const phone = data?.phone
            const passNo = data?.passport
            const type = data?.type
            const selectedgender = data?.gender
            const exdate = new Date(data.expire_date)
            const DateDob = new Date(data.dob)
            const selectedCountryCode = data?.country_code.country_code + '-' + data.country_code.name
            const selectedIssuing = data.issue_country.name
            const selectedNationality = data.nationality.name
            const travellerId = data?.id
            setTitle(nametitle)
            setSelectType(type)
            setGender(selectedgender)
            setDobDate(DateDob)
            setPassportExDate(exdate)
            setPlaceholderCountryCode(selectedCountryCode)
            setPlaceholderIssuing(selectedIssuing);
            setPlaceholderNationality(selectedNationality);
            setGetSelectId({ CountryCode: data?.country_code?.id, IssuingName: data?.issue_country?.id, Nationality: data?.nationality?.id, })
            setTravellerId(travellerId)
            reset({
                firstName: firstName,
                nametitle: nametitle,
                selectedType: type,
                selectedgender: selectedgender,
                lastName: lastName,
                email: email,
                mobileNumber: phone,
                phoneCode: data?.country_code?.dial_code,
                passportNumber: passNo,
                exdate: moment(exdate)?.format('YYYY-MM-DD'),
                dob: moment(DateDob)?.format('YYYY-MM-DD'),
                selectedCountryCode: data?.country_code?.country_code + '-' + data?.country_code?.name,
                selectedIssuing: data?.country_code.name,
                selectedNationality: data?.country_code.name,

            })
        }
    }, [])



    return (
        <View style={{ width: width, height: height, backgroundColor: 'white' }}>
            <Appbar title={'Traveller'} />
            <View style={{ height: height * 0.82, width: width, paddingTop: 10 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical
                >
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
                                        value={value}
                                        name="nametitle"
                                        {...register("nametitle")}
                                        onChange={(item) => {
                                            onChange(item.value)
                                        }}
                                        selectedTextProps={{
                                            style: {
                                                fontSize: 13,
                                                fontWeight: '500',
                                                fontFamily: FONTS.font,
                                                letterSpacing: 0.5,
                                                paddingTop: 10,
                                            },
                                        }}
                                        style={[styles.inputeEditor, { paddingHorizontal: 5,paddingTop:0 }]}
                                        renderRightIcon={() => (
                                            <IoniconsIcon
                                                name="chevron-down"
                                                size={25}
                                                style={{ fontSize: 18, color: COLORS.colorTheme, }}
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
                                        onChangeText={value => onChange(value)}
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
                                        onChangeText={value => onChange(value)}
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
                                            name="adult"
                                            data={selectAdult}
                                            value={selectType}
                                            {...register('selectedType')}
                                            onChange={(item) => {
                                                onChange(item.value)
                                                setSelectType(item.value)
                                                AdultTypes(item.value)
                                            }}
                                            selectedTextProps={{
                                                style: {
                                                    fontSize: 13,
                                                    fontWeight: '500',
                                                    fontFamily: FONTS.font,
                                                    letterSpacing: 0.5,
                                                    paddingTop: 10,
                                                },
                                            }}
                                            style={[styles.inputeEditor, { paddingHorizontal: 5,paddingTop:0 }]}
                                            renderRightIcon={() => (
                                                <IoniconsIcon
                                                    name="chevron-down"
                                                    size={25}
                                                    style={{ fontSize: 18, color: COLORS.colorTheme, }}
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
                                                    fontFamily: FONTS.font,
                                                    letterSpacing: 0.5,
                                                    paddingTop: 10,
                                                },
                                            }}
                                            style={[styles.inputeEditor, { paddingHorizontal: 5,paddingTop:0 }]}
                                            renderRightIcon={() => (
                                                <IoniconsIcon
                                                    name="chevron-down"
                                                    size={25}
                                                    style={{ fontSize: 18, color: COLORS.colorTheme, }}
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
                                        onChangeText={value => onChange(value)}
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
                                        onChangeText={value => onChange(value)}
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
                                        <Text style={{ fontFamily: FONTS.font, color: 'gray', paddingVertical: 10, paddingLeft: 7, }}>
                                            {moment(dobDate).format('DD/MM/YYYY').toString()}
                                        </Text>
                                        <MaterialIcons Icon name="calendar-month-outline" size={25} color="gray" />
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View style={[styles.editTextBorder, { width: "49%" }]}>
                                {/* optional Phone Code no */}
                                <Text style={styles.placeHolderText}>Phone Code (optional)</Text>
                                <Controller
                                    control={control}
                                    name="phoneCode"
                                    rules={{
                                        required: false,
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
                                            onChangeText={value => onChange(value)}
                                            value={value}
                                        />
                                    )}
                                />
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
                                        paddingLeft:Platform.OS==='ios'?7:0
                                    }}
                                >

                                    <TextInput
                                        keyboardType={'default'}
                                        placeholder={route.params === undefined ? 'Select...' : placeholderCountryCode}
                                        placeholderTextColor={placeholderCountryCode ? "#000" : 'gray'}
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
                                            fontFamily: FONTS.font,
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
                                        <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, fontFamily: FONTS.font }}>No Options found</Text>
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
                                                                    fontSize: height*0.015,
                                                                    fontFamily: FONTS.font,
                                                                    paddingVertical: 5,
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
                                        paddingLeft:Platform.OS==='ios'?7:0
                                    }}
                                >
                                    <TextInput
                                        keyboardType={'default'}
                                        placeholder={route.params === undefined ? 'Select...' : placeholderIssuing}
                                        placeholderTextColor={placeholderIssuing ? "#000" : 'gray'}
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
                                            fontFamily: FONTS.font,
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
                                    <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, fontFamily: FONTS.font }}>No Options found</Text>
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
                                                                fontSize: height*0.015,
                                                                fontFamily: FONTS.font,
                                                                paddingVertical: 5,
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
                                        paddingLeft:Platform.OS==='ios'?7:0
                                    }}
                                >
                                    <TextInput
                                        keyboardType={'default'}
                                        placeholder={route.params === undefined ? 'Select...' : placeholderNationality}
                                        placeholderTextColor={placeholderNationality ? "#000" : 'gray'}
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
                                            fontFamily: FONTS.font,
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
                                    <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, fontFamily: FONTS.font }}>No Options found</Text>
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
                                                                fontSize: height*0.015,
                                                                fontFamily: FONTS.font,
                                                                paddingVertical: 5,
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
                                    required: 'Enter your passport no.',
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
                                        onChangeText={val => onChange(val.toUpperCase())}
                                        {...register("passportNumber")}
                                        value={value?.toUpperCase()}
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
                                    <Text style={{ fontFamily: FONTS.font, color: 'gray', paddingVertical: 10, paddingLeft: 7 }}>
                                        {moment(passportExDate).format('DD/MM/YYYY').toString()}
                                    </Text>
                                    <MaterialIcons Icon name="calendar-month-outline" size={25} color="gray" />
                                </View>
                            </TouchableHighlight>
                        </View>

                        <View style={styles.updateBtn}>
                            {(route.params != undefined) ?
                                <TouchableHighlight onPress={handleSubmit(travellerUpdateBtn)} underlayColor='transparent'>
                                    <Text style={styles.updateText}>Update</Text>
                                </TouchableHighlight>
                                :
                                <TouchableHighlight onPress={handleSubmit(SubmitAddBtn)} underlayColor='transparent'>
                                    <Text style={styles.updateText}>Add</Text>
                                </TouchableHighlight>
                            }

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
                            maximumDate={maxAgeLimit}
                            minimumDate={minAgeLimit}
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
                    name="exdate"
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
    updateBtn: { backgroundColor: '#0d6efd', borderRadius: 5, justifyContent: 'center', width: 130, alignSelf: 'flex-end', },
    updateText: { color: '#fff', fontFamily: FONTS.font, alignSelf: 'center', paddingVertical: 10, paddingHorizontal: 10, alignItems: 'center' },
    placeHolderText: {
        color: '#067fc0',
        position: 'absolute',
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        top: -11,
        left: 10,
        backgroundColor: '#ffffff',
        fontFamily: FONTS.font
    },
    errormessage: {
        color: "red",
        fontSize: 10,
        fontWeight: "500",
        paddingTop: 2,
    },
    inputeEditor: {
        color: 'black',
        paddingLeft:10,
       paddingTop:Platform.OS==='ios'?15:10
    }
})

export default React.memo(AddTravellerForm)