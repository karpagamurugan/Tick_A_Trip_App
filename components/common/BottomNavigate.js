/* eslint-disable prettier/prettier */
import React from 'react'
import { View, Text, StyleSheet, Dimensions,Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Home/Home'
import Hotel from '../Screens/Hotel/Hotel'
import Flight from '../Screens/Flight/Flight'
import Profile from '../Profile/Profile';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlightTickets from '../Profile/MyTickets/Flight';
import HotelTicket from '../Profile/MyTickets/Hotel'
import AddTraveller from '../Profile/AddTraveller'

const Stack = createNativeStackNavigator();


function ProfileTab(){
    return(
        <Stack.Navigator initialRouteName='Profile'>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }}/>
            <Stack.Screen name="FlightTicket" component={FlightTickets} options={{ headerShown: false }}/>
            <Stack.Screen name="HotelTicket" component={HotelTicket} options={{ headerShown: false }}/>
            <Stack.Screen name="addTraveller" component={AddTraveller} options={{ headerShown: false }}/>
        </Stack.Navigator>
    )
}


const BottomNavigate = ({ navigation }) => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#E9F3FF',
                height: 60,
                borderRadius: 15,
                // padding
                // marginBottom: 5,
                // marginHorizontal: 5,
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
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                      navigation.navigate('Home')
                    }
                  })}
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
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                      navigation.navigate('Flight')
                    }
                  })}
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
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                      navigation.navigate('Hotel')
                    }
                  })}
            />
            <Tab.Screen name="ProfileTab" component={ProfileTab}
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
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                      navigation.navigate('ProfileTab')
                    }
                  })}
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