import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Dimensions, ScrollView, TouchableOpacity, TouchableHighlight, TextInput, Keyboard, } from "react-native";
import FONTS from "../constants/font";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import userAction from '../../redux/user/actions'
import { useForm, Controller } from "react-hook-form";
import userActions from '../../redux/user/actions';

let height = Dimensions.get('window').height;
let width = Dimensions.get('window').width;

const ContactInfo = (props) => {
    // const { handleSubmit, register, control, formState: { errors }, reset, setValue } = useForm();

    // register2={register2} control2={control2} errors2={errors2} reset2={reset2} setValue2={setValue2}

    var register = props?.register2;
    var control = props?.control2;
    var errors = props?.errors2;
    var reset = props?.reset2;
    var setValue = props?.setValue2;

    const dispatch = useDispatch()
    const { userProfileData, AddTravaller_country_code } = useSelector((state) => state.userReducer)
    var [travelRec, setTravelRec] = useState({ CountryCode: false, Nationality: false })
    var [selectedCountryCode, setSelectedCountryCode] = useState({ CountryCode: '', Nationality: '', })
    // var [getSelectId, setGetSelectId] = useState({ CountryCode: '' })
    var [showContact, setShowContact] = useState(true);


    useEffect(()=>{
        dispatch({ type: userActions.GET_USER_PROFILE })
    },[])

    useEffect(() => {
        let defaultName = { Name: userProfileData?.name }
        let defaultEmail = { Email: userProfileData?.email }
        let defaultPhone = { Phone: userProfileData?.phone }
        reset({ ...defaultName, ...defaultEmail, ...defaultPhone, })
    }, [])

    const handleSelectionCode = (e) => {
        Keyboard.dismiss()
        let defaultName = { Name: userProfileData?.name }
        let defaultEmail = { Email: userProfileData?.email }
        let defaultPhone = { Phone: userProfileData?.phone }
        let defaultCountryCode = { CountryCode: e?.country_code }
        
        reset({ ...defaultCountryCode,...defaultName, ...defaultEmail, ...defaultPhone})
        
        setSelectedCountryCode(selectedCountryCode = { CountryCode: e.dial_code + "-" + e.name });
        // setGetSelectId(getSelectId = { CountryCode: e.id });
        props.setCountryCode(props.cuntryCode = { CountryCode: e.id })
        dispatch({
            type: userAction.GET_ADD_TRAVELLER_COUNTRY_CODE,
            payload: []
        })
        setTravelRec(travelRec = { CountryCode: true });
    }

    return (
        <View>
            <View style={{ marginHorizontal: 25, paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[styles.formTitle]}>Fill Contact Details *</Text>
                    <TouchableOpacity onPress={() => setShowContact(!showContact)}>
                        <AntDesign name={showContact ? 'upcircleo' : 'downcircleo'} style={{ color: '#2B64FF', fontSize: height * 0.022, paddingRight: 15 }} />
                    </TouchableOpacity>
                </View>
                {(showContact === true) ?
                    <View>
                        <View style={styles.editTextBorder}>
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
                                        name='Name'
                                        placeholder="Name"
                                        keyboardType='default'
                                        {...register("Name")}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                    />
                                )}
                            />
                            {errors.Name && (
                                <Text style={[styles.errormessage]}>{errors.Name.message}</Text>
                            )}
                        </View>
                        <View style={styles.editTextBorder}>
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
                                        name='Email'
                                        placeholder="Email"
                                        keyboardType='email-address'
                                        {...register("Email")}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                    />
                                )}
                            />
                            {errors.Email && (
                                <Text style={[styles.errormessage]}>{errors.Email.message}</Text>
                            )}
                        </View>
                        <View style={styles.editTextBorder}>
                            <Controller
                                control={control}
                                name="Phone"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Enter Your Phone"
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: "Number must be 10 digits"
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Number must be 10 digits "
                                    },
                                }}

                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        name='Phone'
                                        placeholder="Phone"
                                        keyboardType='phone-pad'
                                        {...register("Phone")}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                        maxLength={10}
                                    />
                                )}
                            />
                            {errors.Phone && (
                                <Text style={[styles.errormessage]}>{errors.Phone.message}</Text>
                            )}
                        </View>
                        <View style={styles.editTextBorder}>
                            <Controller
                                control={control}
                                name="GST"

                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        name='GST'
                                        placeholder="GST Nonstop (Optional)"
                                        keyboardType='default'
                                        {...register("GST")}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                    />
                                )}
                            />
                        </View>
                        <View>
                            <View style={[styles.editTextBorder]}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        height: 35,
                                        width: '100%',
                                        alignItems: 'center',
                                    }}
                                >

                                    <View>
                                        <Controller
                                            control={control}
                                            name="CountryCode"
                                            rules={{
                                                required: {
                                                    value: true,
                                                    message: "Enter Your CountryCode"
                                                }
                                            }}
                                            render={({ field: { onChange, value } }) => (
                                                <TextInput
                                                    placeholderTextColor={"gray"}
                                                    name='CountryCode'
                                                    placeholder="CountryCode"
                                                    keyboardType='default'
                                                    {...register("CountryCode")}
                                                    numberOfLines={1}
                                                    value={selectedCountryCode?.CountryCode}
                                                    onChangeText={(e) => {
                                                        onChange(e)
                                                        if (e === '') {
                                                            setTravelRec(travelRec = { CountryCode: true });
                                                        }
                                                        if (e?.length >= 3) {
                                                            dispatch({
                                                                type: userAction.SET_ADD_TRAVELLER_SEARCH_BY_NAME,
                                                                payload: {
                                                                    name: e,
                                                                    type: 'country-code',
                                                                }
                                                            })
                                                            setSelectedCountryCode(selectedCountryCode = { CountryCode: e })
                                                        } else {
                                                            setSelectedCountryCode(selectedCountryCode = { CountryCode: e })
                                                            dispatch({
                                                                type: userAction.GET_ADD_TRAVELLER_COUNTRY_CODE,
                                                                payload: []
                                                            })
                                                        }
                                                    }}
                                                    style={{
                                                        color: 'black',
                                                        width: width * 0.9,
                                                        paddingTop: 8,
                                                        paddingLeft: 5,
                                                        paddingBottom: 0,
                                                    }}
                                                />
                                            )}
                                        />

                                    </View>
                                    {
                                        selectedCountryCode?.CountryCode !== "" ?
                                            <TouchableHighlight
                                                underlayColor={'transparent'}
                                                onPress={() => {
                                                    setSelectedCountryCode(selectedCountryCode = { CountryCode: '' })
                                                    dispatch({
                                                        type: userAction.GET_ADD_TRAVELLER_COUNTRY_CODE,
                                                        payload: []
                                                    })
                                                    setTravelRec(travelRec = { CountryCode: false });

                                                }}
                                            >
                                                <AntDesign name="closecircle" size={18} color="gray" style={{
                                                    marginLeft: 10, marginRight: 10, position: 'absolute', right: 20, top: -4
                                                }} />
                                            </TouchableHighlight> : <></>
                                    }
                                </View>
                            </View>

                            {errors.CountryCode && (
                                <Text style={[styles.errormessage]}>{errors.CountryCode.message}</Text>
                            )}
                            {
                                (AddTravaller_country_code?.message === undefined && selectedCountryCode?.CountryCode !== '' && travelRec.CountryCode === false) ?
                                    <View style={{
                                        backgroundColor: 'white',
                                        width: '100%',
                                        alignSelf: 'center',
                                        position: 'relative',
                                        zIndex: 2,
                                        borderRadius: 5,
                                        elevation: 10,
                                        maxHeight: height * 0.35
                                    }}>
                                        <Text style={{ color: 'grey', textAlign: 'center', paddingVertical: 5, }}>No Options found</Text>
                                    </View> : <View style={{
                                        backgroundColor: 'white',
                                        width: '100%',
                                        alignSelf: 'center',
                                        position: 'relative',
                                        zIndex: 2,
                                        borderRadius: 10,
                                        elevation: 10,
                                        maxHeight: height * 0.35
                                    }}>

                                        <ScrollView
                                            showsVerticalScrollIndicator={true}
                                            nestedScrollEnabled
                                            keyboardShouldPersistTaps='handled'
                                        >
                                            {
                                                AddTravaller_country_code?.message?.map((e, i) => {
                                                    return (
                                                        <TouchableHighlight
                                                            underlayColor={"transparent"}
                                                            onPress={() => handleSelectionCode(e)}
                                                            key={i}>
                                                            <Text
                                                                style={{
                                                                    color: 'black',
                                                                    paddingHorizontal: 9,
                                                                    fontSize: 13,
                                                                    paddingVertical: 2,
                                                                }}>{e?.dial_code} - {e?.name}</Text>
                                                        </TouchableHighlight>
                                                    )
                                                })
                                            }
                                        </ScrollView>
                                    </View>
                            }
                        </View>

                        <View style={styles.editTextBorder}>
                            <Controller
                                control={control}
                                name="PostalCode"
                                rules={{
                                    required: {
                                        value: true,
                                        message: "Enter Your PostalCode"
                                    }
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        placeholderTextColor={"gray"}
                                        name='PostalCode'
                                        placeholder="PostalCode"
                                        keyboardType='number-pad'
                                        {...register("PostalCode")}
                                        value={value}
                                        onChangeText={value => onChange(value)}
                                    
                                    />
                                )}
                            />
                            {errors.PostalCode && (
                                    <Text style={[styles.errormessage]}>{errors.PostalCode.message}</Text>
                                )}
                        </View>
                    </View> : <></>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    editTextBorder: {
        backgroundColor: '#E9F3FF',
        borderWidth: 1, height: 50,
        borderRadius: 3, borderColor: '#2B64FF',
        marginTop: 8, marginBottom: 10,
        paddingHorizontal: 5,
    },
    formTitle: {
        fontSize: height * 0.020,
        color: '#2B64FF',
        fontFamily: FONTS.mediam,
    },
    errormessage: {
        color: "red",
        fontSize: 10,
        fontWeight: "500",
        marginTop: 2,
    },
})
export default ContactInfo;