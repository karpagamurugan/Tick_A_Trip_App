/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native'
import style from '../common/commonStyle'
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import font from '../constants/font';
import color from '../constants/color';

const HotelSelectRoomGuest = (props) => {
    const { row, room_no, changeAddRoom, index1, selectAddRoom, removeSelectChild } = props
    const [listchildAge, setListchildAge] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    
    const AdultQty = [1, 2, 3, 4, 5, 6]
    const ChildQty = [1, 2, 3, 4, 5, 6]
    const data = [
        { value: '1' },
        { value: '2' },
        { value: '3' },
        { value: '4' },
        { value: '5' },
        { value: '6' },
        { value: '7' },
        { value: '8' },
        { value: '9' },
        { value: '10' },
        { value: '11' },
        { value: '12' },
    ];
    const OnSelectAdult = (val) => {
        changeAddRoom(selectAddRoom.map((el) => el.room_no === room_no ? { ...el, adult: val } : { ...el }))
    }

    const OnSelectChild = (val, index) => {
        let temp = []
        let i = 0;
        while (i < val) {
            temp.push(0);
            i++;
        }
        changeAddRoom(selectAddRoom.map((el) => (
            el.room_no === room_no ? {
                ...el,
                child: val,
                child_age: temp
            } : { ...el }
        )))
    }
    const OnChildAge = (item, ind) => {
        let tempdata = [...selectAddRoom]
        let arry = [
            ...(tempdata[index1].child_age),
        ]
        arry[ind] = parseInt(item.value)
        tempdata[index1] = {
            ...tempdata[index1],
            child_age: [...arry]
        }
        changeAddRoom(tempdata)
    }

    return (
        <View>
            <View>
                <Text style={{ color: color.colorBtn, fontFamily: font.mediam }}>Adult</Text>
                <View style={style.AdultQtyList}>
                    {AdultQty.map((val, index) => (
                        <TouchableHighlight key={index} style={style.adultCoutTxt} onPress={() => OnSelectAdult(val, index)}>
                            <Text style={val === row.adult ? style.activeSelectGuest : style.AdultQtyListCount} key={index}>{val}</Text>
                        </TouchableHighlight>
                    ))}
                </View>
            </View>
            <View>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ color: color.colorBtn, fontFamily: font.mediam }}>Child</Text>
                    {row.child !== 0 ?
                        <TouchableHighlight onPress={(val) => removeSelectChild(val, room_no)} underlayColor='transparent'><Text style={{ color: 'red', marginLeft: 20 }}>Remove Child</Text></TouchableHighlight>
                        :
                        null
                    }
                </View>
                <View style={style.AdultQtyList}>
                    {ChildQty.map((val, index) => (
                        <TouchableHighlight key={index} style={style.adultCoutTxt} onPress={() => OnSelectChild(val, index)}>
                            <Text style={val === row.child ? style.activeSelectGuest : style.AdultQtyListCount} key={index}>{val}</Text>
                        </TouchableHighlight>
                    ))}
                </View>
                <View style={style.childAgeList}>
                    {Array(row.child).fill(null).map((val, index) => (
                        <View key={index}>
                            <Dropdown
                                data={data}
                                labelField="value"
                                valueField="value"
                                value={{ value:`${selectAddRoom[index1]?.child_age[index]}` }}
                                showsVerticalScrollIndicator={true}
                                name="child_age"
                                placeholder={`Child ${index + 1} Age`}
                                onChange={(item) => OnChildAge(item, index)}
                                selectedTextProps={{
                                    style: {
                                        fontSize: 13,
                                        fontWeight: '500',
                                        fontFamily: font.font,
                                        letterSpacing: 0.5,
                                        padding: 0,
                                    },
                                }}
                                style={style.dropStyleChildAge}
                                renderRightIcon={() => (
                                    <MaterialIcon
                                        name="chevron-down-circle-outline"
                                        size={25}
                                        style={style.dropIcon}
                                    />)
                                }
                            />
                        </View>
                    ))}
                </View>
            </View>
        </View>
    )
}

export default HotelSelectRoomGuest