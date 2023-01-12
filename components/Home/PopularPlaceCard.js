/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableHighlight,ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import color from '../../constants/color';
import font from '../../constants/font';
import actions from '../../redux/PopularPlaces/actions';
import { API_IMG_URL } from '../../constants/constApi';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CommonAction from '../../redux/common/actions';
import popularAction from '../../redux/PopularPlaces/actions';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const PopularPlaceCard = ({navigation,place_name}) => {
   const dispatch =useDispatch();
    const { Popular_Places } = useSelector((state) => state.PopularPlacesReducer)
    useEffect(() => {
        dispatch({ type: popularAction.GET_POPULAR_PLACES })
    }, [])
    return (
        <View style={style.PopularplaceCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {
                Popular_Places?.PopularPlaceList?.filter((i)=>i.place_name !== place_name).map((item, index) => (
                    <TouchableHighlight style={{marginRight:10}}  key={index} underlayColor='transparent' onPress={() => {
                        dispatch({ type: popularAction.SET_POPULAR_PLACE_DETAILS, payload: { id: item?.id, navigation } })
                        dispatch({ type: CommonAction.COMMON_LOADER, payload: true })
                    }}>
                        <View>
                            <View style={style.PopularPlaceCardImage}>
                                <Image style={style.PopularPlaceCardImageSingle} source={{ uri: `${API_IMG_URL}/server/popularplace/${item.place_image}` }} />
                                {/* <Text style={style.PopularPlaceCardImageRev}><Entypo style={style.PopularPlaceCardImageRevStart} name='star' />4.5 (42K)</Text> */}
                            </View>
                            <View style={style.PopularPlaceCardCont}>
                                <Text style={style.PopularPlaceCardCity}>{item?.place_name}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome5Icon name='hotel' size={height * 0.015} />
                                        <Text style={style.PopularPlaceCardStay}>{item?.entry2}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Entypo name='location-pin' size={height * 0.025} />
                                        <Text style={style.PopularPlaceCardStay}>{item?.entry1}</Text>
                                    </View>


                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>))
            }
</ScrollView>

            {/* <Text style={style.PopularPlaceCardPrice}>$456.00</Text> */}

        </View>
    )
}

const style = StyleSheet.create({
    // PopularplaceCard: {
    //     width: width * 0.4,
    //     marginRight: 20
    //   },
    PopularPlaceCardPrice: {
        color: '#FE712A',
        fontFamily: font.fontBold,
    },
    PopularPlaceCardStay: {
        color: '#898989',
        fontSize: height * 0.014,
        fontFamily: font.fontSemi,
        paddingLeft: 3
    },
    PopularPlaceCardCity: {
        fontFamily: font.fontBold,
        color: color.colorText,
        marginTop: 10,
        fontSize: height * 0.025
    },
    PopularPlaceCardImageRevStart: {
        color: '#FE712A',
    },
    PopularPlaceCardImageRev: {
        position: 'absolute',
        right: 0,
        color: '#fff',
        backgroundColor: '#333333',
        fontSize: 10,
        paddingVertical: 3,
        paddingHorizontal: 8,
        fontFamily: font.mediam,
        borderBottomLeftRadius: 10,
    },
    PopularPlaceCardImage: {
        position: 'relative',
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    PopularPlaceCardImageSingle: {
        overflow: 'hidden',
        width: '100%',
        minHeight: 150,
        maxHeight: 150,
        resizeMode: 'cover',
        elevation: 5,
        shadowColor: '#000',
    },
})
export default PopularPlaceCard