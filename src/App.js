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
     let newEmp= {
        employee_name:nextProps.newEmployee.name,
        employee_age:nextProps.newEmployee.age,
        employee_salary:nextProps.newEmployee.salary
       }
      // let {name:employee_name,salary:employee_salary,age:employee_age}=newEmp;
      this.props.employees.unshift(newEmp);
    }
    // if(nextProps.updatedEmployee){
    //   this.props.employees.unshift(nextProps.updatedEmployee);
    // }
  }
  componentDidMount=()=>{
  }

  deleteEmployee=(record)=>{
    this.props.deleteEmployees(record.id);
    this.props.fetchEmployees();
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
    this.setState({[e.target.name]:e.target.target});
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
        // sorter: (a, b) => a.salary - b.salary,
        // sortOrder: "salary" === 'employee_salary' && {"order":'descend',"columnKey":"salary"},

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
    return (
      // <Provider store={store}>
      <div style={{paddingTop:"30px",paddingBottom:"10px",paddingLeft:"30px", paddingRight:"30px"}}>
        <Button style={{marginBottom:"10px"}} type="primary" onClick={()=>this.setState({data:{},visible:true})}>
          Add Employee
        </Button>
        <Table columns={columns}  dataSource={this.props.employees} size="middle" />
        <Modal
          title="Add Employee"
          visible={this.state.visible}
          // forceRender={true}
          // onOk={this.handleOk}
          destroyOnClose={true}
          onCancel={this.handleCancel}
          footer={null}
        >
          <CreateEmployee  update={false} cancel={this.handleCancel} />
        </Modal>
        <Modal
          title="Update Employee"
          visible={this.state.updatevisible}
          // onOk={this.handleOk}
          // forceRender={true}
          destroyOnClose={true}
          onCancel={this.handleCancel}
          footer={null}
        >
          <CreateEmployee data={this.state.editdata} update={true} cancel={this.handleCancel} />
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
  newEmployee:PropTypes.object,
  updatedEmployee:PropTypes.object

}
const mapStateToProps=(state)=>{
  return {
    employees:state.employee.items,
    newEmployee:state.employee.item,
    updatedEmployee:state.employee.update
  }
}
const mapDispachProps=(dispach)=>{
  return {
    getEmployee:()=>dispach({type:'FETCH_EMPOYEE'}),
    addEmployee:()=>dispach({type:'ADD_EMPLOYEE'})
  }
}
export default connect(mapStateToProps,{fetchEmployees, deleteEmployees})(App);