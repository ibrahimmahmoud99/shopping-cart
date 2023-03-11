import React, { Component } from 'react';
import Joi from "joi-browser";

class Login extends Component {
    state = { 
        username: "",
        password:"",
        errors: {}
     };

     schema = {
        username: Joi.string().required(),
        password: Joi.string().required()
     };

         handleSubmit = e =>{
            e.preventDefault();
            const errors = this.validate();
            if (errors) return;
            console.log("submit");  
    };

    validate = () => {
        const errors = {};
        const state = {...this.state};
        delete state.errors;
        const res = Joi.validate(state, this.schema, {abortEarly:false});
        if (res.error === null) {
            this.setState({errors: {}});
            return null;
        }
        for (const error of res.error.details) {
            errors[error.path] = error.message;
        }
        this.setState({errors});
        return errors;
    };

    handleChange = e => {

        let state = {...this.state};
        state[e.currentTarget.name] = e.currentTarget.value;
        this.setState (state);
    }
    render() { 
        return (
                <React.Fragment>
            <h1>Login</h1>

            <form onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor="username" className="form-label">Username</label>
                    <input 
                    name='username'
                    value={this.state.username}
                    onChange={this.handleChange}
                    autoFocus
                     type="text" className="form-control" 
                     id="username"/>
                     {this.state.errors.username && (
                        <div className='alert alert-danger'>
                        {this.state.errors.username}
                        </div>
                     )}                
                     </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                    name='password'
                    onChange={this.handleChange}
                    value={this.state.password}
                     id="password" 
                     type="password" 
                     className="form-control"/>
                     {this.state.errors.password && (
                        <div className='alert alert-danger'>
                        {this.state.errors.password}
                        </div>
                     )}
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </React.Fragment>
        );
    }
}
 
export default Login;