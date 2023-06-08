/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image, FlatList,Dimensions } from 'react-native'
import style from '../common/commonStyle'
import { Dropdown } from 'react-native-element-dropdown';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FeatherIcon from 'react-native-vector-icons/Feather'
import FONTS from '../constants/font';
import COLORS from '../constants/color';
import AdultIcon from '../../Assert/Icons/adult.png';
import ChildIcon from '../../Assert/Icons/child.png';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const HotelSelectRoomGuest = (props) => {
    const { row, room_no, changeAddRoom, index1, selectAddRoom, removeSelectChild, defAdultVal, defChildVal } = props
    const [listchildAge, setListchildAge] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    var [adultCount, setAdultCount] = useState(2);
    var [childCount, setChildCount] = useState(0);

    let AdultIncrease = () => {
        if (adultCount >= 6) {
            setAdultCount(adultCount = adultCount);
        } else {
            setAdultCount(adultCount = adultCount + 1)
        }
        changeAddRoom(selectAddRoom.map((el) => el.room_no === room_no ? { ...el, adult: adultCount } : { ...el }))
    }

    let AdultDecrease = () => {
        if (adultCount <= 1) {
            setAdultCount(adultCount = adultCount);
        } else {
            setAdultCount(adultCount = adultCount - 1)
        }
        changeAddRoom(selectAddRoom.map((el) => el.room_no === room_no ? { ...el, adult: adultCount } : { ...el }))
    }

    let ChildIncrease = () => {
        if (childCount >= 4) {
            setChildCount(childCount = childCount);
        } else {
            setChildCount(childCount = childCount + 1)
        }
        OnSelectChild(childCount)
    }

    let ChildDecrease = () => {
        if (childCount <= 0) {
            setChildCount(childCount = childCount);
        } else {
            setChildCount(childCount = childCount - 1)
        }
        OnSelectChild(childCount)

    }



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
                child_age:temp
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
            child_age: [...arry,arry[ind]]
        }
        changeAddRoom(tempdata)
    }
    useEffect(() => {
        setAdultCount(selectAddRoom[index1].adult)
        setChildCount(selectAddRoom[index1].child)
    }, [selectAddRoom])

    return (
        <View>
            <View style={{ paddingTop: 30 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    <View style={{ flexDirection: 'row',alignItems:'center' }}>
                        <Image source={AdultIcon} style={{ width: 32, height: 32 }} />
                        <Text style={{ paddingLeft: 10, fontFamily: FONTS.mediam, fontSize:height*0.023 , color: '#000', textTransform: 'uppercase' }}>Adults</Text>
                    </View>
                    <View style={style.AdultQtyList}>
                        
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableHighlight style={[styles.CountButton]} onPress={() => AdultDecrease()} >
                            <Text style={{ color: '#fff' }}><FeatherIcon name='minus' size={20} /></Text>
                        </TouchableHighlight>
                        <Text style={[styles.countNumber]}>{adultCount}</Text>
                        <TouchableHighlight onPress={() => AdultIncrease()} style={[styles.CountButton, { backgroundColor: '#003AA8' }]} >
                            <Text style={{ color: '#fff' }}><FeatherIcon name='plus' size={20} /></Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
            <View style={{ paddingTop: 20, paddingBottom: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row',alignItems:'center' }}>
                        <Image source={ChildIcon} style={{ width: 38, height: 32 }} />
                        <View style={{ paddingLeft: 5 }}>
                            <Text style={{ fontFamily: FONTS.mediam, fontSize:height*0.023 , color: '#000', textTransform: 'uppercase' }}>CHILDREN</Text>
                            <Text style={{ marginTop: -10, fontFamily: FONTS.mediam }}>{'(Age: 0-12)'}</Text>
                        </View>
                    </View>

                 

                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableHighlight style={[styles.CountButton]} onPress={() => ChildDecrease()} >
                            <Text style={{ color: '#fff' }}><FeatherIcon name='minus' size={20} /></Text>
                        </TouchableHighlight>

                        <Text style={[styles.countNumber]}>{childCount}</Text>

                        <TouchableHighlight onPress={() => ChildIncrease()} style={[styles.CountButton, { backgroundColor: '#003AA8' }]} >
                            <Text style={{ color: '#fff' }}><FeatherIcon name='plus' size={20} /></Text>
                        </TouchableHighlight>
                    </View>

                </View>
            </View>
            <View>
                {Array(row.child).fill(null).map((val, index) => (
                    <View key={index} style={{
                        paddingHorizontal: 10,
                        paddingBottom: 10,
                        alignItems:'center',
                        justifyContent:'center'
                    }}>

                        <Dropdown
                            data={data}
                            labelField="value"
                            valueField="value"
                            value={{ value: `${selectAddRoom[index1]?.child_age[index]}` }}
                            showsVerticalScrollIndicator={true}
                            name="child_age"
                            placeholder={`Child ${index + 1} Age`}
                            onChange={(item) => OnChildAge(item, index)}
                            selectedTextProps={{
                                style: {
                                    fontSize: height*0.02,
                                    fontWeight: '500',
                                    fontFamily: FONTS.font,
                                    letterSpacing: 0.5,
                                    padding: 0,
                                    color: '#003AA8',
                                },
                            }}
                            style={style.dropStyleChildAge}
                            renderRightIcon={() => (
                                <MaterialIcon
                                    name="chevron-down-circle-outline"
                                    size={22}
                                    style={{ color: '#003AA8', paddingLeft: 5 }}
                                />)
                            }
                        />
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    CountButton: {
        backgroundColor: '#00000033',
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
    },
    countNumber: {
        paddingHorizontal: 10,
        fontSize: height*0.023,
        color: '#000',
    },


})

export default React.memo(HotelSelectRoomGuest)