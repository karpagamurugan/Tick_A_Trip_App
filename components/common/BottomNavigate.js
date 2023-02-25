/* eslint-disable prettier/prettier */
import React,{memo} from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Home/Home'
import Hotel from '../Hotel/Hotel'
import Flight from '../Flight/Flight'
import Profile from '../Profile/Profile';
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlightTickets from '../Profile/MyTickets/Flight';
import HotelTicket from '../Profile/MyTickets/Hotel'
import AddTraveller from '../Profile/AddTraveller'
import FlightResult from '../Flight/FlightResult'
import HotelList from '../Hotel/HotelList'
import FlightBooking from '../Flight/Flightbooking'
import HotelDetail from '../Hotel/HotelDetail'
import HotelRoomType from '../Hotel/HotelRoomType'
import PopularPlacesDetails from '../Home/PopularPlaceDetails'
import FlightDetails from '../Flight/FlightDetails'
import HotelTicketDetails from '../Profile/MyTickets/HotelDetails'
import AddTravellerForm from '../Profile/AddTravellerForm'
import UpdateProfile from '../Profile/UpdateProfile'
const Stack = createNativeStackNavigator();

function HomeTab() {
    return (
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="PopularDetails" component={PopularPlacesDetails} options={{ headerShown: false }} />
           
           <Stack.Screen name='Hotel' component={Hotel} options={{ headerShown: false }}/>
            <Stack.Screen name='HotelList' component={HotelList} options={{ headerShown: false }}/>
            <Stack.Screen name='HotelRoomType' component={HotelRoomType} options={{ headerShown: false }}/>
            <Stack.Screen name='HotelDetail' component={HotelDetail}options={{ headerShown: false }}/>

            <Stack.Screen name="flight" component={Flight} options={{ headerShown: false }} />
            <Stack.Screen name="FlightResult" component={FlightResult} options={{ headerShown: false }} />
            <Stack.Screen name="flightBooking" component={FlightBooking} options={{ headerShown: false }} />
            <Stack.Screen name="FlightDetails" component={FlightDetails} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

function ProfileTab() {
    return (
        <Stack.Navigator initialRouteName='Profile'>
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="FlightTicket" component={FlightTickets} options={{ headerShown: false }} />
            <Stack.Screen name="HotelTicket" component={HotelTicket} options={{ headerShown: false }} />
            <Stack.Screen name="addTraveller" component={AddTraveller} options={{ headerShown: false }} />
            <Stack.Screen name="addtravellerform" component={AddTravellerForm} options={{ headerShown: false }} />
            <Stack.Screen name="HotelTicketDetails" component={HotelTicketDetails} options={{ headerShown: false }} />

            <Stack.Screen name="updateProfile" component={UpdateProfile} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

function HotelTab() {
    return (
        <Stack.Navigator initialRouteName='Hotel' screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Hotel' component={Hotel} />
            <Stack.Screen name='HotelList' component={HotelList}/>
            <Stack.Screen name='HotelRoomType' component={HotelRoomType}/>
            <Stack.Screen name='HotelDetail' component={HotelDetail}/>
        </Stack.Navigator>
    )
}

function FlightTab() {
    return (
        <Stack.Navigator initialRouteName='flight'>
            <Stack.Screen name="flight" component={Flight} options={{ headerShown: false }} />
            <Stack.Screen name="FlightResult" component={FlightResult} options={{ headerShown: false }} />
            <Stack.Screen name="flightBooking" component={FlightBooking} options={{ headerShown: false }} />
            <Stack.Screen name="FlightDetails" component={FlightDetails} options={{ headerShown: false }} />

        </Stack.Navigator>
    )
}

function SearchTab() {
    return (
        <Stack.Navigator initialRouteName='search'>
            <Stack.Screen name="flight" component={Flight} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

const BottomNavigate = ({ navigation }) => {
    const Tab = createBottomTabNavigator()
    return (
        <Tab.Navigator screenOptions={{
            tabBarHideOnKeyboard:false,
            headerShown: false,
            tabBarStyle: {
                backgroundColor: '#E9F3FF',
                height: 60,
                borderRadius: 15,
            },
            tabBarShowLabel: false
        }}>
            <Tab.Screen name="HomeTab" component={HomeTab}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <Fontisto color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='home' />
                                <View>
                                    <Image style={style.navActiveIcon} source={require('../../Assert/Images/active.png')} />
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
            <Tab.Screen name="Search" component={SearchTab}
                options={{
                    tabBarLabel: 'Flight',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <MaterialIcons color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='search' />
                                <View>
                                    <Image style={style.navActiveIcon} source={require('../../Assert/Images/active.png')} />
                                </View>
                            </View>
                            :
                            <MaterialIcons color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='search' />
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        navigation.navigate('FlightTab')
                    }
                })}
            />
            {/* <Tab.Screen name="HotelTab" component={HotelTab}
                options={{
                    tabBarLabel: 'Hotel',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='hotel' />
                                <View>
                                    <Image style={style.navActiveIcon} source={require('../../Assert/Images/active.png')} />
                                </View>
                            </View>
                            :
                            <FontAwesome color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='hotel' />
                    ),
                }}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        navigation.navigate('HotelTab')
                    }
                })}
            /> */}
            <Tab.Screen name="ProfileTab" component={ProfileTab}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ focused, color, size }) => (
                        focused ?
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <FontAwesome color={focused ? '#4C94F2' : '#a6a9ac'} size={focused ? 30 : 25} name='user' />
                                <View>
                                    <Image style={style.navActiveIcon} source={require('../../Assert/Images/active.png')} />
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
    navActiveIcon: {
        marginTop: 5
    }
})
export default memo(BottomNavigate)