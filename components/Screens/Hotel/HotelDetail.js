/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableHighlight } from 'react-native'
import style from '../../common/commonStyle'
import HotelAppbar from '../../common/HotelAppbar'
import Stars from 'react-native-stars';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const HotelDetail = ({ navigation }) => {

    const roomFacility = [
        'Parking',
        'Free Wifi',
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
                <ImageBackground style={style.HotelDetailBanner} source={require('../../../Assert/Images/hotel.jpg')}>
                    <View style={style.OverLay} />
                    <View style={style.HotelDetailBannerCon}>
                        <View>
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
                        <Text style={style.parrah}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel molestie nisl. Duis ac mi leo. Mauris at convallis erat. Aliquam interdum semper luctus. Sed viv</Text>
                    </View>
                    <View style={{ marginBottom: 20, }}>
                        <Text style={style.TitleMain}>Aminities</Text>
                        {roomFacility.map((val, index) => (
                            <Text style={style.list} key={index}><MaterialIcons style={style.listIcon} name='double-arrow' />{val}</Text>
                        ))}

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