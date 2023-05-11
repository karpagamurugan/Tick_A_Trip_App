import React from "react";
import { Dimensions, View } from "react-native";
import RenderHtml from 'react-native-render-html';
import WebView from "react-native-webview";

export default function HotelPaymentWebView({route,navigation}) {
            console.log(route?.params?.check_out)

    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
  

    return (
        <View style={{height:height,width:width}}>
            <WebView
            onNavigationStateChange={(state) => {
                // setCanGoBack(state.canGoBack)
                // handleRes(state.title)
                console.log('webview....',state)

                if(state?.url==='https://tickatrip.travel/'){
                    navigation.goBack()

                }
            }}
            source={{uri:`https://tickatrip.travel/server/checkoutAgain/${route?.params?.check_out}`}}
            />
        </View>
    )
}