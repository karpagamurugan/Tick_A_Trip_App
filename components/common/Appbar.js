import React from 'react';
import {View,Text,Dimensions} from 'react-native';
import EditIcon from '../../Assert/Images/icon/edit.svg';
import BackArrow from '../../Assert/Images/icon/backward-arrow.svg';

export default function Appbar(){
    return(
        <View>
                <View style={styles.appbar}>
                    <View style={styles.iconBack}>
                        <BackArrow height={22} width={22} />
                    </View>
                    <Text style={{ fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.035 }}>Profile</Text>
                    <TouchableHighlight style={styles.iconBack}>
                        <EditIcon height={22} width={22} />
                    </TouchableHighlight>
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