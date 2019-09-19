import axios from 'axios';
import  {FETCH_EMPLOYEE,ADD_EMPLOYEE,UPDATE_EMPLOYEE,DELETE_EMPLOYEE} from './types';
export const fetchEmployees=()=>dispatch=>{
    console.log("||>----------------------------------<||","Fetch Action")
    // fetch("	http://dummy.restapiexample.com/api/v1/employees")
    // .then(res => res.json())
    // .then(employees => dispatch({
    //     type:FETCH_EMPLOYEE,
    //     payload:employees
    // }));
    // .catch(() => this.setState({ hasErrors: true }));
    axios.get('http://dummy.restapiexample.com/api/v1/employees')
    .then(res => dispatch({
        type:FETCH_EMPLOYEE,
        payload:res.data
    //   console.log(res.data);
    }))
}
export const createEmployee=(data)=>dispatch=>{
    console.log("||>----------------------------------<||","create Action",data,JSON.stringify(data))
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: 'POST',
        headers:{
            'content-type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json()).then(employee=> dispatch({
        type:ADD_EMPLOYEE,
        payload:employee
    })).catch(err=>console.log(err)); 
}

export const deleteEmployees=(id)=>dispatch=>{
    console.log("||>----------------------------------<||","Delete Action")
    axios.delete("http://dummy.restapiexample.com/api/v1/delete/"+id)
    .then(res => console.log(res.data,res.status));
}
export const updateEmployees=(id,employee)=>dispatch=>{
    console.log("||>----------------------------------<||","Update Action",id, employee);
    axios.put('http://dummy.restapiexample.com/api/v1/update/'+id, employee)
    .then(res => console.log(res.data)).catch(err=>console.log(err,"---------------------------------------"));
}
