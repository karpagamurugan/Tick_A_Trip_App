/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Dimensions, TextInput, ImageBackground, Image, StyleSheet, TouchableHighlight } from 'react-native';

const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height

const Login = ({ navigation }) => {

    return (
        <View style={style.SplashSection}>
            <ImageBackground source={require('../../Assert/Images/background.png')} style={style.SplashBgImage} resizeMode="cover">
                <Image style={style.BrandLogoSplash} source={require('../../Assert/Images/white-logo.png')} />
                <View style={style.SocialLogin}>
                    <View style={style.socialIconBox}><Image style={style.SocialLoginIcon} source={require('../../Assert/Images/icon/facebook.png')} /></View>
                    <View style={style.socialIconBox}><Image style={style.SocialLoginIcon} source={require('../../Assert/Images/icon/google.png')} /></View>
                </View>
                <View style={style.orDash}>
                    <Text style={style.OrLine}></Text>
                    <Text style={style.orText}>Or</Text>
                    <Text style={style.OrLine}></Text>
                </View>
                <View style={style.LoginForm}>
                    <View style={style.FormGroup}>
                        <Text style={style.FormLabelText}>Email | Phone</Text>
                        <TextInput keyboardType="default" style={style.LoginInput} placeholder="Enter Your Email | Phone" />
                    </View>
                    <View style={style.FormGroup}>
                        <Text style={style.FormLabelText}>Password</Text>
                        <TextInput textContentType="newPassword" secureTextEntry style={style.LoginInput} placeholder="Enter the password" />
                    </View>
                    <View style={style.fogetPassword}>
                        <TouchableHighlight>
                            <Text style={style.forgetText}>Forgot Password</Text>
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <Text style={style.forgetText}>SEND OTP</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={style.LoginBtnSec}>
                        <TouchableHighlight style={style.btnLogin}>
                            <Text style={style.btnLoginText}>SIGN IN</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={style.continewGuestSec}>
                        <TouchableHighlight style={style.btnSighnUp}>
                            <Text style={style.btnSighnUpText}>Forgot Password</Text>
                        </TouchableHighlight>
                        <View style={style.orDashBotton}>
                            <Text style={style.OrLine}></Text>
                            <Text style={style.orText}>Or</Text>
                            <Text style={style.OrLine}></Text>
                        </View>
                        <TouchableHighlight style={style.btnSighnUp}>
                            <Text style={style.btnGuestText}>CONTINUE AS A GUEST</Text>
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
        fontSize:12,
    },
    btnGuestText: {
        color: '#EDF2F7',
        fontSize:12,
        letterSpacing:1,
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
        backgroundColor: '#0086ea',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 100,
    },
    LoginBtnSec: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    SplashSection: {
        width: width,
        height: height,
    },
    SplashBgImage: {
        width: width,
        height: height,
        display: 'flex',
        alignItems: 'center'
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
})

export default Login;