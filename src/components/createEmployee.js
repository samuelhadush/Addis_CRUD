import React, { Component } from 'react';
import { Form, Input, Button } from "antd";
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { createEmployee,updateEmployees } from "../actions/employeeActions";

import PropTypes from 'prop-types';

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
  //   this.setState({
  //     employee_age:this.props.data?this.props.data.employee_age:"",
  //     employee_name:this.props.data?this.props.data.employee_name:"",
  //     employee_salary:this.props.data?this.props.data.employee_salary:""

  // });
    // this.props.fetchEmployees();
  }
  updateData=()=> {
      let data={
        employee_name:this.state.employee_name?this.state.employee_name:"",
        employee_age:this.state.employee_age?this.state.employee_age:"",
        employee_salary:this.state.employee_salary?this.state.employee_salary:"",
      }
      this.props.updateEmployees(this.props.data.id,data)
  }

  onChange=e=>{
    this.setState({[e.target.name]:e.target.value},()=>{
        console.log(this.state);
    });
  }

  handleSubmit=()=>{
    const employeeInfo={
      employee_name:this.state.employee_name?this.state.employee_name:"",
      employee_age:this.state.employee_age?this.state.employee_age:"",
      employee_salary:this.state.employee_salary?this.state.employee_salary:"",
      // employee_profile:""
    }
    // console.log(employeeInfo);
    this.props.createEmployee(employeeInfo);

  }
 
  render() {
//    let data=[ ...this.state.employees];
   let create="http://dummy.restapiexample.com/api/v1/create";
   let update="http://dummy.restapiexample.com/api/v1/update/21";
   let delete1="http://dummy.restapiexample.com/api/v1/update/2";
   let find="	http://dummy.restapiexample.com/api/v1/employee/1";
   let {employee_name,employee_age,employee_salary}=this.state;
   console.log(this.props.data,this.state.employee_salary);
    return (
      // <Provider store={store}>
      <div style={{paddingTop:"30px",paddingBottom:"10px",paddingLeft:"30px", paddingRight:"30px"}}>
         <Form  className="login-form">
            <Form.Item>
                <Input
                  // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  value={this.state.employee_name?this.state.employee_name:this.props.data?this.props.data.employee_name:""}
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
                  value={this.state.employee_age?this.state.employee_age:this.props.data?this.props.data.employee_age:""}
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
                  value={this.state.employee_salary?this.state.employee_salary:this.props.data?this.props.data.employee_salary:""}
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