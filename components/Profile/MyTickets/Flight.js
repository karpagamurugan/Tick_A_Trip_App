import React,{useState} from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Image, TouchableHighlight } from 'react-native';
import color from '../../../constants/color';
import font from '../../../constants/font';
import Appbar from '../../common/Appbar';
import ArrowIcon from 'react-native-vector-icons/AntDesign';


let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

export default function Flight() {
    var [selectedTab, setSelectedTab] = useState(1);


    let DataList = [
        { id: '1', title: 'Arena Beach Hotel', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaYRXqU-1tpipQxZoicIgjb-wxZRUOo0wPHA&usqp=CAU" },
        { id: '2', title: 'Air Asia', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8ZPS893k69xL-ZIJ6Ke8oClDpwfo5aS8f5w&usqp=CAU' },
        { id: '3', title: 'Arena Beach Hotel', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh3OR7_YQuvpGVlxZIHRPAO5wfkCpz1WCppQ&usqp=CAU' },
        { id: '4', title: 'Air Asia', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo_ShUmE0GjAvuNQWQyLz0OHyuFj-1y_MMXA6o202XPmzJ5np0Gn500crzKeyQhqqKnH8&usqp=CAU' },
        { id: '5', title: 'Arena Beach Hotel', name: 'DurgaDevi', date: '11/12/2022 Monday', place: 'cbe', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7cS6Loa2JeG-dx5PVfEgxNC3QaRZugod_Q&usqp=CAU' }
    ]


    // setting tab item backgroundColor
    const hadleClick = (index) => {
        setSelectedTab(index)
    }

    return (
        <View style={style.mainContainer}>
            <Appbar title={'FLIGHT BOOKINGS'} />
            {/* tab bar */}
            <View style={style.tabsBar}>
                <TouchableHighlight onPress={() => hadleClick(0)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn,{backgroundColor: selectedTab === 0 ? 'white' : 'transparent',}]}
                >
                    <Text style={[style.tabText, { color: selectedTab === 0 ? 'black' : 'gray' }]}>Upcoming Trip</Text>
                </TouchableHighlight>

                {/* tab bar */}
                <TouchableHighlight onPress={() => hadleClick(1)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn,{backgroundColor: selectedTab === 1 ? 'white' : 'transparent', }]}
                >
                    <Text style={[style.tabText, { color: selectedTab === 1 ? 'black' : 'gray' }]}>Cancelled Trip</Text>
                </TouchableHighlight>

                {/* tab bar */}
                <TouchableHighlight onPress={() => hadleClick(2)}
                    activeOpacity={0.2}
                    underlayColor={"#dddddd"}
                    style={[style.tabBtn,{backgroundColor: selectedTab === 2 ? 'white' : 'transparent',}]}
                >
                    <Text style={[style.tabText, { color: selectedTab === 2 ? 'black' : 'gray' }]}>Completed Trip</Text>
                </TouchableHighlight>
            </View>
            
            <ScrollView>
                <View style={style.listView}>

                    {
                        DataList?.map((item, index) => (
                            <View style={style.card} key={index}>
                                <View style={style.cardView}>
                                    <Image source={{ uri: item?.url }} style={{ width: width * 0.22, borderRadius: 7 }} />

                                    <View style={style.cardText}>
                                        <Text style={style.title}>{item?.title}</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View>
                                                <Text style={{ fontFamily: font.font, fontSize: height * 0.02, color: '#898989' }}>{item?.place}</Text>
                                                <Text style={{ fontFamily: font.font, color: '#FE712A', fontSize: height * 0.02 }}>{item?.date}</Text>
                                            </View>
                                            <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                                <Text style={style.cancelbtn}>Cancel</Text>
                                            </TouchableHighlight>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <TouchableHighlight>
                                                <Text style={style.viewDetail}>View Flight Details</Text>
                                            </TouchableHighlight>
                                            <ArrowIcon name='down' size={12} color='#0041F2' />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))
                    }


                </View>
            </ScrollView>

        </View>
    )
}

const style = StyleSheet.create({
    mainContainer: {height: height, width: width,backgroundColor: 'white'},
    listView: { height: height,marginBottom:50},
    tabsBar: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: '#E3E7F0',
        margin: 12,
        borderRadius: 25,
        padding: 8,
        width: "60%",
        alignSelf: 'center',
    },
    tabText: {fontSize: 12.5,fontFamily: font.font,alignSelf: 'center'},
    card: {
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: 'black',
        marginVertical: 7,
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 10
    },
    cardView: { flexDirection: 'row'},
    cardText: {paddingLeft: 15},
    title: {
        fontFamily: font.fontBold,
        color: color.colorText,
        width: width * 0.6,
        fontSize: height * 0.023
    },
    cancelbtn: {
        backgroundColor: 'red',
        fontFamily: font.font,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 2,
        color: 'white',
        marginRight: 10,
        fontSize: height * 0.02
    },
    viewDetail: {
        fontFamily: font.font,
        fontSize: height * 0.017,
        color: '#0041F2',
        textDecorationLine: 'underline'
    },
     tabsBar: {
        flexDirection: 'row',
        justifyContent: "space-around",
        backgroundColor: '#E3E7F0',
        margin: 12,
        padding: 8,
        width: "100%",
        alignSelf: 'center',
    },
    tabText: {fontSize: 12.5,fontFamily: font.font, alignSelf: 'center'},
    tabBtn: {
        paddingRight: 12,
        paddingLeft: 12,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 15,
        alignItems: 'center'
    },

})