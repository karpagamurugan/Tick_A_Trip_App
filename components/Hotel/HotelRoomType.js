/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import style from '../common/commonStyle'
import HotelAppbar from '../common/HotelAppbar'
import HotelRoomTypeCard from './HotelRoomTypeCard'

const HotelRoomType = ({navigation}) => {
    return (
        <View>
            <HotelAppbar />
            <ScrollView>
                <View style={style.RoomTypesSec}>
                    <Text style={style.RoomTitle}>Select Your Room Type</Text>
                    {
                        [...Array(5)].map((val, index) => (
                            <View key={index}>
                                <HotelRoomTypeCard navigation={navigation}/>
                            </View>
                        ))
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default HotelRoomType