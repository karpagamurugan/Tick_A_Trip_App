import React,{useState} from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';
import color from '../../constants/color';
import font from '../../constants/font';
import TicketIcon from '../../Assert/Images/icon/Ticket.svg';
import LogoutIcon from '../../Assert/Images/icon/logout.svg';
import ShareIcon from '../../Assert/Images/icon/share.svg';
import EditIcon from '../../Assert/Images/icon/edit.svg';
import BackArrow from '../../Assert/Images/icon/backward-arrow.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;


export default function Profile() {

    var [ticketShown, setTicketShown] = useState(false)


    return (
        <View style={styles.mainContainer}>
            <View style={styles.appbar}>
                <View style={styles.iconBack}>
                    <BackArrow height={22} width={22} />
                </View>
                <Text style={{ fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.035 }}>Profile</Text>
                <TouchableHighlight style={styles.iconBack}>
                    <EditIcon height={22} width={22} />
                </TouchableHighlight>
            </View>
           <ScrollView>
          <View style={{height:height}}>
          <View style={styles.subContainer}>
                <View style={{ alignItems: 'center' }}>
                    <Image source={{ uri: 'https://wallpapers.com/images/hd/cute-chibi-profile-picture-s52z1uggme5sj92d.jpg' }}
                        style={styles.profileImage} />

                    <Text style={styles.name}>Durga Devi</Text>
                    <Text style={styles.email}>durgadevi@gmail.com</Text>
                    <Text style={styles.number}>+91 9876543213</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.navView}>

                    <TouchableHighlight onPress={() => setTicketShown(!ticketShown)} underlayColor='transparent'>
                        <View>
                            <View style={styles.navBtn}>
                                <TicketIcon height={22} width={22} />
                                <Text style={styles.navTitle}>My Tickets</Text>
                            </View>

                            {
                                (!ticketShown) ?
                                    <View style={{paddingLeft:30}}>
                                        <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                            <View style={styles.navBtn}>
                                                {/* <TicketIcon height={22} width={22} /> */}
                                                <MaterialIcons name='flight' size={22} color='#4C94F2'/>
                                                <Text style={styles.navTitle}>Flight</Text>
                                            </View>
                                        </TouchableHighlight>
                                        <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                            <View style={styles.navBtn}>
                                                {/* <TicketIcon height={22} width={22} /> */}
                                                <FontAwesome name='hotel' size={22} color='#4C94F2'/>
                                                <Text style={styles.navTitle}>Hotel</Text>
                                            </View>
                                        </TouchableHighlight>
                                    </View>
                                    : <View />
                            }
                        </View>
                        </TouchableHighlight>

                    <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                        <View style={styles.navBtn}>
                            <Fontisto name='persons' size={22} color='#4C94F2'/>
                            <Text style={styles.navTitle}>Add Traveller</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                        <View style={styles.navBtn}>
                            {/* <TicketIcon height={22} width={22} /> */}
                            <MaterialCommunityIcons name='brightness-percent' size={22} color='#4C94F2'/>
                            <Text style={styles.navTitle}>Offers</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                        <View style={styles.navBtn}>
                            <ShareIcon height={22} width={22} />
                            <Text style={styles.navTitle}>Share App</Text>
                        </View>
                    </TouchableHighlight>



                </View>

                <View style={styles.divider} />



            </View>
            <View style={{ paddingLeft: 35 }}>
                <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                    <View style={styles.navBtn}>
                        <LogoutIcon height={22} width={22} />
                        <Text style={styles.navTitle}>Logout</Text>
                    </View>
                </TouchableHighlight>
            </View>
          </View>
           </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: height,
        width: width,
        backgroundColor: 'white',
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
        paddingRight: 15
    },
    subContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 100,
        marginTop: 20
    },
    name: { fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.03, marginTop: 10 },
    email: { fontFamily: font.fontBold, color: color.colorGrey, fontSize: height * 0.02, marginTop: -3 },
    number: { fontFamily: font.font, color: color.colorGrey, fontSize: height * 0.02 },
    divider: {
        backgroundColor: color.colorText,
        height: 1,
        opacity: 0.1,
        marginTop: 20,
        width: width * 0.86,
        // marginHorizontal: 20
    },
    navView: {
        paddingTop: 10,
        width: width * 0.82
    },
    navBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingLeft: 25
    },
    navTitle: {
        fontFamily: font.font,
        color: color.colorText,
        fontSize: 16,
        paddingLeft: 15
    }
})