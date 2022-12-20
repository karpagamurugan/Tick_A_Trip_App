/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Home/Home'
import Hotel from '../Screens/Hotel/Hotel'
import Flight from '../Screens/Flight/Flight'
import Profile from '../Screens/User/Profile'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'


const BottomNavigate = ({ navigation }) => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#E9F3FF',
                height: 60,
                borderRadius: 10,
                marginBottom: 5,
                marginHorizontal: 5,
            },
            tabBarShowLabel: false
        }}>
            <Tab.Screen name="Home" component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <Fontisto color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='home' />
                                <View>
                                    <Image style={style.navActiveIcon} source={require('../../Assert/Images/active.png')}/>
                                </View>
                            </View>
                            :
                            <Fontisto color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='home' />
                    ),
                }}
            />
            <Tab.Screen name="Flight" component={Flight}
                options={{
                    tabBarLabel: 'Flight',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <MaterialIcons color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='flight' />
                                <View>
                                    <Image style={style.navActiveIcon} source={require('../../Assert/Images/active.png')}/>
                                </View>
                            </View>
                            :
                            <MaterialIcons color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='flight' />
                    ),
                }}
            />
            <Tab.Screen name="Hotel" component={Hotel}
                options={{
                    tabBarLabel: 'Hotel',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <FontAwesome color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='hotel' />
                                <View>
                                    <Image style={style.navActiveIcon} source={require('../../Assert/Images/active.png')}/>
                                </View>
                            </View>
                            :
                            <FontAwesome color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='hotel' />
                    ),
                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <FontAwesome color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='user' />
                                <View>
                                    <Image style={style.navActiveIcon} source={require('../../Assert/Images/active.png')}/>
                                </View>
                            </View>
                            :
                            <FontAwesome color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='user' />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}
const style = StyleSheet.create({
    navActiveIcon:{
        marginTop:5
    }
})
export default BottomNavigate