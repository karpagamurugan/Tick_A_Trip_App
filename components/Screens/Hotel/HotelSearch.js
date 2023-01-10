/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, TouchableHighlight, Modal, StyleSheet, ScrollView } from 'react-native'
// import style from '../../common/commonStyle'
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-date-picker'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import color from '../../../constants/color';
import font from '../../../constants/font';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import moment from 'moment';
import axios from 'axios'
import { API_URL } from '../../../constants/constApi'
import HotelSelectRoomGuest from './HotelSelectRoomGuest'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const data = [
  { key: '1', value: 'Mobiles', disabled: true },
  { key: '2', value: 'Appliances' },
  { key: '3', value: 'Cameras' },
  { key: '4', value: 'Computers', disabled: true },
  { key: '5', value: 'Vegetables' },
  { key: '6', value: 'Diary Products' },
  { key: '7', value: 'Drinks' },
]
const HotelSearch = ({ navigation }) => {
  const [selected, setSelected] = useState("");
  const [ciDate, setCidate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [coDate, setCodate] = useState(new Date())
  const [openCo, setOpenCo] = useState(false)
  var [showGuestModal, setShowGuestModal] = useState(false);
  const [selectDestination, setSelectDestination] = useState(false)
  const [destination, setDestination] = useState('')
  const [selectAddRoom, setSelectAddRoom] = useState([])


  const AddRoom = () => {
    let temp = []
    let tempGuest = selectAddRoom ? selectAddRoom : []
    temp = [...tempGuest, {
      room_no: tempGuest.length + 1,
      adult: 0,
      child: 0,
      childAge: []
    }]
    setSelectAddRoom(temp)
  }
  const OnRemoveRoom = (val, index) => {
    setSelectAddRoom(selectAddRoom.filter((e, inx) => (
      index !== inx
    )))
  }

  return (
    <View style={style.hotelSearch}>
      <ScrollView style={style.hotelSearchTop}>
        <View>
          <View style={style.hotelSearchFieldGroup}>
            <View style={style.hotelSearchFieldGroupIcon}>
              <Ionicons style={style.fieldIcon} name='location' />
            </View>
            <View style={style.hotelSearchFieldGroupInput}>
              <Text style={style.Searchlabel}>DESTINATION OR HOTEL NAME</Text>
              <TouchableHighlight style={style.inputField} onPress={() => setSelectDestination(true)} underlayColor='transparent'>
                {selectDestination !== true ?
                  <Text style={style.inputFieldText}>{destination ? destination : 'Search your destination'}</Text>
                  :
                  <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                  />
                }
              </TouchableHighlight>
            </View>
          </View>

          <View>
            <View style={style.grid}>
              <View >
                <View style={style.hotelSearchFieldGroupHalf}>
                  <View style={style.hotelSearchFieldGroupIcon}>
                    <MaterialCommunityIcons style={style.fieldIcon} name='calendar-arrow-right' />
                  </View>
                  <View>
                    <Text style={style.Searchlabel}>CHECK IN</Text>
                    <TouchableHighlight style={style.inputField} onPress={() => setOpen(true)} underlayColor='transparent'>
                      <Text style={style.inputFieldText}>{moment(ciDate).format('MMM Do YYYY')}</Text>
                    </TouchableHighlight>
                    <DatePicker
                      modal
                      open={open}
                      date={ciDate}
                      mode="date"
                      onConfirm={(date) => {
                        setOpen(false)
                        setCidate(date)
                      }}
                      onCancel={() => {
                        setOpen(false)
                      }}
                    />
                  </View>
                </View>
              </View>
              <View>
                <View style={style.hotelSearchFieldGroupHalf}>
                  <View style={style.hotelSearchFieldGroupIcon}>
                    <MaterialCommunityIcons style={style.fieldIcon} name='calendar-arrow-left' />
                  </View>
                  <View style={style.hotelSearchFieldGroupInput}>
                    <Text style={style.Searchlabel}>CHECK OUT</Text>
                    <TouchableHighlight style={style.inputField} onPress={() => setOpenCo(true)} underlayColor='transparent'>
                      <Text style={style.inputFieldText}>{moment(coDate).format('MMM Do YYYY')}</Text>
                    </TouchableHighlight>
                    <DatePicker
                      modal
                      open={openCo}
                      mode="date"
                      date={coDate}
                      onConfirm={(date) => {
                        setOpenCo(false)
                        setCodate(date)
                      }}
                      onCancel={() => {
                        setOpenCo(false)
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={style.hotelSearchFieldGroup}>
            <View style={style.hotelSearchFieldGroupIcon}>
              <Fontisto style={style.fieldIcon} name='persons' />
            </View>
            <View style={style.hotelSearchFieldGroupInput}>
              <Text style={style.Searchlabel}>GUESTS</Text>
              <TouchableHighlight style={style.inputField} onPress={() => setShowGuestModal(!showGuestModal)} underlayColor='transparent'>
                <Text style={style.inputFieldText}>Select Guest</Text>
              </TouchableHighlight>
            </View>
          </View>

          <View>
            <TouchableHighlight underlayColor='transparent' onPress={() => navigation.navigate('HotelList')}>
              <View style={style.iconBoxBtn}>
                <EvilIcons style={style.fieldIconBtn} name='search' />
                <Text style={style.searchText}>Search</Text>
              </View>
            </TouchableHighlight>
          </View>

        </View>
      </ScrollView>

      <Modal
        visible={showGuestModal}
        transparent={true}
        animationType='slide'
      >
        <View style={style.GuestModel}>
          <ScrollView>
            <TouchableHighlight style={style.closeGuestModel} onPress={() => setShowGuestModal(false)}>
              <Ionicons style={{ color: '#fff', fontSize: 20, }} name='close' />
            </TouchableHighlight>
            <View style={style.GuestModelInner}>
              <View style={style.GuestModelInnerHead}>
                <View><Text style={{ color: '#fff', fontFamily: font.mediam, textAlign: 'center' }}>Rooms & Guests</Text></View>
              </View>

              <View>
                <View>
                  {selectAddRoom.map((val, index) => (
                    <View key={index} style={style.roomColumn}>
                      <Text style={style.roomNoTxt}>Room No : {index + 1}</Text>
                      <View style={style.selectGuestColumn}>
                        <HotelSelectRoomGuest
                          row={val}
                          index1={index}
                          room_no={index + 1}
                          changeAddRoom={(el) => setSelectAddRoom(el)}
                          selectAddRoom={selectAddRoom}
                          removeSelectChild={(e, room_no) => {
                            e.preventDefault()
                            let temp = [...selectAddRoom]
                            temp[room_no - 1].child = 0
                            temp[room_no - 1].childAge = []
                            setSelectAddRoom([...temp])
                          }}
                        />
                        <TouchableHighlight underlayColor='transparent' onPress={() => OnRemoveRoom(val, index)}>
                          <Text style={{ color: 'red' }}>Remove</Text>
                        </TouchableHighlight>
                      </View>
                    </View>
                  ))}
                </View>
                <View style={style.GuestAddBtns}>
                  <TouchableHighlight style={style.GuestSubmitBtn} underlayColor='transparent' onPress={() => AddRoom()}>
                    <Text style={{ color: '#fff', fontFamily: font.mediam }}>Add Room</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={style.GuestSubmitBtn} underlayColor='transparent' >
                    <Text style={{ color: '#fff', fontFamily: font.mediam }}>Done</Text>
                  </TouchableHighlight>
                </View>

              </View>

            </View>
          </ScrollView>
        </View>

      </Modal>
    </View>
  )
}

const style = StyleSheet.create({
  closeGuestModel: {
    alignSelf: 'flex-end',
    marginRight: 30,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 100,
    marginBottom: 5,
  },
  GuestSubmitBtn: {
    borderColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  selectGuestColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  roomNoTxt: {
    backgroundColor: '#f6c220',
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 2,
    fontFamily: font.fontSemi,
    color: color.colorText,
  },
  roomColumn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  GuestAddBtns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  GuestModelInnerHead: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  GuestModelInner: {
    backgroundColor: '#004d83',
    marginHorizontal: 30,
    padding: 20,
  },
  GuestModel: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000052',
    paddingVertical: 30,
  },
  hotelSearchTop: {
    position: 'relative',
    marginTop: -60,
  },
  searchText: {
    color: '#fff',
    fontFamily: font.mediam,
  },
  iconBoxBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0050A6',
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 100,
    marginTop: 10,
  },
  fieldIconBtn: {
    color: '#fff',
    fontFamily: font.block,
    fontSize: 22,
    marginRight: 5,
  },
  inputFieldText: {
    color: '#000000',
    fontFamily: font.font,
    letterSpacing: 0.8,
    fontSize: 15,
  },
  hotelSearchFieldGroupHalf: {
    flexDirection: 'row',
    // justifyContent:'center',
    backgroundColor: color.AppbarColor,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginHorizontal: 5,
    paddingHorizontal: 20,
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Searchlabel: {
    fontFamily: font.fontSemi,
    color: '#5c9adb',
    letterSpacing: 1,
    fontSize: 11,
  },
  hotelSearchFieldGroup: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: color.AppbarColor,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 0,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  hotelSearch: { paddingHorizontal: 20, backgroundColor: '#fff', paddingVertical: 20, },

  fieldIcon: {
    fontSize: 25,
    color: '#0050A6',
    fontFamily: font.fontBold,
    marginRight: 5,
  },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
export default HotelSearch