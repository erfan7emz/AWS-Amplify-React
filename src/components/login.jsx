import React from 'react';
import Form from './form';
import Joi from "joi-browser";
import { login } from '../services/authService';
import Intro from './intro';

class Login extends Form {
    state = {
       data: { email: '', password: '' },
       errors: {}
    }

    schema = {
        email: Joi.string().required().label('Email'),
        password: Joi.string().required().label('Password'),
    };

    doSubmit = async () => {
        try {
            const { data } = this.state
            await login(data.email, data.password);
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
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
                {this.renderInput('email', 'Email')}
                {this.renderInput('password', 'Password', 'password')}
                {this.renderButton('Login')}
            </form>
        </div>);
    }
}
 
export default Login;