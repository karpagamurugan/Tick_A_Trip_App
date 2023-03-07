/* eslint-disable prettier/prettier */
import actions from "./actions";

const initialState = {
    getHotelSearchResult: {},
    getHotelFilterResult: [],
    hotelSessionId: null,
    Searchbyname:[],
    HotelRoomType:[],
    RoomGuestPlace:{
        room:'',
        Guest:'',
        Place:'',
        depatureDate:'',
        arrivalDate:'',
        RoomList:[]
    }
}

const HotelReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.SET_HOTEL_SEARCH:
            return {
                ...state,
                getHotelSearchResult: action.payload
            }
        case actions.SET_HOTEL_FILTER:
            return {
                ...state,
                getHotelFilterResult: action.payload
            }
        case actions.SET_HOTEL_SESSION_ID:
            return {
                ...state,
                hotelSessionId: action.payload
            }
            case actions.SET_SELECT_NAME:
                return {
                    ...state,
                    Searchbyname: action.payload
                }
                case actions.SET_HOTEL_ROOM_TYPE:
                    return {
                        ...state,
                        HotelRoomType: action.payload
                    }
                    case actions.SET_ROOM_GUEST_PLACE:
                        return {
                            ...state,
                            RoomGuestPlace: {
                                room:action.payload.room,
                                Guest:action.payload.Guest,
                                Place:action.payload.Place,
                                depatureDate:action.payload.depatureDate,
                                arrivalDate:action.payload.arrivalDate,
                                RoomList:action.payload.RoomList
                            }
                        }
        default:
            return state;
    }
}
export default HotelReducer