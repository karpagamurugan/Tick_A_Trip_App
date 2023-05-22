import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ScrollView,Image, TouchableOpacity, Alert, } from 'react-native';
import COLORS from '../constants/color';
import FONTS from '../constants/font';
import Appbar from '../common/Appbar';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userAction from '../../redux/user/actions';
import BackArrow from '../../Assert/Images/icon/backward-arrow.svg';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import EditIcon from '../../Assert/Images/icon/Edit_Icon.svg';
import DeleteIcon from '../../Assert/Images/icon/Delete_Icon.svg';
import ProfileIcon from '../../Assert/Images/Profile.svg';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default function AddTraveller({ navigation }) {
    const { travelers_list } = useSelector((state) => state.userReducer)
    var [useToken, setUseToken] = useState('')
    const dispatch = useDispatch()
    useEffect(() => {
        const travel = async () => {
            await AsyncStorage.getItem('tickatrip-token').then(
                (res) => {
                    if (res !== null) {
                        setUseToken(res)
                        dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN, payload: res })
                    } else {
                        dispatch({ type: userAction.GET_ADD_TRAVELLER_TOKEN, payload: res })
                    }
                }
            )
        }
        travel();
    }, []);

    useEffect(() => {
        dispatch({
            type: userAction.SET_ADD_TRAVELLER_TOKEN, payload: true
        })
    }, []);


    const handleDelete = (item) => {
        Alert.alert(
            `${item?.title} ${item?.first_name} ${item?.last_name}`,
            "Do you want to delete this traveler?",
            [
                {
                    text: 'CANCEL',
                    onPress: () => {},
                    style: 'cancel',
                },
                {
                    text: 'DELETE',
                    onPress: () => deleteTheTraveller(item),
                    style: 'cancel',
                },
            ], { cancelable: true, }
        )
    }

    const deleteTheTraveller = (item) => {
        var deleteData = {
            traveler_id: item.id,
        }
        dispatch({
            type: userAction.GET_DELETE_TRAVELLER,
            payload: deleteData
        })
    }

    return (
        <View style={{ width: width, height: height , backgroundColor: 'white' }}>
            {/* <Appbar title={'Traveller'} /> */}
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <View style={styles.appbar}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                        <View style={styles.iconBack}>
                            <MaterialIcon name='arrow-back-ios' color={COLORS.borderColor} size={height * 0.027} style={{ marginLeft: 8 }} />
                        </View>
                    </TouchableHighlight>
                    <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.026 }}>Travelers</Text>
                    <View style={{ width: 10 }} />
                </View>
                <View style={{ marginRight: 10 }}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.navigate('addtravellerform')}>
                        <View style={styles.addIcon}>
                            <MaterialIcon name='add' color={COLORS.borderColor} size={height * 0.034} />
                        </View>
                    </TouchableHighlight>
                </View>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    {
                        travelers_list?.travelers?.length === 0?
                        <View style={{alignItems:'center',justifyContent:'center',height:height*0.5}}>
                            
                            <Image source={require('../../Assert/Images/airline.jpg')} style={{height:height*0.3,width:width*0.6}}/>
                            <Text style={{fontFamily:FONTS.font}}>No Travelers ! </Text>
                            </View>
                        :
                        travelers_list?.travelers?.map((item, index) => (
                            <View key={index} style={styles.travellerCard}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <View style={{ marginRight: 10 }}>
                                        <ProfileIcon height={20} width={20} />
                                    </View>
                                    <Text style={{ fontSize: height * 0.018, fontFamily: FONTS.mediam, color: '#1B5CB7',width:width*0.6, }}>{item?.title} {item?.first_name} {item?.last_name} </Text>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('addtravellerform',{
                                            data:item
                                        })}
                                        style={{ marginRight: 20 }}>
                                        <EditIcon height={20} width={20} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => handleDelete(item)}
                                    >
                                        <DeleteIcon height={20} width={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    addTravellerbtn: {
        alignItems: 'flex-end',
        marginRight: 10,
        marginTop: 10
    },
    AddTraveller: {
        fontFamily: FONTS.font,
        color: 'white',
        backgroundColor: COLORS.colorBtn,
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 5,
        fontSize: height * 0.02
    },
    card: {
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: 'black',
        marginVertical: 7,
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 10
    },
    iconBack: { backgroundColor: 'white', borderRadius: 100, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', elevation: 3 },
    appbar: {
        width: width * 0.7,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.AppbarColor,
        height: height * 0.07,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 15,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 12,
        // },
        // shadowOpacity: 0.58,
        // shadowRadius: 16.00,

        // elevation: 24,
    },
    addIcon: {
        backgroundColor: COLORS.AppbarColor,
        borderRadius: 100,
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3
    },
    travellerCard: {
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        marginHorizontal: 15,
        marginVertical: 10,
    },
})
