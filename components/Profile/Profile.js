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

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


function Profile({ navigation }) {
    const dispatch = useDispatch()
    const { userProfileData, isLogin } = useSelector((state) => state.userReducer)

    var [showPicker, setShowPicker] = useState(false) //show date picker for dob
    var [dob, setDob] = useState(new Date()); //set DOB in profile update

    var [ticketShown, setTicketShown] = useState(false) //tickets expanded

    var [openModel, setOpenModel] = useState(false) //show profile edit

    var [image, setImage] = useState() //set selected profile image

  

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
                     onPress={() =>{ 
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
                            <View style={{ alignItems: 'center' }}>
                                {
                                    (userProfileData?.profile_image === undefined || userProfileData?.profile_image === null)?
                                    
    
                                    <Image style={styles.profileImage} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDvb0w_KsktUynzqLWBnQDqXRq-5um4KAtXA&usqp=CAU'}}/>
                                    :
                            
                                      <Image source={{ uri: `${PROFILE_URL}${userProfileData?.profile_image}` }}
                                    style={styles.profileImage} />
                                  
                                    
                            
                                }
                               

                                <Text style={styles.name}>{userProfileData?.name}</Text>
                                <Text style={styles.email}>{userProfileData?.email}</Text>
                                <Text style={styles.number}>{userProfileData?.phone}</Text>
                            </View>
                        }

                        <View style={styles.divider} />

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
                                        <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                            <View style={styles.navBtn}>
                                                <MaterialIcons name='flight' size={22} color='#4C94F2' />
                                                <Text style={styles.navTitle}>Flight cancel</Text>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => null} underlayColor='transparent'>
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
                        (isLogin===true)?
                            <View style={{ paddingLeft: 35 }}>
                                <TouchableHighlight onPress={() => LogOut()} underlayColor='transparent'>
                                    <View style={styles.navBtn}>
                                        <LogoutIcon height={22} width={22} />
                                        <Text style={styles.navTitle}>Logout</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                            :
                            <View style={{ paddingLeft: 35 }}>
                                <TouchableHighlight onPress={() => navigation.navigate('Login')} underlayColor='transparent'>
                                    <View style={styles.navBtn}>
                                        <MaterialIcons style={styles.loginIcon} name='login' height={22} width={22} />
                                        <Text style={styles.navTitle}>Login</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                    }
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
  

   
})

export default memo(Profile)