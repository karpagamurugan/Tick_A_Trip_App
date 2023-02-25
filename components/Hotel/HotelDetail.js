/* eslint-disable prettier/prettier */
import React, { useCallback, useState } from 'react'
import { View, Text, ImageBackground, Dimensions, StyleSheet, ScrollView, TouchableHighlight, Pressable, Modal } from 'react-native'
import style from '../common/commonStyle'
import HotelAppbar from '../common/HotelAppbar'
import Stars from 'react-native-stars';
import font from '../constants/font';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { set } from 'lodash';
import Parking from '../../Assert/Icons/sports-car.svg';
import Bath from '../../Assert/Icons/bath.svg';
import Wifi from '../../Assert/Icons/wifi.svg';
import Bar from '../../Assert/Icons/glass-and-bottle-of-wine.svg';
import Gym from '../../Assert/Icons/Clocks_1_.svg';
import More from '../../Assert/Icons/more.svg';
import AntDesign from 'react-native-vector-icons/AntDesign'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelDetail = ({ navigation }) => {
    const [moreVisible, setMoreVisible] = useState(false);
    const [textShown, setTextShown] = useState(false);
    const [textReadMore, setTextReadMore] = useState(false);
    const mainAminities = [
        'Parking',
        'Bath',
        'Wifi',
        'Bar',
        'Gym'
    ]

    const textNumberOfLine = () => {
        setTextShown(!textShown)
        console.log('textShown', textShown)
    }

    const onTextLayout = useCallback(e => {
        setTextReadMore(e.nativeEvent.lines.length >= 4)
    }, []);
    const roomFacility = [
        'Parking',
        'Bath',
        'Wifi',
        'Bar',
        'Gym',
        'Room Service',
        '24-Hour Guest Reception',
        'Complimentary Toiletries',
        'Healthy Breakfast',
        'Ample Wall Outlets',
        'Hair Styling Tools',
        'Flexible Checkout',
        'Pool',
        'Mini-fridge',
        'Complimentary Electronics Chargers',
        'Clothing Iron',
        'Business Facilities',
        'Transportation Information',
    ]
    return (
        <View>
            <ScrollView>
                <HotelAppbar />
                <ImageBackground style={style.HotelDetailBanner} source={require('../../Assert/Images/hotel.jpg')}>
                    <View style={style.OverLay} />
                    <View style={style.HotelDetailBannerCon}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={style.HotelDetailHotelName}>Hotel Arkadia - 301</Text>
                            <View>
                                <Stars
                                    default={0}
                                    count={5}
                                    half={true}
                                    disabled={true}
                                    starSize={50}
                                    spacing={5}
                                    fullStar={<FontAwesome name={'star'} style={[style.myStarStyle]} />}
                                    emptyStar={<FontAwesome name={'star-o'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                    halfStar={<FontAwesome name={'star-half-empty'} style={[styles.myStarStyle]} />}
                                />
                            </View>
                        </View>
                        <View>
                            <Text style={style.HotelDetailHotelPrice}>5,500<Text style={style.HotelDetailHotelPriceTxt}>Rs</Text></Text>
                            <Text style={style.HotelDetailHotelTax}>including tax 6,220</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ paddingHorizontal: 15, backgroundColor: '#F8F8F8', }}>
                    <Text style={style.HotelTitle}><Ionicons style={style.HotelTitleIcon} name='location' /> RS Puram, Coimbatore</Text>
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <View>
                        <Text style={style.TitleMain}>About the Hotel</Text>
                        <Text
                            onTextLayout={onTextLayout}
                            numberOfLines={textShown ? undefined : 4}
                            style={style.parrah}
                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Integer vel molestie nisl. Duis ac mi leo. Mauris at convallis
                            erat. Aliquam interdum semper luctus. Sed viv Duis ac mi leo. Mauris at convallis
                            erat. Aliquam interdum semper luctus. Sed vivSed viv Duis ac mi leo. Mauris at convallis
                            erat. Aliquam interdum semper luctus. Sed vivSed viv Duis ac mi leo. Mauris at convallis
                            erat. Aliquam interdum semper luctus.</Text>
                        {

                            textReadMore ?
                                <Text
                                    style={{ fontFamily: font.mediam, }}
                                    onPress={() => textNumberOfLine()}
                                >
                                    {textShown ? 'Read less...' : 'Read more...'}
                                </Text> : null
                        }
                    </View>
                    <View style={{ marginBottom: 20, }}>
                        <Text style={style.TitleMain}>Aminities</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                            {roomFacility.map((val, index) => mainAminities.find(el => el === val) && (
                                <View style={{ alignItems: "center", }}>
                                    <View style={{
                                        marginHorizontal: 20,
                                        width: 50,
                                        alignItems: "center",
                                        paddingVertical: 15,
                                        borderRadius: 10,
                                        backgroundColor: "#E9F3FF",
                                        shadowColor: "#000",
                                        shadowOffset: {
                                            width: 0,
                                            height: 12,
                                        },
                                        shadowOpacity: 0.58,
                                        shadowRadius: 16.00,
                                        elevation: 15,
                                    }}>
                                        {(val === 'Parking') && <Parking height={20} />}
                                        {(val === 'Bath') && <Bath height={20} />}
                                        {(val === 'Wifi') && <Wifi height={20} />}
                                        {(val === 'Bar') && <Bar height={20} />}
                                        {(val === 'Gym') && <Gym height={20} />}
                                    </View>
                                    <Text style={{ ...style.list, paddingTop: 10 }} key={index}>{val}</Text>
                                    {/* <Text style={style.list} key={index}><MaterialIcons style={style.listIcon} name='double-arrow' />{val}</Text> */}
                                </View>

                            ))}
                            <Pressable
                                onPress={() => setMoreVisible(true)}
                                style={{ alignItems: "center", }}>
                                <View style={{
                                    marginHorizontal: 20,
                                    width: 50,
                                    alignItems: "center",
                                    paddingVertical: 15,
                                    borderRadius: 10,
                                    backgroundColor: "#E9F3FF",
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 12,
                                    },
                                    shadowOpacity: 0.58,
                                    shadowRadius: 16.00,
                                    elevation: 15,
                                }}>
                                    <More height={20} />
                                </View>
                                <Text style={{ ...style.list, paddingTop: 10 }}>More</Text>
                                {/* <Text style={style.list} key={index}>{val}</Text> */}
                                {/* <Text style={style.list} key={index}><MaterialIcons style={style.listIcon} name='double-arrow' />{val}</Text> */}
                            </Pressable>
                        </View>
                        <Modal
                            animationType='slide'
                            transparent={true}
                            visible={moreVisible}
                            onRequestClose={() => {
                                setMoreVisible(!moreVisible)
                            }}
                        >
                            <View style={{
                                backgroundColor: "#000000c2", height: height, width: width,
                                alignItems: "center", justifyContent: 'center'
                            }}>
                                <View style={{
                                    backgroundColor: "#E9F3FF", height: height * 0.7,
                                    width: "90%", borderRadius: 10, padding: 20,
                                }}>
                                    <Text style={style.TitleMain}>Aminities</Text>
                                    <ScrollView style={{ height: height }}>
                                        {roomFacility.map((val, index) => (
                                            <View style={{ padding: 10 }}>
                                                <Text style={style.list} key={index}><MaterialIcons style={style.listIcon} name='double-arrow' /> {val}</Text>
                                            </View>
                                        ))}
                                    </ScrollView>
                                    <Pressable style={{
                                        backgroundColor: "#E9F3FF",
                                        padding: 10,
                                        position: 'absolute',
                                        top: -50, right: 0,
                                        borderRadius: 100,
                                    }}
                                        onPress={() => setMoreVisible(!moreVisible)}>
                                        <AntDesign style={{ color: '#000', fontSize: 25 }} name='close' />
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style>

                    </View>
                    <View>
                        <TouchableHighlight style={style.bookingBtn}>
                            <Text style={style.bookingBtnTxt}>Continue</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    myStarStyle: {
        color: '#FCC40A',
        backgroundColor: 'transparent',
        textShadowColor: '#fff',
        textShadowOffset: { width: 100, height: 100 },
        textShadowRadius: 2,
        // fontSize:20,
    },
    myEmptyStarStyle: {
        color: '#FCC40A',
    },
});
export default HotelDetail