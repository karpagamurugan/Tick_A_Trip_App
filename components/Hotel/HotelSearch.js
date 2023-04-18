/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, TouchableHighlight, Modal, StyleSheet, ScrollView, TextInput, TouchableOpacity, PermissionsAndroid, Keyboard } from 'react-native'
import DatePicker from 'react-native-date-picker'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import color from '../constants/color';
import font from '../constants/font';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import moment from 'moment';
import { API_URL } from '../constants/constApi'
import HotelSelectRoomGuest from './HotelSelectRoomGuest'
import { useDispatch, useSelector } from 'react-redux'
import hotelActions from '../../redux/Hotel/actions'
import commonAction from '../../redux/common/actions'
import AntIcon from 'react-native-vector-icons/AntDesign';


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
  const { Searchbyname } = useSelector((state) => state.HotelReducer)



  const [selected, setSelected] = useState("");
  const [ciDate, setCidate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [coDate, setCodate] = useState(new Date())
  const [openCo, setOpenCo] = useState(false)
  var [showGuestModal, setShowGuestModal] = useState(false);
  const [selectDestination, setSelectDestination] = useState(false)
  // const [destination, setDestination] = useState({ city: 'coimbatore', country: 'india' })
  const [selectAddRoom, setSelectAddRoom] = useState([])
  const [adultCount, setAdultCount] = useState(2)
  const [childCount, setChildCount] = useState(0)
  const [currentLongitude, setCurrentLongitude] = useState('...');
  const [currentLatitude, setCurrentLatitude] = useState('...');
  const [locationStatus, setLocationStatus] = useState('');
  var [desination, setDesination] = useState({ city: '', country: '' }) //select from Place
  var [noRecord, setNoRecord] = useState({ des: true })

  // const CurrentLocation = () => {
  //   Geocoder.init("AIzaSyAa2VY2pLrqe2F1_wD-UqlnxNp50Be53Xo");

  // }
  // useEffect(()=>{
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       const currentLongitude =
  //         JSON.stringify(position.coords.longitude);
  //       const currentLatitude =
  //         JSON.stringify(position.coords.latitude);
  //         apiReverseLocation(currentLatitude,currentLongitude)

  //     }, (error) => alert(error.message), {
  //     enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
  //   }
  //   );
  // },[])

  //   const apiReverseLocation = (lat, lon) => {
  //     const key = 'AIzaSyAXMAB9YA1Uol4BR1aWZ1r1KoCw5W7AzbE';
  //     const api = `https://us1.locationiq.com/v1/reverse.php?key=${key}&lat=${lat}&lon=${lon}&format=json`;
  //     const request = axios.get(api);
  //     request
  //       .then(res => {
  //         console.log(res,'res....')

  //       })
  //       .catch(err => {
  //         console.log(err)

  //       });
  //   };


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
  //         } else {
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
    AddRoom()
  }, [])
  const AddRoom = () => {
    let temp = []
    let tempGuest = selectAddRoom ? selectAddRoom : []
    temp = [...tempGuest, {
      room_no: tempGuest.length + 1,
      adult: 2,
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
    dispatch({
      type: hotelActions.SET_ROOM_GUEST_PLACE,
      payload: {
        room: selectAddRoom?.length + ' Rooms',
        Guest: adultCount || childCount ? adultCount + childCount + ' Guests' : 0 + ' Guests',
        Place: desination?.city,
        depatureDate: ciDate,
        arrivalDate: coDate,
        RoomList: selectAddRoom
      }
    })

    dispatch({ type: commonAction.HOTEL_LOADER, payload: true })
    dispatch({
      type: hotelActions.GET_HOTEL_SEARCH, payload: {
        checkin: moment(ciDate).format('YYYY-MM-DD'),
        checkout: moment(coDate).format('YYYY-MM-DD'),
        city_name: desination.city,
        country_name: desination.country,
        // city_name: 'Delhi',
        // country_name: 'United States of America',
        requiredCurrency: 'INR',
        occupancy: selectAddRoom,
      },
      navigation: navigation,
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


  const handleSelection = (e) => {
    Keyboard.dismiss()
    dispatch({
      type: hotelActions.SET_SELECT_NAME,
      payload: []
    })
    setDesination(desination = { city: e.city_name, country: e.country_name });
    setNoRecord(noRecord = { des: false })

  }


  return (
    <View style={style.hotelSearch}>
      <View style={style.hotelSearchTop}>
        <View>
          <View style={{ marginBottom: 20 }}>
            <View style={style.hotelSearchFieldGroup}>
              <View style={style.hotelSearchFieldGroupIcon}>
                <Ionicons style={style.fieldIcon} name='location' />
              </View>
              <View style={style.hotelSearchFieldGroupInput}>
                <Text style={style.Searchlabel}>DESTINATION OR HOTEL NAME</Text>

                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // height: 35,
                      width: '100%',
                      alignItems: 'center',
                    }}
                  >

                    <TextInput
                      keyboardType={'default'}
                      placeholder={'Select ...'}
                      placeholderTextColor="gray"
                      numberOfLines={1}
                      value={desination?.city}
                      onChangeText={(e) => {
                        if (e === '') {
                          setNoRecord(noRecord = { des: true })
                        }
                        if (e?.length >= 3) {
                          dispatch({
                            type: hotelActions.GET_SELECT_NAME,
                            payload: {
                              name: e,
                            }
                          })

                          setDesination(desination = { city: e })
                        } else {
                          setDesination(desination = { city: e })
                          dispatch({
                            type: hotelActions.SET_SELECT_NAME,
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
                      desination?.name !== "" ?
                        <TouchableHighlight
                          underlayColor={'transparent'}
                          onPress={() => {
                            setDesination(desination = { city: '' })
                            dispatch({
                              type: hotelActions.SET_SELECT_NAME,
                              payload: []
                            })
                            setNoRecord(noRecord = { des: true })

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

            </View>
            {
              (Searchbyname === undefined && desination?.city !== '' && noRecord?.des !== false) ?
                <View style={{
                  backgroundColor: 'white',
                  width: '100%',
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
                      Searchbyname?.filter((item) => item?.city_name !== desination?.city)?.map((e, i) => {
                        return (
                          <TouchableHighlight
                            underlayColor={"transparent"}
                            onPress={() => {
                              handleSelection(e)
                            }}
                            key={i}>
                            {(e?.hotel_name == undefined) ?
                              <Text
                                style={{
                                  color: 'black',
                                  padding: 9,
                                  fontSize: 16,
                                  fontFamily: font.font
                                }}>{e?.city_name} , {e?.country_name} (City)</Text>
                              :
                              <Text
                                style={{
                                  color: 'black',
                                  padding: 9,
                                  fontSize: 16,
                                  fontFamily: font.font
                                }}>{e?.hotel_name} , {e?.city_name} , {e?.country_name} (Hotel)</Text>}
                          </TouchableHighlight>
                        )
                      })
                    }
                  </ScrollView>

                </View>
            }
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
                      <Text style={{color:'grey',fontSize:height*0.02}}>{selectAddRoom?.length} Rooms,{adultCount || childCount ? adultCount + childCount : 0} Guests</Text>
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
          {/* <Text style={style.boldText}>
            {locationStatus}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
            }}>
            Longitude: {currentLongitude}
          </Text> */}
        </View>
      </View>

      <Modal
        visible={showGuestModal}
        transparent={true}
        animationType='slide'
      >
        <View style={[style.GuestModel]}>
          <ScrollView>
          <TouchableHighlight style={style.closeGuestModel} onPress={() => setShowGuestModal(false)}>
            <Ionicons style={{ color: '#2B64FF', fontSize: 20, }} name='close' />
          </TouchableHighlight>
          <View style={style.GuestModelInner}>
            <View style={[style.GuestsRooms]}>
              <View style={style.GuestModelInnerHead}>
                <View><Text style={{ color: '#000', fontFamily: font.fontBold, fontSize: 18 }}>Rooms & Guests</Text></View>
              </View>
              <TouchableHighlight underlayColor='transparent' onPress={() => AddRoom()}>
                <Text style={{ color: '#1B5CB7', fontFamily: font.fontBold, fontSize: 17 }}>+ Add Room</Text>
              </TouchableHighlight>
            </View>
            <View>
              <View>
                {selectAddRoom.map((val, index) => (

                  <View key={index} style={[style.roomColumn]}>
                    <View style={[style.deleteGrid]}>
                      <Text style={style.roomNoTxt}>Room No : {index + 1}</Text>
                      <TouchableHighlight underlayColor='transparent' onPress={() => OnRemoveRoom(val, index)}>
                        <Text style={{ color: 'red', }}> <MaterialCommunityIcons name='delete' size={30} /></Text>
                      </TouchableHighlight>
                    </View>
                    <View style={style.selectGuestColumn}>
                        <HotelSelectRoomGuest
                          // adult={adultCount}
                          // child={childCount}
                          row={val}
                          index1={index}
                          room_no={index + 1}
                          defAdultVal={adultCount}
                          defChildVal={childCount}
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
                    </View>
                  </View>
                ))}
              </View>
              <View style={style.GuestAddBtns}>
                <TouchableHighlight style={style.GuestSubmitBtn} underlayColor='transparent' onPress={() => setShowGuestModal(false)}>
                  <Text style={{ color: '#003AA8', fontFamily: font.mediam }}>Done</Text>
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
    marginRight: 20,
    backgroundColor: '#E9F3FF',
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 100,
    marginBottom: 5,
  },
  GuestSubmitBtn: {
    borderColor: '#003AA8',
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 3,

  },
  selectGuestColumn: {
    paddingHorizontal: 5,
  },
  roomNoTxt: {
    paddingVertical: 2,
    fontFamily: font.fontBold,
    color: color.colorText,
    fontSize: 16
  },
  roomColumn: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 15
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
    backgroundColor: '#E9F3FF',
    marginHorizontal: 10,
    padding: 20,
    borderRadius: 20
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
    paddingHorizontal: 10,
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
    // marginBottom: 20,
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
  hotelSearch: { paddingHorizontal: 20, backgroundColor: '#fff', },

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
  deleteGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#003AA8',
  },
  GuestsRooms: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5
  }

})
export default HotelSearch