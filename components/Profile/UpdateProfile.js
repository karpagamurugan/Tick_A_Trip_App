import React, { useEffect, useState } from "react";
import { View, Text, TouchableHighlight, ScrollView, StyleSheet, Dimensions, Image, TextInput, Alert, Modal } from 'react-native';
import FONTS from "../constants/font";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from "moment";
import CalendarIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Appbar from "../common/Appbar";
import DocumentPicker from "react-native-document-picker";
import COLORS from "../constants/color";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-native-date-picker";
import { useSelector } from "react-redux";
import { PROFILE_URL } from "../constants/constProfileApi";
import RNFS from 'react-native-fs';

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

function UpdateProfile() {

    const { userProfileData, isLogin } = useSelector((state) => state.userReducer)

    var profileData = userProfileData;

    const { handleSubmit, control, formState: { errors }, reset, register, setValue, getValues } = useForm();

    var [image, setImage] = useState() //set selected profile image

    var [dob, setDob] = useState(new Date()); //set DOB in profile update

    var [showGenderModal, setshowGenderModal] = useState(false)
    var [showMaritalStatus, setshowMaritalStatus] = useState(false)
    var [showDatePick, setShowDatePick] = useState(false)

    var [myGender, setMyGender] = useState(profileData?.gender);
    var [myMaritialStatus, setMyMaritialStatus] = useState(profileData?.married_status);
    var [myProfileUrl , setMyProfileUrl] = useState(profileData?.profile_image.toString())

    const btnSubmit = (d) => {
        console.log(d)
    }

    useEffect(()=>{
        reset({
          userName:profileData?.name.toString(),
          firstName:profileData?.first_name.toString(),
          lastName:profileData?.last_name.toString(),
          mobileNumber:profileData?.phone.toString(),
        })
    },[])

    async function filePicker() {
        var res = null
        try {
            res = await DocumentPicker.pickSingle({
                type: DocumentPicker.types.allFiles,
            });
            let val = 'image';
            let mimeType = res?.name?.split('.')[1]

            const urlComponents = res.uri.split('/')
            const fileNameAndExtension = urlComponents[urlComponents.length - 1]
            const destPath = `${RNFS.DocumentDirectoryPath}/${res.name}`
            await RNFS.copyFile(res.uri, destPath)

            let url = 'file://' + destPath
            setImage(image = {
                URL: url,
                type: res.type,
                name: res?.name,
            })

            console.log(image.URL)

        } catch (e) {
            if (DocumentPicker.isCancel(e)) {
                setImage('')
            } else {
                setImage('')
                throw e;
            }
        }
    } //file pickers function...


    return (
        <View style={styles.mainContainer}>

            {/* <TouchableHighlight underlayColor={'transparent'} style={styles.cancelBtn} onPress={() =>
                        setOpenModel(!openModel)
                    }>
                        <MaterialIcons name='cancel' size={23} color='red' />
                    </TouchableHighlight> */}
            <Appbar title={'Edit Profile'} />
            <View style={styles.modalMainContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View>
                        {/* <Text style={styles.modalTitle}>Profile Edit</Text> */}
                        <View style={{ height: 20 }} />
                        <View style={styles.modalSubContainer}>

                            <View style={styles.imageView}>
                                {
                                // image!=""?
                                // <Image style={styles.circleAvatar}
                                //     source={require(image)}
                                // />:   
                                <Image style={styles.circleAvatar}
                                    source={{ uri:`${PROFILE_URL}${myProfileUrl}`}}
                                />}
                                <TouchableHighlight 
                                onPress={()=>filePicker()}
                                style={styles.editBtn}>
                                    <Text style={{
                                        color: '#fff',
                                        fontFamily: FONTS.fontSemi,
                                        fontSize: height * 0.015
                                    }}>Choose Image...</Text>
                                </TouchableHighlight>
                            </View>

                            {/* Gender*/}
                            <View>
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => setshowGenderModal(!showGenderModal)}
                                >
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Gender</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingRight: 8
                                        }}>
                                            <Text style={{ fontFamily: FONTS.font, color: 'black', paddingVertical: 10, paddingLeft: 7 }}>{myGender}</Text>
                                            <View style={{ flexGrow: 1 }} />
                                            {
                                                showGenderModal ?
                                                    <MaterialIcons name="keyboard-arrow-up" color={'#000'} size={25} /> :
                                                    <MaterialIcons name="keyboard-arrow-down" color={'#000'} size={25} />
                                            }
                                        </View>
                                    </View>
                                </TouchableHighlight>
                                {
                                    showGenderModal ?
                                        <View
                                            style={styles.dropDownContainer}>
                                            <TouchableHighlight
                                                underlayColor={"transparent"}
                                                onPress={() => {
                                                    setMyGender("Male")
                                                    setshowGenderModal(false)
                                                }}
                                            >
                                                <Text style={styles.dropDownTextStyle}>Male</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight
                                                underlayColor={"transparent"}
                                                onPress={() => {
                                                    setMyGender("Female")
                                                    setshowGenderModal(false)
                                                }}
                                            >
                                                <Text style={styles.dropDownTextStyle}>Female</Text>
                                            </TouchableHighlight>
                                        </View> : <></>
                                }
                            </View>

                            {/* user Name*/}
                            <View style={styles.editTextBorder}>
                                <Text style={styles.placeHolderText}>UserName</Text>
                                <Controller
                                    control={control}
                                    name="userName"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Enter your user name',
                                        },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            {...register("userName")}
                                            placeholderTextColor={"gray"}
                                            name="userName"
                                            value={value}
                                            style={styles.inputeEditor}
                                            placeholder="UserName"
                                            keyboardType='default'
                                            onChangeText={(e) => {
                                                onChange(e)
                                            }}
                                            numberOfLines={1}
                                        />
                                    )}
                                />
                            </View>
                            {errors.userName && (
                                <Text style={styles.errorMsg}>{errors.userName.message}</Text>
                            )}


                            {/* First Name*/}
                            <View style={styles.editTextBorder}>
                                <Text style={styles.placeHolderText}>FirstName</Text>
                                <Controller
                                    control={control}
                                    name="firstName"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Enter your first name',
                                        },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            {...register("firstName")}
                                            placeholderTextColor={"gray"}
                                            name="firstName"
                                            value={value}
                                            style={styles.inputeEditor}
                                            placeholder="firstName"
                                            keyboardType='default'
                                            onChangeText={(e) => {
                                                onChange(e)
                                            }}
                                            numberOfLines={1}
                                        />
                                    )}
                                />
                            </View>
                            {errors.firstName && (
                                <Text style={styles.errorMsg}>{errors.firstName.message}</Text>
                            )}

                            {/* last Name*/}
                            <View style={styles.editTextBorder}>
                                <Text style={styles.placeHolderText}>LastName</Text>
                                <Controller
                                    control={control}
                                    name="lastName"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Enter your last name',
                                        },
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            {...register("lastName")}
                                            placeholderTextColor={"gray"}
                                            name="lastName"
                                            value={value}
                                            style={styles.inputeEditor}
                                            placeholder="lastName"
                                            keyboardType='default'
                                            onChangeText={(e) => {
                                                onChange(e)
                                            }}
                                            numberOfLines={1}
                                        />
                                    )}
                                />
                            </View>
                            {errors.lastName && (
                                <Text style={styles.errorMsg}>{errors.lastName.message}</Text>
                            )}

                            {/* DOB */}
                            <View style={styles.editTextBorder}>
                                <Text style={styles.placeHolderText}>Date-Of-Birth</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ fontFamily: FONTS.font, color: 'black', paddingVertical: 10, paddingLeft: 7 }}>{moment(dob).format('YYYY-MM-DD')}</Text>
                                    <TouchableHighlight onPress={() => setShowDatePick(true)} underlayColor='transparent' style={{ paddingRight: 5 }}>
                                        <CalendarIcon name="calendar" size={25} color="gray" />
                                    </TouchableHighlight>
                                </View>
                            </View>

                            {/* personal maritial status */}
                            <View>
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => setshowMaritalStatus(!showMaritalStatus)}
                                >
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Maritial Status</Text>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            paddingRight: 8
                                        }}>
                                            <Text style={{ fontFamily: FONTS.font, color: 'black', paddingVertical: 10, paddingLeft: 7 }}>{myMaritialStatus}</Text>
                                            <View style={{ flexGrow: 1 }} />
                                            {
                                                showMaritalStatus ?
                                                    <MaterialIcons name="keyboard-arrow-up" color={'#000'} size={25} /> :
                                                    <MaterialIcons name="keyboard-arrow-down" color={'#000'} size={25} />
                                            }
                                        </View>
                                    </View>
                                </TouchableHighlight>
                                {
                                    showMaritalStatus ?
                                        <View
                                            style={styles.dropDownContainer}
                                        >
                                            <TouchableHighlight
                                                underlayColor={"transparent"}
                                                onPress={() => {
                                                    setMyMaritialStatus("Single")
                                                    setshowMaritalStatus(false)
                                                }}
                                            >
                                                <Text style={styles.dropDownTextStyle}>Single</Text>
                                            </TouchableHighlight>
                                            <TouchableHighlight
                                                underlayColor={"transparent"}
                                                onPress={() => {
                                                    setMyMaritialStatus("Married")
                                                    setshowMaritalStatus(false)
                                                }}
                                            >
                                                <Text style={styles.dropDownTextStyle}>Married</Text>
                                            </TouchableHighlight>
                                        </View> : <></>
                                }
                            </View>


                            {/* personal mobile no */}
                            <View style={styles.editTextBorder}>
                                <Text style={styles.placeHolderText}>Mobile Number</Text>
                                <Controller
                                    control={control}
                                    name="mobileNumber"
                                    rules={{
                                        required: {
                                            value: true,
                                            message: 'Enter your phone number',
                                        },
                                        min: {
                                            value: 10,
                                            message: 'Please check the phone number'
                                        }
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <TextInput
                                            {...register("mobileNumber")}
                                            placeholderTextColor={"gray"}
                                            name="mobileNumber"
                                            value={value}
                                            style={styles.inputeEditor}
                                            placeholder="mobileNumber"
                                            keyboardType='default'
                                            onChangeText={(e) => {
                                                onChange(e)
                                            }}
                                            numberOfLines={1}
                                        />
                                    )}
                                />
                            </View>
                            {errors.mobileNumber && (
                                <Text style={styles.errorMsg}>{errors.mobileNumber.message}</Text>
                            )}

                        </View>
                        <TouchableHighlight onPress={handleSubmit(btnSubmit)}
                            underlayColor='#ddd'
                            style={styles.saveBtn}
                        >
                            <Text style={{
                                fontFamily: FONTS.fontSemi,
                                color: '#fff',
                                fontSize: height * 0.02,
                                alignSelf: 'center'
                            }}>
                                UPDATE
                            </Text>
                        </TouchableHighlight>
                        <View style={{ height: 20 }} />
                    </View>
                </ScrollView>
                <DatePicker
                    modal
                    mode="date"
                    open={showDatePick}
                    date={dob}
                    onConfirm={(date) => {
                        setDob(date)
                        setShowDatePick(false)
                    }}
                    onCancel={() => {
                        setShowDatePick(false)
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: { height: height * 0.83, width: width, backgroundColor: 'white' },
    editTextBorder: { borderWidth: 1, height: 45, borderRadius: 7, borderColor: '#2B64FF', marginTop: 20, },
    inputeEditor: { paddingLeft: 10, fontFamily: FONTS.font, color: "#000000", width: width * 0.5 },
    placeHolderText: {
        color: '#2B64FF',
        position: 'absolute',
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        top: -11,
        left: 10,
        backgroundColor: '#ffffff',
        fontFamily: FONTS.font
    },
    circleAvatar: {
        height: 95,
        width: 95,
        backgroundColor: '#F0EFE8',
        borderRadius: 190 / 2,
        alignSelf: 'center',
        marginVertical: 5
    },
    imageView: {

    },
    editBtn: {
        height: 32,
        width: 120,
        backgroundColor: COLORS.BtnColor,
        borderRadius: 25,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: -6,
        alignSelf: 'center'
    },
    saveBtn: {
        height: 40,
        width: "50%",
        backgroundColor: COLORS.BtnColor,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginTop: 15
    },
    modalMainContainer: {
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
    },
    modalTitle: {
        fontFamily: FONTS.fontBold,
        alignSelf: 'center',
        paddingTop: 20,
        color: 'black',
        fontSize: height * 0.025
    },
    errorMsg: {
        color: 'red',
        fontSize: 12,
        fontFamily: FONTS.light,
        margin: 2
    },
    dropDownContainer: {
        backgroundColor: '#fff',
        // borderColor: COLORS.TextDarkGrey,
        //borderWidth: 1,
        marginTop: 10,
        width: "100%",
        borderRadius: 10,
        elevation: 5
    },
    dropDownTextStyle: {
        color: '#000',
        padding: 15,
        fontFamily: FONTS.mediam
    },
    modalSubContainer: { backgroundColor: 'white', width: width, paddingHorizontal: 20 },
    chooseProfile: { color: 'white', backgroundColor: 'green', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 15, fontSize: height * 0.02 },
    profile: { height: 50, width: 50, borderColor: '#2BAB38', borderWidth: 1, borderRadius: 100 },
    updateBtn: { backgroundColor: 'green', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignSelf: 'center' },
    updateText: { color: 'white', fontFamily: FONTS.font, alignSelf: 'center', paddingVertical: 7, paddingHorizontal: 10 }
})

export default UpdateProfile