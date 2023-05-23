import React from "react";
import { Dimensions, View } from "react-native";
import RenderHtml from 'react-native-render-html';
import WebView from "react-native-webview";
import { useDispatch } from "react-redux";
import flightAction from '../../redux/Flight/actions';

export default function FlightPaymentWebView({ route, navigation }) {
    console.log(route?.params?.check_out)

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


                  if(params?.referenceNum !== undefined && titleparms?.message !==undefined){
                    if(url.includes('https://tickatrip.travel/hotel-booking-confirm')){
                        dispatch({
                            type:flightAction.SET_FLIGHT_TRIPS_DETAIL, payload: {
                                UniqueID: params?.UniqueID,
                            },
                            navigation: navigation
                        });
                        
                      dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: titleparms?.message } })
                    }else{
                        console.log('false')
                        navigation.goBack()
                        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: titleparms?.message } })
                    }
                }else if(params?.referenceNum === undefined && url.includes('https://tickatrip.travel/booking-response')){
                    navigation.goBack()
                    dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: titleparms?.message } })
                }

                // console.log('success params....',params) 
                // if(params?.status === false ||params?.status ==="false" ){
                //     navigation.goBack()
                // }else if(params?.status === true ||params?.status === "true" ){

                // }

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
                    handlePayment(state?.url?.toString(),state?.title?.toString())
                    // setCanGoBack(state.canGoBack)
                    // handleRes(state.title)
                    //console.log('webview....',state)
                    //console.log('state?.url',state?.url)
                    // if(state?.url !== undefined){
                    //     var url = state?.url

                    //     var regex = /[?&]([^=#]+)=([^&#]*)/g,
                    //       params = {},
                    //       match;
                    //     while (match = regex.exec(url)) {
                    //       params[match[1]] = match[2];
                    //     }
                    //     console.log('value params....',params) 

                    // }else{
                    //     console.log('jdkjd',state.url)
                    // }
                    // if (state?.url === 'https://tickatrip.travel/') {
                    //     navigation.goBack()
                    // } else {
                    //     console.log('else...')
                    //     navigation.goBack()
                    // }
                }}
                source={{ uri: `https://tickatrip.travel/server/checkoutAgainFlight/${route?.params?.check_out}` }}
            />
        </View>
    )
}