import React from "react";
import {View,Text,StyleSheet,Dimensions,TouchableHighlight,ScrollView} from 'react-native'
import Appbar from "../common/Appbar";
import HotelAppbar from "../common/HotelAppbar";
import COLORS from "../constants/color";
import FONT_FAMILY from "../constants/font";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from "moment";

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;
function HotelBooking(){
    return(
        <View>
            {/* <Appbar title={'Hotel Booking'}/> */}
            <HotelAppbar title={'Hotel Booking'}/>
            <ScrollView>
                {/* <View style={{ height: height }}> */}
                <View >
                    {/* <View style={styles.details}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                            <View>
                                <Text style={styles.title}>Depart On</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.departure_date}</Text>
                                </View>
                            </View>
                            {
                                (route?.params?.flightInfo?.return_date === null ||route?.params?.flightInfo?.return_date ===undefined||route?.params?.flightInfo?.return_date ==='')?
                                <View/>:
                                <View>
                                <Text style={styles.title}>Return</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.return_date}</Text>
                                </View>
                            </View>
                            }
                          
                        </View>

                      
                    </View> */}

                   <View style={{backgroundColor:'#F7F7F7'}}>
                   <View style={{flexDirection:'row',justifyContent:'space-evenly',paddingVertical:25}}>
                        <View>
                            <Text style={styles.title}>Depart On</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                {/* <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} /> */}
                                {/* <Text style={styles.text}>{moment(get_Revalidate?.DepartureDateTime).format('DD-MM-YYYY')}</Text> */}
                                {/* <AntDesign name="down" style={{paddingLeft:5}}/> */}
                            </View>
                        </View>
                        <View>
                            <Text style={styles.title}>Return</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <SimpleLineIcons name="calendar" color={COLORS.colorBtn} size={20} />
                                {/* <Text style={styles.text}>{moment(get_Revalidate?.ArrivalDateTime).format('DD-MM-YYYY')}</Text> */}
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly',paddingBottom:25}}>
                            <View>
                                <Text style={styles.title}>Adult</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.adult_flight} Adult</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Kids</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.child_flight} Kids</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={styles.title}>Infant</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <AntDesign name="addusergroup" size={20} color={COLORS.colorBtn} />
                                    <Text style={styles.text}>{route?.params?.flightInfo?.infant_flight} Infant</Text>
                                </View>
                            </View>
                        </View>
                   </View>

                   


                    <View style={styles.couponCode}>
                        <View style={{ flexDirection: 'row', justifyContent: "space-between",alignItems:'center' }}>
                            <TextInput
                                // style={{ height: 35 }}
                                placeholder='Add a coupon Code'
                            />
                            <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                <Text style={styles.applyCoupon}>APPLY</Text>
                            </TouchableHighlight>

                        </View>
                    </View>

                    <View style={styles.bg}>
                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Base Fare</Text>
                            {/* <Text style={styles.priceTag}> Rs: <Text style={styles.price}>{get_Revalidate?.BaseFareAmount}/-</Text></Text> */}
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Taxes</Text>
                            {/* <Text style={styles.priceTag}> Rs : <Text style={styles.price}>{get_Revalidate?.TotalTaxAmount}/-</Text></Text> */}
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Discounts & {'\n'}Adjustments</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>0,00/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />

                        <View style={styles.amountContainer}>
                            <Text style={styles.amountName}>Other charges</Text>
                            <Text style={styles.priceTag}> Rs : <Text style={styles.price}>0000/-</Text></Text>
                        </View>
                        <View style={{ backgroundColor: 'white', height: 0.5, opacity: 0.2, marginVertical: 7 }} />


                        <View style={styles.total}>
                            <Text style={styles.totalText}>Total</Text>
                            <Text style={{color:'white',fontFamily:FONTS.fontBold}}>:</Text>
                            {/* <Text style={styles.priceTag}> Rs  <Text style={[styles.price,{fontSize:height*0.03}]}>{get_Revalidate?.TotalFareAmount}</Text></Text> */}

                        </View>
                    </View>
                </View>

                <View style={{marginHorizontal:25}}>
                <View style={styles.editTextBorder}>
                            <Text style={styles.placeHolderText}>Name</Text>
                            <Controller
                                control={control}
                                name="Name"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Enter Your Name"
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        // style={styles.inputeEditor}
                                        name='Name'
                                        placeholder="Name"
                                        keyboardType='default'
                                        {...register("Name")}
                                        value={value}
                                        onChangeText={value => onChange(value.toLowerCase())}
                                    />
                                )}
                            />
                            {errors.Name && (
                                <Text style={[styles.errormessage]}>{errors.Name.message}</Text>
                            )}
                        </View>

                        <View style={styles.editTextBorder}>
                            <Text style={styles.placeHolderText}>Email</Text>
                            <Controller
                                control={control}
                                name="Email"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Enter Your Email"
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        // style={styles.inputeEditor}
                                        name='Email'
                                        placeholder="Email"
                                        keyboardType='default'
                                        {...register("Email")}
                                        value={value}
                                        onChangeText={value => onChange(value.toLowerCase())}
                                    />
                                )}
                            />
                            {errors.Email && (
                                <Text style={[styles.errormessage]}>{errors.Email.message}</Text>
                            )}
                        </View>
                        <View style={styles.editTextBorder}>
                            <Text style={styles.placeHolderText}>Phone Number</Text>
                            <Controller
                                control={control}
                                name="Phone"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Enter Your Phone"
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        // style={styles.inputeEditor}
                                        name='Phone'
                                        placeholder="Phone"
                                        keyboardType='default'
                                        {...register("Phone")}
                                        value={value}
                                        onChangeText={value => onChange(value.toLowerCase())}
                                    />
                                )}
                            />
                            {errors.Phone && (
                                <Text style={[styles.errormessage]}>{errors.Phone.message}</Text>
                            )}
                        </View>
                </View>



            </ScrollView>

            <View style={styles.ConfirmBtn}>
                <TouchableHighlight underlayColor={'transparent'} onPress={()=>{}}>
                    <Text style={styles.confirmBook}>Confirm & Book</Text>
                </TouchableHighlight>
            </View>        </View>
    )
}
export default HotelBooking

const styles = StyleSheet.create({
    appbar: {
        flexDirection: 'row',
        backgroundColor: COLORS.AppbarColor,
        height: height * 0.07,
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 15
    },
    appbarPlaceContainer: { backgroundColor: 'white', width: width * 0.75, height: 40, marginLeft: 10, borderRadius: 30 },
    appbarPlace: { fontFamily: FONT_FAMILY.font, fontSize: height * 0.018 },
    appBarTraveller: { fontFamily: FONT_FAMILY.font, marginTop: -6, fontSize: height * 0.016 },
    title: { fontFamily: FONT_FAMILY.font, color: 'grey', fontSize: height * 0.0162 },
    text: { fontFamily: FONT_FAMILY.fontBold, paddingLeft: 10, color: COLORS.colorText, fontSize: height * 0.017},
    details: { flexDirection: 'column', backgroundColor: COLORS.lightGrey, paddingBottom: 15, paddingTop: 5 },
    couponCode: {
        borderRadius: 7, borderWidth: 0.9, borderColor: COLORS.borderColor, paddingVertical: 0, paddingHorizontal: 7,
        marginHorizontal: 15, marginTop: 10, backgroundColor: COLORS.AppbarColor, elevation: 1
    },
    applyCoupon: { fontFamily: FONT_FAMILY.fontBold, color: COLORS.textBlue },
    bg: { backgroundColor: COLORS.bg, padding: 20, margin: 10, borderRadius: 7, elevation: 5, shadowColor: COLORS.bg },
    amountContainer: { flexDirection: 'row', justifyContent: 'space-between' },
    amountName: { fontFamily: FONT_FAMILY.light, color: 'white', fontSize: height * 0.022 },
    price: { fontFamily: FONT_FAMILY.mediam, color: 'white', fontSize: height * 0.026 },
    priceTag: { fontFamily: FONT_FAMILY.font, color: 'white',fontSize:height*0.017 },
    total: {
        flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.darkblue,
        paddingHorizontal: 15, paddingVertical: 3, borderRadius: 22, alignItems: 'center'
    },
    totalText: { fontFamily: FONT_FAMILY.fontBold, color: 'white',fontSize:height*0.022 },

    ConfirmBtn: {
        alignItems: 'center',
        backgroundColor: COLORS.borderColor,
        marginHorizontal: 20,
        marginBottom: 10,
        // marginTop: 20,
        borderRadius: 30,
        paddingVertical:10
      },
      confirmBook:{fontFamily:FONT_FAMILY.mediam,color:'white',fontSize:height*0.027},
      editTextBorder: { borderWidth: 1, height: 45, borderRadius: 7, borderColor: '#067fc030', marginTop: 20, marginBottom: 5, },
      placeHolderText: {
        color: '#067fc0',
        position: 'absolute',
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        top: -11,
        left: 10,
        backgroundColor: '#ffffff',
        fontFamily: FONT_FAMILY.font
    },
})