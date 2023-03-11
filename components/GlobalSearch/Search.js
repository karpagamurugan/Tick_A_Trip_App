import React from "react";
import {View,Text} from 'react-native'
import Appbar from "../common/Appbar";

function Search({navigation}){
    return(
        <View>
            <Appbar title={'Search'}/>
        </View>
    )
}
export default Search