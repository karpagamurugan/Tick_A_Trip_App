import React from "react";
import {View,Text,StyleSheet, Dimensions,Image, ImageBackground} from 'react-native';
import { useSelector } from "react-redux";
import Appbar from '../common/Appbar';
import { API_IMG_URL } from '../../constants/constApi';
import font from "../../constants/font";


let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

export default function PopularPlacesDetails({navigation}){
    const { Places_details} = useSelector((state) => state.PopularPlacesReducer)

   
// console.log(Places_details?.place_image)
    return(
        <View style={style.mainContainer}>
            <Appbar title={'Popular Places'}/>
            <ImageBackground style={style.PopularPlaceCardImageSingle} source={{ uri: `${API_IMG_URL}/server/popularplace/${Places_details?.place_image}`}}>
                    <Text style={style.PlaceText}>{Places_details?.place_name}</Text>
                </ImageBackground>
            {/* <Text>
                {Places_details?.place_name}
            </Text> */}
        </View>
    )
}


const style = StyleSheet.create({
    mainContainer:{backgroundColor:'white',height:height,width:width,},
    PopularPlaceCardImageSingle:{height:height*0.3,width:width},
    PlaceText:{fontFamily:font.font,fontWeight:'bold',color:'white',fontSize:height*0.03},

})