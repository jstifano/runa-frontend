import React, { Component } from 'react';
import { reduxForm, Field, change } from 'redux-form';
import { connect } from "react-redux";
import { withRouter } from 'react-router';

const validate = values => {
    const errors = {}
    if (!values.first_name) {
      errors.first_name = 'Nombre requerido.';
    } else if (!/^[a-zA-Zñáéíóú ]+$/.test(values.first_name)) {
      errors.first_name = 'Nombre inválido.';
    }
    if (!values.last_name) {
      errors.last_name = 'Apellido requerido.';
    } else if ( !/^[a-zA-Zñáéíóú ]+$/.test(values.last_name)) {
      errors.last_name = 'Apellido inválido.';
    }
    if (!values.email) {
        errors.email = 'Email requerido.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Correo electrónico inválido'
    }
    return errors
}

const renderField = ({
    input,
    label,
    type,
    placeholder,
    meta: { touched, error, warning }
}) => (
    <div className="form-group">
        <label><b>{label}</b></label>
        <input {...input} placeholder={placeholder} type={type} className="form-control" style={{width: 300}}/>
        { touched && ((error && <small style={{color: 'red'}}>{error}</small>) || (warning && <span>{warning}</span>)) }
    </div>
)

class FormEditEmployee extends Component {

    componentWillMount(){
        let data = JSON.parse(localStorage.getItem('employee'));
        this.props.dispatch(change('edit', 'first_name', data.first_name));
        this.props.dispatch(change('edit', 'last_name', data.last_name));
        this.props.dispatch(change('edit', 'email', data.email));
    }

    handleClick(event){
        event.preventDefault();
        console.log("ok", this.props);
    }

    render(){
        return (
            <div className="absolute-screen flex-container">
                <form className="mb-5">
                    <Field name="first_name" type="text" component={renderField} placeholder="Ingrese el primer nombre" label="Nombre" maxLength="30"/>
                    <Field name="last_name" type="text" component={renderField} placeholder="Ingrese el apellido" label="Apellido" maxLength="30"/>
                    <Field name="email" type="email" component={renderField} placeholder="Ingrese su correo electrónico" label="Correo electrónico"/>
                    <button className="btn btn-primary" onClick={(event) => this.handleClick(event)}>Editar</button>
                </form>
            </div>
        )
    }
}

// Redux form para el login
FormEditEmployee = reduxForm({
    form: 'edit',
    fields: ['first_name', 'last_name', 'email'],
    validate: validate
})(FormEditEmployee);

// Mapeo de states a props del componente
const mapStateToProps = (state) => {
    return {
      state: state
    };
};

export default withRouter(connect(mapStateToProps, null)(FormEditEmployee));