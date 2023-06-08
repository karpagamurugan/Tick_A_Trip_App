/* eslint-disable prettier/prettier */
import { Dimensions, Platform, StyleSheet } from "react-native";
import COLORS from "../constants/color";
import FONTS from "../constants/font";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const style = StyleSheet.create({
    hotelListCardHotelLocat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal:10,
        borderColor: '#babab8',
        borderWidth: 1,
    },
    hotelListCardHotelName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    HotelPopularList: {
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 20
    },

    hotelListCardImageBg: {
        width: '100%',
        height: 180,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    hotelListCardReview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 10
    },
    hotelListCardReviewBlog: {
        color: '#FFC400',
        fontFamily: FONTS.mediam,
    },
    hotelListLocIcon: {
        fontSize: 20,
        marginRight: 5,
    },
    hotelListLocName: {
        fontFamily: FONTS.mediam,
        fontSize: 13,
    },
    ListHotelName: {
        fontFamily: FONTS.fontSemi,
        fontSize: 18,
        color: COLORS.colorText,
        letterSpacing: 0.5,
    },
    ListHotelPrice: {
        fontFamily: FONTS.fontSemi,
        fontSize: 14,
        color: COLORS.colorText,
        letterSpacing: 0.5,
        marginTop: 2,
    },
    taxTect: {
        fontFamily: FONTS.font,
        fontSize: 11,
        color: '#999999',
        letterSpacing: 0.5,
        marginLeft: 5,
    },
    ListHotelDescription: {
        color: '#666666',
        fontFamily: FONTS.font,
        marginVertical: 8,
    },
    ListHotelBtn: {
        backgroundColor: '#003AA8',
        paddingVertical: 8,
        borderRadius: 100,
        width: "50%",
        alignSelf: 'center',
        marginTop: 10,
    },
    ListHotelBtnText: {
        textAlign: "center",
        color: '#fff',
        fontFamily: FONTS.fontSemi,
        letterSpacing: 0.5,
    },
    hotelDesCont: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
    },
    hotelListCardSec: {
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.40,
        shadowRadius: 5.00,
        elevation:Platform.OS==='ios'?0:15,
        marginTop:20,
    },
    RoomTitle: {
        fontFamily: FONTS.fontBold,
        letterSpacing: 0.8,
        alignSelf: 'center',
        fontSize: height*0.025,
        color: COLORS.colorText,
        paddingTop: 20,
        textTransform: 'capitalize',
    },
    RoomTypesSec: {
        paddingBottom: height * 0.1,
        backgroundColor:'white',
    },
    HotelDetailBannerCon: {
        height: height * 0.25,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    HotelDetailHotelName: {
        fontFamily: FONTS.mediam,
        color: '#fff',
        fontSize: height*0.02,
    },
    HotelDetailBanner: {
        position: 'relative',
        marginTop: 15,
    },
    OverLay: {
        position: 'absolute',
        backgroundColor: '#00000052',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    HotelDetailHotelPrice: {
        color: '#fff',
        fontFamily: FONTS.fontBold,
        fontSize: height*0.025,
    },
    HotelDetailHotelPriceTxt: {
        fontFamily: FONTS.font,
        fontSize: 13,
        color: '#fff',
    },
    HotelDetailHotelTax: {
        color: '#fff',
        fontFamily: FONTS.font,
        fontSize: 13,
    },
    HotelTitle: {
        fontFamily: FONTS.mediam,
        color: '#52ADE5',
        fontSize: 14,
        letterSpacing: 0.5,
        
    },
    HotelTitleIcon: {
        color: '#FCC40A',
        fontSize: 20,
    },
    TitleMain: {
        fontFamily: FONTS.fontSemi,
        fontSize: 17,
        color: COLORS.colorText,
        letterSpacing: 0.5,
        marginTop: 15,
    },
    parrah: {
        fontFamily: FONTS.font,
        fontSize: 15,
        color: COLORS.colorGrey,
    },
    list: {
        fontFamily: FONTS.font,
        color: COLORS.colorGrey,
        marginBottom: 5,
    },
    listIcon: {
        color: '#0050A6',
    },
    bookingBtn: {
        backgroundColor: COLORS.colorBtn,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 100,
        marginHorizontal: width * 0.2,
        marginBottom: 30,
    },
    bookingBtnTxt: {
        color: '#fff',
        fontFamily: FONTS.mediam,
    },
    AdultQtyList: {
        flexDirection: 'row',
    },
    adultCoutTxt: {
        marginRight: 10,
    },
    activeSelectGuest: {
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: 100,
        fontFamily: FONTS.fontBold,
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    AdultQtyListCount: {
        color: '#000',
        fontFamily: FONTS.fontBold,
        fontSize: 18,
    },
    dropStyleChildAge: {
        width:'100%',
        borderColor: '#003AA8',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 5,
        paddingVertical:5,
        borderRadius:5
    },
    childAgeList: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    AlertBox: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: COLORS.AppbarColor,
        width: width * 0.9,
        alignSelf: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
        borderRadius:10,
        borderWidth:3,
        borderColor:'#FFCC00',
    },
    AlertBoxHead:{
        textAlign:'center',
        color:COLORS.colorBtn,
        fontFamily:FONTS.mediam,
        marginBottom:3,
    },
    AlertBoxCon:{
        color:COLORS.colorText,
        fontFamily:FONTS.mediam,
    },
})

export default style
