import React from "react";
import {View,Text,TouchableHighlight} from 'react-native';
import WebView from "react-native-webview";

function SocialSignIn(route){
    // console.log('props...',props?.params?.link)
    console.log('props...',route?.route?.params?.link)
    return(
        <View style={{height:'100%',width:'100%'}}>
            <WebView source={{uri:route?.route?.params?.link}}/>
            {/* <Text>skjdowjd</Text> */}
        </View>
    )
}

export default SocialSignIn