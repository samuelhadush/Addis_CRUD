import React, { Component } from 'react';
import { Table,Modal,Form, Icon, Input, Button } from "antd";
import 'antd/dist/antd.css';
import { Provider }  from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import  store  from "./store";
import { fetchEmployees,createEmployee,deleteEmployees } from "./actions/employeeActions";
import CreateEmployee from "./components/createEmployee";


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      name:"",
      employees:[],
      data:{},
      // visible:true

    }
  }
  componentWillMount=()=>{
    this.props.fetchEmployees();
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.newEmployee){
      this.props.employees.unshift(nextProps.newEmployee);
    }
  }
  componentDidMount=()=>{
    // fetch("	http://dummy.restapiexample.com/api/v1/employees")
    // .then(res => res.json())
    // .then(res => this.setState({ employees: res },()=>{
    //   console.log(this.state.employees)
    //     // this.state.employees.map(item=>{
    //     //   console.log(item);
    //     // });
    // }))
    // .catch(() => this.setState({ hasErrors: true }));
    // console.log("before Fetch called")
    // this.props.fetchEmployees();
  }
  postData=(url = '', data = {})=> {
    // this.props.createEmployee(this.state.data);
      // return fetch(url, {
      //     method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //     body: JSON.stringify(data), // body data type must match "Content-Type" header
      // })
      // .then(response => response.json()); // parses JSON response into native JavaScript objects 
  }
  updateData=(record)=> {
    // Default options are marked with *
      return fetch("https://jsonplaceholder.typicode.com/posts/"+record.id, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          body: JSON.stringify(record), // body data type must match "Content-Type" header
      })
      .then(response => response.json()); // parses JSON response into native JavaScript objects 
  }

  deleteEmployee=(record)=>{
    console.log(record);
    // fetch("https://jsonplaceholder.typicode.com/posts/"+record.id.toString(),{
    //   method:'DELETE'
    // }).then(response=>response.json()).then(response=>console.log('employee deleted'))
    // axios.delete("http://dummy.restapiexample.com/api/v1/delete/"+record.id)
    // .then(res => console.log(res.data));
    this.props.deleteEmployees(record.id);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  onChange=e=>{
    console.log(e);
   let newdata={...this.state.data}
    console.log(e.target.name,e.target.value)
    // newdata.e.target.name.toString()=e.target.value;
    // console.log(newdata);
    // this.setState({employee_name:e});
    this.setState({[e.target.name]:e.target.target});
    // this.setState({data:{[e.target.name]:e.target.value}},()=>console.log(this.state.data));
  }

  handleSubmit=()=>{
    const employeeInfo={
      employee_name:this.state.employee_name,
      employee_age:this.state.employee_age,
      employee_salary:this.state.employee_salary
    }
    console.log(employeeInfo);
    // this.props.createEmployee(employeeInfo);

  }
  handleCancel = e => {
    this.setState({
      visible: false,
      updatevisible:false,
      data:{}
    });
  }
   warning=(record)=> {
     let present=this;
    Modal.confirm({
      title: 'You are about to Delete employee',
      content: 'Click OK to continue or Cancel otherwise ',
      onOk() {
        return new Promise((resolve, reject) => {
          // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          console.log("Delete File");
          present.deleteEmployee(record);
          resolve();
        })
        .then(()=>console.log("Successfuly deleted"))
        .catch((err) => console.log('Oops errors!',err));
      },
      onCancel() {},
    });
  }
  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'employee_name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'employee_age',
        key: 'age',
      },
      {
        title: 'Salary',
        dataIndex: 'employee_salary',
        key: 'salary',
      },
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: (text,record) => 
        <div> 
          <Button 
          type="primary"
          style={{marginRight:"10px"}}
          onClick={()=>{
          console.log("Edit ",record)
          this.setState({editdata:record,updatevisible:true,type:'update'});
           }
         

          }
         >Edit</Button>
        <Button  
        type="danger"
        onClick={()=>{
          console.log("Delete ",record)
          this.warning(record);
        }
        } >Delete</Button>
           </div>,
      }
    ];
   let data=[ ...this.state.employees];
   let create="http://dummy.restapiexample.com/api/v1/create";
   let update="http://dummy.restapiexample.com/api/v1/update/21";
   let delete1="http://dummy.restapiexample.com/api/v1/update/2";
   let find="	http://dummy.restapiexample.com/api/v1/employee/1";
    return (
      // <Provider store={store}>
      <div style={{paddingTop:"30px",paddingBottom:"10px",paddingLeft:"30px", paddingRight:"30px"}}>
        <Button style={{marginBottom:"10px"}} type="primary" onClick={()=>this.setState({data:{},visible:true})}>
          Add Employee
        </Button>
        <Table columns={columns}  dataSource={this.props.employees} size="middle" />
        <Modal
          title={this.state.data!={}?"Employee":"Employee"}
          visible={this.state.visible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <CreateEmployee  update={false} />
        </Modal>
        <Modal
          title="Update Employee"
          visible={this.state.updatevisible}
          // onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
        >
          <CreateEmployee data={this.state.editdata} update={true} />
        </Modal>
      </div>
      // </Provider>
    )
  }
}

App.propTypes={
  fetchEmployees:PropTypes.func.isRequired,
  deleteEmployees:PropTypes.func.isRequired,
  employees:PropTypes.array.isRequired,
  newEmployee:PropTypes.object
}
const mapStateToProps=(state)=>{
  return {
    employees:state.employee.items
  }
}
const mapDispachProps=(dispach)=>{
  return {
    getEmployee:()=>dispach({type:'FETCH_EMPOYEE'}),
    addEmployee:()=>dispach({type:'ADD_EMPLOYEE'})
  }
}
export default connect(mapStateToProps,{fetchEmployees, deleteEmployees})(App);
// export default connect(mapStateToProps,mapDispachProps)(App);