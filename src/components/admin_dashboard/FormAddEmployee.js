import React, { Component } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { addUser } from "../../ducks/modules/users";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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
    if (!values.password) {
        errors.password = 'Contraseña requerida.'
    } else if ( values.password.length < 4) {
        errors.password = 'La contraseña debe ser mayor a 4 caracteres';
    } else if (values.password.length > 16 ) {
        errors.password = 'La contraseña debe ser menor a 16 caracteres';
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

class FormAddEmployee extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: {}
        };
    }

    handleClick = (event) => {
        event.preventDefault();

        addUser(this.props.state.form.add.values, response => {
            if(response.data.code === 200){
                MySwal.fire({
                    title: 'Se añadió el empleado exitosamente.',
                    type: 'success',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                })
                this.props.dispatch(reset('add'));
            }
            else {
                MySwal.fire({
                    title: response.data.message,
                    type: 'error',
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 3000
                })    
            }
        })
    }

    goToAdmin = (event) => {
        event.preventDefault();
        this.props.history.push('/admin');
    }

    render(){
        return (
            <div className="absolute-screen flex-container">
                <h6>Agregar empleado</h6><br />
                <form className="mb-5">
                    <Field name="first_name" type="text" component={renderField} placeholder="Ingrese el primer nombre" label="Nombre" maxLength="30"/>
                    <Field name="last_name" type="text" component={renderField} placeholder="Ingrese el apellido" label="Apellido" maxLength="30"/>
                    <Field name="email" type="email" component={renderField} placeholder="Ingrese su correo electrónico" label="Correo electrónico"/>
                    <Field name="password" type="password" component={renderField} placeholder="Ingrese su contraseña nueva" label="Contraseña"/>
                    <button className="btn btn-primary" onClick={(event) => this.handleClick(event)}>Agregar</button>
                    <button className="btn btn-danger" style={{float: 'right'}} onClick={(event) => this.goToAdmin(event)}>Volver atrás</button>
                </form>
            </div>
        )
    }
}

// Redux form para el login
FormAddEmployee = reduxForm({
    form: 'add',
    fields: ['first_name', 'last_name', 'email', 'password'],
    validate: validate,
    enableReinitialize: true
})(FormAddEmployee);

// Mapeo de states a props del componente
const mapStateToProps = (state) => {
    return {
      state: state
    };
};

export default withRouter(connect(mapStateToProps, null)(FormAddEmployee));