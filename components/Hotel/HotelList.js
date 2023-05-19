/* eslint-disable prettier/prettier */
import React, { useState, memo } from 'react'
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

const HotelList = ({ navigation, route }) => {

    const { getHotelSearchResult, RoomGuestPlace } = useSelector((state) => state.HotelReducer)
    const [openFilter, setOpenFilter] = useState(false)

    return (
        <View>
            <Modal

                visible={openFilter}
                transparent={true}
                animationType="fade"
            >
                <View>
                    <HotelFilter navigation={navigation} setOpenFilter={setOpenFilter} openFilter={openFilter} />
                </View>
            </Modal>
            <HotelAppbar title='Hotel Detail' />
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={style.hotelDetailSec}>
                    <View style={style.HotelDetailFilterSec}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={style.searchPlace}>
                                <Ionicons style={style.searchPlaceIcon} name='location-outline' />
                                <Text style={style.searchPlaceText}>{RoomGuestPlace?.Place}</Text>
                            </View>
                            <View style={{ width: 1, height: 20, backgroundColor: '#ababab', marginLeft: 15 }} />
                            <View style={[style.filterFileld, { paddingLeft: 15 }]}>
                                <Text style={style.totalHotel}>{getHotelSearchResult.length ? getHotelSearchResult.length : 0} Hotels</Text>
                            </View>
                        </View>
                        <View style={style.filterFileldIcon}>
                            <TouchableHighlight onPress={() => setOpenFilter(true)} underlayColor='transparent'>
                                <AntDesign style={style.filterIcon} name='filter' size={21} color={'#B9B9B9'} />
                            </TouchableHighlight>
                        </View>
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
        backgroundColor: 'white',
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
        // fontSize: height*0.025,
        backgroundColor: '#E9F3FF',
        padding: 10,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.20,
        shadowRadius: 5.00,
        // overflow:'hidden',
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
    // filterFileld: {
    //     width: width * 0.5
    // },
    totalHotel: {
        color: 'black'
    }
});