/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, TouchableHighlight, Modal, StyleSheet, ScrollView, TextInput, TouchableOpacity, PermissionsAndroid } from 'react-native'
// import style from '../../common/commonStyle'
import { SelectList } from 'react-native-dropdown-select-list'
import DatePicker from 'react-native-date-picker'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import color from '../constants/color';
import font from '../constants/font';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import moment from 'moment';
import axios from 'axios'
import { API_URL } from '../constants/constApi'
import HotelSelectRoomGuest from './HotelSelectRoomGuest'
import { useDispatch } from 'react-redux'
import hotelActions from '../../redux/Hotel/actions'
import commonAction from '../../redux/common/actions'
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

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
  const dispatch = useDispatch()


  const [selected, setSelected] = useState("");
  const [ciDate, setCidate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [coDate, setCodate] = useState(new Date())
  const [openCo, setOpenCo] = useState(false)
  var [showGuestModal, setShowGuestModal] = useState(false);
  const [selectDestination, setSelectDestination] = useState(false)
  const [destination, setDestination] = useState({ city: 'coimbatore', country: 'india' })
  const [selectAddRoom, setSelectAddRoom] = useState([])
  const [adultCount, setAdultCount] = useState('')
  const [childCount, setChildCount] = useState('')
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude ] = useState('...');
  const [ locationStatus, setLocationStatus ] = useState('');


  // const CurrentLocation = () => {
  //   Geocoder.init("AIzaSyAa2VY2pLrqe2F1_wD-UqlnxNp50Be53Xo");

  // }
  // Geolocation.getCurrentPosition(
  //   (position) => {
  //     const currentLongitude =
  //       JSON.stringify(position.coords.longitude);
  //     const currentLatitude =
  //       JSON.stringify(position.coords.latitude);

  //   }, (error) => alert(error.message), {
  //   enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
  // }
  // );
  // // console.log('CurrentLocation', CurrentLocation)


  // useEffect(() => {
  //   const requestLocationPermission = async () => {
  //     if (Platform.OS === 'ios') {
  //       getOneTimeLocation();
  //       subscribeLocationLocation();
  //     } else {
  //       try {
  //         const granted = await PermissionsAndroid.request(
  //           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //           {
  //             title: 'Location Access Required',
  //             message: 'This App needs to Access your location',
  //           },
  //         );
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //           //To Check, If Permission is granted
  //           getOneTimeLocation();
  //           subscribeLocationLocation();
  //           console.log('permission granted')
  //         } else {
  //           console.log('permission not granted')
  //           setLocationStatus('Permission Denied');
  //         }
  //       } catch (err) {
  //         console.warn(err);
  //       }
  //     }
  //   };
  //   requestLocationPermission();
  //   return () => {
  //     Geolocation.clearWatch(watchID);
  //   };
  // }, []);
  // const getOneTimeLocation = () => {
  //   setLocationStatus('Getting Location ...');
  //   Geolocation.getCurrentPosition(
  //     //Will give you the current location
  //     (position) => {
  //       setLocationStatus('You are Here');

  //       //getting the Longitude from the location json
  //       const currentLongitude = 
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude = 
  //         JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);
        
  //       //Setting Longitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 30000,
  //       maximumAge: 1000
  //     },
  //   );
  // };

  // const subscribeLocationLocation = () => {
  //  let watchID = Geolocation.watchPosition(
  //     (position) => {
  //       //Will give you the location on location change
        
  //       setLocationStatus('You are Here');
  //       console.log('position',position);

  //       //getting the Longitude from the location json        
  //       const currentLongitude =
  //         JSON.stringify(position.coords.longitude);

  //       //getting the Latitude from the location json
  //       const currentLatitude = 
  //         JSON.stringify(position.coords.latitude);

  //       //Setting Longitude state
  //       setCurrentLongitude(currentLongitude);

  //       //Setting Latitude state
  //       setCurrentLatitude(currentLatitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       maximumAge: 1000
  //     },
  //   );
  // };

  useEffect(() => {
    var d = new Date();
    d.setDate(d.getDate() + 1)
    setCodate(d)
  }, [])
  const AddRoom = () => {
    let temp = []
    let tempGuest = selectAddRoom ? selectAddRoom : []
    temp = [...tempGuest, {
      room_no: tempGuest.length + 1,
      adult: 0,
      child: 0,
      child_age: []
    }]
    setSelectAddRoom(temp)
  }
  const OnRemoveRoom = (val, index) => {
    setSelectAddRoom(selectAddRoom.filter((e, inx) => (
      index !== inx
    )))
  }
  const OnSearchHotel = () => {
    dispatch({ type: commonAction.HOTEL_LOADER, payload: true })
    dispatch({
      type: hotelActions.GET_HOTEL_SEARCH, payload: {
        checkin: moment(ciDate).format('YYYY-MM-DD'),
        checkout: moment(coDate).format('YYYY-MM-DD'),
        city_name: destination.city,
        country_name: destination.country,
        // city_name: 'Delhi',
        // country_name: 'United States of America',
        requiredCurrency: 'INR',
        occupancy: selectAddRoom,
      },
      navigation: navigation
    })
  }
  useEffect(() => {
    if (selectAddRoom.length !== 0) {
      let tempAdultCount = 0
      for (let i = 0; i < selectAddRoom.length; i++) {
        tempAdultCount += selectAddRoom[i].adult
      }
      setAdultCount(tempAdultCount)
      let tempChildCount = 0
      for (let i = 0; i < selectAddRoom.length; i++) {
        tempChildCount += selectAddRoom[i].child
      }
      setChildCount(tempChildCount)
    }
  }, [selectAddRoom])

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
                  <Text style={style.inputFieldText}>{destination ? destination.city : 'Search your destination'}</Text>
                  :
                  <SelectList
                    setSelected={(val) => setSelected(val)}
                    data={data}
                    save="value"
                  />
                  // <TextInput
                  //   keyboardType={'default'}
                  //   placeholder={'Select...'}
                  //   placeholderTextColor="gray"
                  //   numberOfLines={1}

                  //   name="add_nationality"
                  //   style={{
                  //     color: 'black',
                  //     fontFamily: font.font,
                  //     width: width * 0.9,
                  //     paddingTop: 5,
                  //     paddingBottom: 0,
                  //   }}
                  // />
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
                <View>
                  {selectAddRoom.length === 0 ?
                    <Text style={style.inputFieldText}>Select Guest</Text>
                    :
                    <View>
                      <Text style={style.inputFieldText}>Room / Guests </Text>
                      <Text>{selectAddRoom?.length} Rooms,{adultCount || childCount ? adultCount + childCount : 0} Guests</Text>
                    </View>
                  }
                </View>
              </TouchableHighlight>
            </View>
          </View>

          <View>
            <TouchableHighlight underlayColor='transparent'
              onPress={() => {
                OnSearchHotel()
                // navigation.navigate('HotelList')
              }}>
              <View style={style.iconBoxBtn}>
                <EvilIcons style={style.fieldIconBtn} name='search' />
                <Text style={style.searchText}>Search</Text>
              </View>
            </TouchableHighlight>
          </View>

          {/* <TouchableOpacity onPress={() => CurrentLocation}>
            <Text>GetCurrentLocation</Text>
          </TouchableOpacity> */}
           <Text style={style.boldText}>
            {locationStatus}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text>
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
                            temp[room_no - 1].child_age = []
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
                  <TouchableHighlight style={style.GuestSubmitBtn} underlayColor='transparent' onPress={() => setShowGuestModal(false)}>
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