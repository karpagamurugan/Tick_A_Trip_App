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

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelSearch = () => {
  const [serverData, setServerData] = useState([]);
  const [ciDate, setCidate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [coDate, setCodate] = useState(new Date())
  const [openCo, setOpenCo] = useState(false)
  // var [showGuestModel, setShowGuestModel] = useState(false)
  var [showGuestModal, setShowGuestModal] = useState(false);


  useEffect(() => {
    fetch('https://abooutreactapis.000webhostapp.com/demosearchables.php')
      .then((response) => response.json())
      .then((responseJson) => {
        setServerData(responseJson.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // const OnselectGest = () => {
  //   setShowGuestModel(showGuestModel = !showGuestModel)
  //   alert('Click')
  // }

  return (
    <View style={style.hotelSearch}>
      <ScrollView>
        <View>
          <View style={style.inputFieldSearch}>
            <Text style={style.Searchlabel}>DESTINATION OR HOTEL NAME</Text>
            <View style={style.iconBox}>
              <Ionicons style={style.fieldIcon} name='md-location-outline' />
              <SearchableDropdown
                onTextChange={(text) => console.log('destination', text)}
                onItemSelect={(item) => alert(JSON.stringify(item))}
                containerStyle={{ padding: 5 }}
                textInputStyle={{
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#FAF7F6',
                  width: width * 0.7,
                  height: 30,
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}
                itemStyle={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  marginTop: 2,
                  backgroundColor: '#ffff',
                  borderColor: '#fff',
                  borderWidth: 0.5,
                }}
                itemTextStyle={{
                  color: color.colorText,
                }}
                itemsContainerStyle={{
                  height: 40,
                }}
                items={serverData}
                defaultIndex={999}
                placeholder="Enter the hotel / Destination"
                resetValue={false}
                underlineColorAndroid="transparent"
              />
            </View>

          </View>
        </View>
        <View style={style.hotelSearchBottomField}>
          <View style={style.hotelSearchField} >
            <Text style={style.Searchlabel}>CHECK IN</Text>
            <View style={style.iconBox}>
              <EvilIcons style={style.fieldIcon} name='search' />
              <TouchableHighlight style={style.inputField} onPress={() => setOpen(true)} underlayColor='transparent'>
                <Text>Check - in</Text>
              </TouchableHighlight>
            </View>

            <DatePicker
              modal
              open={open}
              date={ciDate}
              onConfirm={(date) => {
                setOpen(false)
                setCidate(date)
              }}
              onCancel={() => {
                setOpen(false)
              }}
            />
          </View>
          <View style={style.hotelSearchField} >
            <Text style={style.Searchlabel}>CHECK OUT</Text>
            <View style={style.iconBox}>
              <EvilIcons style={style.fieldIcon} name='search' />
              <TouchableHighlight style={style.inputField} onPress={() => setOpenCo(true)} underlayColor='transparent'>
                <Text>Check - Out</Text>
              </TouchableHighlight>
            </View>

            <DatePicker
              modal
              open={openCo}
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
        <View style={style.hotelSearchFieldDestination}>
          <Text style={style.Searchlabel}>GUESTS</Text>
          <View style={style.iconBox}>
            <EvilIcons style={style.fieldIcon} name='search' />
            <TouchableHighlight style={style.inputField} onPress={() => setShowGuestModal(!showGuestModal)} underlayColor='transparent'>
              <Text>Select Guest</Text>
            </TouchableHighlight>
          </View>
        </View>

        <View>
          <TouchableHighlight>
            <View style={style.iconBoxBtn}>
              <EvilIcons style={style.fieldIcon} name='search' />
              <Text>Search</Text>
            </View>
          </TouchableHighlight>
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
  Searchlabel: {
    fontFamily: font.mediam,
    color: '#0050A6',
    letterSpacing: 0.5,
    fontSize: 12
  },
  hotelSearch: { backgroundColor: '#fff', height: height, marginVertical: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  hotelSearchBottomField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  hotelSearchField: {
    backgroundColor: color.AppbarColor,
    width: '45%',
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
  hotelSearchFieldDestination: {
    backgroundColor: color.AppbarColor,
    width: width * 0.9,
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputFieldSearch: {
    backgroundColor: color.AppbarColor,
    marginBottom: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 15,
    shadowColor: "#000",
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
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