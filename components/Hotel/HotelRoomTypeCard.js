/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground, TouchableHighlight } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import style from '../common/commonStyle'
import Stars from 'react-native-stars';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import COLORS from '../constants/color'
import FONT_FAMILY from '../constants/font'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelRoomTypeCard = ( props) => {
    const {val,detail}=props
  
    return (
        <View style={styles.mainContainer}>
            <View style={{backgroundColor:'white'}}>
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20}}>
                <Text style={styles.Name}>{detail?.hotelName}</Text>
                <View style={styles.RoomTypeStart}>
                         <Stars
                            default={detail?.hotelRating}
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
                </View>
                <View style={{backgroundColor:COLORS.AppbarColor,height:1,marginVertical:5}}/>
                <View style={{height:5}}/>
               <View style={styles.subContainer}>
               <Text style={styles.title}>BoardType : </Text>
                <Text style={styles?.contentText}>{val?.boardType}</Text>
               </View>
               <View style={{height:5}}/>
               {
                (val?.facilities?.length ===0)?<View/>:<View style={styles.subContainer}>
               <Text style={styles.title}>Facilities : </Text>
                <Text style={styles?.contentText}>{val?.facilities}</Text>
               </View>
               }
              
               <View style={styles.subContainer}>
               <Text style={styles.title}>Description : </Text>
                <Text style={styles?.contentText}>{val?.description}</Text>
               </View>
               <View style={styles.subContainer}>
               <Text style={styles.title}>FareType : </Text>
                <Text style={styles?.contentText}>{val?.fareType}</Text>
               </View>
              
               <View style={styles.subContainer}>
               <Text style={styles.title}>CancellationPolicy : </Text>
                <Text style={styles?.contentText}>{val?.cancellationPolicy}</Text>
               </View>
               <View style={{backgroundColor:COLORS.AppbarColor,height:1,marginVertical:10}}/>
                <TouchableHighlight 
                underlayColor={'transparent'} 
                onPress={()=>{
                    props.navigation.navigate('HotelBooking',{value:val,detail:detail})
                }}
                style={{borderRadius:30,paddingVertical:10,backgroundColor:'#EEEFEF',width:width*0.6,alignSelf:'center'}}
                >
                    <Text style={styles.bookNow}>Book now</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    Name:{
        alignSelf:'center',
        fontFamily:FONT_FAMILY.fontBold,
        alignContent:'center',
        alignItems:'center',
        color:COLORS.textBlue,
        fontSize:height*0.023,
        width:width*0.6

    },
mainContainer:{
    borderRadius:12,
    borderColor:COLORS.AppbarColor,
    paddingVertical:10,
    borderWidth:1.5,
    marginHorizontal:15,
    marginVertical:5
},
subContainer:{flexDirection:'row',paddingHorizontal:10},
title:{
    fontFamily:FONT_FAMILY.mediam,
    color:COLORS.textBlue,
    fontSize:height*0.015

},
contentText:{
    fontFamily:FONT_FAMILY.font,
    color:'black',
    fontSize:height*0.015,
    flex:1,

},
bookNow:{
    alignSelf:'center',
    fontFamily:FONT_FAMILY.mediam,
    color:COLORS.textBlue,
    letterSpacing:0.9,
},
    RoomTypeStart:{
        flexDirection:'row',
        justifyContent:'flex-start',
        marginBottom:5,
    },
    myStarStyle: {
        color: '#F3BB00',
        backgroundColor: 'transparent',
        textShadowColor: '#fff',
        textShadowOffset: { width: 100, height: 100 },
        textShadowRadius: 2,
    },
    myEmptyStarStyle: {
        color: '#000',
    },
});
export default React.memo(HotelRoomTypeCard)