import React, { useState } from "react";
import { View , Text, ActivityIndicator,Pressable,Modal} from "react-native";
import { useSelector } from "react-redux";
import COLORS from "../CommonUtils/colors";
import { useSelector } from "react-redux";

export default function LazyLoader(){

const {common_loader} =useSelector((state)=>state.CommonReducer)
        // var [loader,serLoader]=useState(false)

    return (
        <Modal
        visible={common_loader}
        animationType="fade"
        transparent={true}
    >

        <Pressable
            // onPress={() => show_loader}
            style={{
                position: 'absolute',
                backgroundColor: '#000000',
                opacity: 0.3,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
            }} />

<View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }} >
        <View style={{ width: '85%',borderRadius: 5, backgroundColor: 'white', padding: 15,flexDirection:'row',alignItems:'center' }}>
          

            <ActivityIndicator size={40} color={'red'}/>
            <Text
                style={
                    {
                        color: 'black',
                        alignSelf: 'center',
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,paddingLeft:20
                    }
                }
            >Loading Please Wait...</Text>

        </View>
    </View>
    </Modal>
    )
}