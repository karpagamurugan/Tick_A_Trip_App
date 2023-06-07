import React from "react";
import { Dimensions, View } from "react-native";
import RenderHtml from 'react-native-render-html';
import WebView from "react-native-webview";
import { useDispatch } from "react-redux";
import flightAction from '../../redux/Flight/actions';

export default function FlightPaymentWebView({ route, navigation }) {

    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
    const dispatch = useDispatch();
    const handlePayment = (url,title) => {

        try {
            if(url !== undefined){
                var regex = /[?&]([^=#]+)=([^&#]*)/g,
                  params = {},
                  match;
                while (match = regex.exec(url)) {
                  params[match[1]] = match[2];
                }

                while (match = regex.exec(title)) {
                    titleparms[match[1]] = match[2];
                  }
                    console.log('url',url)

                  if(params?.referenceNum !== undefined && titleparms?.message !==undefined){
                    if(url.includes('https://tickatrip.travel/flight-booking-confirm')){
                        dispatch({
                            type:flightAction.SET_FLIGHT_TRIPS_DETAIL, payload: {
                                UniqueID: params?.UniqueID,
                            },
                            navigation: navigation
                        });
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'flightBookingConfirm' }]
                        })
                        // navigation.navigate('flightBookingConfirm')
                        
                      dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: titleparms?.message } })
                    }else{
                        navigation.goBack()
                        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: titleparms?.message } })
                    }
                }else if(params?.referenceNum === undefined && url.includes('https://tickatrip.travel/booking-response')){
                    navigation.goBack()
                    dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: titleparms?.message } })
                }

        
            }else{
                console.log('failed param ',url)
            }
        } catch (e) {
            console.log('Err param ',e)
        }

    }

    return (
        <View style={{ height: height, width: width }}>
            <WebView
                onNavigationStateChange={(state) => {
                    console.log('state',state)
                    handlePayment(state?.url?.toString(),state?.title?.toString())
                }}
                source={{ uri: `https://tickatrip.travel/server/checkoutAgainFlight/${route?.params?.check_out}` }}
            />
        </View>
    )
}