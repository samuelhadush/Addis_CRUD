import axios from 'axios';
import  {FETCH_EMPLOYEE,ADD_EMPLOYEE,UPDATE_EMPLOYEE,DELETE_EMPLOYEE} from './types';
export const fetchEmployees=()=>dispatch=>{
    console.log("||>----------------------------------<||","Fetch Action")
    axios.get('http://dummy.restapiexample.com/api/v1/employees')
    .then(res => dispatch({
        type:FETCH_EMPLOYEE,
        payload:res.data
    })).then(res=>console.log(res))
}
export const createEmployee=(data)=>dispatch=>{
    console.log("||>----------------------------------<||","create Action",data)
    axios.post('http://dummy.restapiexample.com/api/v1/create', JSON.stringify(data))
	.then(res => dispatch({
        type:ADD_EMPLOYEE,
        payload:res.data
    })).catch(err=>console.log(err));
}

export const deleteEmployees=(id)=>dispatch=>{
    console.log("||>----------------------------------<||","Delete Action")
    axios.delete("http://dummy.restapiexample.com/api/v1/delete/"+id)
    .then(res => console.log(res.data,res.status));
}
export const updateEmployees=(id,employee)=>dispatch=>{
    console.log("||>----------------------------------<||","Update Action",id);
    axios.put('http://dummy.restapiexample.com/api/v1/update/'+id, JSON.stringify(employee))
    .then(res => dispatch({
        type:UPDATE_EMPLOYEE,
        payload:res.data
    })).catch(err=>console.log(err,"---------------------------------------"));
}
