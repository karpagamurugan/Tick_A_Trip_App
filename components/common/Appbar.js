/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight } from 'react-native';
import EditIcon from '../../Assert/Images/icon/edit.svg';
import BackArrow from '../../Assert/Images/icon/backward-arrow.svg';
import COLORS from '../constants/color';
import FONTS from '../constants/font';
import { useNavigation } from '@react-navigation/native';
import Arrow from '../../Assert/Images/icon/backward-arrow-2.svg';
import Flight from '../../Assert/Images/icon/flight.svg';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


export default function Appbar({ title }) {

    const navigation = useNavigation();

    return (
        <View>

            {
                (title === 'Search Flight') ?
                    <View style={styles.appbar}>
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                            <View style={[styles.iconBack, { width: 35, height: 35, marginRight: 0 }]}>
                                <Arrow height={18} width={18} />
                            </View>
                        </TouchableHighlight>
                        <Flight height={40} width={40} />
                        <Text style={{ fontFamily: FONTS.fontSemi, color: COLORS.textBlue, fontSize: height * 0.023, marginLeft: 0 }}>{title}</Text>
                        <View style={{ width: width*0.17 }} />
                    </View>
                    :
                    <View style={styles.appbar}>
                        <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.goBack()}>
                            <View style={styles.iconBack}>
                                <BackArrow height={20} width={20} />
                            </View>
                        </TouchableHighlight>
                        <Text style={{ fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.024 }}>{title}</Text>
                        <View style={{ width: 10 }} />
                    </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    iconBack: { backgroundColor: 'white', borderRadius: 100, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', elevation: 3 },
    appbar: {
        width: width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.AppbarColor,
        height: height * 0.07,
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.00,
    },
})