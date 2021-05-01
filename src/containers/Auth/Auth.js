import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';

import styles from './Auth.module.css';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
    
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig : {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                isValid: false,
                touched: false,
                errorMessage: 'Please enter a valid email',
                validation: {
                    required: true,
                    isEmail: true
                }
            },
            password: {
                elementType: 'input',
                elementConfig : {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                isValid: false,
                touched: false,
                errorMessage: 'Please enter a valid password',
                validation: {
                    required: true,
                    minLength: 6
                }
            }    
        },
        isSignUp: false
    };

    isValid(value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if(rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }


        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }


    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                isValid: this.isValid(event.target.value, this.state.controls[controlName].validation),
                touched: true
            } 
        }
        
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
             this.state.controls.password.value,
             this.state.isSignUp);
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }
    
    render() {
        let formElements = [];
        for(let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElements.map(input => {
                    return <Input
                                key={input.id}
                                elementType={input.config.elementType}
                                elementConfig={input.config.elementConfig}
                                value={input.config.value}
                                invalid={!input.config.isValid}
                                shouldValidate={input.config.validation}
                                errorMessage={input.config.errorMessage}
                                touched={input.config.touched}
                                changed={(event) => this.inputChangedHandler(event, input.id)}/>
                })}

                <Button buttonType='Success'>Submit</Button>
                <Button buttonType='Danger' clicked={this.switchAuthMode}>Switch To {this.state.isSignUp ? 'Sign In' : 'Sign Up'}</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner />; 
        }

        let error = null;
        if (this.props.error) {
            error = this.props.error.message;
        }

        let authRedirect = null;
        if(this.props.authenitcated) {
            authRedirect = <Redirect to="/" />;
        }

        return (
            <div className={styles.Auth}>
                <h1>{this.state.isSignUp ? 'Please Sign Up' : 'Please Sign In'}</h1>
                {authRedirect}
                {error}
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        authenitcated: state.auth.token !== null
    };
 };

 const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.authenticate(email, password, isSignUp))
    };
 };

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
