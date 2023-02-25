import React,{useState} from "react";
import {View,Text,TouchableHighlight,ScrollView,StyleSheet,Dimensions,Image,TextInput} from 'react-native';
import FONT_FAMILY from "../constants/font";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import moment from "moment";
import CalendarIcon from "react-native-vector-icons/MaterialCommunityIcons";

let width = Dimensions.get('window').width;
let height = Dimensions.get('window').height;

function UpdateProfile(){

    var [image, setImage] = useState() //set selected profile image

    var [dob, setDob] = useState(new Date()); //set DOB in profile update


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

        } catch (e) {
            if (DocumentPicker.isCancel(e)) {
                setImage('')
            } else {
                setImage('')
                throw e;
            }
        }
    } //file pickers function...


    return(
             <View style={{ flex: 1, justifyContent: 'center' }} >
                    <TouchableHighlight underlayColor={'transparent'} style={styles.cancelBtn} onPress={() =>
                        setOpenModel(!openModel)
                    }>
                        <MaterialIcons name='cancel' size={23} color='red' />
                    </TouchableHighlight>
                    <View style={styles.modalMainContainer}>
                        <ScrollView>
                            <View>
                                <Text style={styles.modalTitle}>Profile Edit</Text>

                                <View style={styles.modalSubContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {
                                            (image?.URL === undefined || image?.URL === null || image?.URL === '') ?
                                                <View /> :
                                                <Image style={styles.profile} source={{ uri: image?.URL }} />
                                        }
                                        <TouchableHighlight underlayColor={'transparent'} onPress={() => filePicker()}>
                                            <Text style={styles.chooseProfile}>
                                                Choose Profile
                                            </Text>
                                        </TouchableHighlight>
                                    </View>



                                    {/* Gender*/}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Gender</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="gender"
                                            keyboardType='default'
                                            // onChangeText={(f) => {
                                            //     setFname(f)
                                            // }}
                                            numberOfLines={1}
                                        // value={fname}
                                        />
                                    </View>

                                    {/* user Name*/}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>UserName</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="UserName"
                                            keyboardType='default'
                                            // onChangeText={(f) => {
                                            //     setFname(f)
                                            // }}
                                            numberOfLines={1}
                                        // value={fname}
                                        />
                                    </View>

                                    {/* First Name*/}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>FirstName</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="FirstName"
                                            keyboardType='default'
                                            // onChangeText={(f) => {
                                            //     setFname(f)
                                            // }}
                                            numberOfLines={1}
                                        // value={fname}
                                        />
                                    </View>

                                    {/* last Name*/}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>LastName</Text>
                                        <TextInput

                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="LastName"
                                            keyboardType='default'
                                            // onChangeText={(l) => setLname(l)}
                                            numberOfLines={1}
                                        // value={lname}
                                        />
                                    </View>

                                    {/* DOB */}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Date-Of-Birth</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text style={{ fontFamily: FONT_FAMILY.font, color: 'black', paddingVertical: 10, paddingLeft: 7 }}>{moment(dob).format('YYYY-MM-DD')}</Text>
                                            <TouchableHighlight onPress={() => setShowPicker(!showPicker)} underlayColor='transparent' style={{ paddingRight: 5 }}>
                                                <CalendarIcon name="calendar" size={25} color="gray" />
                                            </TouchableHighlight>
                                        </View>
                                    </View>

                                    {/* personal maritial status */}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Maritial Status</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="Maritial Status"
                                            // onChangeText={(pmail) => {
                                            //     setPrmail(pmail)
                                            // }}
                                            numberOfLines={1}
                                        // value={prmail}
                                        />
                                    </View>


                                    {/* personal mobile no */}
                                    <View style={styles.editTextBorder}>
                                        <Text style={styles.placeHolderText}>Mobile Number</Text>
                                        <TextInput
                                            placeholderTextColor={"gray"}
                                            style={styles.inputeEditor}
                                            placeholder="mobilenumber"
                                            keyboardType='number-pad'
                                            // onChangeText={(no) => {
                                            //     setMobileNo(no)
                                            // }}
                                            numberOfLines={1}
                                            maxLength={10}
                                        // value={mobileNo}
                                        />
                                    </View>
                                </View>

                                <View style={styles.updateBtn}>
                                    <TouchableHighlight onPress={() => null} underlayColor='transparent'>
                                        <Text style={styles.updateText}>
                                            Update
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </ScrollView>

                    </View>
                </View>
    )
}

const styles = StyleSheet.create({
    editTextBorder: { borderWidth: 1, height: 45, borderRadius: 7, borderColor: 'gray', marginTop: 20, },
    inputeEditor: { paddingLeft: 10, fontFamily: FONT_FAMILY.font, color: "#000000", width: width * 0.5 },
    placeHolderText: {
        color: 'gray',
        position: 'absolute',
        fontSize: 12,
        paddingLeft: 5,
        paddingRight: 5,
        top: -11,
        left: 10,
        backgroundColor: '#ffffff',
        fontFamily: FONT_FAMILY.font
    },
    cancelBtn: { alignSelf: 'flex-end', paddingRight: 30, paddingBottom: 5 },
    modalMainContainer: {
        // width: '85%',
        borderRadius: 10,
        backgroundColor: 'white',
        flexDirection: 'column',
        // height: '70%',
        alignItems: 'center',
        alignSelf: 'center',
        // paddingBottom: 30
    },
    modalTitle: {
        fontFamily: FONT_FAMILY.fontBold,
        alignSelf: 'center',
        paddingTop: 20,
        color: 'black',
        fontSize: height * 0.025
    },
    modalSubContainer: { backgroundColor: 'white', width: width * 0.8, paddingHorizontal: 10 },
    chooseProfile: { color: 'white', backgroundColor: 'green', paddingVertical: 2, paddingHorizontal: 5, borderRadius: 15, fontSize: height * 0.02 },
    profile: { height: 50, width: 50, borderColor: '#2BAB38', borderWidth: 1, borderRadius: 100 },
    updateBtn: { backgroundColor: 'green', borderRadius: 10, marginTop: 20, justifyContent: 'center', alignSelf: 'center' },
    updateText: { color: 'white', fontFamily: FONT_FAMILY.font, alignSelf: 'center', paddingVertical: 7, paddingHorizontal: 10 }
})

export default UpdateProfile