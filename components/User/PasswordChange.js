/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Dimensions, TextInput, ImageBackground, Image, StyleSheet, TouchableHighlight } from 'react-native';
import FONTS from '../constants/font';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import userActions from '../../redux/user/actions';
import axios from 'axios';
import { API_URL } from '../constants/constApi';
import CommonAction from '../../redux/common/actions';
import COLORS from '../constants/color';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const PasswordChange = ({ navigation ,route}) => {
    const dispatch = useDispatch();
    const { handleSubmit, control, formState: { errors }, reset, register, setValue, getValues } = useForm();

   const onSubmit=(data)=>{
    console.log('datamksoqjsoiw',data)

    if(data?.ConfirmPassword !== data?.Password){
        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: "Passwod doesn't match"} })
    }else{
  axios.post(
        `${API_URL}/sendPasswordRest`,
        {email:route?.params?.email,
    password:data?.Password,
password_confirmation:data?.ConfirmPassword}, {
        headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    }
    ).then((res)=>{
        if(res?.data?.status ==true){
            console.log(res?.data,'dsficfihiu')
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: res?.data?.message} })
            navigation.navigate('Login')
        }else{
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Something went wrong'} })
        }
    })
    }
  

   }

    return (
        <View style={style.SplashSection}>
            <ImageBackground source={require('../../Assert/Images/background.png')} style={style.SplashBgImage} resizeMode="cover">
                <Image style={style.BrandLogoSplash} source={require('../../Assert/Images/white-logo.png')} />


                        {/* <Text style={{fontFamily:FONTS.mediam,color:'white',fontSize:height*0.025}}>Reset your Password</Text> */}
                <View style={style.LoginForm}>  
                    <View style={style.FormGroup}>
                    <Text style={style.FormLabelText}>Password</Text>
                    <Controller
                            control={control}
                            name="Password"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Password can't be empty",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    {...register("Password")}
                                    name="Password"
                                    onChangeText={value => onChange(value)}
                                    textContentType="Password"
                                    style={style.LoginInput}
                                    secureTextEntry
                                    placeholder="Enter the Password" />
                            )}
                        />

                        {errors.Password && (
                            <Text style={style.errorMessage}>{errors.Password.message}</Text>
                        )}

                    </View>


                    <View style={style.FormGroup}>
                    <Text style={style.FormLabelText}>Confirm Password</Text>
                    <Controller
                            control={control}
                            name="ConfirmPassword"
                            rules={{
                                required: {
                                    value: true,
                                    message: "ConfirmPassword can't be empty",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    {...register("ConfirmPassword")}
                                    name="ConfirmPassword"
                                    onChangeText={value => onChange(value)}
                                    textContentType="ConfirmPassword"
                                    style={style.LoginInput}
                                    secureTextEntry
                                    placeholder="Re-enter your password" />
                            )}
                        />

                        {errors.ConfirmPassword && (
                            <Text style={style.errorMessage}>{errors.ConfirmPassword.message}</Text>
                        )}

                    </View>
                    <View style={style.LoginBtnSec}>
                        <TouchableHighlight style={style.btnLogin} onPress={handleSubmit(onSubmit)}>
                            <Text style={style.btnLoginText}>Reset Password</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        </View >
    );
};

const style = StyleSheet.create({
    btnSighnUpText: {
        color: '#EDF2F7',
        fontSize: 12,
        fontFamily: FONTS.font,
    },
    btnGuestText: {
        color: '#EDF2F7',
        fontSize: 12,
        letterSpacing: 1,
    },
    continewGuestSec: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40
    },
    btnLoginText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 15,
    },
    btnLogin: {
        backgroundColor: '#0041F2',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 100,
    },
    LoginBtnSec: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30,
    },
    SplashSection: {
        width: width,
        height: height,
    },
    SplashBgImage: {
        width: width,
        height: height,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    BrandLogoSplash: {
        width: '60%',
        height: '20%',
        resizeMode: 'contain',
        marginBottom: 30,
    },
    SocialLogin: {
        flexDirection: 'row'
    },
    socialIconBox: {
        backgroundColor: '#EDF2F7',
        width: 40,
        height: 40,
        marginLeft: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
    },
    orDashBotton: {
        marginTop: 10,
        marginBottom: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    orDash: {
        marginTop: 30,
        marginBottom: 10,
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
    },
    orText: {
        color: '#EDF2F7',
        fontSize: 17,
        position: 'relative',
        marginLeft: 15,
        marginRight: 15,
    },
    OrLine: {
        content: '',
        width: 80,
        height: 1,
        backgroundColor: '#ffffff96',
    },
    FormLabelText: {
        color: '#fff',
        fontSize: 15,
        marginBottom: 10,
        marginTop: 10,
    },
    LoginForm: {
        width: width,
        paddingHorizontal: 40,
    },
    LoginInput: {
        borderRadius: 5,
        backgroundColor: '#EDF2F7',
        paddingLeft: 15,
    },
    fogetPassword: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 50,
    },
    forgetText: {
        color: '#EDF2F7',
        fontSize: 12,
    },
    errorMessage: {
        color: 'yellow',
        // backgroundColor:'white',
        fontSize: 12,
        fontFamily:FONTS.font
    },
})

export default PasswordChange;