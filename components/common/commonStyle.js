/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from "react-native";
import color from "../../constants/color";
import font from "../../constants/font";

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const style = StyleSheet.create({
    hotelListCardHotelLocat: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#fff',
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

        elevation: 24,
    },
})

export default style