/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, Dimensions, Text, View, StyleSheet, ImageBackground, TextInput, Image, TouchableOpacity } from 'react-native';
import font from '../../../constants/font';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import { Dropdown } from 'react-native-element-dropdown'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import color from '../../../constants/color'
import Fontisto from 'react-native-vector-icons/Fontisto'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = ({ navigation }) => {

    let [dobDate, setDobDate] = useState(new Date());
    let [passportExDate, setPassportExDate] = useState(new Date());
    const [passportExDateopen, setpassportExDateOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [marriedStatus, setMarriedStatus] = useState(null)
    const [title, setTitle] = useState(null)
    const [otherOption, setOtherOption] = useState(false)
    const [privacyBox, setPrivacyBox] = useState(false)
    const [policyBox, setPolicyBox] = useState(false)

    const maridalStatus = [
        {
            name: 'Single',
            value: 'Single'
        },
        {
            name: 'Married',
            value: 'Married'
        },
    ]
    const selectTitle = [
        {
            name: 'Male',
            value: 'Male'
        },
        {
            name: 'Female',
            value: 'Female'
        }
    ]
    return (
        // <ScrollView contentInsetAdjustmentBehavior="automatic" showsVerticalScrollIndicator={false} horizontal={false} showsHorizontalScrollIndicator={false}>
        <View style={{ position: 'relative', width: width, backgroundColor: '#fff', }}>
            <ImageBackground style={style.signUpImag} source={require('../../../Assert/Images/signUp.png')} />
            <ScrollView>
                <View>

                    <Text style={style.headingText}>Sign up to TickaTrip</Text>
                    <View style={style.signUpForm}>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Gender *</Text>
                            <Dropdown
                                maxHeight={150}
                                data={selectTitle}
                                labelField="name"
                                valueField="name"
                                value={title}
                                showsVerticalScrollIndicator={true}
                                placeholder="Select program"
                                onChange={(item) => {
                                    setTitle(item.value)
                                }}
                                selectedTextProps={{
                                    style: {
                                        fontSize: 13,
                                        fontWeight: '500',
                                        fontFamily: font.font,
                                        letterSpacing: 0.5,
                                        padding: 0,
                                    },
                                }}
                                style={{ padding: 0, backgroundColor: '#EDF2F7', paddingVertical: 5, paddingHorizontal: 20, marginBottom: 15, borderRadius: 5, }}
                                renderRightIcon={() => (
                                    <MaterialIcon
                                        name="chevron-down-circle-outline"
                                        size={25}
                                        style={{ fontSize: 18, color: color.colorTheme, }}
                                    />)}
                            />
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Maridal Status *</Text>
                            <Dropdown
                                maxHeight={150}
                                data={maridalStatus}
                                labelField="name"
                                valueField="name"
                                value={marriedStatus}
                                showsVerticalScrollIndicator={true}
                                placeholder="Select program"
                                onChange={(item) => {
                                    setMarriedStatus(item.value)
                                }}
                                selectedTextProps={{
                                    style: {
                                        fontSize: 13,
                                        fontWeight: '500',
                                        fontFamily: font.font,
                                        letterSpacing: 0.5,
                                    },
                                }}
                                style={{ padding: 0, backgroundColor: '#EDF2F7', paddingVertical: 5, paddingHorizontal: 20, marginBottom: 15, borderRadius: 5, }}
                                renderRightIcon={() => (
                                    <MaterialIcon
                                        name="chevron-down-circle-outline"
                                        size={25}
                                        style={{ fontSize: 18, color: color.colorTheme, }}
                                    />)}
                            />
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>User name *</Text>
                            <TextInput keyboardType='default' placeholder='Enter the name' style={style.input} />
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>First name *</Text>
                            <TextInput keyboardType='default' placeholder='Enter the firs name' style={style.input} />
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Last name *</Text>
                            <TextInput keyboardType='default' placeholder='Enter the last name' style={style.input} />
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Mobile Number *</Text>
                            <TextInput keyboardType='default' placeholder='Enter the mobile number' style={style.input} />
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Email *</Text>
                            <TextInput keyboardType='default' placeholder='Enter the email address' style={style.input} />
                        </View>

                        <View style={style.formGroup}>
                            <Text style={style.label}>DOB *</Text>
                            <TouchableOpacity style={style.input} onPress={() => setOpen(!open)}>
                                <Text style={{ color: 'black', paddingVertical: 5, borderRadius: 5, }}>{moment(dobDate).format('DD/MM/YYYY').toString()}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={style.formGroup}>
                            <Text style={style.label}>Password *</Text>
                            <TextInput style={style.input} textContentType="newPassword" secureTextEntry placeholder='Enter your password' />
                        </View>
                        <View style={style.formGroup}>
                            <Text style={style.label}>Confirm Password *</Text>
                            <TextInput style={style.input} textContentType="newPassword" secureTextEntry placeholder='Enter your confirm password' />
                        </View>

                        <View style={style.formGroup}>
                            <Text style={style.label}>Others (Optinal)</Text>
                            <TouchableOpacity style={style.input} onPress={() => setOtherOption(!otherOption)}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ color: 'black', paddingVertical: 5, borderRadius: 5, }}>Fill the the information</Text>
                                    <MaterialIcon
                                        name="chevron-down-circle-outline"
                                        size={25}
                                        style={{ fontSize: 18, color: color.colorTheme, }}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {otherOption === true ?
                            <View style={{ backgroundColor: '#efefef9c', padding: 20 }}>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>Frequent flyer number</Text>
                                    <TextInput keyboardType='default' placeholder='Enter the Frequent flyer number' style={style.input} />
                                </View>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>Passport number</Text>
                                    <TextInput keyboardType='default' placeholder='Enter the Passport number' style={style.input} />
                                </View>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>Issuing country</Text>
                                    <TextInput keyboardType='default' placeholder='Enter the Issuing country*' style={style.input} />
                                </View>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>Expiry date</Text>
                                    <TouchableOpacity style={style.input} onPress={() => setpassportExDateOpen(!passportExDateopen)}>
                                        <Text style={{ color: 'black', paddingVertical: 5, borderRadius: 5, }}>{moment(passportExDate).format('DD/MM/YYYY').toString()}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={style.formGroup}>
                                    <Text style={style.label}>PAN</Text>
                                    <TextInput keyboardType='default' placeholder='Enter the PAN' style={style.input} />
                                </View>
                            </View>
                            :
                            null
                        }
                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                            <View style={{ backgroundColor: '#FFC400', padding: 10, borderRadius: 100, }}>
                                <Image source={require('../../../Assert/Images/mic.png')} />
                            </View>
                            <Text style={{ marginLeft: 10, color: color.colorText, fontSize: 14, fontWeight: '500', }}>Complete Your Profile And Enjoy 5000 As Joining Bonus</Text>
                        </View>
                        <View style={{marginVertical:30}}>
                            <View style={{flexDirection:'column'}}>
                                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginBottom:10}} onPress={() => setPolicyBox(!policyBox)}>
                                    <View >
                                    {policyBox === true ?
                                        <Fontisto
                                            name='checkbox-active'
                                            size={15}
                                            style={{color:color.colorBtn}}
                                        />
                                        :
                                        <Fontisto
                                            name='checkbox-passive'
                                            size={15}
                                            style={{color:'#000'}}
                                        />
                                    }
                                    </View>
                                   <Text style={{marginLeft:10, color:'#666666',fontSize:14,fontWeight:'500'}}>
                                   I have read and accepted the Terms of Use.
                                   </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{marginBottom:10,flexDirection:'row',alignItems:'center'}} onPress={() => setPrivacyBox(!privacyBox)}>
                                    <View >
                                    {privacyBox === true ?
                                        <Fontisto
                                            name='checkbox-active'
                                            size={15}
                                            style={{color:color.colorBtn}}
                                        />
                                        :
                                        <Fontisto
                                            name='checkbox-passive'
                                            size={15}
                                            style={{color:'#000'}}
                                        />
                                    }
                                    </View>
                                   <Text style={{marginLeft:10, color:'#666666',fontSize:14,fontWeight:'500'}}>
                                   The Tickatrip may send me promotional offers including emails about products and services.
                                   </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'center',marginBottom:30}}>
                            <TouchableOpacity style={style.button}><Text style={{color:'#fff'}}>SING UP</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>


            <DatePicker
                modal
                open={open}
                date={dobDate}
                mode="date"
                onConfirm={(dob) => {
                    setOpen(!open);
                    setDobDate(dobDate = dob);
                }}
                onCancel={() => {
                    setOpen(!open);
                }}
            />
            <DatePicker
                modal
                open={passportExDateopen}
                date={passportExDate}
                mode="date"
                onConfirm={(dob) => {
                    setOpen(!passportExDateopen);
                    setPassportExDate(passportExDate = dob);
                }}
                onCancel={() => {
                    setOpen(!open);
                }}
            />
        </View>
        // </ScrollView>

    )
}
const style = StyleSheet.create({
    button:{
        backgroundColor: '#0041F2',
        paddingVertical: 10,
        paddingHorizontal: 60,
        borderRadius: 100,
    },
    input: {
        backgroundColor: '#EDF2F7',
        paddingVertical: 10,
        marginBottom: 15,
        paddingHorizontal: 20,
        color: '#999999',
        borderRadius: 5,
    },
    signUpForm: {
        marginHorizontal: 30,
    },
    label: {
        color: '#425466',
        fontFamily: font.font,
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 0.5,
        marginBottom: 3,
    },
    headingText: {
        textAlign: 'center',
        paddingTop: 50,
        color: '#0083E9',
        fontSize: 22,
        fontFamily: font.font,
        marginBottom: 30,
    },
    signUpImag: {
        width: width,
        height: height * 0.5,
        position: 'absolute',
        bottom: 0,
    },
    formGroup: {
        flexDirection: 'column'
    }
})
export default SignUp