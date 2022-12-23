import React from 'react';
import {View,Text,ScrollView,Dimensions,StyleSheet, TouchableHighlight} from 'react-native';
import color from '../../constants/color';
import font from '../../constants/font';
import Appbar from '../common/Appbar';

var height =Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default function AddTraveller(){

    let DataList =[
        {id:'1',name:'DurgaDevi',Email:'durgadevi@mindmade.in',mobileno:'9876543215',passNo:'486512345984',nationality:'Indian'},
        {id:'1',name:'DurgaDevi',Email:'durgadevi@mindmade.in',mobileno:'9876543215',passNo:'486512345984',nationality:'Indian'},
        {id:'1',name:'DurgaDevi',Email:'durgadevi@mindmade.in',mobileno:'9876543215',passNo:'486512345984',nationality:'Indian'},
        {id:'1',name:'DurgaDevi',Email:'durgadevi@mindmade.in',mobileno:'9876543215',passNo:'486512345984',nationality:'Indian'},
        {id:'1',name:'DurgaDevi',Email:'durgadevi@mindmade.in',mobileno:'9876543215',passNo:'486512345984',nationality:'Indian'},
    ]

    return(
        <View style={{width:width,height:height,backgroundColor:'white'}}>
            <Appbar title={'Traveller'}/>
            <View style={styles.addTravellerbtn}>
                <TouchableHighlight onPress={()=>null}>
                    <Text style={styles.AddTraveller}>Add Traveller</Text>
                </TouchableHighlight>
            </View>
            <View>
                {
                    DataList?.map((item,index)=>(
                        <View key={index} style={styles.card}>
                            <Text>{item?.Email}</Text>
                            <Text>{item?.mobileno}</Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between',width:width*0.5}}>
                                <Text>Female</Text>
                                <Text>Indian</Text>
                            </View>

                        </View>
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addTravellerbtn:{
        alignItems:'flex-end',
        marginRight:10,
        marginTop:10
    },  
    AddTraveller:{
        fontFamily:font.font,
        color:'white',
        backgroundColor:color.colorBtn, 
        paddingVertical:3,
        paddingHorizontal:7,
        borderRadius:5,
        fontSize:height*0.02
       },
       card:{
        backgroundColor: 'white',
        elevation: 3,
        shadowColor: 'black',
        marginVertical: 7,
        marginHorizontal: 20,
        borderRadius: 10,
        padding: 10
       }

})