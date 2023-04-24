/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableHighlight, Platform, Linking } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Stars from 'react-native-stars';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import style from '../common/commonStyle'
import { useDispatch, useSelector } from 'react-redux';
import hotelActions from '../../redux/Hotel/actions';
import moment from 'moment';


const HotelCard = (props) => {
    const { val } = props
    const { hotelSessionId, RoomGuestPlace } = useSelector((state) => state.HotelReducer)

    var navigation = props?.navigation
    const dispatch = useDispatch()

    return (
        <View style={style.hotelListCardSec}>
            <View style={styles.hotelListCard}>
                <View style={styles.hotelListCardImage}>
                    <ImageBackground resizeMode='cover' style={style.hotelListCardImageBg} source={val?.thumbNailUrl !== '' ? { uri: val?.thumbNailUrl } : require('../../Assert/Images/imageNotFound.jpg')}>
                        <View style={style.hotelListCardReview}>
                            <View>
                                <Stars
                                    default={val?.hotelRating}
                                    count={5}
                                    half={true}
                                    disabled={true}
                                    starSize={50}
                                    spacing={5}
                                    fullStar={<FontAwesome name={'star'} style={[styles.myStarStyle]} />}
                                    emptyStar={<FontAwesome name={'star-o'} style={[styles.myStarStyle, styles.myEmptyStarStyle]} />}
                                    halfStar={<FontAwesome name={'star-half-empty'} style={[styles.myStarStyle]} />}
                                />
                            </View>
                            {/* <Text style={style.hotelListCardReviewBlog}>109 Trip Blogs</Text> */}
                        </View>
                    </ImageBackground>
                </View>
                <View style={style.hotelListCardCon}>
                    <View style={style.hotelListCardHotelLocat}>
                        <View style={{width:'48%',flex:1,paddingHorizontal:10}}>
                            <View style={style.hotelListCardHotelName}>
                                <FontAwesome5 style={style.hotelListLocIcon} name='hotel' />
                                <Text style={style.hotelListLocName}>{val?.propertyType}</Text>
                            </View>
                        </View>
                        <View style={styles.GridVerticalLine}></View>
                        <View style={{width:'48%',flex:1,paddingHorizontal:10}}>
                            <TouchableHighlight underlayColor={'transparent'} style={[style.hotelListCardHotelName, { paddingVertical: 0 }]}
                                onPress={() => {
                                    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
                                    const latLng = `${val.latitude},${val.longitude}`;
                                    const label = `${val?.hotelName}`;
                                    const url = Platform.select({
                                        ios: `${scheme}${label}@${latLng}`,
                                        android: `${scheme}${latLng}(${label})`
                                    });
                                    Linking.openURL(url);
                                }}>
                                <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                                    <Ionicons style={style.hotelListLocIcon} name='location-outline' />
                                    <Text style={style.hotelListLocName}>{val?.city}</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                    <View style={style.hotelDesCont}>
                        <Text style={style.ListHotelName}>{val?.hotelName}</Text>
                        <Text style={style.ListHotelPrice}>{val?.currency} {val?.total} <Text style={style.taxTect}></Text></Text>
                        <Text style={style.ListHotelDescription}>{(parseInt(moment.duration(moment(RoomGuestPlace?.arrivalDate, "YYYY-MM-DD").diff(moment(RoomGuestPlace?.depatureDate, "YYYY-MM-DD"))).asDays()) === 1) ?
                            parseInt(moment.duration(moment(RoomGuestPlace?.arrivalDate, "YYYY-MM-DD").diff(moment(RoomGuestPlace?.depatureDate, "YYYY-MM-DD"))).asDays()) :
                            parseInt(moment.duration(moment(RoomGuestPlace?.arrivalDate, "YYYY-MM-DD").diff(moment(RoomGuestPlace?.depatureDate, "YYYY-MM-DD"))).asDays()) + 1} night {RoomGuestPlace?.Guest} All inclusive price {val?.currency} {val?.total}</Text>
                        <TouchableHighlight style={style.ListHotelBtn}
                            onPress={() => {
                                dispatch({
                                    type: hotelActions.GET_HOTEL_ROOM_TYPE,
                                    payload: {
                                        hotelId: val?.hotelId,
                                        productId: val?.productId,
                                        sessionId: hotelSessionId,
                                        tokenId: val?.tokenId
                                    },
                                    navigation: navigation,
                                    detail: val
                                })
                            }}>
                            <Text style={style.ListHotelBtnText}>BOOK NOW</Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    hotelListCardImage: {
        backgroundColor: '#fff',
    },
    myStarStyle: {
        color: '#F3BB00',
        backgroundColor: 'transparent',
        textShadowColor: '#fff',
        textShadowOffset: { width: 100, height: 100 },
        textShadowRadius: 2,
        // fontSize:20,
    },
    myEmptyStarStyle: {
        color: 'white',
    },
    hotelListCardImageBg: {
        // borderTopLeftRadius:10,
        // borderTopRightRadius:10
        // borderRadius:20
        height: 200
    },
    hotelListCardCon: {
        paddingHorizontal: 10,
    },
    GridVerticalLine:{
        height: '100%',
        width:2,
        backgroundColor:'#babab8',
    }
});
export default HotelCard