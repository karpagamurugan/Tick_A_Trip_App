/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, Dimensions, Image, TouchableHighlight } from 'react-native'
import color from '../../constants/color'
import font from '../../constants/font'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const SuccessPage = ({ navigation }) => {
    return (
        <View style={{ width: width, height: height,flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 24, color: '#0083E9', fontFamily: font.font }}>Success !</Text>
            </View>
            <View style={{ width: width,marginVertical:50}}>
                <Image style={{ widith: width * 0.3, height: height * 0.3,resizeMode:'contain' }} source={require('../../Assert/Images/1.png')} />
            </View>
            <View>
                <Text style={{ alignSelf: 'center', fontSize: 13,fontWeight:'600', color: '#666666', fontFamily: font.font, }}>We have sent you an email verification to</Text>
                <Text style={{ alignSelf: 'center', fontSize: 14,fontWeight:'900', color: '#666666', fontFamily: font.font, }}>abcs@gmail.com</Text>
            </View>
            <View>
                <TouchableHighlight style={{color:'#fff',backgroundColor:color.colorBtn,paddingHorizontal:30,paddingVertical:8,borderRadius:100,marginTop:100}}><Text style={{color:'#fff'}}>PROCEED</Text></TouchableHighlight>
            </View>
        </View>
    )
}

export default SuccessPage