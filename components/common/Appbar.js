import React from 'react';
import {View,Text,Dimensions,StyleSheet,TouchableHighlight} from 'react-native';
import EditIcon from '../../Assert/Images/icon/edit.svg';
import BackArrow from '../../Assert/Images/icon/backward-arrow.svg';
import color from '../../constants/color';
import font from '../../constants/font';
import { useNavigation} from '@react-navigation/native';


let width =Dimensions.get('window').width;
let height =Dimensions.get('window').height;


export default function Appbar({title}){

    const navigation = useNavigation();
    return(
        <View>
                <View style={styles.appbar}>
                    <TouchableHighlight underlayColor={'transparent'} onPress={()=>navigation.goBack()}>
                    <View style={styles.iconBack}>
                        <BackArrow height={22} width={22} />
                    </View>
                    </TouchableHighlight>
                    <Text style={{ fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.03 }}>{title}</Text>
                    {/* <TouchableHighlight style={styles.iconBack}>
                        <EditIcon height={22} width={22} />
                    </TouchableHighlight> */}
                    <View style={{width:10}}/>
                </View>
        </View>
    )
}


const styles = StyleSheet.create({
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
        paddingRight: 15
    },
})