/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import style from '../common/commonStyle'
import HotelAppbar from '../common/HotelAppbar'
import HotelRoomTypeCard from './HotelRoomTypeCard'

const HotelRoomType = ({navigation,route}) => {
    // const {detail}=props

    const { HotelRoomType } = useSelector((state) => state.HotelReducer)
    
console.log(' HotelRoomType?.roomRates?.perBookingRates', HotelRoomType?.roomRates?.perBookingRates?.length)
    return (
        <View>
            <HotelAppbar/>
            <ScrollView>
                <View style={style.RoomTypesSec}>
                    <Text style={style.RoomTitle}>Select Your Room Type</Text>
                    {
                        HotelRoomType?.roomRates?.perBookingRates?.map((val, index) => (
                            <View key={index}>
                                <HotelRoomTypeCard navigation={navigation} val={val} detail={route?.params?.detail}/>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default HotelRoomType