import React from "react";
import { Dimensions, View } from "react-native";
import RenderHtml from 'react-native-render-html';
import WebView from "react-native-webview";

export default function HotelPaymentWebView({route}) {
            console.log(route?.params?.check_out)

    const width = Dimensions.get('window').width
    const height = Dimensions.get('window').height
  

    return (
        <View style={{height:height,width:width}}>
            <WebView
            source={{uri:`https://tickatrip.travel/server/checkoutAgain/${route?.params?.check_out}`}}
            />
        </View>
    )
}