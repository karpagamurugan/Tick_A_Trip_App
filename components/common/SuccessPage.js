/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, Dimensions, Image, TouchableHighlight } from 'react-native'
import COLORS from '../constants/color'
import FONTS from '../constants/font'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const SuccessPage = ({ navigation }) => {
    return (
        <View style={{ width: width, height: height, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 24, color: COLORS.BtnColor, fontFamily: FONTS.mediam }}>Success !</Text>
            </View>
            <View style={{ width: width, marginVertical: 50 }}>
                <Image style={{ widith: width * 0.3, height: height * 0.3, resizeMode: 'contain' }} source={require('../../Assert/Images/1.png')} />
            </View>
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 13, fontWeight: '600', color: COLORS.TextDarkGrey, fontFamily: FONTS.font, }}>We have sent you an email verification to</Text>
                <Text style={{ alignSelf: 'center', fontSize: 14, fontWeight: '900', color: COLORS.TextDarkGrey, fontFamily: FONTS.font, }}>abcs@gmail.com</Text>
            </View>
            <View>
                <TouchableHighlight style={{ color: '#fff', backgroundColor: COLORS.BtnColorDark, paddingHorizontal: 30, paddingVertical: 8, borderRadius: 100, marginTop: 100 }}>
                    <Text style={{ color: '#fff', fontFamily: FONTS.font }}>PROCEED</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}

export default SuccessPage