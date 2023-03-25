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

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const ForgetVerify = ({ navigation }) => {
    const dispatch = useDispatch();
    const { handleSubmit, control, formState: { errors }, reset, register, setValue, getValues } = useForm();

   const onSubmit=(data)=>{
    dispatch({ type: CommonAction.COMMON_LOADER, payload: true });

    axios.post(
        `${API_URL}/sendPasswordRest`,
        {email:data?.Email}, {
        headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
    }
    ).then((res)=>{

        if(res?.data?.status ==true){
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: res?.data?.message[0]} })
            navigation.navigate('VerifyOtp',{email:res?.data?.message[1]})
            dispatch({ type: CommonAction.COMMON_LOADER, payload: false });

        }else{
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Something went wrong'} })
            dispatch({ type: CommonAction.COMMON_LOADER, payload: false });
        }
    }).catch(err=>{
        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: err?.response?.data?.message} })
        dispatch({ type: CommonAction.COMMON_LOADER, payload: false });

    })

   }

    return (
        <View style={style.SplashSection}>
            <ImageBackground source={require('../../Assert/Images/background.png')} style={style.SplashBgImage} resizeMode="cover">
                <Image style={style.BrandLogoSplash} source={require('../../Assert/Images/white-logo.png')} />
                
                <View style={style.LoginForm}>  
                    <View style={style.FormGroup}>
                    <Text style={style.FormLabelText}>Email</Text>
                    <Controller
                            control={control}
                            name="Email"
                            rules={{
                                required: {
                                    value: true,
                                    message: "Email can't be empty",
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    {...register("Email",{required:true,pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                                    name="Email"
                                    onChangeText={value => onChange(value)}
                                    textContentType="Email"
                                    style={style.LoginInput}
                                    keyboardType='email-address'
                                    placeholder="Enter the Email" />
                            )}
                        />
                              {errors.Email && <Text  style={style.errorMessage}>Invalid email</Text>}

                        {errors.Email && (
                            <Text style={style.errorMessage}>{errors.Email.message}</Text>
                        )}

                    </View>
                    <View style={style.LoginBtnSec}>
                        <TouchableHighlight underlayColor={'transparent'} style={style.btnLogin} onPress={handleSubmit(onSubmit)}>
                            <Text style={style.btnLoginText}>Send OTP</Text>
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

export default ForgetVerify;