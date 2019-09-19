import React, { Component } from 'react';
import { Form, Input, Button } from "antd";
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { createEmployee,updateEmployees,fetchEmployees } from "../actions/employeeActions";

import PropTypes from 'prop-types';
import { async } from 'q';

class CreateEmployee extends Component {
  constructor(props){
    super(props);
    this.state={
        employee_age:this.props.data?this.props.data.employee_age:"",
        employee_name:this.props.data?this.props.data.employee_name:"",
        employee_salary:this.props.data?this.props.data.employee_salary:""

    }
  }
  componentWillMount=()=>{
    // this.props.fetchEmployees();
  }
  componentDidMount=()=>{

  }
  updateData=async()=> {
      let data={
        name:this.state.employee_name?this.state.employee_name:"",
        age:this.state.employee_age?this.state.employee_age:"",
        salary:this.state.employee_salary?this.state.employee_salary:"",
      }
      await this.props.updateEmployees(this.props.data.id,data);
      // this.props.fetchEmployees();
      this.props.cancel();
  }

  onChange=e=>{
    this.setState({[e.target.name]:e.target.value},()=>{
        console.log(this.state);
    });
  }

  handleSubmit=async()=>{
    const employeeInfo={
      name:this.state.employee_name?this.state.employee_name:"",
      age:this.state.employee_age?this.state.employee_age:"",
      salary:this.state.employee_salary?this.state.employee_salary:"",
      // employee_profile:""
    }
    // console.log(employeeInfo);
    await this.props.createEmployee(employeeInfo);
    this.props.cancel();

  }
 
  render() {
   let {employee_name,employee_age,employee_salary}=this.state;
    return (
      // <Provider store={store}>
      <div style={{paddingTop:"30px",paddingBottom:"10px",paddingLeft:"30px", paddingRight:"30px"}}>
         <Form  className="login-form">
            <Form.Item>
                <Input
                  // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={this.state.employee_name?this.state.employee_name:""}
                  // value={this.props.data?this.props.data.employee_name:this.state.employee_name}
                  placeholder="Employee Name"
                  name="employee_name"
                  onChange={this.onChange}
                />
            </Form.Item>
            <Form.Item>
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  name="employee_age"
                  value={this.state.employee_age?this.state.employee_age:""}
                  // value={this.props.data?this.props.data.employee_age:this.state.employee_age}
                  placeholder="Age"
                  onChange={this.onChange}
                />
            </Form.Item>
            <Form.Item>
                <Input
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  prefix="$"
                  name="employee_salary"
                  value={this.state.employee_salary?this.state.employee_salary:""}
                  // value={this.props.data?this.props.data.employee_salary:this.state.employee_salary?this.state.employee_salary:""}
                  placeholder="Salary"
                  onChange={this.onChange}

                />
            </Form.Item>
            {!this.props.update?
            <Form.Item>
              <Button type="primary" onClick={this.handleSubmit} className="login-form-button">
               Save
              </Button>
            </Form.Item>:
             <Form.Item>
             <Button type="primary" onClick={this.updateData} className="login-form-button">
              Update
             </Button>
           </Form.Item>
          }
          </Form>
      </div>
      // </Provider>
    )
  }
}

CreateEmployee.propTypes={
  createEmployee:PropTypes.func.isRequired,
  updateEmployees:PropTypes.func.isRequired
}
// const mapStateToProps=(state)=>{
//   return {
//     employee:state.employee.item
//   }
// }
// const mapDispachProps=(dispach)=>{
//   return {
//     getEmployee:()=>dispach({type:'FETCH_EMPOYEE'}),
//     addEmployee:()=>dispach({type:'ADD_EMPLOYEE'})
//   }
// }
export default connect(null,{createEmployee, updateEmployees})(CreateEmployee);