/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableHighlight } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Stars from 'react-native-stars';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import style from '../../common/commonStyle'


const HotelCard = (props, navigation) => {
    const { val } = props
    return (
        <View style={style.hotelListCardSec}>
            <View style={styles.hotelListCard}>
                <View style={styles.hotelListCardImage}>
                    <ImageBackground resizeMode='cover' style={style.hotelListCardImageBg} source={ val?.thumbNailUrl !== '' ? { uri: val?.thumbNailUrl } : require('../../../Assert/Images/imageNotFound.jpg')}>
                        <View style={style.hotelListCardReview}>
                            <View>
                                <Stars
                                    default={val?.hotelRating}
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
                            <Text style={style.hotelListCardReviewBlog}>109 Trip Blogs</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={style.hotelListCardCon}>
                    <View style={style.hotelListCardHotelLocat}>
                        <View style={style.hotelListCardHotelName}>
                            <FontAwesome5 style={style.hotelListLocIcon} name='hotel' />
                            <Text style={style.hotelListLocName}>{val?.propertyType}</Text>
                        </View>
                        <View style={style.hotelListCardHotelName}>
                            <Ionicons style={style.hotelListLocIcon} name='location-outline' />
                            <Text style={style.hotelListLocName}>{val?.city}</Text>
                        </View>
                    </View>
                    <View style={style.hotelDesCont}>
                        <Text style={style.ListHotelName}>{val?.hotelName}</Text>
                        <Text style={style.ListHotelPrice}>{val?.currency} {val?.total} <Text style={style.taxTect}>inclusing tax</Text></Text>
                        {/* <Text style={style.ListHotelDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel molestie nisl. Duis ac mi leo.</Text> */}
                        <TouchableHighlight style={style.ListHotelBtn} onPress={() => navigation.navigate('HotelRoomType')}>
                            <Text style={style.ListHotelBtnText}>BOOK NOW</Text>
                        </TouchableHighlight>
                    </View>
                </View>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    hotelListCardImage:{
        backgroundColor:'#fff',
    },
    myStarStyle: {
        color: 'yellow',
        backgroundColor: 'transparent',
        textShadowColor: '#fff',
        textShadowOffset: { width: 100, height: 100 },
        textShadowRadius: 2,
        // fontSize:20,
    },
    myEmptyStarStyle: {
        color: 'white',
    },
});
export default HotelCard