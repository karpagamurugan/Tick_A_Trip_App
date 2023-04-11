/* eslint-disable prettier/prettier */
import React, { useEffect, useState, memo } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight, Modal, Pressable, ActivityIndicator, Animated, TextInput } from 'react-native';
import COLORS from '../constants/color';
import FONTS from '../constants/font';
import TicketIcon from '../../Assert/Images/icon/Ticket.svg';
import LogoutIcon from '../../Assert/Images/icon/logout.svg';
import ShareIcon from '../../Assert/Images/icon/share.svg';
import EditIcon from '../../Assert/Images/icon/edit.svg';
import BackArrow from '../../Assert/Images/icon/backward-arrow.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useDispatch, useSelector } from 'react-redux';
import userActions from '../../redux/user/actions'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PROFILE_URL } from '../constants/constProfileApi';
import setAuthToken from '../constants/setAuthToken';
import DatePicker from 'react-native-date-picker';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import commonAction from '../../redux/common/actions'
import { Controller, useForm } from 'react-hook-form';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


function Profile({ navigation }) {
    const dispatch = useDispatch()
    const { userProfileData, isLogin } = useSelector((state) => state.userReducer)
    const { handleSubmit, register, control, formState: { errors }, reset, setValue } = useForm();
    var [showPicker, setShowPicker] = useState(false) //show date picker for dob
    var [dob, setDob] = useState(new Date()); //set DOB in profile update

    var [ticketShown, setTicketShown] = useState(false) //tickets expanded

    var [openModel, setOpenModel] = useState(false) //show profile edit
    var [openFlightModel, setOpenFlightModel] = useState(false) //show Flight cancel
    var [openHotelModel, setOpenHotelModel] = useState(false) //show Hotel cancel
    var [image, setImage] = useState() //set selected profile image
    var [showLogin, setShowLogin] = useState(false)



    useEffect((async) => {
        dispatch({ type: commonAction.COMMON_LOADER, payload: true })
        dispatch({ type: userActions.GET_USER_PROFILE })
    }, [dispatch])


    const LogOut = () => {
        AsyncStorage.removeItem('tickatrip-token')
        AsyncStorage.removeItem('email')
        AsyncStorage.removeItem('phone')
        AsyncStorage.removeItem('username')
        navigation.navigate('Login')
        dispatch({ type: userActions.SET_USER_PROFILE, payload: null })
        dispatch({ type: userActions.SET_IS_LOGIN, payload: false })
        setAuthToken(null)
    }



    return (
        <View style={styles.mainContainer}>
            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <View style={styles.iconBack}>
                        <BackArrow height={20} width={20} />
                    </View>
                </TouchableHighlight>
                <Text style={isLogin ? styles.profileAppText : styles.guestprofileAppText}>Profile</Text>
                {isLogin &&
                    <TouchableHighlight underlayColor='transparent' style={styles.iconBack}
                        onPress={() => {
                            navigation.navigate('updateProfile')
                            // setOpenModel(true)
                        }}>
                        <View>
                            <EditIcon height={20} width={20} />
                        </View>
                    </TouchableHighlight>
                }
            </View>

            <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} horizontal={false}>
                <View style={{ height: height, marginBottom: 35 }}>
                    <View style={styles.subContainer}>
                        {
                            userProfileData &&
                            <View>
                                <View style={{ alignItems: 'center' }}>
                                    {
                                        (userProfileData?.profile_image === undefined || userProfileData?.profile_image === null) ?
                                            <Image style={styles.profileImage} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDvb0w_KsktUynzqLWBnQDqXRq-5um4KAtXA&usqp=CAU' }} />
                                            :
                                            <Image source={{ uri: `${PROFILE_URL}${userProfileData?.profile_image}` }}
                                                style={styles.profileImage} />

                                    }

                                    <Text style={styles.name}>{userProfileData?.name}</Text>
                                    <Text style={styles.email}>{userProfileData?.email}</Text>
                                    <Text style={styles.number}>{userProfileData?.phone}</Text>
                                </View>
                                <View style={styles.divider} />
                            </View>
                        }

                        <View style={styles.navView}>
                            {isLogin &&
                                <View>
                                    <TouchableHighlight onPress={() => setTicketShown(!ticketShown)} underlayColor='transparent'>
                                        <Animated.View>
                                            <View style={styles.navBtn}>
                                                <TicketIcon height={22} width={22} />
                                                <Text style={styles.navTitle}>My Tickets</Text>
                                            </View>
                                            {
                                                (!ticketShown) ?
                                                    <View style={{ paddingLeft: 30 }}>
                                                        <TouchableHighlight onPress={() => navigation.navigate('FlightTicket')} underlayColor='transparent'>
                                                            <View style={styles.navBtn}>
                                                                <MaterialIcons name='flight' size={22} color='#4C94F2' />
                                                                <Text style={styles.navTitle}>Flight</Text>
                                                            </View>
                                                        </TouchableHighlight>
                                                        <TouchableHighlight onPress={() => navigation.navigate('HotelTicket')} underlayColor='transparent'>
                                                            <View style={styles.navBtn}>
                                                                <FontAwesome name='hotel' size={22} color='#4C94F2' />
                                                                <Text style={styles.navTitle}>Hotel</Text>
                                                            </View>
                                                        </TouchableHighlight>
                                                    </View>
                                                    : <View />
                                            }
                                        </Animated.View>
                                    </TouchableHighlight>

                                    <TouchableHighlight onPress={() => navigation.navigate('addTraveller')} underlayColor='transparent'>
                                        <View style={styles.navBtn}>
                                            <Fontisto name='persons' size={22} color='#4C94F2' />
                                            <Text style={styles.navTitle}>Add Traveller</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            }
                            {
                                isLogin !== true ?
                                    <View>
                                        <TouchableHighlight onPress={() => setOpenFlightModel(true)} underlayColor='transparent'>
                                            <View style={styles.navBtn}>
                                                <MaterialIcons name='flight' size={22} color='#4C94F2' />
                                                <Text style={styles.navTitle}>Flight cancel</Text>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => setOpenHotelModel(true)} underlayColor='transparent'>
                                            <View style={styles.navBtn}>
                                                <FontAwesome5 name='hotel' size={22} color='#4C94F2' />
                                                <Text style={styles.navTitle}>Hotel cancel</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                    :
                                    null
                            }
                            <TouchableHighlight onPress={() => navigation.navigate('offers')} underlayColor='transparent'>
                                <View style={styles.navBtn}>
                                    <MaterialCommunityIcons name='brightness-percent' size={22} color='#4C94F2' />
                                    <Text style={styles.navTitle}>Offers</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                <View style={styles.navBtn}>
                                    <ShareIcon height={22} width={22} />
                                    <Text style={styles.navTitle}>Share App</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.divider} />
                    </View>
                    {
                        (isLogin === true) ?
                            <View style={{ paddingLeft: 35 }}>
                                <TouchableHighlight onPress={() => LogOut()} underlayColor='transparent'>
                                    <View style={styles.navBtn}>
                                        <LogoutIcon height={22} width={22} />
                                        <Text style={styles.navTitle}>Logout</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            :


                            <View style={{ paddingLeft: 30 }}>
                                <TouchableHighlight onPress={() => setShowLogin(!showLogin)} underlayColor='transparent'>
                                    <Animated.View>
                                        <View style={styles.navBtn}>
                                            <MaterialIcons style={styles.loginIcon} name='login' height={22} width={22} />
                                            <Text style={styles.navTitle}>Sign In/ Register</Text>
                                        </View>
                                        {
                                            (!showLogin) ?
                                                <View style={{ paddingLeft: 30 }}>
                                                    <TouchableHighlight onPress={() => navigation.navigate('Login')} underlayColor='transparent'>
                                                        <View style={styles.navBtn}>
                                                            {/* <MaterialIcons style={styles.loginIcon} name='login' height={22} width={22} /> */}
                                                            <Text style={styles.navTitle}>Login</Text>
                                                        </View>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight onPress={() => navigation.navigate('SignUp')} underlayColor='transparent'>
                                                        <View style={styles.navBtn}>
                                                            {/* <FontAwesome name='hotel' size={22} color='#4C94F2' /> */}
                                                            <Text style={styles.navTitle}>Register</Text>
                                                        </View>
                                                    </TouchableHighlight>
                                                </View>
                                                : <View />
                                        }
                                    </Animated.View>
                                </TouchableHighlight>
                            </View>

                    }

                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={openFlightModel}
                        onRequestClose={() => {
                            setOpenFlightModel(!openFlightModel);
                        }}>
                        <View style={styles.modalOuter}>
                            <View style={styles.modalInner}>
                                <Pressable
                                    style={{ right: -10, position: 'absolute', top: -20 }}
                                    onPress={() => setOpenFlightModel(!openFlightModel)}
                                >
                                    <MaterialCommunityIcons name='close-circle' size={33} style={{ color: '#003AA8' }} />
                                </Pressable>
                                <Text style={styles.popupTitle}>PNR Number</Text>
                                <View style={styles.editTextBorder}>
                                    <Controller
                                        control={control}
                                        name="PNR"
                                        rules={{
                                            required: {
                                                value: true,
                                                message: "Enter Your PNR"
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <TextInput
                                                placeholderTextColor={"gray"}
                                                style={styles.inputeEditor}
                                                placeholder="Enter Your PNR"
                                                keyboardType='default'
                                                {...register("PNR")}
                                                // value={value}
                                                onChangeText={value => onChange(value)}
                                            />
                                        )}
                                    />
                                    {errors.PNR && (
                                        <Text style={[styles.errormessage]}>{errors.PNR.message}</Text>
                                    )}
                                </View>
                                <Text style={styles.popupCont}>Enter the ticket PNR no to send otp your register mail i'd</Text>
                                <TouchableHighlight
                                    style={styles.popupOTP}
                                >
                                    <Text style={styles.otpText}>Send OTP</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType='fade'
                        transparent={true}
                        visible={openHotelModel}
                        onRequestClose={() => {
                            setOpenHotelModel(!openHotelModel);
                        }}>
                        <View style={styles.modalOuter}>
                            <View style={styles.modalInner}>
                                <Pressable
                                    style={{ right: -10, position: 'absolute', top: -20 }}
                                    onPress={() => setOpenHotelModel(!openHotelModel)}
                                >
                                    <MaterialCommunityIcons name='close-circle' size={33} style={{ color: '#003AA8' }} />
                                </Pressable>
                               
                                <View>
                                    <Text style={styles.popupTitle}>Supplier Confirmation Number</Text>
                                    <View style={styles.editTextBorder}>
                                        <Controller
                                            control={control}
                                            name="SCN"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Enter Your SCN"
                                                }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextInput
                                                    placeholderTextColor={"gray"}
                                                    style={styles.inputeEditor}
                                                    placeholder="Enter Your SCN"
                                                    keyboardType='default'
                                                    {...register("SCN")}
                                                    // value={value}
                                                    onChangeText={value => onChange(value)}
                                                />
                                            )}
                                        />
                                        {errors.SCN && (
                                            <Text style={[styles.errormessage]}>{errors.SCN.message}</Text>
                                        )}
                                    </View>
                                    <Text style={styles.popupCont}>Enter the ticket SCN to send otp your register mail i'd</Text>
                                    <TouchableHighlight style={styles.popupOTP}>
                                        <Text style={styles.otpText}>Send OTP</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>

                {/* select dob date  */}
                <DatePicker
                    modal
                    open={showPicker}
                    date={dob}
                    mode="date"
                    maximumDate={new Date()}
                    onConfirm={(date) => {
                        setShowPicker(!showPicker)
                        setDob(dob = date)
                    }}
                    onCancel={() => {
                        setShowPicker(!showPicker)
                    }}
                />

            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    loginIcon: {
        color: '#4C94F2',
        fontSize: 20,
    },
    guestprofileAppText: { fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.035, width: width * 0.5, },
    profileAppText: { fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.035 },
    mainContainer: { height: height, width: width, backgroundColor: 'white', },
    iconBack: { backgroundColor: 'white', borderRadius: 100, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', elevation: 10 },
    appbar: {
        width: width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.AppbarColor,
        height: height * 0.07,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 15
    },
    subContainer: { flexDirection: 'column', alignItems: 'center' },
    profileImage: { height: 100, width: 100, borderRadius: 100, marginTop: 20 },
    name: { fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.03, marginTop: 10 },
    email: { fontFamily: FONTS.fontBold, color: COLORS.colorGrey, fontSize: height * 0.02, marginTop: -3 },
    number: { fontFamily: FONTS.font, color: COLORS.colorGrey, fontSize: height * 0.02 },
    divider: { backgroundColor: COLORS.colorText, height: 1, opacity: 0.1, marginTop: 20, width: width * 0.86, },
    navView: { paddingTop: 10, width: width * 0.82 },
    navBtn: { flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingLeft: 25 },
    navTitle: { fontFamily: FONTS.font, color: COLORS.colorText, fontSize: 16, paddingLeft: 15 },
    modalOuter: {
        backgroundColor: '#00000073',
        height: '100%', width: '100%',
        justifyContent: 'center', alignItems: 'center',
    },
    modalInner: {
        backgroundColor: '#f0f4f7',
        width: '90%', justifyContent: 'center',
        borderRadius: 5, padding: 30,
    },
    popupTitle: {
        fontSize: height * 0.025,
        fontFamily: FONTS.fontSemi,
        color: '#003AA8',
    },
    editTextBorder: {
        borderWidth: 1, height: 45, borderRadius: 3,
        borderColor: '#0041F2', marginVertical: 12,
    },
    inputeEditor: {
        color: '#003AA8'
    },
    popupCont: {
        textAlign: 'center',
        lineHeight: 18,
        fontSize: height * 0.015,
        paddingHorizontal: 10,
        fontFamily: FONTS.mediam,
        color: '#818181',
    },
    popupOTP: {
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#003AA8',
        borderRadius: 5,
        marginTop: 20,
        marginHorizontal: 40,
        backgroundColor: '#003AA8'
    },
    otpText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: height * 0.018,
        fontFamily: FONTS.fontSemi,
    }

})

export default memo(Profile)