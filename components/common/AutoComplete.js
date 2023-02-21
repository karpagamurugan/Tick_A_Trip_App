/* eslint-disable prettier/prettier */
import React from "react";
import { useState } from "react";
import {
    View, Text, StyleSheet, TextInput, ScrollView,
    TouchableHighlight, Dimensions, Keyboard, ActivityIndicator
} from "react-native";
import AntIcon from 'react-native-vector-icons/AntDesign'
import axois from "axios"
import { useDispatch } from "react-redux";
import font from "../constants/font";
import color from "../constants/color";
import FromIcon from '../../Assert/Images/icon/take-off.svg';
import ToIcon from '../../Assert/Images/icon/take-off-2.svg';
import FlightAction from '../../redux/Flight/actions';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

export default function AutoCompleteTextField(props) {
    const dispatch = useDispatch()

    const { data, hintText, placeHolderText, value, inputType, onSelected, dis , stateId , defaultValue,type } = props
    var [filteredList, setFilteredList] = useState([])
    var [selectedVal, setSelectedVal] = useState( selectedVal = value)
    var [selectedFromVal, setSelectedFromVal] = useState( selectedFromVal = value)
    var [selectedToVal, setSelectedToVal] = useState( selectedToVal = value)

    var [showIndi, setShowIndi] = useState(false)

    const handleSelection = (e) => {
        Keyboard.dismiss()
        if(type === 'from'){
            setSelectedFromVal(selectedFromVal=e.display);
        }else{
            setSelectedToVal(selectedToVal= e.display)
        }
        // setSelectedVal(selectedVal=e.display);
        setFilteredList(filteredList = [])
    }


    return (
        <View style={{ flexDirection: 'column' }}>


<View style={[style.frombtn, { marginHorizontal: 20 ,paddingLeft:10,width:width*0.9}]}>
    {
        type === 'from'? <FromIcon height={22} width={22}/>:<ToIcon height={22} width={22}/>

    }
               
                <View style={{ paddingLeft: 15 }}>
                  <Text style={style.title}>{type === 'from'?'FROM':'TO'}</Text>

                  <View
                style={{
                    flexDirection: 'row',
                    height:35,
                    width:'100%',
                    alignItems:'center',
                }}
            >
               
                <TextInput
                    keyboardType={inputType}
                    placeholder={hintText}
                    placeholderTextColor="gray"
                    numberOfLines={1}
                    value={type === 'from'?selectedFromVal:selectedToVal}
                    onChangeText={(e) => {                     
                            if (e?.length >= 3) {
                                dispatch({
                                    type:FlightAction.SET_FLIGHT_SEARCH_BY_NAME,
                                    payload:{
                                        name:e
                                    }
                                })
                                if(type === 'from'){
                                    setSelectedFromVal(selectedFromVal = e)

                                }else{
                                    setSelectedToVal(selectedToVal = e)
                                }
                                // setSelectedVal(selectedVal = e)
                                setFilteredList( filteredList=data)
                                // setFilteredList(filteredList = data.filter((e) => e.display.toString()
                                //     .toLowerCase().includes(selectedVal.toLowerCase())))
                                // let filterlist = data.map((val)=>val.includes(e.toString()))
                             
                            } else {
                                // setSelectedVal(selectedVal = e)
                                setSelectedToVal(selectedToVal = e)
                                setSelectedFromVal(selectedFromVal = e)
                                setFilteredList(filteredList = [])
                            }
                    }}
                    style={{
                        color: 'black',
                        fontFamily:font.font,
                        width:width*0.6,
                        paddingTop:5,
                        paddingBottom:0,
                        // backgroundColor:'green'
                    }}
                />

                {/* {placeHolderText === "Area" &&
                    showIndi ? <ActivityIndicator size={20} color={'red'} /> : <></>} */}
                {
                    selectedVal !== "" ?
                        <TouchableHighlight
                            underlayColor={'transparent'}
                            onPress={() => {
                                setSelectedVal(selectedVal = "")
                                setFilteredList(filteredList = [])
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
                filteredList?.length !== 0 ?
                    <View style={{
                        backgroundColor: 'white',
                        width: '90%',
                        alignSelf: 'center',
                        position: 'relative',
                        zIndex: 2,
                        borderRadius: 10,
                        elevation: 10
                    }}>

                        <ScrollView 
                        style={{height:'auto'}}
                            showsVerticalScrollIndicator={true}
                            nestedScrollEnabled
                            keyboardShouldPersistTaps='handled'
                        >
                            {
                                filteredList?.map((e, i) => {
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
                                                }}>{e?.value?.city}-{e?.value?.airport_name} ({e?.value?.airport_code})</Text>
                                        </TouchableHighlight>
                                    )
                                })
                            }
                        </ScrollView>

                    </View> : null
            }
        </View>
    )

}

const style = StyleSheet.create({
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
      title:{
        color: color.textBlue,
         fontFamily: font.fontSemi,
         opacity:0.4
       }
})