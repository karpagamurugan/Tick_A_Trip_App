/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import EditIcon from '../../Assert/Images/icon/edit.svg';
import BackArrow from '../../Assert/Images/icon/backward-arrow.svg';
import color from '../../constants/color';
import font from '../../constants/font';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../Assert/Images/icon/backward-arrow-2.svg';
import Flight from '../../Assert/Images/icon/flight.svg';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


export default function HotelAppbar({ title }) {

    const navigation = useNavigation();

    return (
        <View>

            <View style={styles.appbar}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                    <View style={styles.iconBack}>
                        <BackArrow height={20} width={20} />
                    </View>
                </TouchableHighlight>
                <View style={styles.searchCity}>
                    <Text style={styles.searchIn}>Coimbatore</Text>
                    <Text style={styles.searchCount}>2 adults,2 Rooms</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    searchCount:{
        fontFamily:font.font,
        color:'gray',
        fontSize:13,
    },
    searchIn:{
        fontFamily:font.fontSemi,
        alignSelf:'center',
        letterSpacing:0.5,
        color:color.colorText,
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
    iconBack: { backgroundColor: 'white', borderRadius: 100, width: 45, height: 45, alignItems: 'center', justifyContent: 'center', elevation: 10 },
    appbar: {
        width: width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: color.AppbarColor,
        height: height * 0.09,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
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

        elevation: 24,
    },
})