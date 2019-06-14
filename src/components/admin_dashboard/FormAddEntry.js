import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { reduxForm, Field, reset } from 'redux-form';
import { createEntry } from '../../ducks/modules/entry';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

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

class FormAddEntry extends Component {

    constructor(props){
        super(props);
        this.state = {
            employee: {}
        }
    }

    componentDidMount = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            this.props.history.push('/login');
        }
        this.setState({
            employee: JSON.parse(localStorage.getItem('employee'))
        })
    }

    /*******************************************************
    * Metodo para transformar horas con meridiano (AM, PM) *
    ********************************************************/ 
    timeConvert = (hour) => {
        let timeSplit = hour.split(':');
        let hours = timeSplit[0];
        let minutes = timeSplit[1];
        let meridian;

        if (hours > '12') {
            meridian = 'PM';
            hours -= 12;
        } else if (hours < '12') {
            meridian = 'AM';
            if (hours === '0') {
                hours = 12; 
            }
        } else {
            meridian = 'PM';
        }
        return (hours + ':' + minutes + meridian);
    }

    /*******************************************
    * Agregar una entrada / salida al empleado *
    ********************************************/
    handleClick = (event) => {
        event.preventDefault();
        if('syncErrors' in this.props.state.form.addEntry){
            return;
        }
        else {
            let arrival = this.timeConvert(this.props.state.form.addEntry.values.arrivalHour);
            let departure = this.timeConvert(this.props.state.form.addEntry.values.departureHour);

            let entry = {
                arrivalDate: this.props.state.form.addEntry.values.arrivalDate + ' ' + arrival,
                departureDate: this.props.state.form.addEntry.values.departureDate + ' ' + departure,
                id_user: this.state.employee.id
            }
            createEntry(entry, response => {
                if(response.code === 200){
                    MySwal.fire({
                        title: 'Entrada y salida agregada.',
                        type: 'success',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.props.dispatch(reset('addEntry'));
                }
                else {
                    MySwal.fire({
                        title: 'No se pudo agregar la entrada | salida.',
                        type: 'error',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    })
                }
            })
        }
    }

    goToAdmin = (event) => {
        event.preventDefault();
        this.props.history.push('/admin');
    }

    cleanForm = () => {
        this.props.state.form.addEntry.values.arrivalDate = null;
        this.props.state.form.addEntry.values.departureDate = null;
        this.props.state.form.addEntry.values.arrivalHour = null;
        this.props.state.form.addEntry.values.departureHour = null;
    }

    render(){
        return (
            <div className="absolute-screen flex-container">
                <h6>Agregar entrada/salida para | <b>{this.state.employee.first_name}</b></h6><br />
                <form className="mb-5">
                    <Field name="arrivalDate" type="date" component={renderField} label="Fecha de entrada"/>
                    <Field name="arrivalHour" type="time" component={renderField} label="Hora de entrada" />
                    <Field name="departureDate" type="date" component={renderField} label="Fecha de salida"/>
                    <Field name="departureHour" type="time" component={renderField} label="Hora de salida"/>
                    <button className="btn btn-primary" onClick={(event) => this.handleClick(event)}>Marcar entrada/salida</button>
                    <button className="btn btn-danger" style={{float: 'right'}} onClick={(event) => this.goToAdmin(event)}>Volver atrás</button>
                </form>
            </div>
        );
    }
}

// Redux form para el login
FormAddEntry = reduxForm({
    form: 'addEntry',
    fields: ['arrivalDate', 'arrivalHour', 'departureDate', 'departureHour'],
    enableReinitialize: true
})(FormAddEntry);

// Mapeo de states a props del componente
const mapStateToProps = (state) => {
    return {
      state: state
    };
};

export default withRouter(connect(mapStateToProps, null)(FormAddEntry));