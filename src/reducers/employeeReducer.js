import  {FETCH_EMPLOYEE,ADD_EMPLOYEE,UPDATE_EMPLOYEE,DELETE_EMPLOYEE} from '../actions/types';
import { stat } from 'fs';
const initialState={}
export default function(state=initialState,action){
    switch(action.type){
        case FETCH_EMPLOYEE:
            console.log("Get Employee")
            return {
                ...state,
                items:action.payload
            }
        case ADD_EMPLOYEE:
            console.log('Add Employee')
            return {
            ...state,
            item:action.payload
            }
        case DELETE_EMPLOYEE:
            return {
                ...state,item:action.payload
            }
        case UPDATE_EMPLOYEE:
            return {
                ...state,update:action.payload
            }
        default:
            return state;            
    }
}