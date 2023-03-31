/* eslint-disable prettier/prettier */
import React, { useEffect, useState,useCallback } from 'react';
import { View, Text, StyleSheet, Image, Dimensions,TouchableHighlight,ScrollView } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import COLORS from '../constants/color';
import FONTS from '../constants/font';
import actions from '../../redux/PopularPlaces/actions';
import { API_IMG_URL } from '../constants/constApi';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import CommonAction from '../../redux/common/actions';
import popularAction from '../../redux/PopularPlaces/actions';
import {debounce} from 'lodash';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const PopularPlaceCard = ({navigation}) => {
   const dispatch =useDispatch();

   var [popularPlace,setPopularPlace]=useState();

    useEffect(() => {
        dispatch({ type: popularAction.GET_POPULAR_PLACES })
        console.log('run use effect')
    }, []);

    const { Popular_Places } = useSelector((state) => state.PopularPlacesReducer);

    // useEffect(()=>{
    //     setPopularPlace(popularPlace=Popular_Places)
    // }, [])
    const handlePassData=(item)=>{
            dispatch({ type: popularAction.SET_POPULAR_PLACE_DETAILS, payload: { id: item?.id, navigation } })
            dispatch({ type: CommonAction.COMMON_LOADER, payload: true })
            // handleDebugger()
    }
    const handleDebugger = useCallback(
        debounce((e)=>console.log(e), 1000)
        , []);
    return (
        <View style={style.PopularplaceCard}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

            {
                Popular_Places?.PopularPlaceList?.map((item, index) => (
                    <TouchableHighlight style={{marginRight:25}}  key={index} underlayColor='transparent' onPress={()=>handlePassData(item)}>
                        <View>
                            <View style={style.PopularPlaceCardImage}>
                                <Image style={style.PopularPlaceCardImageSingle} source={{ uri: `${API_IMG_URL}/server/popularplace/${item.place_image}` }} />
                                {/* <Text style={style.PopularPlaceCardImageRev}><Entypo style={style.PopularPlaceCardImageRevStart} name='star' />4.5 (42K)</Text> */}
                            </View>
                            <View style={style.PopularPlaceCardCont}>
                                <Text style={style.PopularPlaceCardCity}>{item?.place_name}</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <FontAwesome5Icon name='hotel' size={height * 0.015} color='grey'/>
                                        <Text style={style.PopularPlaceCardStay}>{item?.entry2}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Entypo name='location-pin' size={height * 0.025} color='grey' />
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
        fontFamily: FONTS.fontBold,
    },
    PopularPlaceCardStay: {
        color: '#898989',
        fontSize: height * 0.014,
        fontFamily: FONTS.fontSemi,
        paddingLeft: 3
    },
    PopularPlaceCardCity: {
        fontFamily: FONTS.fontBold,
        color: COLORS.colorText,
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
        fontFamily: FONTS.mediam,
        borderBottomLeftRadius: 10,
    },
    PopularPlaceCardImage: {
        position: 'relative',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        width:width*0.41,
        height:height*0.18
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