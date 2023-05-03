/* eslint-disable prettier/prettier */
import React,{useCallback, useEffect, useState} from 'react';
import { View, Text, Dimensions, TextInput, ImageBackground, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import userActions from '../../redux/user/actions';
import FONT from '../constants/font';
import COLORS from '../constants/color';
import {debounce} from 'lodash';
import FONTS from '../constants/font';
import axios from 'axios';
import { API_URL } from '../constants/constApi';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import Entypo from 'react-native-vector-icons/Entypo';
import GoogleLogin from './GoogleLogin';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height


const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const { handleSubmit, control, formState: { errors }, reset, register, setValue, getValues } = useForm();

    var [showPass,setShowPass]=useState(true)
  
    const [state, setState] = useState({googleLoginUrl: null,facebookURL: null,});//social login url
    const onSubmit = (data) => {
        dispatch({
            type: userActions.GET_USER_LOGIN, payload: {
                email: data.userMail,
                password: data.userPassword,
            },
            navigation: navigation
        });
        handleDebugger()   
    }
    const handleDebugger = useCallback(
        debounce((e)=>console.log(e), 400)
        , []); 

        const webClientId = "258076381203-84shhubi53cjvnof4deinn4dunoc4aal.apps.googleusercontent.com"; 

        useEffect(()=>{
            GoogleSignin.configure({
                webClientId: webClientId,
            })
        },[])

        async function onGoogleButtonPress() {

            const { idToken } = await GoogleSignin.signIn();
            
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            auth().onAuthStateChanged((user) => {

                if(user) {
                    user.getIdToken().then(function(idToken) { 
                        //   return idToken;
                      });
                 


                // axios.get(`${API_URL}/auth/google/callback?displayName=${user?.displayName}&email=${user?.email}&photoURL=${user?.photoURL}&providerId=${user?.providerData[0]?.providerId}&uid=${user?.providerData[0]?.uid}`,
                // ).then(result => {
                //     console.log('result....',result)
                  
                // }).catch((error) => {
                //     console.log('error',error)
                // });
                } else {
                    console.log(false);
                }
                }) 
            
            return auth().signInWithCredential(googleCredential);
            }


            const onFBButtonPress=()=>{
                console.log('fb....')
            }
        
 

  const handleGoogle = async () => {
    let temp = {
      googleLoginUrl: null,
      facebookURL: null,
    };
    await axios.get(`${API_URL}/auth/google/url`)
      .then((response) => {
        temp = ({ googleLoginUrl: response.data.url, facebookURL: temp.facebookURL })
      })
      .catch((error) => {

      });
    await axios.get(`${API_URL}/auth/facebook/url`)
      .then((response) => {
        temp = { facebookURL: response.data.url, googleLoginUrl: temp.googleLoginUrl };
        setState(temp);
      })
      .catch((error) => {

      });
  }

  useEffect(() => {
    handleGoogle();
  }, []);

    return (
        <View style={style.SplashSection}>
            <ImageBackground source={require('../../Assert/Images/background.png')}  style={style.SplashBgImage} resizeMode="cover">
                <Image style={style.BrandLogoSplash} source={require('../../Assert/Images/white-logo.png')} />
                <View style={style.SocialLogin}>

                    <TouchableHighlight underlayColor={'transparent'} 
                    // onPress={()=>navigation.navigate('google',googleURL=`${state?.googleLoginUrl}`)}
                    onPress={()=>onGoogleButtonPress()}
                   >
                    <View style={style.socialIconBox}><Image style={style.SocialLoginIcon} source={require('../../Assert/Images/icon/google.png')} /></View>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor={'transparent'} onPress={()=>onFBButtonPress()}>
                    <View style={style.socialIconBox}><Image style={style.SocialLoginIcon} source={require('../../Assert/Images/icon/facebook.png')} /></View>
                    </TouchableHighlight>

                </View>
                <View style={style.orDash}>
                    <Text style={style.OrLine}></Text>
                    <Text style={style.orText}>Or</Text>
                    <Text style={style.OrLine}></Text>
                </View>
                <View style={style.LoginForm}>
                    <View style={style.FormGroup}>
                        <Text style={style.FormLabelText}>UserName | Email</Text>
                        <Controller
                            control={control}
                            name="userMail"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Enter your username/Email',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    {...register("userMail")}
                                    name="userMail"
                                    onChangeText={value => onChange(value)}
                                    keyboardType="default"
                                    style={style.LoginInput}
                                    placeholder="Enter Your Email | Phone" 
                                    placeholderTextColor={'grey'}
                                    />
                            )}
                        />
                        {errors.userMail && (
                            <Text style={style.errorMessage}>{errors.userMail.message}</Text>
                        )}
                    </View>

                    <View style={style.FormGroup}>
                            <Text style={style.FormLabelText}>Password</Text>
                        <Controller
                            control={control}
                            name="userPassword"
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Select your Password!',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <View style={[style.LoginInput,{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingRight:20}]}>
                                     <TextInput
                                    {...register("userPassword")}
                                    name="userPassword"
                                    onChangeText={value => onChange(value)}
                                    textContentType="newPassword"
                                    secureTextEntry={showPass}
                                    //  style={style.LoginInput}
                                    placeholder="Enter the password" 
                                    placeholderTextColor={'grey'}
                                    />
                                   
                                   <TouchableHighlight underlayColor={'transparent'} onPress={()=>setShowPass(!showPass)}>
                                 {   (!showPass)?
                                   <Entypo name='eye' size={height*0.03} color={'#4d4f4d'}/>
                                   :<Entypo name='eye-with-line' size={height*0.03} color={'#4d4f4d'}/>}
                                   </TouchableHighlight>
                                   

                                </View>
                            )}
                        />
                        {errors.userPassword && (
                            <Text style={style.errorMessage}>{errors.userPassword.message}</Text>
                        )}
                    </View>

                    <View style={style.fogetPassword}>
                        {/* <TouchableHighlight underlayColor={'transparent'} onPress={()=>navigation.navigate('ForgetVerify')}> */}
                        <TouchableHighlight underlayColor={'transparent'} onPress={()=>navigation.navigate('ForgetVerify')}>
                            <Text style={style.forgetText}>Forgot Password</Text>
                        </TouchableHighlight>
                        {/* <TouchableHighlight underlayColor={'transparent'}>
                            <Text style={style.forgetText}>SEND OTP</Text>
                        </TouchableHighlight> */}
                    </View>
                    <View style={style.LoginBtnSec}>
                        <TouchableHighlight underlayColor={'transparent'} style={style.btnLogin} onPress={handleSubmit(onSubmit)}>
                            <Text style={style.btnLoginText}>SIGN IN</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={style.continewGuestSec}>
                        <View style={style.signUp}>
                        <Text style={style.btnSighnUpText}>Don't have an account? </Text>
                        <TouchableHighlight underlayColor={'transparent'} style={style.btnSighnUp} onPress={() => navigation.navigate('SignUp')}>
                            <Text style={style.btnSighnUpText}> Sign Up</Text>
                        </TouchableHighlight>
                        </View>
                        <View style={style.orDashBotton}>
                            <Text style={style.OrLine}></Text>
                            <Text style={style.orText}>Or</Text>
                            <Text style={style.OrLine}></Text>
                        </View>
                        <TouchableHighlight underlayColor={'transparent'} style={style.btnSighnUp} onPress={() => navigation.navigate('bottomNavigation')}>
                            <Text style={style.btnGuestText}>CONTINUE AS A GUEST</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};

const style = StyleSheet.create({
    signUp:{
        flexDirection:'row'
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        fontFamily:FONT.font
    },
    btnSighnUpText: {
        color: COLORS.TextGrey,
        fontSize: 12,
        fontFamily: FONT.light,
    },
    btnGuestText: {
        color: COLORS.TextGrey,
        fontSize: 12,
        letterSpacing: 1,
        fontFamily:FONT.mediam
    },
    continewGuestSec: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20
    },
    btnLoginText: {
        color: '#fff',
        fontWeight: '400',
        fontSize: 15,
        fontFamily:FONT.light
    },
    btnLogin: {
        backgroundColor: COLORS.BtnColor,
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 100,
    },
    LoginBtnSec: {
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
        // display: 'flex',
        alignItems: 'center'
    },
    BrandLogoSplash: {
        width: '60%',
        height: '20%',
        resizeMode: 'contain',
        // marginBottom: 30,
        // backgroundColor:'white'
    },
    SocialLogin: {
        flexDirection: 'row'
    },
    socialIconBox: {
        backgroundColor: COLORS.TextGrey,
        width: 40,
        height: 40,
        marginLeft: 10,
        // display: 'flex',
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
        color:COLORS.TextGrey,
        fontSize: 17,
        position: 'relative',
        marginLeft: 15,
        marginRight: 15,
        fontFamily:FONT.mediam
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
        fontFamily:FONT.mediam
    },
    LoginForm: {
        width: width,
        paddingHorizontal: 40,
    },
    LoginInput: {
        borderRadius: 5,
        backgroundColor: COLORS.TextGrey,
        paddingLeft: 15,
        color:'black'
    },
    fogetPassword: {
        flexDirection: 'row',
        justifyContent:'flex-end',
        marginTop: 15,
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 30,
    },
    forgetText: {
        color: COLORS.TextGrey,
        fontSize: 12,
        fontFamily: FONT.light,
    },
})

export default Login;