/* eslint-disable prettier/prettier */
import React, { useCallback, useState, memo } from 'react'
import { View, Text, ImageBackground, Dimensions, StyleSheet, ScrollView, TouchableHighlight, Pressable, Modal, TextInput,Image } from 'react-native'
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
import FONTS from '../constants/font';
import COLORS from '../constants/color';
import { PROFILE_URL } from '../constants/constProfileApi';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelDetail = ({ navigation, route }) => {
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
    const { HotelRoomType, hotelDetails, AllReviews} = useSelector((state) => state.HotelReducer)

    var [Review,setReview]=useState()
    var [rating,setRating]=useState()

    const mainAminities = [
        'Car park',
        'Bath',
        'Wi-fi',
        'Bar',
        'Gym'
    ]

    const textNumberOfLine = () => {
        setTextShown(!textShown)
    }

    const onTextLayout = useCallback(e => {
        setTextReadMore(e.nativeEvent.lines.length >= 3.5)
    }, []);
   
    const source = {
        html: `${hotelDetails?.message?.description.content} `
    };
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
                        {/* <View>
                            <View style={{ flexDirection: "row", alignItems: 'center', }}>
                                <Text style={style.HotelDetailHotelPrice}>5,500</Text>
                                <View style={{ paddingHorizontal: 5 }}>
                                    <Text style={styles.HotelPriceList}>Rs</Text>
                                    <Text style={styles.HotelPriceList}>Per Day</Text>
                                </View>
                            </View>
                            <Text style={style.HotelDetailHotelTax}>including tax 6,220</Text>
                        </View> */}
                    </View>
                </ImageBackground>
                <View style={{ paddingHorizontal: 15, backgroundColor: '#F8F8F8', flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
                    <Ionicons style={style.HotelTitleIcon} name='location' />
                    <Text style={[style.HotelTitle, { flex: 1, paddingLeft: 5 }]}>{hotelDetails?.message?.address} , {'\n'}{hotelDetails?.message?.city} , {hotelDetails?.message?.country}</Text>
                </View>
                <View style={{ paddingHorizontal: 15 }}>
                    <View>
                        <Text style={style.TitleMain}>About the Hotel</Text>
                        <View>
                            {/* <RenderHtml
                                // contentWidth={width * 0.8}
                                source={source}
                            /> */}
                            <Text
                                onTextLayout={onTextLayout}
                                numberOfLines={textShown ? undefined : 4.7}
                                style={style.parrah}
                            >
                               {hotelDetails?.message?.description.content}</Text>
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
                        <View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            {hotelDetails?.message?.facilities?.map((val, index) => mainAminities.find(el => el === val) && (
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
                                        {(val === 'Car park') && <Parking height={20} />}
                                        {(val === 'Bath') && <Bath height={20} />}
                                        {(val=== "Wi-fi") && <Wifi height={20} />}
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
                                            {hotelDetails?.message?.facilities?.map((val, index) => (
                                                <View style={{ flexDirection: 'row', alignItems: 'center', }} key={index}>
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


                <View>
                    <View style={styles.ratingContainer}>
                        <Text style={[styles.ratingTitle,{color:'black',fontWeight:'bold',fontSize:height*0.025}]}>Room Review</Text>
                        <View style={{height:1,width:width*0.85,backgroundColor:'grey',alignSelf:'center',marginVertical:5}}/>
                        <Text style={[styles.ratingTitle,{fontSize:height*0.02,color:'grey'}]}>Leave a Rating & Comment</Text>
                        <View style={{alignItems:'flex-start',paddingLeft:10}}>
                        <Stars
                                    default={5}
                                    count={5}
                                    half={true}
                                    disabled={false}
                                    starSize={55}
                                    update={(val)=>{
                                        setRating(rating=val)
                                    }}
                                    spacing={5}
                                    fullStar={<FontAwesome name={'star'} style={[styles.myStarStyle,{fontSize:20}]} />}
                                    emptyStar={<FontAwesome name={'star-o'} style={[styles.myStarStyle, styles.myEmptyStarStyle,{fontSize:20}]} />}
                                    halfStar={<FontAwesome name={'star-half-empty'} style={[styles.myStarStyle,{fontSize:20}]} />}
                                />
                        </View>
                        <View style={{backgroundColor:'#f0f0f0',height:height*0.2,margin:10,borderRadius:5}}>
                            <TextInput
                            placeholder='Write message here'
                            placeholderTextColor={'#b3b3b3'}
                            style={{paddingLeft:10,fontFamily:FONTS.font}}
                            onChangeText={(e)=>{
                                setReview(Review=e)
                            }}
                            />

                        </View>

                        <TouchableHighlight underlayColor={'transparent'} onPress={()=>{
                            console.log('Review',Review)
                            console.log('hotelId',hotelDetails?.message?.hotelId)
                        }

                        }
                         style={{backgroundColor:COLORS.starFill,alignItems:'center',alignSelf:'flex-end',marginRight:10,borderRadius:5}}>
                            <Text style={[styles.ratingTitle,{fontSize:height*0.018,color:'#fff',fontWeight:'bold',padding:5}]}>SUBMIT REVIEW </Text>
                        </TouchableHighlight>


                        <View>
                            {
                                AllReviews?.data?.map((val,index)=>{
                                 return(
                                    <View style={{padding:10}}>
                                  <View style={{flexDirection:'row'}}>
                                    <View>
                                    <Image  style={styles.profileImage} source={{ uri: `${PROFILE_URL}${val?.user?.profile_image}` }}/>
                                    <Text style={{fontFamily:FONTS.font,paddingLeft:5}}>{val?.user?.username}</Text>
                                        </View>
                                        <View>
                                            {/* <TouchableHighlight>
                                                
                                            </TouchableHighlight> */}
                                            </View>
                                    </View>
                                    <View style={{flexDirection:'row',paddingLeft:5,paddingTop:10}}>
                                    <Stars
                                    default={val?.rating}
                                    count={5}
                                    half={true}
                                    disabled={false}
                                    starSize={55}
                                    spacing={5}
                                    fullStar={<FontAwesome name={'star'} style={[styles.myStarStyle,{fontSize:15}]} />}
                                    emptyStar={<FontAwesome name={'star-o'} style={[styles.myStarStyle, styles.myEmptyStarStyle,{fontSize:15}]} />}
                                    halfStar={<FontAwesome name={'star-half-empty'} style={[styles.myStarStyle,{fontSize:15}]} />}
                                />
                                        </View>
                                        
                                        <View style={{paddingLeft:10,paddingTop:5}}>
                                        <Text style={{fontFamily:FONTS.font}}>
                                            {
                                                val?.description
                                            }
                                        </Text>
                                            </View>
                                    </View>
                                 )

                                })
                            }
                        </View>
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
    },
    ratingContainer:{
        // height:height*0.3,
        marginBottom:20,
        width:width *0.95,
        alignSelf:'center',
        backgroundColor:'white',
        borderRadius:15,
        // alignItems:'center',
        padding:5,
        paddingBottom:10
    },
    ratingTitle:{
        paddingVertical:5,
        fontFamily:FONTS.font,
        paddingLeft:10
    },
    profileImage: { height: 35, width: 35, borderRadius: 100,borderWidth:1,borderColor:'grey' },


});
export default memo(HotelDetail)