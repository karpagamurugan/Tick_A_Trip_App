/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import EditIcon from '../../Assert/Images/icon/edit.svg';
import BackArrow from '../../Assert/Images/icon/backward-arrow.svg';
import COLORS from '../constants/color';
import FONTS from '../constants/font';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../Assert/Images/icon/backward-arrow-2.svg';
import Hotel from '../../Assert/Icons/hotel.svg';
import { useSelector } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


export default function HotelAppbar({ title }) {

    const navigation = useNavigation();
    const { RoomGuestPlace } = useSelector((state) => state.HotelReducer)

    return (
        <View>

          { 
          (title === 'Hotel')?
          <View style={[styles.appbar,{justifyContent:'flex-start',width:width*0.85, borderTopRightRadius: 40,
          borderBottomRightRadius: 40,}]}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                        {/* <BackArrow height={18} width={18} /> */}
                        <MaterialIcon name='arrow-back-ios' color={COLORS.borderColor} size={height * 0.027} style={{ marginLeft: 8 }} />

                </TouchableHighlight>
                <View style={{width:10}}/>
                   <View style={{alignItems:'center'}}>
                   <Hotel height={30} width={30}/>
                   <Text style={{fontSize:height*0.013,color:COLORS.BtnColorDark,fontFamily:FONTS.font}}>Hotels</Text>
                   </View>
                {/* <View style={styles.searchCity}>
                    <Text style={styles.searchIn}>{RoomGuestPlace?.Place}</Text>
                    <Text style={styles.searchCount}>{RoomGuestPlace?.room} , { RoomGuestPlace?.Guest}</Text>
                </View> */}
                 <View style={{width:10}}/>

                <Text style={{fontFamily:FONTS.fontBold,color:COLORS.bg,fontSize:height*0.03,paddingLeft:20}}>{title}</Text>
                <View/>
            </View>
          : <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                        <BackArrow height={18} width={18} />
                </TouchableHighlight>
                   <View style={{alignItems:'center'}}>
                   <Hotel height={30} width={30}/>
                   <Text style={{fontSize:height*0.013,color:COLORS.BtnColorDark,fontFamily:FONTS.font}}>Hotels</Text>
                   </View>
                <View style={styles.searchCity}>
                    <Text style={styles.searchIn}>{RoomGuestPlace?.Place}</Text>
                    <Text style={styles.searchCount}>{RoomGuestPlace?.room} , { RoomGuestPlace?.Guest}</Text>
                </View>
                <View/>
            </View>}
        </View>
    )
}


const styles = StyleSheet.create({
    searchCount:{
        fontFamily:FONTS.font,
        color:'gray',
        fontSize:13,
    },
    searchIn:{
        fontFamily:FONTS.fontSemi,
        alignSelf:'center',
        letterSpacing:0.5,
        color:COLORS.colorText,
        lineHeight:18,
    },
    searchCity:{
        marginRight:width * 0.10,
        alignSelf:'center',
        backgroundColor:'#fff',
        paddingVertical:5,
        paddingHorizontal:35,
        borderRadius:100,
    },
    iconBack: {
         backgroundColor: 'white',
          borderRadius: 100,
           width: 45, height: 45,
            alignItems: 'center', 
            justifyContent: 'center',
             elevation: 3 },
    appbar: {
        // width: width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.AppbarColor,
        height: height * 0.07,
        // borderTopRightRadius: 40,
        // borderBottomRightRadius: 40,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        // elevation: 24,
    },
})