import React from "react";
import { Dimensions, View } from "react-native";
import RenderHtml from 'react-native-render-html';
import WebView from "react-native-webview";
import { useDispatch } from "react-redux";
import CommonAction from '../../redux/common/actions';
import hotelActions from "../../redux/Hotel/actions";
export default function HotelPaymentWebView({route,navigation}) {
    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
  
    const dispatch = useDispatch();
    const handlePayment = (url,title) => {

        try {
            if(url !== undefined && title !==undefined){
                var regex = /[?&]([^=#]+)=([^&#]*)/g,
                  params = {},
                  titleparms={},
                  match;
                while (match = regex.exec(url)) {
                  params[match[1]] = match[2];
                }

              while (match = regex.exec(title)) {
                titleparms[match[1]] = match[2];
              }
              console.log('url',url)
              console.log(url.includes('https://tickatrip.travel/hotel-booking-confirm'))
              console.log('(params?.referenceNum',params?.referenceNum)

                if(params?.referenceNum !== undefined ){
                    if(url.includes('https://tickatrip.travel/hotel-booking-confirm') ===true){
                        // navigation.replace('hotelBookingConfirm')
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'hotelBookingConfirm' }]
                        })
                        dispatch({
                            type: hotelActions.GET_HOTEL_BOOKING_DETAIL, payload: {
                                supplierConfirmationNum: params?.supplierConfirmationNum,
                                referenceNum: params?.referenceNum
                            },
                            navigation: navigation
                        });
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
        <View style={{height:height,width:width}}>
            <WebView
            onNavigationStateChange={(state) => {
                console.log('state',state)
                handlePayment(state.url.toString(),state.title.toString())
            }}
            source={{uri:`https://tickatrip.travel/server/checkoutAgain/${route?.params?.check_out}`}}
            />
        </View>
    )
}