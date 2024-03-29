/* eslint-disable prettier/prettier */
import React, { useState,useCallback } from 'react';
import { Button, ScrollView, Dimensions, Text, View, StyleSheet, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native';
import FONTS from '../constants/font';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import COLORS from '../constants/color'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import userAction from '../../redux/user/actions'
import {debounce} from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({ navigation }) => {
    const dispatch = useDispatch()
    const { handleSubmit, control, formState: { errors }, reset, register, setValue, getValues } = useForm();
    let [dobDate, setDobDate] = useState(new Date());//set DOB 
    let [passportExDate, setPassportExDate] = useState(new Date());//set passport Exp
    const [passportExDateopen, setpassportExDateOpen] = useState(false);//set open  passport Exp date picker
    const [open, setOpen] = useState(false); //set open DOB date picker
    const [marriedStatus, setMarriedStatus] = useState(null) //set maritial status
    const [title, setTitle] = useState(null) //set title
    const [otherOption, setOtherOption] = useState(false) //show hide other option
    const [privacyBox, setPrivacyBox] = useState(false)//enable & disable privacy policy
    const [policyBox, setPolicyBox] = useState(false)//enable & disable privacy policy
    const [userPassword, setUserPassword] = useState('') //pass
    const [userConfirmPassword, setUserConfirmPassword] = useState('') //confirm pass

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
    }

  
    return (
        <View style={{ position: 'relative', width: width, backgroundColor: 'white', }}>
            <ScrollView>
                <View>

                    <Text style={style.headingText}>Sign up to TickaTrip</Text>
                    <View style={style.signUpForm}>
                   
                        <View style={style.formGroup}>
                            <Text style={style.label}>User name <Text style={{color:'red'}}>*</Text></Text>
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
                                        placeholderTextColor={'grey'}
                                    />
                                )}
                            />
                            {errors.userName && (
                                <Text style={style.errorMessage}>{errors.userName.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>First name <Text style={{color:'red'}}>*</Text></Text>
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
                                        placeholderTextColor={'grey'}
                                    />
                                )}

                            />
                            {errors.firstName && (
                                <Text style={style.errorMessage}>{errors.firstName.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Last name <Text style={{color:'red'}}>*</Text></Text>
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
                                        placeholderTextColor={'grey'}
                                    />
                                )}
                            />
                            {errors.lastName && (
                                <Text style={style.errorMessage}>{errors.lastName.message}</Text>
                            )}
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Mobile Number <Text style={{color:'red'}}>*</Text></Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput  {...register("mobileNumber")} name="mobileNumber"
                                        onChangeText={value => onChange(value)} maxLength={10}
                                        placeholderTextColor={'grey'}
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
                            <Text style={style.label}>Email <Text style={{color:'red'}}>*</Text></Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput   {...register("email")} name="email"
                                    placeholderTextColor={'grey'}
                                        onChangeText={value => onChange(value.toLowerCase())}
                                        value={value} keyboardType='email-address' placeholder='Enter the email address' style={style.input} />
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
                            <Text style={style.label}>DOB <Text style={{color:'red'}}>*</Text></Text>
                            <TouchableOpacity style={style.input} onPress={() => setOpen(!open)}>
                                <Text style={{ color: 'black', paddingVertical: 5, borderRadius: 5,fontSize:height*0.018 }}>{moment(dobDate).format('DD-MM-YYYY').toString()}</Text>
                            </TouchableOpacity>
                            {errors.dob && (
                                <Text style={style.errorMessage}>{errors.dob.message}</Text>
                            )}
                        </View>
                       
                        <View style={style.formGroup}>
                            <Text style={style.label}>Password <Text style={{color:'red'}}>*</Text></Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput  
                                    placeholderTextColor={'grey'}
                                    minLength={8}  {...register("password")} name="password"
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
                            <Text style={style.label}>Confirm Password <Text style={{color:'red'}}>*</Text></Text>
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput 
                                    placeholderTextColor={'grey'}
                                    minLength={8} {...register("confirmPassword")} name="confirmPassword"
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
                                    <Text style={{ color: 'black', paddingVertical: 5, borderRadius: 5, fontFamily:FONTS.font,fontSize:height*0.018}}>Fill the information</Text>
                                    <MaterialIcon
                                        name="chevron-down-circle-outline"
                                        size={25}
                                        style={{ fontSize: 18, color: COLORS.colorTheme, }}
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
                                            <TextInput  
                                            placeholderTextColor={'grey'}
                                            {...register("frequentFlyerNumber")} name="frequentFlyerNumber"
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
                                            <TextInput  
                                            placeholderTextColor={'grey'}
                                            {...register("passportNumber")} name="passportNumber"
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
                                            <TextInput 
                                            placeholderTextColor={'grey'}
                                              {...register("issuingCountry")} name="issuingCountry"
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
                                            <TextInput 
                                            placeholderTextColor={'grey'}
                                            {...register("pan")} name="pan"
                                                onChangeText={value => onChange(value)}
                                                value={value}
                                                 keyboardType='default'
                                                  placeholder='Enter the PAN'
                                                  placeholderTextColor={'grey'}

                                                   style={style.input} />
                                                   
                                        )}
                                        name="pan"
                                        rules={{ required: false }}
                                    />
                                </View>
                            </View>
                            :
                            null
                        }
                        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center'}}>
                            <View style={{ backgroundColor: '#FFC400', padding: 10, borderRadius: 100, }}>
                                <Image source={require('../../Assert/Images/mic.png')} />
                            </View>
                            <Text style={{ width:width*0.75,marginLeft: 10, color: COLORS.colorText, fontSize: height*0.019, fontFamily:FONTS.mediam, }}>Complete Your Profile And Enjoy 5000 As Joining Bonus</Text>
                        </View>
                        <View style={{ marginVertical: 30 }}>
                            <View style={{ flexDirection: 'column' }}>
                                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }} onPress={() => setPolicyBox(!policyBox)}>
                                    <View >
                                        {policyBox === true ?
                                             <View style={[style.custmCheckBox,{backgroundColor:COLORS.colorBtn,paddingVertical:1,paddingHorizontal:2}]}>
                                             <Ionicons name='checkmark' color={'white'} size={17}/>
                                             </View>
                                            :
                                            <View style={[style.custmCheckBox,{paddingVertical:1,paddingHorizontal:1}]}>
                                            <Ionicons name='checkmark' color={'white'} size={17}/>
                                            </View>
                                        }
                                    </View>
                                    <Text style={{ marginLeft: 10, color: '#666666', fontSize: 14, fontFamily:FONTS.mediam }}>
                                        I have read and accepted the Terms of Use.
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flexDirection: 'row', }} onPress={() => setPrivacyBox(!privacyBox)}>
                                    <View >
                                        {privacyBox === true ?
                                       
                                            <View style={[style.custmCheckBox,{backgroundColor:COLORS.colorBtn,paddingVertical:1,paddingHorizontal:2}]}>
                                            <Ionicons name='checkmark' color={'white'} size={17}/>
                                            </View>
                                            :
                                    
                                            <View style={[style.custmCheckBox,{paddingVertical:1,paddingHorizontal:1}]}>
                                            <Ionicons name='checkmark' color={'white'} size={17}/>
                                            </View>
                                        }
                                    </View>
                                    <Text style={{ marginLeft: 10, color: '#666666', fontSize: height*0.018,  fontFamily:FONTS.mediam  }}>
                                        The Tickatrip may send me promotional offers including emails about products and services.
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                            <TouchableOpacity disabled={(privacyBox !== true) || (policyBox !== true)} style={((privacyBox !== true) || (policyBox !== true)) ? style.buttonError : style.button} onPress={handleSubmit(onSubmit)}><Text style={{ color: '#fff',fontFamily:FONTS.mediam }} >SIGN UP</Text></TouchableOpacity>
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

    )
}
const style = StyleSheet.create({
    errorMessage: {
        color: 'red',
        fontSize: height*0.018,
        fontFamily:FONTS.mediam
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
        color: 'black',
        borderRadius: 5,
    },
    signUpForm: {
        marginHorizontal: 30,
    },
    label: {
        color: '#425466',
        fontFamily: FONTS.mediam,
        fontSize: height*0.019,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginBottom: 3,
    },
    headingText: {
        textAlign: 'center',
        paddingTop: 50,
        color: '#0083E9',
        fontSize: 22,
        fontFamily: FONTS.fontSemi,
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
    },
    custmCheckBox:{borderRadius:2,borderColor:'grey',borderWidth:0.7,alignItems:'center'}

})
export default SignUp