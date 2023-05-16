/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home/Home';
import Splash from './components/Home/Splash';
import Login from './components/User/Login';
import SignUp from './components/User/SignUp';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SuccessPage from './components/common/SuccessPage';
import ForgetVerify from './components/User/ForgetVerify';
import VerifyOtp from './components/User/VerifyOtp';
import BottomNavigate from './components/common/BottomNavigate';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import setAuthToken from './components/constants/setAuthToken';
import setAuthToken from './components/constants/setAuthToken';

import Loader from './components/common/Loader';
import Hotel from './components/Hotel/Hotel';
import { View,SafeAreaView } from 'react-native';
import HotelLoader from './components/common/hotelLoader';
import Alert from './components/common/Alert';
import FlightLoader from './components/common/flightLoader';
import PasswordChange from './components/User/PasswordChange';
import GoogleLogin from './components/User/GoogleLogin';

function App() {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    setToken()
  }, [])
  const setToken = (async) => {
    AsyncStorage.getItem('tickatrip-token').then((res) => setAuthToken(res))
  }

  return (
    <Provider store={store}>
      
      <Loader/>
      <HotelLoader/>
      <FlightLoader/>
      <Alert/>
      <SafeAreaView/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SuccessPage" component={SuccessPage} />
          <Stack.Screen name='ForgetVerify' component={ForgetVerify} />
          <Stack.Screen name='VerifyOtp' component={VerifyOtp} />
          <Stack.Screen name='PasswordChange' component={PasswordChange} />
          <Stack.Screen name='bottomNavigation' component={BottomNavigate} />
          <Stack.Screen name='google' component={GoogleLogin} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <View>Dummy Text</View> */}
    </Provider>


  );
}

export default App;


