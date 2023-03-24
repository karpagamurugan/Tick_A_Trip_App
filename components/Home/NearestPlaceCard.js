/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import COLORS from '../constants/color'
import FONTS from '../constants/font'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const NearestPlaceCard = () => {
    return (
        <View style={style.PopularPlaceCard}>
            <View style={style.PopularPlaceCardImage}>
                <Image style={style.PopularPlaceCardImageSingle} source={require('../../Assert/Images/pop.png')}  />
                {/* <Text style={style.PopularPlaceCardImageRev}><Entypo style={style.PopularPlaceCardImageRevStart} name='star' />4.5 (42K)</Text> */}
            </View>
            <View style={style.PopularPlaceCardCont}>
                <Text style={style.PopularPlaceCardCity}>Thailand Package</Text>
                {/* <Text style={style.PopularPlaceCardStay}>3 Days 2 Nights</Text>
                <Text style={style.PopularPlaceCardPrice}>$456.00</Text> */}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    PopularPlaceCardPrice: {
        color: '#FE712A',
        fontFamily: FONTS.fontBold,
    },
    PopularPlaceCardStay: {
        color: '#898989',
        fontSize: 12,
        fontFamily: FONTS.fontSemi
    },
    PopularPlaceCardCity: {
        fontFamily: FONTS.fontBold,
        color: COLORS.colorText,
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
        fontFamily: FONTS.mediam,
        borderBottomLeftRadius: 10,
    },
    PopularPlaceCardImage: {
        // position: 'relative',
        borderRadius:8 ,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        width:width*0.37,
        height:height*0.14
    },
    PopularPlaceCardImageSingle: {
        overflow: 'hidden',
        width: '100%',
        minHeight: 150,
        maxHeight: 150,
        elevation: 5,
        shadowColor: '#000',
    },
    PopularPlaceCard:{marginHorizontal:15}
})
export default NearestPlaceCard