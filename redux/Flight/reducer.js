/* eslint-disable prettier/prettier */
import actions from './actions';

const initialState = {
    Airport_Name:{},
    Airport_to_Name:{},
    Flight_search_result:[],
    Fare_rules:[],
    get_Revalidate:{},
    Filtered_List:{
        show:false,
        data:[]
    }
}

const FlightSearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.GET_FLIGHT_SEARCH_FROM_BY_NAME:
            return {
                ...state,
                Airport_Name:action.payload,
            }; 
            case actions.GET_FLIGHT_SEARCH_TO_BY_NAME:
                return {
                    ...state,
                    Airport_to_Name:action.payload,
                }; 
                case actions.GET_FLIGHT_SEARCH:
                    return {
                        ...state,
                        Flight_search_result:action.payload,
                    }; 
                    case actions.GET_FARE_RULES:
                    return {
                        ...state,
                        Fare_rules:action.payload,
                    }; 
                    case actions.GET_REVALIDATE:
                    return {
                        ...state,
                        get_Revalidate:action.payload,
                    }; 
                    case actions.SET_FLIGHT_FILTERED_LIST:
                        return {
                            ...state,
                            Filtered_List:{
                                show:action.payload.show,
                                data:action.payload.data
                            },
                        }; 
        default:
            return state;
    }
};

export default FlightSearchReducer;