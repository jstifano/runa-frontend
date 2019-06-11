import React, { Component } from 'react';
import './LoginComponent.css';
import imageLogo from '../../assets/images/logo_login.jpg';

import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { login } from '../../ducks/modules/users';

const validate = values => {
    const errors = {}
    if (!values.email) {
      errors.email = 'Email requerido.'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Correo electrónico inválido'
    }
    if (!values.password) {
      errors.password = 'Contraseña requerida.';
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

class LoginComponent extends Component {

    componentWillMount = () => {
        let session = localStorage.getItem('user');
        if(session){
            session = JSON.parse(session);
            if(session.role === 'admin'){
                this.props.history.push('/admin');
            }
            else {
                this.props.history.push('/employee');
            }
        }
    }

    /*******************************************************
    * Manipulacion del evento click en formulario de login *
    ********************************************************/
    handleClick = (event) => {
        event.preventDefault();
        if('syncErrors' in this.props.state.form.login){
            return;
        }
        else {
            let email = this.props.state.form.login.values.email;
            let password = this.props.state.form.login.values.password;
            
            // Generador de acción en Redux para el login de usuario
            login(email, password, response => {
                if(response.authenticate){
                    localStorage.setItem('user', JSON.stringify(response['user']) );
                    response.user.role === 'admin' ? this.props.history.push('/admin') :  this.props.history.push('/employee')
                }
            }, error => {
                console.log(error);
            })
        }
    }

    render(){
        return(
            <div className="absolute-screen flex-container">
                <div>
                    <img src={imageLogo} alt="Logo login" style={{width: 300, height: 200}}/>
                </div><br/><br/>
                <form className="mb-5">
                    <Field name="email" type="email" component={renderField} placeholder="Ingrese su correo electrónico" label="Correo electrónico"/>
                    <Field name="password" type="password" component={renderField} placeholder="Ingrese su contraseña" label="Contraseña" maxLength="16"/>
                    <button className="btn btn-primary" onClick={(event) => this.handleClick(event)}>Iniciar sesión</button>
                </form>
            </div>
        )
    }
}

// Redux form para el login
LoginComponent = reduxForm({
    form: 'login',
    fields: ['email', 'password'],
    validate: validate
})(LoginComponent);

// Mapeo de states a props del componente
const mapStateToProps = (state) => {
    return {
      state: state
    };
};

export default withRouter(connect(mapStateToProps, null)(LoginComponent));