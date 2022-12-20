/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import color from '../../constants/color'
import font from '../../constants/font'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const NearestPlaceCard = () => {
    return (
        <View style={style.PopularPlaceCard}>
            <View style={style.PopularPlaceCardImage}>
                <Image style={style.PopularPlaceCardImageSingle} source={require('../../Assert/Images/pop.png')} />
                <Text style={style.PopularPlaceCardImageRev}><Entypo style={style.PopularPlaceCardImageRevStart} name='star' />4.5 (42K)</Text>
            </View>
            <View style={style.PopularPlaceCardCont}>
                <Text style={style.PopularPlaceCardCity}>Thailand Package</Text>
                <Text style={style.PopularPlaceCardStay}>3 Days 2 Nights</Text>
                <Text style={style.PopularPlaceCardPrice}>$456.00</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    PopularPlaceCardPrice: {
        color: '#FE712A',
        fontFamily: font.fontBold,
    },
    PopularPlaceCardStay: {
        color: '#898989',
        fontSize: 12,
        fontFamily: font.fontSemi
    },
    PopularPlaceCardCity: {
        fontFamily: font.fontBold,
        color: color.colorText,
        marginTop: 20,
    },
    PopularPlaceCardImageRevStart: {
        color: '#FE712A',
    },
    PopularPlaceCardImageRev: {
        position: 'absolute',
        right: 0,
        color: '#fff',
        backgroundColor: '#333333',
        fontSize: 10,
        paddingVertical: 3,
        paddingHorizontal: 8,
        fontFamily: font.mediam,
        borderBottomLeftRadius: 10,
    },
    PopularPlaceCardImage: {
        position: 'relative',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    PopularPlaceCardImageSingle: {
        overflow: 'hidden',
        width: '100%',
        minHeight: 150,
        maxHeight: 150,
        resizeMode: 'cover',
        elevation: 5,
        shadowColor: '#000',
    },
})
export default NearestPlaceCard