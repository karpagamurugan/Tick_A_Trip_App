/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, ScrollView } from 'react-native';
import { useSelector } from "react-redux";
import Appbar from '../common/Appbar';
import { API_IMG_URL } from '../../constants/constApi';
import font from "../../constants/font";
import popularAction from '../../redux/PopularPlaces/actions';
import PopularPlaceCard from "./PopularPlaceCard";


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

export default function PopularPlacesDetails({ navigation }) {
    const { Places_details } = useSelector((state) => state.PopularPlacesReducer)
    let place_name=Places_details?.place_name;

    return (
        <View style={style.mainContainer}>
            <Appbar title={'Popular Places'} />
            <ScrollView>

                <Image style={style.PopularPlaceCardImageSingle}  source={{ uri: `${API_IMG_URL}/server/popularplace/${Places_details?.place_image}` }}/>
                {/* <Text style={style.PlaceText}>{Places_details?.place_name}</Text> */}

                <View style={style.galleryListStyle}>

                        <View>
                        <Text style={style.PlaceText}>{Places_details?.place_name}</Text>
                        <Text style={style.titleStyle}>{Places_details?.title}</Text>
                        {/* <Text>l,m iorc opigcelor[]wxfr;pe' {`\n`}lcfds;lv.c;v,.c,v;dfwderewrwegrwhbsbbb</Text> */}
                        <Text style={style.descriptionStyle}>{Places_details?.description}</Text>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                            {Places_details?.GalleryList?.map((item,index)=>(
                                <View key={index} style={{marginRight:10}}>
                                   <View style={style.PopularPlaceCardImage}>
                                   <Image style={style.PopularPlaceGallery} source={{ uri: `${API_IMG_URL}/server/popularplacegallery/${item?.gallery_image}` }}/>
                                   </View>
                                </View>
                            ))}

                        </ScrollView>

                      
                        </View>

                        <View style={{marginTop:10}}>
                            <Text style={style.suggestion}>Suggestions</Text>
                        <PopularPlaceCard navigation={navigation} place_name={place_name}/>
                        </View>
                  
                </View>
            </ScrollView>
        </View>
    )
}


const style = StyleSheet.create({
    mainContainer: { backgroundColor: 'white', width: width,height:height*0.9 },
    PopularPlaceCardImageSingle: { width: width, resizeMode:'cover',height:height*0.3},
    PlaceText: { fontFamily: font.font, fontWeight: 'bold', color: 'black', fontSize: height * 0.03 },
    titleStyle: { fontFamily: font.font, fontSize: height * 0.017, color: 'grey', paddingTop: 2 },
    descriptionStyle: { fontFamily: font.fontSemi, color: 'black' },
    galleryListStyle: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20, borderTopRightRadius: 20, top: -20, paddingVertical: 10, paddingHorizontal: 20
    },
    PopularPlaceGallery: {
        elevation: 5,
        shadowColor: '#000',
        height:100,
        width:100,
        borderRadius:5
    },
    suggestion:{
        fontFamily:font.font,
        color:'black',
        fontWeight:'bold',
        paddingVertical:5,
        fontSize:height*0.023

    }
    
})