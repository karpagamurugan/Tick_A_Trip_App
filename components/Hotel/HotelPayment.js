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

                if(params?.referenceNum !== undefined && titleparms?.message !==undefined){
                    if(url.includes('https://tickatrip.travel/hotel-booking-confirm')){
                        dispatch({
                            type: hotelActions.GET_HOTEL_BOOKING_DETAIL, payload: {
                                supplierConfirmationNum: params?.supplierConfirmationNum,
                                referenceNum: params?.referenceNum
                            },
                            navigation: navigation
                        });
                    //   dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: titleparms?.message } })
                    }else{
                        console.log('false')
                        navigation.goBack()
                        dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: titleparms?.message } })
                    }
                }else if(params?.referenceNum === undefined && url.includes('https://tickatrip.travel/booking-response')){
                    navigation.goBack()
                    dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message: titleparms?.message } })
                }


                // if(params?.message !==undefined){
                //     var Message= params?.message.toString().replaceAll('\%20',' ')
                //     if(params.status === true||params.status ==='true'){
                //         // if( Message === 'Your Booking is Successfull'){
                //             // navigation.reset({
                //             //     index: 0,
                //             //     routes: [{ name: 'Home' }]
                //             // })
                //             navigation.navigate('Home')
                //             dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message:'Your Booking is Successfull'} })
                //         // }else{
                //         //     console.log('false....')
                //         // }
                //     }else{
                //         dispatch({ type: CommonAction.SET_ALERT, payload: { status: true, message:'Booling Failed'} })
                //     }
                // }

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
                // setCanGoBack(state.canGoBack)
                // handleRes(state.title)
                handlePayment(state.url.toString(),state.title.toString())
                console.log('webview....',state);
                // let a = state.url.split('https://tickatrip.travel')[1];
                // let b = new URLSearchParams(a)

                // if(state?.url==='https://tickatrip.travel/'){
                //     navigation.goBack()

                // }
            }}
            source={{uri:`https://tickatrip.travel/server/checkoutAgain/${route?.params?.check_out}`}}
            />
        </View>
    )
}