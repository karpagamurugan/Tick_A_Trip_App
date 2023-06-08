/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import font from '../constants/font';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import color from '../constants/color';
import PopularPlaceCard from './PopularPlaceCard';
import NearestPlaceCard from './NearestPlaceCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import userAction from '../../redux/user/actions'
import popularAction from '../../redux/PopularPlaces/actions';
import CommonAction from '../../redux/common/actions';
import FlightHome from '../../Assert/Icons/FlightHome.svg';
import HotelHome from '../../Assert/Icons/HotelHome.svg';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Home = ({ navigation }) => {
  const dispatch = useDispatch()

  const { travelers_list} = useSelector((state) => state.userReducer) //get user data


  var LISTdATA=[{'type':'adult',name:'durga'},
  {'type':'adult',name:'devi'},
  {'type':'child',name:'Hotel'},
  {'type':'infant',name:'flight'}]

  const userLogin = async () => {
    await AsyncStorage.getItem('tickatrip-token').then(
      (res) => {
        if (res !== null) {
          dispatch({ type: userAction.SET_IS_LOGIN, payload: true })
        } else {
          dispatch({ type: userAction.SET_IS_LOGIN, payload: false })
        }
      }
    )
  }
  userLogin()



  return (
    <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
      <View style={{ width: width, paddingHorizontal: 20, }}>

        <Text style={style.bannerTd}>Explore the  World with us</Text>
        <View style={style.bannerBtns}>
          <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate('Hotel')}>
         
            <HotelHome/>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"transparent"} onPress={() => navigation.navigate('flight')}>
            
            <FlightHome/>
          </TouchableHighlight>
        </View>
        <View style={style.PopularPlace}>
          <View style={style.PopularPlaceHead}>
            <Text style={style.PopularPlaceHeadTd}>Top Packages</Text>
            <TouchableHighlight ><Text style={style.PopularPlaceHeadmore}>See More</Text></TouchableHighlight>
          </View>
       
                <View style={style.PopularPlaceCard} >
                <PopularPlaceCard navigation={navigation}/>
              </View>
            
        </View>
        <View style={style.PopularPlace}>
          <View style={style.PopularPlaceHead}>
            <Text style={style.PopularPlaceHeadTd}>Hotels For You</Text>
            <TouchableHighlight ><Text style={style.PopularPlaceHeadmore}>See More</Text></TouchableHighlight>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[...Array(5)].map((val, index) => (
              <View style={style.PopularPlaceCard} key={index} >
                <NearestPlaceCard />
              </View>
            ))}
          </ScrollView>

        </View>
      </View>
    </ScrollView>

  );
};
const style = StyleSheet.create({
  PopularPlaceList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  PopularPlaceHeadmore: {
    fontFamily: font.fontSemi,
    color: '#FE712A',
  },
  PopularPlace: {
    paddingTop: 30,
    paddingBottom:10
  },
  PopularPlaceHeadTd: {
    fontFamily: font.fontBold,
    fontSize: 20,
    color: color.colorText,
    letterSpacing: 1,
  },
  PopularPlaceHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bannerBtnsTd: {
    fontSize: 16,
    marginTop: 8,
    fontFamily: font.mediam,
    color: '#333333'
  },
  bannerBtnsIcon: {
    backgroundColor: '#4C94F2',
    width: width * 0.2,
    height: height * 0.1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  bannerTd: {
    color: '#333333',
    fontSize: 32,
    fontFamily: font.fontBold,
    width: width * 0.7,
    lineHeight: 50,
    paddingTop: 30,
    letterSpacing: 1,
  },
  bannerBtnsGrid: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bannerBtns: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bannerBtnIconIn: {
    color: '#fff',
    fontSize: 40,
  },
})
export default React.memo(Home);
