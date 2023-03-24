/* eslint-disable prettier/prettier */

import React, { useEffect, useState } from 'react'
import { View, Text, Image, Dimensions, StyleSheet, ScrollView, Modal, TouchableHighlight, Pressable, ImageBackground, TextInput, Keyboard } from 'react-native';
import font from '../constants/font';
import Appbar from '../common/Appbar';
import Octicons from 'react-native-vector-icons/Octicons';
import FromIcon from '../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../Assert/Images/icon/take-off-2.svg';
import ChairIcon from '../../Assert/Images/icon/office-chair.svg';
import CalendarIcon from '../../Assert/Images/icon/calendar.svg';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-element-dropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import AntIcon from 'react-native-vector-icons/AntDesign'
import FlightAction from '../../redux/Flight/actions';
import actions from '../../redux/Flight/actions';
import CommonAction from '../../redux/common/actions';
import COLORS from '../constants/color';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;


const Flight = ({ navigation }) => {

  const dispatch = useDispatch()
  const { Airport_Name, Airport_to_Name } = useSelector((state) => state.FlightSearchReducer)

  var [oneTrip, setOneTrip] = useState(true);
  var [roundTrip, setRoundTrip] = useState(false);

  var [noRecord, setNoRecord] = useState({ from: true, to: true })

  var [showTraveller, setShowTraveller] = useState(false) //show traveller modal
  var [fromDate, setFromDate] = useState(new Date()); //depart date
  var [ToDate, setTodate] = useState(moment(new Date()).add(1, 'day')); //return date
  var [fromPicker, setFromPicker] = useState(false) //show depart date picker
  var [toPicker, setToPicker] = useState(false) //show retuen date picker
  var [adult, setAdult] = useState(1) //set adult count
  var [child, setchild] = useState(0) //set child count
  var [infant, setInfant] = useState(0) //set infant count
  var [classType, setClassType] = useState('Economy'); //select class type

  var [selectedFromVal, setSelectedFromVal] = useState(selectedFromVal = { city: '', code: '' }) //select from Place
  var [selectedToVal, setSelectedToVal] = useState(selectedToVal = { city: '', code: '' }) //select to place

  let ChildAndInfant = [{ value: '0' }, { value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }] //child and infant count
  let AdultCount = [{ value: '0' }, { value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '7' }, { value: '8' }, { value: '9' }] //adult count

  let classList = [{ value: 'Business' }, { value: 'Economy' }];
  const { AddTravaller_nationality, travelers_list } = useSelector((state) => state.userReducer)
 
  var tempList=[]
useEffect(()=>{
  var adultList = travelers_list?.travelers?.filter((el) => el.type === 'Adult')?.slice(0, 2)
  var childList = travelers_list?.travelers?.filter((el) => el.type === 'Child')?.slice(0, 1)
  var infantList = travelers_list?.travelers?.filter((el) => el.type === 'Infant')?.slice(0, 0)
  // console.log(adultList)
  // console.log(childList)
  // console.log(infantList)
  for(let i = 0;i<adultList?.length;i++){
    tempList.push(adultList[i])
  }
  for(let j = 0;j<childList?.length;j++){
    tempList.push(adultList[j])

  }
  for(let k = 0;k<childList?.length;k++){
    tempList.push(adultList[k])

  }
  // tempList.push(adultList,childList,infantList)
  console.log('templist...',tempList)

},[])


// useEffect(()=>{
//  var listDatA =[{'child':'new','child_age':['0',1]}]
// //  listDatA.map((el)=>{...el,'val':'n','Data':'12'})
// listDatA.map((e)=>{
//   e.child !== 'new'?
//   ''
//   :
//   (
//     e?.Data.push('0987')
// )
// })

//  console.log('listDatA',listDatA)
// },[])


  const handleSelection = (e) => {
    Keyboard.dismiss()
    dispatch({
      type: FlightAction.GET_FLIGHT_SEARCH_FROM_BY_NAME,
      payload: []
    })
    setSelectedFromVal(selectedFromVal = { city: e.city, code: e.airport_code });
    setNoRecord(noRecord = { from: false, to: noRecord.to })

  }

  const handleSelectionTo = (e) => {
    Keyboard.dismiss()
    dispatch({
      type: FlightAction.GET_FLIGHT_SEARCH_TO_BY_NAME,
      payload: []
    })
    setSelectedToVal(selectedToVal = { city: e.city, code: e.airport_code });
    setNoRecord(noRecord = { to: false, from: noRecord.from })

  }

  const FlightSearch = () => {
    dispatch({ type: CommonAction.FLIGHT_LOADER, payload: true });
    const payloaddata = {
      journey_type: (oneTrip === true) ? 'OneWay' : 'RoundTrip',
      airport_from_code: selectedFromVal?.code,
      airport_to_code: selectedToVal?.code,
      departure_date: moment(fromDate).format('YYYY-MM-DD'),
      return_date: (oneTrip === true) ? "" : moment(ToDate).format('YYYY-MM-DD'),
      adult_flight: JSON.parse(adult),
      child_flight: JSON.parse(child),
      infant_flight: JSON.parse(infant),
      class: classType,
      target: "Test"
    }

    dispatch({
      type: actions.SET_FLIGHT_SEARCH,
      payload: {
        data: payloaddata,  
        navigation: navigation,
        prefs:{
          adult_flight: JSON.parse(adult),
          child_flight: JSON.parse(child),
          infant_flight: JSON.parse(infant),
          fromCity:selectedFromVal?.city,
          toCity:selectedToVal?.city,
          class: classType,
          departure_date: moment(fromDate).format('YYYY-MM-DD'),
          return_date: (oneTrip === true) ? "" : moment(ToDate).format('YYYY-MM-DD'),
        }
      }
    })

  }

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
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <View style={style.mainModal}>
            <View style={style.subModal}>
              <Text style={style.modalTitle}>selected a traveller</Text>
              <TouchableHighlight underlayColor={'transparent'} style={style.modalCancel}
                onPress={() =>
                  setShowTraveller(!showTraveller)
                }>
                <MaterialIcons name='cancel' size={23} color='red' />
              </TouchableHighlight>
            </View>
            <View style={{ backgroundColor: 'grey', width: width, height: 0.5, opacity: 0.5 }} />
            <View style={{ alignItems: 'center', marginTop: 10 }}>

              <View style={style.dropDown}>
                <Text style={{ fontFamily: font.fontBold }}>Adults (12y+)</Text>
                <Dropdown
                  data={AdultCount}
                  labelField="value"
                  valueField="value"
                  value={adult}
                  showsVerticalScrollIndicator={true}
                  name="adult"
                  placeholder='0'
                  onChange={(item) => {
                    setAdult(item.value)
                  }}
                  selectedTextProps={{
                    style: {
                      fontSize: 13,
                      fontWeight: '500',
                      fontFamily: font.font,
                      letterSpacing: 0.5,
                      padding: 0,
                    },
                  }}
                  style={style.dropStyle}
                  renderRightIcon={() => (
                    <MaterialIcon
                      name="chevron-down-circle-outline"
                      size={25}
                      style={style.dropIcon}
                    />)}
                />
              </View>

              <View style={style.dropDown}>
                <Text style={{ fontFamily: font.fontBold }}>Children ( 2y - 12y)</Text>
                <Dropdown
                  data={ChildAndInfant}
                  labelField="value"
                  valueField="value"
                  value={child}
                  showsVerticalScrollIndicator={true}
                  name="adult"
                  placeholder='0'
                  onChange={(item) => {
                    setchild(item.value)
                  }}
                  selectedTextProps={{
                    style: {
                      fontSize: 13,
                      fontWeight: '500',
                      fontFamily: font.font,
                      letterSpacing: 0.5,
                      padding: 0,
                    },
                  }}
                  style={style.dropStyle}
                  renderRightIcon={() => (
                    <MaterialIcon
                      name="chevron-down-circle-outline"
                      size={25}
                      style={style.dropIcon}
                    />)}
                />
              </View>

              <View style={style.dropDown}>
                <Text style={{ fontFamily: font.fontBold }}>Infant (below 2y)</Text>
                <Dropdown
                  data={ChildAndInfant}
                  labelField="value"
                  valueField="value"
                  value={infant}
                  showsVerticalScrollIndicator={true}
                  name="adult"
                  placeholder='0'
                  onChange={(item) => {
                    setInfant(item.value)
                  }}
                  selectedTextProps={{
                    style: {
                      fontSize: 13,
                      fontWeight: '500',
                      fontFamily: font.font,
                      letterSpacing: 0.5,
                      padding: 0,
                    },
                  }}
                  style={style.dropStyle}
                  renderRightIcon={() => (
                    <MaterialIcon
                      name="chevron-down-circle-outline"
                      size={25}
                      style={style.dropIcon}
                    />)}
                />
              </View>
                <TouchableHighlight style={style.doneBtn} underlayColor={'transparent'} onPress={() => setShowTraveller(!showTraveller)}>
                  <Text style={style.doneText}>DONE</Text>
                </TouchableHighlight>
            </View>
          </View>
        </View>

      </Modal>

      <Appbar title={'Search Flight'} />

      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ height: height, marginBottom: 85 }}>
          <Image source={require('../../Assert/Images/hotel-bg.png')}
            style={{ width: width, height: height * 0.23 }} resizeMode="cover" />
          <ImageBackground source={require('../../Assert/Images/map.jpg')} style={style.mapbg}>

            <View style={{ position: 'absolute', alignSelf: 'center', top: -20 }}>
              <View style={style.btn}>
                <TouchableHighlight underlayColor={'transparent'}
                  onPress={() => {
                    if (oneTrip) {
                      setOneTrip(!oneTrip)
                      setRoundTrip(!roundTrip)
                    } else {
                      setOneTrip(!oneTrip)
                      setRoundTrip(!roundTrip)
                    }
                  }}>
                  <View style={[style.btnView, { backgroundColor: oneTrip ? COLORS.textBlue : 'white' }]}>
                    <Octicons name='arrow-right' size={22} color={oneTrip ? 'white' : COLORS.textBlue} />
                    <Text style={[style.onebtn, { color: oneTrip ? 'white' : COLORS.textBlue }]}>ONE WAY</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight underlayColor={'transparent'}
                  onPress={() => {
                    if (roundTrip) {
                      setRoundTrip(!roundTrip)
                      setOneTrip(!oneTrip)
                    } else {
                      setRoundTrip(!roundTrip)
                      setOneTrip(!oneTrip)
                    }
                  }}>
                  <View style={[style.btnView, { backgroundColor: roundTrip ? COLORS.textBlue : 'white' }]}>
                    <Octicons name='arrow-switch' size={22} color={roundTrip ? 'white' : COLORS.textBlue} />
                    <Text style={[style.onebtn, { color: roundTrip ? 'white' : COLORS.textBlue }]}>ROUND TRIP</Text>
                  </View>
                </TouchableHighlight>
              </View>


              <View style={{ flexDirection: 'column' }}>


                <View style={[style.frombtn, { marginHorizontal: 20, paddingLeft: 20, width: width * 0.9,justifyContent:'flex-start',paddingVertical:2 }]}>

                  <FromIcon height={22} width={22} />
                  <View style={{ paddingLeft: 15 }}>
                    <Text style={style.title}>FROM</Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        height: 35,
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >

                      <TextInput
                        keyboardType={'default'}
                        placeholder={'Select ...'}
                        placeholderTextColor="gray"
                        numberOfLines={1}
                        value={selectedFromVal?.city}
                        onChangeText={(e) => {
                          if (e === '') {
                            setNoRecord(noRecord = { from: true, to: noRecord.to })
                          }
                          if (e?.length >= 3) {
                            dispatch({
                              type: FlightAction.SET_FLIGHT_SEARCH_BY_NAME,
                              payload: {
                                name: e,
                                type: 'from'
                              }
                            })

                            setSelectedFromVal(selectedFromVal = { city: e })
                          } else {
                            setSelectedFromVal(selectedFromVal = { city: e })
                            dispatch({
                              type: FlightAction.GET_FLIGHT_SEARCH_FROM_BY_NAME,
                              payload: []
                            })
                          }
                        }}
                        style={{
                          color: 'black',
                          fontFamily: font.font,
                          width: width * 0.6,
                          paddingTop: -15,
                          paddingBottom: 0,
                        }}
                      />


                      {
                        selectedFromVal?.city !== "" ?
                          <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => {
                              setSelectedFromVal(selectedFromVal = { city: '' })
                              dispatch({
                                type: FlightAction.GET_FLIGHT_SEARCH_FROM_BY_NAME,
                                payload: []
                              })
                              setNoRecord(noRecord = { from: true, to: noRecord.to })

                            }}
                          >
                            <AntIcon name="closecircle" size={15} color="gray" style={{
                              marginLeft: 10, marginRight: 10,
                            }} />
                          </TouchableHighlight> : <></>
                      }
                    </View>
                  </View>
                </View>


                {
                  (Airport_Name?.message === undefined && selectedFromVal?.city !== '' && noRecord?.from !== false) ?
                    <View style={{
                      backgroundColor: 'white',
                      width: '90%',
                      alignSelf: 'center',
                      position: 'relative',
                      zIndex: 2,
                      borderRadius: 5,
                      elevation: 10,
                      maxHeight: height * 0.35
                    }}>
                      <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, fontFamily: font.font }}>No Options found</Text>
                    </View> : <View style={{
                      backgroundColor: 'white',
                      width: '90%',
                      alignSelf: 'center',
                      position: 'relative',
                      zIndex: 2,
                      borderRadius: 10,
                      elevation: 10,
                      maxHeight: height * 0.35
                    }}>

                      <ScrollView
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled
                        keyboardShouldPersistTaps='handled'
                      >
                        {
                          Airport_Name?.message?.filter((item) => item?.city !== selectedToVal?.city)?.map((e, i) => {
                            return (
                              <TouchableHighlight
                                underlayColor={"transparent"}
                                onPress={() => {
                                  handleSelection(e)
                                }}
                                key={i}>
                                <Text
                                  style={{
                                    color: 'black',
                                    padding: 9,
                                    fontSize: 16,
                                    fontFamily: font.font
                                  }}>{e?.city}-{e?.airport_name} ({e?.airport_code})</Text>
                              </TouchableHighlight>
                            )
                          })
                        }
                      </ScrollView>

                    </View>
                }
              </View>


              <View style={{ flexDirection: 'column' }}>


                <View style={[style.frombtn, { marginHorizontal: 20, paddingLeft: 20, width: width * 0.9,justifyContent:'flex-start',paddingVertical:2 }]}>

                  <FromIcon height={22} width={22} />
                  <View style={{ paddingLeft: 15 }}>
                    <Text style={style.title}>To</Text>

                    <View
                      style={{
                        flexDirection: 'row',
                        height: 35,
                        width: '100%',
                        alignItems: 'center',
                      }}
                    >

                      <TextInput
                        keyboardType={'default'}
                        placeholder={'Select ...'}
                        placeholderTextColor="gray"
                        numberOfLines={1}
                        value={selectedToVal?.city}
                        onChangeText={(e) => {
                          if (e === '') {
                            setNoRecord(noRecord = { from: noRecord.from, to: true })
                          }
                          if (e?.length >= 3) {
                            dispatch({
                              type: FlightAction.SET_FLIGHT_SEARCH_BY_NAME,
                              payload: {
                                name: e,
                                type: 'to'
                              }
                            })

                            setSelectedToVal(selectedToVal = { city: e })
                          } else {
                            setSelectedToVal(selectedToVal = { city: e })
                            dispatch({
                              type: FlightAction.GET_FLIGHT_SEARCH_TO_BY_NAME,
                              payload: []
                            })
                          }
                        }}
                        style={{
                          color: 'black',
                          fontFamily: font.font,
                          width: width * 0.6,
                          paddingTop: -15,
                          paddingBottom: 0,
                          // backgroundColor:'red'
                        }}
                      />


                      {
                        selectedToVal?.city !== "" ?
                          <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => {
                              setSelectedToVal(selectedToVal = { city: '' })
                              dispatch({
                                type: FlightAction.GET_FLIGHT_SEARCH_TO_BY_NAME,
                                payload: []
                              })
                              setNoRecord(noRecord = { from: noRecord.from, to: true })

                            }}
                          >
                            <AntIcon name="closecircle" size={15} color="gray" style={{
                              marginLeft: 10, marginRight: 10,
                            }} />
                          </TouchableHighlight> : <></>
                      }
                    </View>
                  </View>
                </View>


                {
                  (Airport_to_Name?.message === undefined && selectedToVal?.city !== '' && noRecord?.to !== false) ?
                    <View style={{
                      backgroundColor: 'white',
                      width: '90%',
                      alignSelf: 'center',
                      position: 'relative',
                      zIndex: 2,
                      borderRadius: 5,
                      elevation: 10,
                      maxHeight: height * 0.35
                    }}>
                      <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, fontFamily: font.font }}>No Options found</Text>
                    </View> :
                    <View style={{
                      backgroundColor: 'white',
                      width: '90%',
                      alignSelf: 'center',
                      position: 'relative',
                      zIndex: 2,
                      borderRadius: 10,
                      elevation: 10,
                      maxHeight: height * 0.35
                    }}>

                      <ScrollView
                        style={{ height: 'auto' }}
                        showsVerticalScrollIndicator={true}
                        nestedScrollEnabled
                        keyboardShouldPersistTaps='handled'
                      >
                        {
                          Airport_to_Name?.message?.filter((item) => item?.city !== selectedFromVal?.city)?.map((e, i) => {
                            return (
                              <TouchableHighlight
                                underlayColor={"transparent"}
                                onPress={() => {
                                  handleSelectionTo(e)
                                }}
                                key={i}>
                                <Text
                                  style={{
                                    color: 'black',
                                    padding: 9,
                                    fontSize: 16,
                                    fontFamily: font.font
                                  }}>{e?.city}-{e?.airport_name} ({e?.airport_code})</Text>
                              </TouchableHighlight>
                            )
                          })
                        }
                      </ScrollView>

                    </View>
                }
              </View>




              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableHighlight onPress={() => setShowTraveller(!showTraveller)} underlayColor='transparent' style={{ marginRight: 10 }}>
                  <View style={[style.frombtn, { paddingVertical:10,paddingHorizontal:10}]}>
                    <Ionicons name='md-person-outline' size={22} color={COLORS.textBlue} />
                    <View style={{ paddingLeft: 15 }}>
                      <Text style={style.title}>TRAVELLERS</Text>
                      <Text style={style.CommonText}>{adult} Adult,{child} Child,{'\n'} {infant} Infant</Text>
                    </View>
                  </View>
                </TouchableHighlight>


                <View style={[style.frombtn, { paddingVertical:7,paddingHorizontal:7}]}>
                  <ChairIcon height={25} width={25} />
                  <View style={{ paddingLeft: 15,flexDirection:'column', }}>
                    <Text style={style.title}>CLASS</Text>
                    <Dropdown
                      data={classList}
                      labelField="value"
                      valueField="value"
                      value={classType}
                      showsVerticalScrollIndicator={true}
                      name="class"
                      onChange={(item) => {
                        setClassType(item.value)
                      }}
                      selectedTextProps={{
                        style:{ color: COLORS.colorText,
                           fontFamily: font.mediam, fontWeight: 'bold',
                            fontSize: height * 0.019 }
                        // style: style.CommonText
                      }}
                      style={{ paddingRight: 15, paddingLeft: 10 }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableHighlight onPress={() => setFromPicker(!fromPicker)} underlayColor='transparent'>
                  <View style={[style.frombtn, { paddingVertical:10,paddingHorizontal:10}]}>
                    <CalendarIcon height={22} width={22} />
                    <View style={{ paddingLeft: 15 }}>
                      <Text style={style.title}>DEPARTURE ON</Text>
                      <Text style={style.CommonText}>{moment(fromDate).format('DD/MM/YYYY')}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => (roundTrip === true) ? setToPicker(!toPicker) : null} underlayColor='transparent' style={{ opacity: (roundTrip === true) ? 1 : 0.6 }}>
                  <View style={[style.frombtn, { paddingVertical:10,paddingHorizontal:10}]}>
                    <CalendarIcon height={22} width={22} />
                    <View style={{ paddingLeft: 15 }}>
                      <Text style={style.title}>RETURN ON</Text>
                      <Text style={style.CommonText}>{moment(ToDate).format('DD/MM/YYYY')}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>



              <View >
                <TouchableHighlight style={style.searchBtn} underlayColor={'transparent'}
                  onPress={() => {
                    if (selectedFromVal?.code === undefined || selectedFromVal?.code === '' || selectedFromVal?.code == null && selectedToVal?.code === undefined || selectedToVal?.code === '' || selectedToVal?.code == null) {
                      dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Select a Place for search' } })
                    } else if (adult === 0 && child === 0 && infant === 0) {
                      dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: 'Select atleast one traveller' } })
                    } else {
                      FlightSearch()
                    }

                  }}>
                  <Text style={style.searchText}>SEARCH FLIGHT</Text>
                </TouchableHighlight>
              </View>

            </View>
          </ImageBackground>
        </View>

        {/* select departure date */}
        <DatePicker
          modal
          open={fromPicker}
          date={fromDate}
          mode="date"
          minimumDate={new Date()}
          onConfirm={(date) => {
            setFromPicker(!fromPicker)
            setFromDate(fromDate = date)
          }}
          onCancel={() => {
            setFromPicker(!fromPicker)
          }}
        />

        {/* select return date */}
        <DatePicker
          modal
          open={toPicker}
          date={fromDate}
          mode="date"
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
  MainContainer: { height: height, width: width, backgroundColor: 'white' },
  btn: { flexDirection: 'row', justifyContent: 'space-evenly' },
  btnView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 30,
    width: width * 0.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0,
    borderColor:'#0050A629',
    borderWidth:1
  },
  mapbg: { height: height * 0.7, width: width, paddingTop: 20 },
  onebtn: { fontFamily: font.fontSemi, paddingLeft: 10, fontSize: height * 0.015 },
  frombtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#0050A629',
    justifyContent:'center',
    // shadowColor: '#0050A629',
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 1,
    marginTop: 20,
    paddingVertical: 0,

  },
  searchText: { color: 'white', fontFamily: font.mediam, paddingVertical: 10, },
  searchBtn: {
    alignItems: 'center',
    backgroundColor: COLORS.textBlue,
    marginHorizontal: 40,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 30
  },
  title: { color: COLORS.textBlue, fontFamily: font.fontSemi, opacity: 0.7,fontSize:height*0.0165 },
  dropDown: { flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between', marginBottom: 15 },
  doneBtn: { alignItems: 'center', marginTop: 10, backgroundColor: COLORS.textBlue, borderRadius: 20, width: width * 0.8 },
  doneText: {
    fontFamily: font.fontSemi, color: 'white',
    paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10
  },
  mainModal: {
    width: '100%', borderRadius: 10, backgroundColor: 'white', flexDirection: 'column',
    alignSelf: 'center', paddingBottom: 20, paddingTop: 15
  },
  subModal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 20 },
  modalTitle: { fontFamily: font.fontBold, color: COLORS.colorText, fontSize: height * 0.025 },
  modalCancel: { alignSelf: 'flex-end', paddingRight: 15, paddingBottom: 10 },
  dropStyle: { backgroundColor: '#EDF2F7', paddingVertical: 5, paddingLeft: 30, paddingRight: 10, borderRadius: 5, },
  dropIcon: { fontSize: 18, color: COLORS.colorTheme, marginLeft: 20 },
  CommonText: { color: COLORS.colorText, fontFamily: font.mediam, fontWeight: 'bold', fontSize: height * 0.019 }
})