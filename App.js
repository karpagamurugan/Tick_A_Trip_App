/* eslint-disable prettier/prettier */
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home/Home';
import Splash from './components/Home/Splash';
import Login from './components/Screens/User/Login';
import SignUp from './components/Screens/User/SignUp';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SuccessPage from './components/common/SuccessPage';
import ForgetVerify from './components/Screens/User/ForgetVerify';
import VerifyOtp from './components/Screens/User/VerifyOtp';
import BottomNavigate from './components/common/BottomNavigate';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Login'>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SuccessPage" component={SuccessPage} />
          <Stack.Screen name='ForgetVerify' component={ForgetVerify}/>
          <Stack.Screen name='VerifyOtp' component={VerifyOtp}/>
          <Stack.Screen name='bottomNavigation' component={BottomNavigate}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

export default App;