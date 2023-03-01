/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from "react-native";
import color from "../constants/color";
import font from "../constants/font";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const style = StyleSheet.create({
    hotelListCardHotelLocat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    hotelListCardHotelName: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#babab8',
        borderWidth: 1,
        width: '50%',
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
        // borderRadius:20
        // borderTopLeftRadius:10,
        // borderTopRightRadius:10
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
        fontFamily: font.mediam,
    },
    hotelListLocIcon: {
        fontSize: 20,
        marginRight: 5,
    },
    hotelListLocName: {
        fontFamily: font.mediam,
        fontSize: 13,
    },
    ListHotelName: {
        fontFamily: font.fontSemi,
        fontSize: 18,
        color: color.colorText,
        letterSpacing: 0.5,
    },
    ListHotelPrice: {
        fontFamily: font.fontSemi,
        fontSize: 14,
        color: color.colorText,
        letterSpacing: 0.5,
        marginTop: 2,
    },
    taxTect: {
        fontFamily: font.font,
        fontSize: 11,
        color: '#999999',
        letterSpacing: 0.5,
        marginLeft: 5,
    },
    ListHotelDescription: {
        color: '#666666',
        fontFamily: font.font,
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
        fontFamily: font.fontSemi,
        letterSpacing: 0.5,
    },
    hotelDesCont: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        paddingBottom: 20,
        backgroundColor: '#fff',
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        // borderColor: '#babab8',
        // borderWidth:1,
        // borderTopColor:'transparent',
    },
    hotelListCardSec: {
        marginHorizontal: 10,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 15,
    },
    RoomTitle: {
        fontFamily: font.fontBold,
        letterSpacing: 0.8,
        alignSelf: 'center',
        fontSize: height*0.025,
        color: color.colorText,
        paddingTop: 20,
        textTransform: 'capitalize',
    },
    RoomTypesSec: {
        paddingBottom: height * 0.20,
        backgroundColor:'white',height:height
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
        fontFamily: font.mediam,
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
        fontFamily: font.fontBold,
        fontSize: height*0.025,
    },
    HotelDetailHotelPriceTxt: {
        fontFamily: font.font,
        fontSize: 13,
        color: '#fff',
    },
    HotelDetailHotelTax: {
        color: '#fff',
        fontFamily: font.font,
        fontSize: 13,
    },
    HotelTitle: {
        fontFamily: font.mediam,
        color: '#52ADE5',
        fontSize: 14,
        flexDirection: 'row',
        alignItems: 'center',
        letterSpacing: 0.5,
        paddingTop: 8,
        marginBottom: 10,
    },
    HotelTitleIcon: {
        color: '#FCC40A',
        fontSize: 20,
    },
    TitleMain: {
        fontFamily: font.fontSemi,
        fontSize: 17,
        color: color.colorText,
        letterSpacing: 0.5,
        marginTop: 15,
    },
    parrah: {
        fontFamily: font.font,
        fontSize: 15,
        color: color.colorGrey,
    },
    list: {
        fontFamily: font.font,
        color: color.colorGrey,
        marginBottom: 5,
    },
    listIcon: {
        color: '#0050A6',
    },
    bookingBtn: {
        backgroundColor: color.colorBtn,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 100,
        marginHorizontal: width * 0.2,
        marginBottom: 30,
    },
    bookingBtnTxt: {
        color: '#fff',
        fontFamily: font.mediam,
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
        fontFamily: font.fontBold,
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 0,
    },
    AdultQtyListCount: {
        color: '#000',
        fontFamily: font.fontBold,
        fontSize: 18,
    },
    dropStyleChildAge: {
        width: width * 0.3,
        borderColor: color.colorGrey,
        borderWidth: 1,
        paddingHorizontal: 5,
        marginBottom: 5,
    },
    childAgeList: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    AlertBox: {
        position: 'absolute',
        bottom: 10,
        backgroundColor: color.AppbarColor,
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
        // borderBottomWidth:1,
        // borderBottomColor:color.borderColor,
        textAlign:'center',
        color:color.colorBtn,
        fontFamily:font.mediam,
        marginBottom:3,
    },
    AlertBoxCon:{
        color:color.colorText,
        fontFamily:font.mediam,
    },
})

export default style
