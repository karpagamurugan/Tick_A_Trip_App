/* eslint-disable prettier/prettier */
import React, { useState,useCallback } from 'react';
import { Button, ScrollView, Dimensions, Text, View, StyleSheet, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native';
import font from '../constants/font';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import color from '../constants/color'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import userAction from '../../redux/user/actions'
import {debounce} from 'lodash';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({ navigation }) => {
    const dispatch = useDispatch()
    const { handleSubmit, control, formState: { errors }, reset, register, setValue, getValues } = useForm();
    // const { handleSubmit, control, formState: { errors }, reset, register } = useForm();
    let [dobDate, setDobDate] = useState(new Date());
    let [passportExDate, setPassportExDate] = useState(new Date());
    const [passportExDateopen, setpassportExDateOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [marriedStatus, setMarriedStatus] = useState(null)
    const [title, setTitle] = useState(null)
    const [otherOption, setOtherOption] = useState(false)
    const [privacyBox, setPrivacyBox] = useState(false)
    const [policyBox, setPolicyBox] = useState(false)
    const [userPassword, setUserPassword] = useState('')
    const [userConfirmPassword, setUserConfirmPassword] = useState('')

    const maridalStatus = [
        {
            name: 'Single',
            value: 'Single'
        },
        {
            name: 'Married',
            value: 'Married'
        },
    ]

    const selectTitle = [
        {
            name: 'Male',
            value: 'Male'
        },
        {
            name: 'Female',
            value: 'Female'
        }
    ]
    const handleDebugger = useCallback(
        debounce((e)=>console.log(e), 1000)
        , []);
    const onSubmit = (data) => {
        dispatch({
            type: userAction.GET_USER_REGISTER, payload: {
                first_name: data.firstName,
                last_name: data.lastName,
                username: data.userName,
                mobilenumber: data.mobileNumber,
                email: data.email,
                dob: moment(data.dob).format('YYYY-MM-DD'),
                password: data.password,
                confirmuserpasseword: data.confirmPassword,
                maritalstatus: data.marriedStatus,
                gender: data.gender,
                country: data.usercountry,
                currency: data.usercurrency,
                aboutme: data.aboutme,
                occupation: data.occupation,
                favouritedest: data.fovouritedestination,
                fovouritefood: data.fovouritefood,
                flyernumber: data.frequentFlyerNumber,
                passportnumber: data.passportNumber,
                issuecountry: data.issuingCountry,
                postalcode: data.postalCode,
                expirydate: moment(data.passportExDate).format('YYYY-MM-DD'),
                pan: data.pan,
            },
            navigation:navigation
        })
        handleDebugger()
    }

  
    return (
        // <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} horizontal={false} showsHorizontalScrollIndicator={false}>
        <View style={{ position: 'relative', width: width, backgroundColor: '#fff', }}>
            <ImageBackground style={style.signUpImag} source={require('../../Assert/Images/signUp.png')} />
            <ScrollView>
                <View>

                    <Text style={style.headingText}>Sign up to TickaTrip</Text>
                    <View style={style.signUpForm}>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Gender *</Text>
                            <Controller
                                control={control}
                                name="gender"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Select your gender!',
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <Dropdown
                                        maxHeight={150}
                                        data={selectTitle}
                                        labelField="value"
                                        valueField="value"
                                        value={title}
                                        showsVerticalScrollIndicator={true}
                                        placeholder="Select your gender"
                                        {...register("gender")}
                                        name="gender"
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
                                                padding: 0,
                                            },
                                        }}
                                        style={{ padding: 0, backgroundColor: '#EDF2F7', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, }}
                                        renderRightIcon={() => (
                                            <MaterialIcon
                                                name="chevron-down-circle-outline"
                                                size={25}
                                                style={{ fontSize: 18, color: color.colorTheme, }}
                                            />)}
                                    />
                                )}
                            />
                            {errors.gender && (
                                <Text style={style.errorMessage}>{errors.gender.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Maridal Status *</Text>
                            <Controller
                                control={control}
                                name="marriedStatus"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Select your maridal status!',
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <Dropdown
                                        maxHeight={150}
                                        data={maridalStatus}
                                        labelField="value"
                                        valueField="value"
                                        value={marriedStatus}
                                        showsVerticalScrollIndicator={true}
                                        placeholder="Select program"
                                        {...register("marriedStatus")}
                                        name="marriedStatus"
                                        onChange={(item) => {
                                            onChange(item.value)
                                            setMarriedStatus(item.value)
                                        }}
                                        selectedTextProps={{
                                            style: {
                                                fontSize: 13,
                                                fontWeight: '500',
                                                fontFamily: font.font,
                                                letterSpacing: 0.5,
                                            },
                                        }}
                                        style={{ padding: 0, backgroundColor: '#EDF2F7', paddingVertical: 5, paddingHorizontal: 20, borderRadius: 5, }}
                                        renderRightIcon={() => (
                                            <MaterialIcon
                                                name="chevron-down-circle-outline"
                                                size={25}
                                                style={{ fontSize: 18, color: color.colorTheme, }}
                                            />)}
                                    />
                                )}
                            />
                            {errors.marriedStatus && (
                                <Text style={style.errorMessage}>{errors.marriedStatus.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>User name *</Text>
                            <Controller
                                control={control}
                                name="userName"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Enter your user name!',
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        {...register("userName")}
                                        name="userName"
                                        value={value}
                                        onChangeText={(value) => {
                                            onChange(value)
                                        }}
                                        keyboardType='default'
                                        placeholder='Enter the name'
                                        style={style.input}
                                    />
                                )}
                            />
                            {errors.userName && (
                                <Text style={style.errorMessage}>{errors.userName.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>First name *</Text>
                            <Controller
                                control={control}
                                name="firstName"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Enter your first name!'
                                    },
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        {...register("firstName")}
                                        name="firstName"
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        keyboardType='default'
                                        placeholder='Enter your first name'
                                        style={style.input}
                                    />
                                )}

                            />
                            {errors.firstName && (
                                <Text style={style.errorMessage}>{errors.firstName.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Last name *</Text>
                            <Controller
                                control={control}
                                name="lastName"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Enter your last name!'
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        {...register("lastName")}
                                        name="lastName"
                                        onChangeText={(value) => onChange(value)}
                                        value={value}
                                        keyboardType='default'
                                        placeholder='Enter the last name'
                                        style={style.input}
                                    />
                                )}
                            />
                            {errors.lastName && (
                                <Text style={style.errorMessage}>{errors.lastName.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Mobile Number *</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput  {...register("mobileNumber")} name="mobileNumber"
                                        onChangeText={value => onChange(value)} maxLength={10}
                                        value={value} keyboardType='numeric' placeholder='Enter the mobile number' style={style.input} />
                                )}
                                name="mobileNumber"
                                rules={{
                                    required: "Enter your mobile number!",
                                    pattern: {
                                        value: /^(?:0\.(?:0[0-9]|[0-9]\d?)|[0-9]\d*(?:\.\d{1,2})?)(?:e[+-]?\d+)?$/,
                                        message: 'Enter valid mobile number!',
                                    },
                                }}
                            />
                            {errors.mobileNumber && (
                                <Text style={style.errorMessage}>{errors.mobileNumber.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Email *</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput   {...register("email")} name="email"
                                        onChangeText={value => onChange(value.toLowerCase())}
                                        value={value} keyboardType='default' placeholder='Enter the email address' style={style.input} />
                                )}
                                name="email"
                                rules={{
                                    required: "Enter your mail!",
                                    pattern: {
                                        value: /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Enter valid mail!',
                                    },
                                }}
                            />
                            {errors.email && (
                                <Text style={style.errorMessage}>{errors.email.message}</Text>
                            )}
                        </View>

                        <View style={style.formGroup}>
                            <Text style={style.label}>DOB *</Text>
                            <TouchableOpacity style={style.input} onPress={() => setOpen(!open)}>
                                <Text style={{ color: 'black', paddingVertical: 5, borderRadius: 5, }}>{moment(dobDate).format('DD/MM/YYYY').toString()}</Text>
                            </TouchableOpacity>
                            {errors.dob && (
                                <Text style={style.errorMessage}>{errors.dob.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Postal Code *</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput  {...register("postalCode")} name="postalCode"
                                        onChangeText={value => onChange(value)} maxLength={6}
                                        value={value} keyboardType='numeric' placeholder='Enter the postalCode' style={style.input} />
                                )}
                                name="postalCode"
                                rules={{
                                    required: "Enter your postalCode!",
                                }}
                            />
                            {errors.postalCode && (
                                <Text style={style.errorMessage}>{errors.postalCode.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Password *</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput  minLength={8}  {...register("password")} name="password"
                                        onChangeText={value => {
                                            setUserPassword(value)
                                            onChange(value)
                                        }}
                                        value={value} style={style.input} textContentType="newPassword" secureTextEntry placeholder='Enter your password' />
                                )}
                                name="password"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Enter your password!',
                                    },
                                }}
                            />
                            {errors.password && (
                                <Text style={style.errorMessage}>{errors.password.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Confirm Password *</Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput  minLength={8} {...register("confirmPassword")} name="confirmPassword"
                                        onChangeText={value => {
                                            setUserConfirmPassword(value)
                                            onChange(value)
                                        }}
                                        value={value} style={style.input} textContentType="newPassword" secureTextEntry placeholder='Enter your confirm password' />
                                )}
                                name="confirmPassword"
                                rules={{
                                    required: {
                                        value: true,
                                        message: 'Enter the confirm password!',
                                    },
                                }}
                            />
                            {errors.confirmPassword && (
                                <Text style={style.errorMessage}>{errors.confirmPassword.message}</Text>
                            )}
                            {userPassword === userConfirmPassword ? null : (
                                <Text style={style.errorMessage}>Password does not match</Text>
                            )}
                        </View>

                        <View style={style.formGroup}>
                            <Text style={style.label}>Others (Optinal)</Text>
                            <TouchableOpacity style={style.input} onPress={() => setOtherOption(!otherOption)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: 'black', paddingVertical: 5, borderRadius: 5, }}>Fill the the information</Text>
                                    <MaterialIcon
                                        name="chevron-down-circle-outline"
                                        size={25}
                                        style={{ fontSize: 18, color: color.colorTheme, }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {otherOption === true ?
                            <View style={{ backgroundColor: '#efefef9c', padding: 20 }}>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>Frequent flyer number</Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput   {...register("frequentFlyerNumber")} name="frequentFlyerNumber"
                                                onChangeText={value => onChange(value)}
                                                value={value} keyboardType='default' placeholder='Enter the Frequent flyer number' style={style.input} />
                                        )}
                                        name="frequentFlyerNumber"
                                        rules={{ required: false }}
                                    />
                                </View>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>Passport number</Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput   {...register("passportNumber")} name="passportNumber"
                                                onChangeText={value => onChange(value)}
                                                value={value} keyboardType='default' placeholder='Enter the Passport number' style={style.input} />
                                        )}
                                        name="passportNumber"
                                        rules={{ required: false }}
                                    />
                                </View>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>Issuing country</Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput   {...register("issuingCountry")} name="issuingCountry"
                                                onChangeText={value => onChange(value)} value={value} keyboardType='default' placeholder='Enter the Issuing country*' style={style.input} />
                                        )}
                                        name="issuingCountry"
                                        rules={{ required: false }}
                                    />
                                </View>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>Expiry date</Text>
                                    <TouchableOpacity style={style.input} onPress={() => setpassportExDateOpen(!passportExDateopen)}>
                                        <Text style={{ color: 'black', paddingVertical: 5, borderRadius: 5, }}>{moment(passportExDate).format('DD/MM/YYYY').toString()}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>PAN</Text>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput   {...register("pan")} name="pan"
                                                onChangeText={value => onChange(value)}
                                                value={value} keyboardType='default' placeholder='Enter the PAN' style={style.input} />
                                        )}
                                        name="pan"
                                        rules={{ required: false }}
                                    />
                                </View>
                            </View>
                            :
                            null
                        }
                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ backgroundColor: '#FFC400', padding: 10, borderRadius: 100, }}>
                                <Image source={require('../../Assert/Images/mic.png')} />
                            </View>
                            <Text style={{ marginLeft: 10, color: color.colorText, fontSize: 14, fontWeight: '500', }}>Complete Your Profile And Enjoy 5000 As Joining Bonus</Text>
                        </View>
                        <View style={{ marginVertical: 30 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setPolicyBox(!policyBox)}>
                                    <View >
                                        {policyBox === true ?
                                            <Fontisto
                                                name='checkbox-active'
                                                size={15}
                                                style={{ color: color.colorBtn }}
                                            />
                                            :
                                            <Fontisto
                                                name='checkbox-passive'
                                                size={15}
                                                style={{ color: '#000' }}
                                            />
                                        }
                                    </View>
                                    <Text style={{ marginLeft: 10, color: '#666666', fontSize: 14, fontWeight: '500' }}>
                                        I have read and accepted the Terms of Use.
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }} onPress={() => setPrivacyBox(!privacyBox)}>
                                    <View >
                                        {privacyBox === true ?
                                            <Fontisto
                                                name='checkbox-active'
                                                size={15}
                                                style={{ color: color.colorBtn }}
                                            />
                                            :
                                            <Fontisto
                                                name='checkbox-passive'
                                                size={15}
                                                style={{ color: '#000' }}
                                            />
                                        }
                                    </View>
                                    <Text style={{ marginLeft: 10, color: '#666666', fontSize: 14, fontWeight: '500' }}>
                                        The Tickatrip may send me promotional offers including emails about products and services.
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* <Button title='Submit' onPress={handleSubmit(onSubmit)}/> */}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                            <TouchableOpacity disabled={(privacyBox !== true) || (policyBox !== true)} style={((privacyBox !== true) || (policyBox !== true)) ? style.buttonError : style.button} onPress={handleSubmit(onSubmit)}><Text style={{ color: '#fff' }} >SING UP</Text></TouchableOpacity>
                        </View>
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
                name="passportExDate"
                render={({ field: { onChange, value } }) => (
                    <DatePicker
                        modal
                        open={passportExDateopen}
                        date={passportExDate}
                        mode="date"
                        {...register("passportExDate")}
                        name="passportExDate"
                        onConfirm={(dob) => {
                            onChange(passportExDate = dob)
                            setOpen(!passportExDateopen);
                            setPassportExDate(passportExDate = dob);
                        }}
                        onCancel={() => {
                            setOpen(!open);
                        }}
                    />
                )}
            />
        </View>
        // </ScrollView>

    )
}
const style = StyleSheet.create({
    errorMessage: {
        color: 'red',
        fontSize: 12,
    },
    buttonError: {
        backgroundColor: '#cccccc',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 100,
    },
    button: {
        backgroundColor: '#0041F2',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 100,
    },
    input: {
        backgroundColor: '#EDF2F7',
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: '#999999',
        borderRadius: 5,
    },
    signUpForm: {
        marginHorizontal: 30,
    },
    label: {
        color: '#425466',
        fontFamily: font.font,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginBottom: 3,
    },
    headingText: {
        textAlign: 'center',
        paddingTop: 50,
        color: '#0083E9',
        fontSize: 22,
        fontFamily: font.font,
        marginBottom: 30,
    },
    signUpImag: {
        width: width,
        height: height * 0.5,
        position: 'absolute',
        bottom: 0,
    },
    formGroup: {
        flexDirection: 'column',
        marginBottom: 10,
    }
})
export default SignUp