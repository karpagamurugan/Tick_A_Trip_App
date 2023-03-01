/* eslint-disable prettier/prettier */
import React, { useState,memo } from 'react'
import { View, Modal, Text, StyleSheet, Dimensions, ScrollView, TouchableHighlight, TextInput } from 'react-native'
import Appbar from '../common/Appbar'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons'
import font from '../constants/font';
import HotelCard from './HotelCard';
import HotelFilter from './HotelFilter';
import HotelAppbar from '../common/HotelAppbar';
import { useSelector } from 'react-redux';

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelList = ({ navigation }) => {
    const { getHotelSearchResult } = useSelector((state) => state.HotelReducer)
    const [openFilter, setOpenFilter] = useState(false)
    return (
        <View>
            <Modal
                
                visible={openFilter}
                transparent={true}
                animationType="fade"
            >
                <View>
                    <HotelFilter navigation={navigation} setOpenFilter={setOpenFilter} />
                </View>
            </Modal>
            <ScrollView>
                <HotelAppbar title='Hotel Detail' />
                <View style={style.hotelDetailSec}>
                    <View style={style.HotelDetailFilterSec}>
                        <View style={style.filterFileld}>
                            <Text style={style.totalHotel}>{getHotelSearchResult.length ? getHotelSearchResult.length : 0} Hotels</Text>
                        </View>
                        <View style={style.filterFileldIcon}>
                            <TouchableHighlight onPress={() => setOpenFilter(true)} underlayColor='transparent'>
                                <AntDesign style={style.filterIcon} name='filter' />
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={style.searchPlace}>
                        <Ionicons style={style.searchPlaceIcon} name='location-outline' />
                        <Text style={style.searchPlaceText}>RS Puram, Coimbatore</Text>
                    </View>
                    <View style={style.hotelSearchList}>
                        {
                            getHotelSearchResult?.map((val, index) => (
                                <View key={index} ><HotelCard totalSearchResult={getHotelSearchResult} navigation={navigation} val={val} /></View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>


        </View>
    )
}

export default memo(HotelList)
const style = StyleSheet.create({

    hotelDetailSec: {
        paddingHorizontal: 10,
        // backgroundColor:'white',
        // height:height
        // height:height*0.5,
        backgroundColor: 'white'
    },
    searchPlaceIcon: {
        color: '#FCC40A',
        fontSize: 23,
    },
    hotelSearchList: {
        marginBottom: 50,
    },
    searchPlaceText: {
        color: '#52ADE5',
        fontSize: 14,
        fontFamily: font.mediam,
        marginLeft: 5,
    },
    searchPlace: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    filterIcon: {
        fontSize: 22,
        color: '#B9B9B9',
        backgroundColor: '#E9F3FF',
        padding: 10,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        // elevation: 24,
    },
    HotelDetailFilterSec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    dropdown: {
        margin: 16,
        height: 30,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
        width: 80,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    filterFileld: {
        width: width * 0.2
    },
});