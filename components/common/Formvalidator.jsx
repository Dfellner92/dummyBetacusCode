import React from 'react';
import validator from 'validator';
export const required = (value, props) => {
  if (typeof value !== 'undefined' && value !== null) {
    if (!value.toString().trim().length) {
      props.isValid = false;
      let error = "This field is required."
      return <div className="validate-error">{error}</div>;
    }
  }
};
// export default required;
export const email = (value) => {
  if (value !== '') {
    if (!validator.isEmail(value)) {
      let error = "Please enter valid email address."
      return <div className="validate-error">{error}</div>
    }
  }
};

/*export const lt = (value, props) => {
  // get the maxLength from component's props
  if (!value.toString().trim().length > props.maxLength) {
    // Return jsx
    return <span className="error">The value exceeded {props.maxLength} symbols.</span>
  }
};*/
 
export const password = (value, props, components) => {
  // NOTE: Tricky place. The 'value' argument is always current components value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['confirmPassword'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    let error = "Passwords are not equal."
    return <div className="validate-error">{error}</div>;
  }
};

export const confirmPassword = (value, props, components) => {
  // NOTE: Tricky place. The 'value' argument is always current components value.
  // So in case we're 'changing' let's say 'password' component - we'll compare it's value with 'confirm' value.
  // But if we're changing 'confirm' component - the condition will always be true
  // If we need to always compare own values - replace 'value' with components.password[0].value and make some magic with error rendering.
  if (value !== components['password'][0].value) { // components['password'][0].value !== components['confirm'][0].value
    // 'confirm' - name of input
    // components['confirm'] - array of same-name components because of checkboxes and radios
    let error = "Passwords are not equal."
    return <div className="validate-error">{error}</div>;
  }
};

export const number = (value)  => { 
  if (!validator.isNumeric(value)) {
    let error = "Only accept numbers."
    return <div className="validate-error">{error}</div> 
  }
};

export const max = (value, props) =>{
  if (typeof value !== 'undefined') {
    if (value.length > props.maxLength) {
      const maxLength = props.minLength;
      let error = "Please enter less than {{maxLength}} characters."
      return <div className="validate-error">{error}</div>;
    }
  }
};

export const min =(value, props) =>{
  if (typeof value !== 'undefined') {
    if (value.length < props.minLength) {
      const minLength = props.minLength;
      let error = "Please enter greater than {{minLength}} characters."
      return <div className="validate-error">{error}</div>;
    }
  }
}