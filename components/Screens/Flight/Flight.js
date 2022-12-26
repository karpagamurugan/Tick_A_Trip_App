/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, Modal, TouchableHighlight, Pressable, ImageBackground, TextInput } from 'react-native';
import color from '../../../constants/color';
import font from '../../../constants/font';
import Appbar from '../../common/Appbar';
import Octicons from 'react-native-vector-icons/Octicons';
import FromIcon from '../../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../../Assert/Images/icon/take-off-2.svg';
import ChairIcon from '../../../Assert/Images/icon/office-chair.svg';
import CalendarIcon from '../../../Assert/Images/icon/calendar.svg';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';



let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;


const Flight = () => {

  var [oneTrip, setOneTrip] = useState(true);
  var [showTraveller, setShowTraveller] = useState(false)
  var [fromDate, setFromDate] = useState(new Date());
  var [ToDate, setTodate] = useState(new Date());
  var [fromPicker, setFromPicker] = useState(false)
  var [toPicker, setToPicker] = useState(false)

  return (
    <View style={style.MainContainer}>

      <Modal
        transparent={true}
        visible={showTraveller}

      >
        <Pressable
          onPress={() => setShowTraveller(!showTraveller)}
          style={{
            position: 'absolute',
            backgroundColor: '#000000',
            opacity: 0.3,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }} />



        <View style={{ flex: 1, justifyContent: 'center' }} >
          <View style={{
            width: '85%', borderRadius: 10, backgroundColor: 'white', flexDirection: 'column',
             alignSelf: 'center',padding:20
          }}>
            <View>
              <View style={{borderRadius:5,borderWidth:1,height:40,borderColor:'grey',marginTop:20}}>
                <TextInput
                placeholder='Adult'
                />
              </View>
              <View style={{borderRadius:5,borderWidth:1,height:40,borderColor:'grey',marginTop:20}}>
                <TextInput
                placeholder='Children'
                />
              </View>
              <View style={{borderRadius:5,borderWidth:1,height:40,borderColor:'grey',marginTop:20}}>
                <TextInput
                placeholder='Infant'
                />
              </View>

              <View style={{alignItems:'center',marginTop:10}}>
                <TouchableHighlight>
                  <Text style={{fontFamily:font.fontSemi,color:'white',
                  backgroundColor:color.textBlue,paddingVertical:5,paddingHorizontal:10,borderRadius:10}}>OK</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>

      </Modal>
      <Appbar title={'Search Flight'} />




      <ScrollView>
        <View style={{ height: height,marginBottom:60 }}>
          <View style={{ height: height * 0.3, backgroundColor: 'white', borderColor: 'red', borderWidth: 1 }}>

          </View>
          <ImageBackground source={require('../../../Assert/Images/map.jpg')} style={{height:height*0.7,width:width,paddingTop:20}}>

          <View style={{ position: 'absolute', alignSelf: 'center',top:-20}}>
            <View style={style.btn}>
              <View style={style.btnView}>
                <Octicons name='arrow-right' size={22} color='white' />
                <Text style={style.onebtn}>ONE WAY</Text>
              </View>
              <View style={style.btnView}>
                <Octicons name='arrow-switch' size={22} color='white' />
                <Text style={style.onebtn}>ROUND TRIP</Text>
              </View>
            </View>


            <View style={[style.frombtn, { marginHorizontal: 20 }]}>
              <FromIcon height={22} width={22} />
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ color: color.textBlue, fontFamily: font.fontSemi }}>FROM</Text>
                <Text style={{ color: color.colorText, fontFamily: font.mediam }}>Sydney, Australia</Text>
              </View>
            </View>

            <View style={[style.frombtn, { marginHorizontal: 20 }]}>
              <ToIcon height={25} width={25} />
              <View style={{ paddingLeft: 15 }}>
                <Text style={{ color: color.textBlue, fontFamily: font.fontSemi }}>TO</Text>
                <Text style={{ color: color.colorText, fontFamily: font.mediam }}>Sydney, Australia</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row',justifyContent:'space-around' }}>
              <TouchableHighlight onPress={() => setFromPicker(!fromPicker)} underlayColor='transparent'>
                <View style={[style.frombtn, { marginLeft: 20 }]}>
                  <CalendarIcon height={22} width={22} />
                  <View style={{ paddingLeft: 15 }}>
                    <Text style={{ color: color.textBlue, fontFamily: font.fontSemi }}>DEPARTURE ON</Text>
                    <Text style={{ color: color.colorText, fontFamily: font.mediam }}>{moment(fromDate).format('DD/MM/YYYY')}</Text>
                  </View>
                </View>
              </TouchableHighlight>
              {/* <View style={{width:width*0.05}}/> */}
              <TouchableHighlight onPress={() => setToPicker(!toPicker)} underlayColor='transparent'>
                <View style={[style.frombtn, { marginRight: 20 }]}>
                  <CalendarIcon height={22} width={22} />
                  <View style={{ paddingLeft: 15 }}>
                    <Text style={{ color: color.textBlue, fontFamily: font.fontSemi }}>RETURN ON</Text>
                    <Text style={{ color: color.colorText, fontFamily: font.mediam }}>{moment(ToDate).format('DD/MM/YYYY')}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableHighlight onPress={() => setShowTraveller(!showTraveller)} underlayColor='transparent'>
                <View style={[style.frombtn, { marginLeft: 20 }]}>
                  <ToIcon height={25} width={25} />
                  <View style={{ paddingLeft: 15 }}>
                    <Text style={{ color: color.textBlue, fontFamily: font.fontSemi }}>TRAVELLERS</Text>
                    <Text style={{ color: color.colorText, fontFamily: font.mediam }}>Sydney, Australia</Text>
                  </View>
                </View>
              </TouchableHighlight>


              <View style={[style.frombtn, { marginRight: 20 }]}>
                <ChairIcon height={25} width={25} />
                <View style={{ paddingLeft: 15 }}>
                  <Text style={{ color: color.textBlue, fontFamily: font.fontSemi }}>CLASS</Text>
                  <Text style={{ color: color.colorText, fontFamily: font.mediam }}>Sydney, Australia</Text>
                </View>
              </View>
            </View>


            <View style={style.searchBtn}>
              <TouchableHighlight underlayColor={'transparent'} onPress={()=>null}>
                <Text style={style.searchText}>SEARCH FLIGHT</Text>
              </TouchableHighlight>
            </View>

          </View>
          </ImageBackground>
        </View>

        <DatePicker
          modal
          open={fromPicker}
          date={fromDate}
          mode="date"
          // maximumDate={new Date()}
          minimumDate={new Date()}
          onConfirm={(date) => {
            setFromPicker(!fromPicker)
            setFromDate(fromDate = date)
            console.log(fromDate)
          }}
          onCancel={() => {
            setFromPicker(!fromPicker)
          }}
        />

        <DatePicker
          modal
          open={toPicker}
          date={fromDate}
          mode="date"
          // maximumDate={new Date()}
          minimumDate={new Date()}
          onConfirm={(date) => {
            setToPicker(!toPicker)
            setTodate(ToDate = date)
          }}
          onCancel={() => {
            setToPicker(!toPicker)
          }}
        />

      </ScrollView>
    </View>

  )
}

export default Flight


const style = StyleSheet.create({
  MainContainer: {
    height: height,
    width: width,
    backgroundColor: 'white'
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-around'

  },
  btnView: {
    backgroundColor: color.textBlue,
    paddingVertical: 7,
    // paddingHorizontal:15,
    borderRadius: 20,
    width: width * 0.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  onebtn: {
    color: 'white',
    fontFamily: font.fontSemi,
    paddingLeft: 10,
    fontSize: height * 0.017
  },
  frombtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F9FF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#00000000',
    shadowColor: '#F6F9FF',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 20,
    padding: 5,
  },
  searchText:{
    color:'white',
    fontFamily:font.mediam,
    paddingVertical:10,

  },
  searchBtn:{
    alignItems:'center',
    backgroundColor:color.textBlue,
    marginHorizontal:40,
    marginBottom:20,
    marginTop:20,
    borderRadius:30
  },

})