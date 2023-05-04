/* eslint-disable prettier/prettier */
import React, { useCallback, useState, memo } from 'react'
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
import { useSelector } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import WebView from 'react-native-webview';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelDetail = ({ navigation, route }) => {
    // console.log('paramss',route?.params)
    // dispatch({
    //     type: hotelActions.GET_HOTEL_ROOM_TYPE,
    //     payload: {
    //         hotelId: val?.hotelId,
    //         productId: val?.productId,
    //         sessionId: hotelSessionId,
    //         tokenId: val?.tokenId
    //     },
    //     navigation: navigation,
    //     detail: val
    // })
    const [moreVisible, setMoreVisible] = useState(false);
    const [textShown, setTextShown] = useState(false);
    const [textReadMore, setTextReadMore] = useState(false);
    const { HotelRoomType, hotelDetails } = useSelector((state) => state.HotelReducer)
    console.log('hotelDetails', hotelDetails)
    // console.log('hotelDetails',hotelDetails.message.name)
    const mainAminities = [
        'Parking',
        'Bath',
        'Wifi',
        'Bar',
        'Gym'
    ]

    const textNumberOfLine = () => {
        setTextShown(!textShown)
    }

    const onTextLayout = useCallback(e => {
        setTextReadMore(e.nativeEvent.lines.length >= 3.5)
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
    const source = {
        html: `${hotelDetails?.message?.description.content} `
    };
    console.log('hotelconten6t', hotelDetails?.message?.description.content)
    return (
        <View>
            <ScrollView>
                <HotelAppbar />
                <ImageBackground style={style.HotelDetailBanner} source={require('../../Assert/Images/hotel.jpg')}>
                    <View style={style.OverLay} />
                    <View style={style.HotelDetailBannerCon}>
                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <Text style={style.HotelDetailHotelName}>{hotelDetails?.message?.name}</Text>
                            <View style={{ flexDirection: "row", alignItems: 'center', }}>
                                <Stars
                                    default={hotelDetails?.message?.hotelRating}
                                    count={5}
                                    half={true}
                                    disabled={true}
                                    starSize={50}
                                    spacing={5}
                                    fullStar={<FontAwesome name={'star'} style={[styles.myStarStyle]} />}
                                    emptyStar={<FontAwesome name={'star-o'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                    halfStar={<FontAwesome name={'star-half-empty'} style={[styles.myStarStyle]} />}
                                />
                                <Text style={{ color: '#BBBBBB', paddingLeft: 5, fontFamily: font.mediam, }}>reviews</Text>
                            </View>
                        </View>
                        <View>
                            <View style={{ flexDirection: "row", alignItems: 'center', }}>
                                <Text style={style.HotelDetailHotelPrice}>5,500</Text>
                                <View style={{ paddingHorizontal: 5 }}>
                                    <Text style={styles.HotelPriceList}>Rs</Text>
                                    <Text style={styles.HotelPriceList}>Per Day</Text>
                                </View>
                            </View>
                            <Text style={style.HotelDetailHotelTax}>including tax 6,220</Text>
                        </View>
                    </View>
                </ImageBackground>
                <View style={{ paddingHorizontal: 15, backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
                    <Ionicons style={style.HotelTitleIcon} name='location' />
                    <Text style={[style.HotelTitle, { flex: 1, paddingLeft: 5 }]}>{hotelDetails?.message?.address}</Text>
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <View>
                        <Text style={style.TitleMain}>About the Hotel</Text>
                        <View>
                            <RenderHtml
                                // contentWidth={width * 0.8}
                                source={source}
                            />
                            <Text
                                onTextLayout={onTextLayout}
                                numberOfLines={textShown ? undefined : 4.7}
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
                                        style={{ fontFamily: font.mediam, color: '#0041F2', fontSize: 15, }}
                                        onPress={() => textNumberOfLine()}
                                    >
                                        {textShown ? 'Read less...' : 'Read More...'}
                                    </Text> : null
                            }
                        </View>
                    </View>
                    <View style={{ marginBottom: 20, }}>
                        <Text style={style.TitleMain}>Aminities</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingTop: 10 }}>
                            {roomFacility.map((val, index) => mainAminities.find(el => el === val) && (
                                <View key={index} style={{ alignItems: "center", }}>
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
                                    <Text style={{ ...style.list, paddingTop: 10 }}>{val}</Text>
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
                                alignItems: "flex-end", justifyContent: 'flex-end'
                            }}>
                                <View style={{
                                    backgroundColor: "#fff",
                                    height: height * 0.5, width: "100%", borderRadius: 50,
                                }}>
                                    <View style={[styles.aminitiesBackground]}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, }}>
                                            <FontAwesome style={[style.listIcon]} name='circle' />
                                            <Text style={[styles.aminitiesTitle]}> Aminities</Text>
                                        </View>
                                        <Pressable style={[styles.closeIcons]}
                                            onPress={() => setMoreVisible(!moreVisible)}>
                                            <Ionicons style={{ color: '#2B64FF', fontSize: 30, paddingRight: 20 }} name='close' />
                                        </Pressable>
                                    </View>
                                    <View style={{ paddingHorizontal: 30, }}>
                                        <ScrollView style={{ height: height * 0.35, }}>
                                            {roomFacility.map((val, index) => (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                                    <FontAwesome style={[style.listIcon]} name='circle' />
                                                    <Text style={[style.list,
                                                    {
                                                        fontSize: 19, flex: 1, paddingLeft: 10,
                                                        borderBottomWidth: 1, borderBottomColor: "#eee", paddingVertical: 10
                                                    }]}
                                                        key={index}>{val} </Text>
                                                </View>
                                            ))}
                                        </ScrollView>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </View>
                    <View style>

                    </View>
                    <View>
                        <TouchableHighlight style={style.bookingBtn}>
                            <Text style={style.bookingBtnTxt}>Book Now</Text>
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
    HotelPriceList: {
        fontFamily: font.font,
        fontSize: 9,
        color: '#fff',
        lineHeight: 13,
        fontWeight: "500",
    },
    closeIcons: {
        padding: 10,
        color: "#0050A6",
    },
    aminitiesTitle: {
        fontSize: 25,
        color: "#002896",
        paddingVertical: 8,
        fontFamily: font.mediam,
    },
    aminitiesBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#E9F3FF",
        justifyContent: "space-between",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }
});
export default memo(HotelDetail)