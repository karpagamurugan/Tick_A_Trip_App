/* eslint-disable prettier/prettier */
import React, { useEffect, useState, memo } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight, Modal, Pressable, ActivityIndicator, Animated, TextInput } from 'react-native';
import color from '../constants/color';
import font from '../constants/font';
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
import moment from 'moment';
import CalendarIcon from "react-native-vector-icons/MaterialCommunityIcons";
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker'
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
        // AsyncStorage.removeItem('tickatrip-token')
        AsyncStorage.removeItem('email')
        AsyncStorage.removeItem('phone')
        AsyncStorage.removeItem('username')
        navigation.navigate('Login')
        dispatch({ type: userActions.SET_USER_PROFILE, payload: null })
        setAuthToken(null)
    }


    async function filePicker() {
        var res = null
        try {
            res = await DocumentPicker.pickSingle({
                type: DocumentPicker.types.allFiles,
            });
            let val = 'image';
            let mimeType = res?.name?.split('.')[1]

            const urlComponents = res.uri.split('/')
            const fileNameAndExtension = urlComponents[urlComponents.length - 1]
            const destPath = `${RNFS.DocumentDirectoryPath}/${res.name}`
            await RNFS.copyFile(res.uri, destPath)

            let url = 'file://' + destPath
            setImage(image = {
                URL: url,
                type: res.type,
                name: res?.name,
            })

        } catch (e) {
            if (DocumentPicker.isCancel(e)) {
                setImage('')
            } else {
                setImage('')
                throw e;
            }
        }
    } //file pickers function...


    return (
        <View style={styles.mainContainer}>

            <Modal
                visible={openModel}
                transparent={true}
                animationType="fade"
                style={{ padding: 0 }}
            >
                <Pressable
                    onPress={() => setOpenModel(!openModel)}
                    style={{
                        position: 'absolute',
                        backgroundColor: '#000000',
                        opacity: 0.3,
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                    }} />

                <View style={{ flex: 1, justifyContent: 'center' }} >
                    <TouchableHighlight underlayColor={'transparent'} style={styles.cancelBtn} onPress={() =>
                        setOpenModel(!openModel)
                    }>
                        <MaterialIcons name='cancel' size={23} color='red' />
                    </TouchableHighlight>
                    <View style={styles.modalMainContainer}>
                        <ScrollView>
                            <View>
                                <Text style={styles.modalTitle}>Profile Edit</Text>

                                <View style={styles.modalSubContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {
                                            (image?.URL === undefined || image?.URL === null || image?.URL === '') ?
                                                <View /> :
                                                <Image style={styles.profile} source={{ uri: image?.URL }} />
                                        }
                                        <TouchableHighlight underlayColor={'transparent'} onPress={() => filePicker()}>
                                            <Text style={styles.chooseProfile}>
                                                Choose Profile
                                            </Text>
                                        </TouchableHighlight>
                                    </View>



                                    {/* Gender*/}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Gender</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="gender"
                                            keyboardType='default'
                                            // onChangeText={(f) => {
                                            //     setFname(f)
                                            // }}
                                            numberOfLines={1}
                                        // value={fname}
                                        />
                                    </View>

                                    {/* user Name*/}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>UserName</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="UserName"
                                            keyboardType='default'
                                            // onChangeText={(f) => {
                                            //     setFname(f)
                                            // }}
                                            numberOfLines={1}
                                        // value={fname}
                                        />
                                    </View>

                                    {/* First Name*/}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>FirstName</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="FirstName"
                                            keyboardType='default'
                                            // onChangeText={(f) => {
                                            //     setFname(f)
                                            // }}
                                            numberOfLines={1}
                                        // value={fname}
                                        />
                                    </View>

                                    {/* last Name*/}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>LastName</Text>
                                        <TextInput

                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="LastName"
                                            keyboardType='default'
                                            // onChangeText={(l) => setLname(l)}
                                            numberOfLines={1}
                                        // value={lname}
                                        />
                                    </View>

                                    {/* DOB */}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Date-Of-Birth</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: font.font, color: 'black', paddingVertical: 10, paddingLeft: 7 }}>{moment(dob).format('YYYY-MM-DD')}</Text>
                                            <TouchableHighlight onPress={() => setShowPicker(!showPicker)} underlayColor='transparent' style={{ paddingRight: 5 }}>
                                                <CalendarIcon name="calendar" size={25} color="gray" />
                                            </TouchableHighlight>
                                        </View>
                                    </View>

                                    {/* personal maritial status */}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Maritial Status</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="Maritial Status"
                                            // onChangeText={(pmail) => {
                                            //     setPrmail(pmail)
                                            // }}
                                            numberOfLines={1}
                                        // value={prmail}
                                        />
                                    </View>


                                    {/* personal mobile no */}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Mobile Number</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="mobilenumber"
                                            keyboardType='number-pad'
                                            // onChangeText={(no) => {
                                            //     setMobileNo(no)
                                            // }}
                                            numberOfLines={1}
                                            maxLength={10}
                                        // value={mobileNo}
                                        />
                                    </View>
                                </View>

                                <View style={styles.updateBtn}>
                                    <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                        <Text style={styles.updateText}>
                                            Update
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </ScrollView>

                    </View>
                </View>
            </Modal>



            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <View style={styles.iconBack}>
                        <BackArrow height={20} width={20} />
                    </View>
                </TouchableHighlight>
                <Text style={isLogin ? styles.profileAppText : styles.guestprofileAppText}>Profile</Text>
                {isLogin &&
                    <TouchableHighlight underlayColor='transparent' style={styles.iconBack} onPress={() => setOpenModel(true)}>
                        <View>
                            <EditIcon height={22} width={22} />
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
                                <Image source={{ uri: `${PROFILE_URL}${userProfileData?.profile_image}` }}
                                    style={styles.profileImage} />

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
                            <TouchableHighlight onPress={() => null} underlayColor='transparent'>
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
                        isLogin === true ?
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
    guestprofileAppText: { fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.035, width: width * 0.5, },
    profileAppText: { fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.035 },
    mainContainer: { height: height, width: width, backgroundColor: 'white', },
    iconBack: { backgroundColor: 'white', borderRadius: 100, width: 45, height: 45, alignItems: 'center', justifyContent: 'center', elevation: 10 },
    appbar: {
        width: width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.AppbarColor,
        height: height * 0.09,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 15
    },
    subContainer: { flexDirection: 'column', alignItems: 'center' },
    profileImage: { height: 100, width: 100, borderRadius: 100, marginTop: 20 },
    name: { fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.03, marginTop: 10 },
    email: { fontFamily: font.fontBold, color: color.colorGrey, fontSize: height * 0.02, marginTop: -3 },
    number: { fontFamily: font.font, color: color.colorGrey, fontSize: height * 0.02 },
    divider: { backgroundColor: color.colorText, height: 1, opacity: 0.1, marginTop: 20, width: width * 0.86, },
    navView: { paddingTop: 10, width: width * 0.82 },
    navBtn: { flexDirection: 'row', alignItems: 'center', paddingTop: 20, paddingLeft: 25 },
    navTitle: { fontFamily: font.font, color: color.colorText, fontSize: 16, paddingLeft: 15 },
    editTextBorder: { borderWidth: 1, height: 45, borderRadius: 7, borderColor: 'gray', marginTop: 20, },
    inputeEditor: { paddingLeft: 10, fontFamily: font.font, color: "#000000", width: width * 0.5 },
    placeHolderText: {
        color: 'gray',
        position: 'absolute',
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        top: -11,
        left: 10,
        backgroundColor: '#ffffff',
        fontFamily: font.font
    },

    // modal degsin
    cancelBtn: { alignSelf: 'flex-end', paddingRight: 30, paddingBottom: 5 },
    modalMainContainer: {
        width: '85%',
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        height: '70%',
        alignItems: 'center',
        alignSelf: 'center',
        paddingBottom: 30
    },
    modalTitle: {
        fontFamily: font.fontBold,
        alignSelf: 'center',
        paddingTop: 20,
        color: 'black',
        fontSize: height * 0.025
    },
    modalSubContainer: { backgroundColor: 'white', width: width * 0.8, paddingHorizontal: 10 },
    chooseProfile: { color: 'white', backgroundColor: 'green', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 15, fontSize: height * 0.02 },
    profile: { height: 50, width: 50, borderColor: '#2BAB38', borderWidth: 1, borderRadius: 100 },
    updateBtn: { backgroundColor: 'green', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignSelf: 'center' },
    updateText: { color: 'white', fontFamily: font.font, alignSelf: 'center', paddingVertical: 7, paddingHorizontal: 10 }
})

export default memo(Profile)