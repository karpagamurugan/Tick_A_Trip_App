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
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dropdown } from 'react-native-element-dropdown'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AutoCompleteTextField from '../../common/AutoComplete';
import { useDispatch, useSelector } from 'react-redux';



let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;


const Flight = ({ navigation }) => {

  const dispatch = useDispatch()
  const { Airport_Name } = useSelector((state) => state.FlightSearchReducer)

  var [oneTrip, setOneTrip] = useState(true);
  var [roundTrip, setRoundTrip] = useState(false);

  var [showTraveller, setShowTraveller] = useState(false) //show traveller modal
  var [fromDate, setFromDate] = useState(new Date()); //depart date
  var [ToDate, setTodate] = useState(new Date()); //return date
  var [fromPicker, setFromPicker] = useState(false) //show depart date picker
  var [toPicker, setToPicker] = useState(false) //show retuen date picker
  var [adult, setAdult] = useState(0) //set adult count
  var [child, setchild] = useState(0) //set child count
  var [infant, setInfant] = useState(0) //set infant count
  var [classType, setClassType] = useState('Economy');
  var [selctedFromPlace,setSelectedFromPlace]=useState('Select');
  var [selctedToPlace,setSelectedToPlace]=useState('Select');



  let ChildAndInfant = [{ value: '0' }, { value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }] //child and infant count
  let AdultCount = [{ value: '0' }, { value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }, { value: '5' }, { value: '6' }, { value: '7' }, { value: '8' }, { value: '9' }] //adult count

  let classList = [{ value: 'Business' }, { value: 'Economy' }];

console.log('Airport_Name',Airport_Name)

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

              <View style={style.doneBtn}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => setShowTraveller(!showTraveller)}>
                  <Text style={style.doneText}>DONE</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>

      </Modal>

      <Appbar title={'Search Flight'} />

      <ScrollView>
        <View style={{ height: height, marginBottom: 85 }}>
          <View style={{ height: height * 0.3, backgroundColor: 'white', borderColor: 'red', borderWidth: 1 }}>
            {/* here replace this view flight image */}
          </View>
          <ImageBackground source={require('../../../Assert/Images/map.jpg')} style={style.mapbg}>

            <View style={{ position: 'absolute', alignSelf: 'center', top: -20 }}>
              <View style={style.btn}>
                <TouchableHighlight underlayColor={'transparent'}
                  onPress={() => {
                    console.log('oneTrip',oneTrip)
                    console.log('round trip',roundTrip)

                    if (oneTrip) {
                      setOneTrip(!oneTrip)
                      setRoundTrip(!roundTrip)
                    } else {
                      setOneTrip(!oneTrip)
                      setRoundTrip(!roundTrip)
                    }
                  }}>
                  <View style={[style.btnView, { backgroundColor: oneTrip ? color.textBlue : 'white' }]}>
                    <Octicons name='arrow-right' size={22} color={oneTrip ? 'white' : color.textBlue} />
                    <Text style={[style.onebtn, { color: oneTrip ? 'white' : color.textBlue }]}>ONE WAY</Text>
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
                  <View style={[style.btnView, { backgroundColor: roundTrip ? color.textBlue : 'white' }]}>
                    <Octicons name='arrow-switch' size={22} color={roundTrip ? 'white' : color.textBlue} />
                    <Text style={[style.onebtn, { color: roundTrip ? 'white' : color.textBlue }]}>ROUND TRIP</Text>
                  </View>
                </TouchableHighlight>
              </View>


              <AutoCompleteTextField
                hintText="Select.."
                defaultValue={selctedFromPlace}
                icon={FromIcon}
                placeHolderText="From"
                value={selctedFromPlace}
                type='from'
                data={
                  Airport_Name?.message?.map((e, i) => {
                    return (
                      { display: e?.city, value: e }
                    )
                  })
                }
                onSelected={(e) => {
                  console.log('selected',e)
                  setSelectedFromPlace(selctedFromPlace = e.value)
                }}
              />


              <AutoCompleteTextField
                hintText="Select.."
                defaultValue={selctedToPlace}
                icon={FromIcon}
                placeHolderText="From"
                value={selctedToPlace}
                type='to'
                data={
                  classList.map((e, i) => {
                    return (
                      { display: e.value, value: e }
                    )
                  })
                }
                onSelected={(e) => {
                  setSelectedToPlace(selctedToPlace = e.value)
                }}
              />

              <View style={{ flexDirection: 'row' }}>
                <TouchableHighlight onPress={() => setShowTraveller(!showTraveller)} underlayColor='transparent' style={{ marginRight: 10 }}>
                  <View style={[style.frombtn, { marginLeft: 20 }]}>
                    <Ionicons name='md-person-outline' size={22} color={color.textBlue} />
                    <View style={{ paddingLeft: 15 }}>
                      <Text style={style.title}>TRAVELLERS</Text>
                      <Text style={{ color: color.colorText, fontFamily: font.mediam }}>{adult} Adult,{child} Child,{'\n'} {infant} Infant</Text>
                    </View>
                  </View>
                </TouchableHighlight>


                <View style={[style.frombtn, { marginRight: 20 }]}>
                  <ChairIcon height={25} width={25} />
                  <View style={{ paddingLeft: 15 }}>
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
                        style: {
                          fontSize: 13,
                          fontWeight: '500',
                          fontFamily: font.font,
                        },
                      }}
                      style={{ paddingRight: 15, paddingLeft: 10 }}
                    />
                  </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <TouchableHighlight onPress={() => setFromPicker(!fromPicker)} underlayColor='transparent'>
                  <View style={[style.frombtn, { marginLeft: 20 }]}>
                    <CalendarIcon height={22} width={22} />
                    <View style={{ paddingLeft: 15 }}>
                      <Text style={style.title}>DEPARTURE ON</Text>
                      <Text style={{ color: color.colorText, fontFamily: font.mediam }}>{moment(fromDate).format('DD/MM/YYYY')}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => (roundTrip === true) ? setToPicker(!toPicker) : null} underlayColor='transparent' style={{ opacity: (roundTrip === true) ? 1 : 0.6 }}>
                  <View style={[style.frombtn, { marginRight: 20 }]}>
                    <CalendarIcon height={22} width={22} />
                    <View style={{ paddingLeft: 15 }}>
                      <Text style={style.title}>RETURN ON</Text>
                      <Text style={{ color: color.colorText, fontFamily: font.mediam }}>{moment(ToDate).format('DD/MM/YYYY')}</Text>
                    </View>
                  </View>
                </TouchableHighlight>
              </View>



              <View style={style.searchBtn}>
                <TouchableHighlight underlayColor={'transparent'} onPress={() => navigation.navigate('FlightResult')}>
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
            console.log(fromDate)
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
    paddingVertical: 7,
    borderRadius: 20,
    width: width * 0.35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5
  },
  mapbg: { height: height * 0.7, width: width, paddingTop: 20 },
  onebtn: { fontFamily: font.fontSemi, paddingLeft: 10, fontSize: height * 0.017 },
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
  searchText: { color: 'white', fontFamily: font.mediam, paddingVertical: 10, },
  searchBtn: {
    alignItems: 'center',
    backgroundColor: color.textBlue,
    marginHorizontal: 40,
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 30
  },
  title: { color: color.textBlue, fontFamily: font.fontSemi, opacity: 0.5 },
  dropDown: { flexDirection: 'row', alignItems: 'center', width: '80%', justifyContent: 'space-between', marginBottom: 15 },
  doneBtn: { alignItems: 'center', marginTop: 10, backgroundColor: color.textBlue, borderRadius: 20, width: width * 0.8 },
  doneText: {
    fontFamily: font.fontSemi, color: 'white',
    paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10
  },
  mainModal: {
    width: '100%', borderRadius: 10, backgroundColor: 'white', flexDirection: 'column',
    alignSelf: 'center', paddingBottom: 20, paddingTop: 15
  },
  subModal: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: 20 },
  modalTitle: { fontFamily: font.fontBold, color: color.colorText, fontSize: height * 0.025 },
  modalCancel: { alignSelf: 'flex-end', paddingRight: 15, paddingBottom: 10 },
  dropStyle: { backgroundColor: '#EDF2F7', paddingVertical: 5, paddingLeft: 30, paddingRight: 10, borderRadius: 5, },
  dropIcon: { fontSize: 18, color: color.colorTheme, marginLeft: 20 }
})