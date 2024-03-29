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
    dispatch({ type: CommonAction.COMMON_LOADER, payload: true });
    if(data?.ConfirmPassword !== data?.Password){
        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: "Passwod doesn't match"} })
        dispatch({ type: CommonAction.COMMON_LOADER, payload: false });

    }else{
  axios.post(
        `${API_URL}/restPassword`,
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
            dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: res?.data?.message[0]} })
            navigation.navigate('Login')
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
  

   }

    return (
        <View style={style.SplashSection}>
            <ImageBackground source={require('../../Assert/Images/background.png')} style={style.SplashBgImage} resizeMode="cover">
                <Image style={style.BrandLogoSplash} source={require('../../Assert/Images/white-logo.png')} />

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
                                    placeholder="Enter the Password" 
                                    placeholderTextColor={'grey'}
                                    />
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
                                    placeholderTextColor={'grey'}
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
        color:'black'
    },
    errorMessage: {
        color: 'yellow',
        // backgroundColor:'white',
        fontSize: 12,
        fontFamily:FONTS.font
    },
})

export default PasswordChange;