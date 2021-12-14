import React from 'react';
import Input from 'react-validation/build/input';
import TextArea from 'react-validation/build/textarea';
//import Select from 'react-validation/build/select';
export const TextField = React.forwardRef((props, ref) => (
	<Input type="text" innerref={ref} {...props} />
));
export const EmailField = React.forwardRef((props, ref) => (
	<Input type="email" innerref={ref} {...props} />
));
export const PasswordField = React.forwardRef((props, ref) => (
	<Input type="password" innerref={ref} {...props} />
));
export const TextAreaField = React.forwardRef((props, ref) => (
	<TextArea innerref={ref} {...props} />
));
export const HiddenField = ({ ...rest }) => (
	<Input type="hidden" {...rest} />
)
export const CheckboxField = ({ ...rest }) => (
	<Input type="checkbox" {...rest} />
)
export const RadioButtonField = ({ ...rest }) => (
	<Input type="radio" {...rest} />
)