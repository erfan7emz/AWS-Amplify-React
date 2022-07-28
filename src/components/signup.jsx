import React from 'react'
import Form from './form';
import Joi from "joi-browser";
import { register } from '../services/userService';
import { loginJwt } from '../services/authService';
import Intro from './intro';

class SignUp extends Form {
    state = {
        data: { firstname: '', lastname: '',
        email: '', phoneNo: '', password: ''},
        errors: {}
     }

    schema = {
        firstname: Joi.string().min(2).max(30).required().label('First Name'),
        lastname: Joi.string().min(2).max(30).required().label('Last Name'),
        email: Joi.string().min(2).max(100).email().required().label('Email'),
        phoneNo: Joi.string().max(20).label('Phone Number'),
        password: Joi.string().min(8).max(1024).required().label('Password')
    };
 
     doSubmit = async () => {
        try{
            const response = await register(this.state.data)
            loginJwt(response.headers['x-auth-token'])
            window.location = '/'
        } catch (ex) {
            if(ex.response && ex.response.status === 400) {
                const errors = {...this.state.errors};
                errors.email = ex.response.data;
                this.setState({ errors });
            }
        }
     }
     render() { 
         return (
         <div>
             <Intro />
             <h1>Sign up</h1>
             <form onSubmit={this.handleSubmit}>
                 {this.renderInput('firstname', 'First Name',)}
                 {this.renderInput('lastname', 'Last Name',)}
                 {this.renderInput('email', 'Email', 'email')}
                 {this.renderInput('phoneNo', 'Phone Number')}
                 {this.renderInput('password', 'Password', 'password')}
                 {this.renderButton('Sign up')}
             </form>
         </div>);
     }
}
 
export default SignUp;