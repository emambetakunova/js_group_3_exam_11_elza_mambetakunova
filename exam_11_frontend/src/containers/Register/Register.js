import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {Form, FormGroup, Col, Button, Alert} from "reactstrap";

import {registerUser} from "../../store/actions/userActions";
import FormElement from "../../components/UI/Form/FormElement";

class Register extends Component {
    state = {
        username: '',
        password: '',
        displayName: '',
        phoneNumber: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.registerUser({...this.state})
    };

    fieldHasError = fieldName => {
        return this.props.error && this.props.error.errors && this.props.error.errors[fieldName] && this.props.error.errors[fieldName].message;
    };

    render() {
        return (
            <Fragment>
                <h2 className="mb-4">Register new user</h2>
                {this.props.error && this.props.error.global && (
                    <Alert color="danger">
                        Check internet connection!
                    </Alert>
                )}
                <Form onSubmit={this.submitFormHandler}>

                    <FormElement
                        propertyName="username"
                        title="Username"
                        type="text"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('username')}
                        placeholder="Enter your username"
                        autoComplete="new-username"
                    />
                    <FormElement
                        propertyName="password"
                        title="Password"
                        type="password"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('password')}
                        placeholder="Enter secure password"
                        autoComplete="new-password"
                    />
                    <FormElement
                        propertyName="displayName"
                        title="Display name"
                        type="text"
                        value={this.state.displayName}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('displayName')}
                        placeholder="Enter Display name"
                        autoComplete="new-displayName"
                    />
                    <FormElement
                        propertyName="phoneNumber"
                        title="Phone number"
                        type="text"
                        value={this.state.phoneNumber}
                        onChange={this.inputChangeHandler}
                        error={this.fieldHasError('phoneNumber')}
                        placeholder="Enter your phone number"
                        autoComplete="new-phoneNumber"
                    />
                    <FormGroup row>
                        <Col sm={{offset: 2, size: 10}}/>
                        <Button type="submit" color="primary">Register</Button>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    error: state.user.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);