/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { View, Text, Dimensions, TouchableHighlight, Modal, StyleSheet, ScrollView } from 'react-native'
// import style from '../../common/commonStyle'
import SearchableDropdown from 'react-native-searchable-dropdown';
import DatePicker from 'react-native-date-picker'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import color from '../../../constants/color';
import font from '../../../constants/font';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import moment from 'moment';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelSearch = ({ navigation }) => {
  const [serverData, setServerData] = useState([]);
  const [ciDate, setCidate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [coDate, setCodate] = useState(new Date())
  const [openCo, setOpenCo] = useState(false)
  var [showGuestModal, setShowGuestModal] = useState(false);
  const [selectDestination, setSelectDestination] = useState(false)

  useEffect(() => {
    fetch('https://harvalnigeria.com/server/api/getHotelCitieSearch')
      .then((response) => response.json())
      .then((json) => {
        console.log('json',JSON.stringify(json))
        setServerData(JSON.stringify(json));
      })
      .catch((error) => {
        console.log('errrrrror',error);
      });
  }, []);

console.log('serverData',serverData)
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
                  <Text style={style.inputFieldText}>Sydney, Australia</Text>
                  :
                  <SearchableDropdown
                    onTextChange={(text) => console.log('text',text)}
                    // Change listner on the searchable input
                    onItemSelect={(item) => console.log('item',item)}
                    // Called after the selection from the dropdown
                    containerStyle={{ padding: 5 }}
                    // Suggestion container style
                    textInputStyle={{
                      // Inserted text style
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      backgroundColor: '#FAF7F6',
                    }}
                    itemStyle={{
                      // Single dropdown item style
                      padding: 10,
                      marginTop: 2,
                      backgroundColor: '#FAF9F8',
                      borderColor: '#bbb',
                      borderWidth: 1,
                    }}
                    itemTextStyle={{
                      // Text style of a single dropdown item
                      color: '#222',
                    }}
                    itemsContainerStyle={{
                      // Items container style you can pass maxHeight
                      // To restrict the items dropdown hieght
                      maxHeight: '50%',
                    }}
                    items={serverData}
                    // Mapping of item array
                    defaultIndex={2}
                    // Default selected item index
                    placeholder="placeholder"
                    // Place holder for the search input
                    resetValue={false}
                    // Reset textInput Value with true and false state
                    underlineColorAndroid="transparent"
                  // To remove the underline from the android input
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

        <View>
          <View>
            <TouchableHighlight onPress={() => setShowGuestModal(false)}>
              <Text>Close</Text>
            </TouchableHighlight>
            <View><Text>Rooms & Guests</Text></View>
          </View>
          <Text>Rooms & Guests</Text>
        </View>

      </Modal>
    </View>
  )
}

const style = StyleSheet.create({
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