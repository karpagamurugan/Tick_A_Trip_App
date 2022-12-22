/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight, Modal } from 'react-native';
import color from '../../constants/color';
import font from '../../constants/font';
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
import { PROFILE_URL } from '../../constants/constProfileApi';
import setAuthToken from '../../constants/setAuthToken';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


export default function Profile({ navigation }) {
    const dispatch = useDispatch()
    const { userProfileData } = useSelector((state) => state.userReducer)
    var [ticketShown, setTicketShown] = useState(false)
    var [openModel, setOpenModel] = useState(false)
    console.log('userProfileData', userProfileData)

    useEffect((async) => {

        dispatch({ type: userActions.GET_USER_PROFILE })
        // AsyncStorage.getItem('tickatrip-token').then((res) => console.log('tock-pro', res))
    }, [dispatch])

    const LogOut = () => {
        AsyncStorage.removeItem('tickatrip-token')
        AsyncStorage.removeItem('tickatrip-token')
        AsyncStorage.removeItem('email')
        AsyncStorage.removeItem('phone')
        AsyncStorage.removeItem('username')
        navigation.navigate('Login')
        dispatch({ type: userActions.SET_USER_PROFILE, payload: null })
        setAuthToken(null)
    }

    return (
        <View style={styles.mainContainer}>
            <Modal
                visible={openModel}
                transparent={true}
                animationType="fade"
            >
                <View style={{ position: 'absolute', backgroundColor: 'red', top: height * 0.2 }}>
                    <View style={{ height: height * 0.5, width: width, alignItems: 'center', marginTop: 80 }}>
                        <Text>ajsfhjsda</Text>
                    </View>
                </View>
            </Modal>
            <View style={styles.appbar}>
                <View style={styles.iconBack}>
                    <BackArrow height={22} width={22} />
                </View>
                <Text style={{ fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.035 }}>Profile</Text>
                {
                    openModel !== true ?

                        <TouchableHighlight style={styles.iconBack} onPress={() =>
                            setOpenModel(true)
                        }>
                            < View >
                                < EditIcon height={22} width={22} />
                            </View>
                        </TouchableHighlight>
                        :
                        <TouchableHighlight style={styles.iconBack} onPress={() =>
                            setOpenModel(false)
                        }>
                            < View >
                                < MaterialIcons name='cancel' height={22} width={22} />
                            </View>
                        </TouchableHighlight>
                }

            </View >
            <ScrollView>
                <View style={{ height: height }}>
                    <View style={styles.subContainer}>
                        {userProfileData &&
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

                            <TouchableHighlight onPress={() => setTicketShown(!ticketShown)} underlayColor='transparent'>
                                <View>
                                    <View style={styles.navBtn}>
                                        <TicketIcon height={22} width={22} />
                                        <Text style={styles.navTitle}>My Tickets</Text>
                                    </View>

                                    {
                                        (!ticketShown) ?
                                            <View style={{ paddingLeft: 30 }}>
                                                <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                                    <View style={styles.navBtn}>
                                                        {/* <TicketIcon height={22} width={22} /> */}
                                                        <MaterialIcons name='flight' size={22} color='#4C94F2' />
                                                        <Text style={styles.navTitle}>Flight</Text>
                                                    </View>
                                                </TouchableHighlight>
                                                <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                                    <View style={styles.navBtn}>
                                                        {/* <TicketIcon height={22} width={22} /> */}
                                                        <FontAwesome name='hotel' size={22} color='#4C94F2' />
                                                        <Text style={styles.navTitle}>Hotel</Text>
                                                    </View>
                                                </TouchableHighlight>
                                            </View>
                                            : <View />
                                    }
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                <View style={styles.navBtn}>
                                    <Fontisto name='persons' size={22} color='#4C94F2' />
                                    <Text style={styles.navTitle}>Add Traveller</Text>
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                <View style={styles.navBtn}>
                                    {/* <TicketIcon height={22} width={22} /> */}
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
                    <View style={{ paddingLeft: 35 }}>
                        <TouchableHighlight onPress={() => LogOut()} underlayColor='transparent'>
                            <View style={styles.navBtn}>
                                <LogoutIcon height={22} width={22} />
                                <Text style={styles.navTitle}>Logout</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>

        </View >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: height,
        width: width,
        backgroundColor: 'white',
    },
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
    subContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 100,
        marginTop: 20
    },
    name: { fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.03, marginTop: 10 },
    email: { fontFamily: font.fontBold, color: color.colorGrey, fontSize: height * 0.02, marginTop: -3 },
    number: { fontFamily: font.font, color: color.colorGrey, fontSize: height * 0.02 },
    divider: {
        backgroundColor: color.colorText,
        height: 1,
        opacity: 0.1,
        marginTop: 20,
        width: width * 0.86,
        // marginHorizontal: 20
    },
    navView: {
        paddingTop: 10,
        width: width * 0.82
    },
    navBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingLeft: 25
    },
    navTitle: {
        fontFamily: font.font,
        color: color.colorText,
        fontSize: 16,
        paddingLeft: 15
    }
})