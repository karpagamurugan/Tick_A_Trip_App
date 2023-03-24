import React,{useState} from "react";
import { View, Text, Pressable, Dimensions, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Slider from '@react-native-community/slider';
import FONTS from '../constants/font';
import COLORS from '../constants/color';
import { useDispatch } from "react-redux";

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

function FlightFilter(props) {

    const dispatch = useDispatch()
    const { setShowFilter } = props
    var [priceRange, setPriceRange] = useState(); //set price range for filter

 
    const FilterList = {
        Airlines: [
            { value: 'All' },
            { value: 'Spicejet' },
            { value: 'Indigo Airlines' },
            { value: 'Air India' },
            { value: 'Vistara' },
        ],
        Cabin: [
            { value: 'Business class' },
            { value: 'Economy class' },
        ],
        Stops: [
            { value: 'Any' },
            { value: 'Non-stop' },
            { value: '1 Stop' },
            { value: '2 Stop' },
        ],
    }


    return (
        <View style={{ backgroundColor: '#000000ba', width: width, height: height }}>
            <Pressable
                onPress={() => setShowFilter(false)}
                style={{
                    position: 'absolute',
                    backgroundColor: '#000000',
                    opacity: 0.3,
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }} />
            <View style={styles.modalContainer} >
                <ImageBackground source={require('../../Assert/Images/map.jpg')}
                    style={styles.modalBg}>
                    <View style={{ padding: 10, borderRadius: 20 }}>
                        <Text style={styles.modalTitle}>Refine Result</Text>
                        <View style={{ height: 0.5, backgroundColor: 'grey' }} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.priceTitle}>Price</Text>
                            <Text style={styles.priceText}>{priceRange}</Text>
                        </View>
                        <Slider
                            style={{ paddingVertical: 5 }}
                            minimumValue={0}
                            maximumValue={100000}
                            minimumTrackTintColor={COLORS.colorBtn}
                            thumbTintColor={COLORS.colorBtn}
                            onValueChange={(val) => {
                                setPriceRange(priceRange = val)
                            }}

                        />
                        <View style={styles.priceContainer}>
                            <Text style={styles.priceValue}>0</Text>
                            <Text style={styles.priceValue}>100000</Text>
                        </View>

                        <View style={{ height: 0.5, backgroundColor: 'grey' }} />

                        <View style={{ marginTop: 6, paddingLeft: 10 }}>
                            <Text style={styles.FilterTitle}>Airlines</Text>
                            {
                                FilterList?.Airlines?.map((item, i) => (
                                    <View key={i} style={{ paddingTop: 5 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Fontisto name='checkbox-passive' size={15} />
                                            <Text style={styles.filterText}>{item.value}</Text>

                                        </View>
                                    </View>
                                ))
                            }

                            <Text style={styles.FilterTitle}>Cabin</Text>
                            {
                                FilterList?.Cabin?.map((item, n) => (
                                    <View key={n} style={{ paddingTop: 5 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Fontisto name='radio-btn-passive' size={15} />
                                            <Text style={styles.filterText}>{item.value}</Text>

                                        </View>
                                    </View>
                                ))
                            }

                            <Text style={styles.FilterTitle}>Stops</Text>
                            {
                                FilterList?.Stops?.map((item, d) => (
                                    <View key={d} style={{ paddingTop: 5 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Fontisto name='checkbox-passive' size={15} />
                                            <Text style={styles.filterText}>{item.value}</Text>

                                        </View>
                                    </View>
                                ))
                            }
                        </View>
                        <TouchableHighlight style={styles.filterApply} onPress={() => null} underlayColor='transparent'>
                            <Text style={{ color: 'white', fontFamily: FONTS.fontBold, padding: 5 }}>Apply</Text>
                        </TouchableHighlight>
                    </View>
                </ImageBackground>
            </View>       
          </View>
    )
}



const styles = StyleSheet.create({
    modalContainer: { flex: 1, justifyContent: 'center', marginTop: 20, marginHorizontal: 20, borderRadius: 50 },
    modalBg: { width: '100%', flexDirection: 'column', borderRadius: 20, alignSelf: 'center' },
    modalTitle: { fontFamily: FONTS.fontBold, color: COLORS.colorText, fontSize: height * 0.027 },
    listBottom: {
        backgroundColor: 'white', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5,
        justifyContent: 'space-between', borderBottomRightRadius: 5, marginTop: 10,
        borderBottomLeftRadius: 5
    },
    listBtnText: { fontFamily: FONTS.font, fontSize: height * 0.016, },
    FlightText: { color: 'black', fontFamily: FONTS.fontBold }


})


export default FlightFilter