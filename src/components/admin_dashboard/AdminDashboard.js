import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { getUsers, deleteUser } from '../../ducks/modules/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

class AdminDashboard extends Component {

    constructor(props){
        super(props);
        this.state = {
            users: []
        };
    }

    componentDidMount = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        // Si no estoy autenticado, mando a login
        if(!user) {
            this.props.history.push('/login');
        }
        else {
            getUsers(user.id, response => {
                this.setState({
                    users: response.users
                })
            }, error => {
                console.log(error);
            })
        }
    }

    /**************************************************************
    * Simulo el logout dentro de la aplicación, matando la sesión *
    ***************************************************************/
    logout = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login');
    }

    /***********************************
    * Metodo para eliminar un empleado *
    ************************************/
    onDeleteUser = (data) => {
        MySwal.fire({
            title: '¿Quieres eliminar el empleado seleccionado?',
            type: 'question',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            showCancelButton: true
        }).then(result => {
            if('value' in result){
                deleteUser(data, response => {
                    if(response.data.deleted){
                        MySwal.fire({
                            title: 'Eliminado exitosamente,',
                            type: 'success',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        })
                        this.setState({
                            users: this.state.users.filter(user => user.id !== data)
                        })
                    }
                    else {
                        MySwal.fire({
                            title: 'No se pudo eliminar el empleado.',
                            type: 'error',
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000
                        })
                    }
                })
            }
        })
    }

    /**************************************************************
    * Método para visualizar las entradas y salidas de un usuario * 
    ***************************************************************/
    goToEntries = (data) => {
        localStorage.setItem('employee', JSON.stringify(data));
        this.props.history.push('/employee/entries/'+data.id);
    }

    /***********************************
    * Método para editar a un empleado *
    ************************************/
    goToEdit = (data) =>{
        localStorage.setItem('employee', JSON.stringify(data));
        this.props.history.push('/employee/edit/'+data.id);    
    }

    addEntry = (data) => {
        localStorage.setItem('employee', JSON.stringify(data));
        this.props.history.push('/employee/entry/add/'+data.id);
    }

    goToAddEmployee = () => {
        this.props.history.push('/employee/add');    
    }

    render(){
        return(
            <div className="pt-4" style={{display: 'flex', alignItems: 'center',width: '100%', height: '100%', position: 'absolute', flexDirection: 'column'}}>
                <h4><b>Empleados</b></h4><br />
                <table className="table table-bordered" style={{width: '60%'}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Correo</th>
                            <th scope="col">Rol</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map(user => {
                                return <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td style={{cursor: 'pointer'}}>
                                        <span  onClick={() => this.goToEdit(user)}><FontAwesomeIcon icon={Icons.faEdit} /></span>&nbsp;&nbsp;&nbsp;
                                        <span onClick={() => this.onDeleteUser(user.id)}><FontAwesomeIcon icon={Icons.faTrashAlt} /></span>&nbsp;&nbsp;&nbsp;
                                        <span onClick={() => this.goToEntries(user)}><FontAwesomeIcon icon={Icons.faExchangeAlt}/></span>&nbsp;&nbsp;&nbsp;
                                        <span onClick={() => this.addEntry(user)}><FontAwesomeIcon icon={Icons.faPlus}/></span>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <br /><br />
                <button className="btn btn-success ml-5" style={{width: '13%', alignSelf: 'flex-end', position: 'relative', right: '20%'}} onClick={() => this.goToAddEmployee()}><FontAwesomeIcon icon={Icons.faPlus} />&nbsp;Agregar empleado</button>
                <button className="btn btn-primary ml-5" style={{width: '10%', alignSelf: 'flex-start', position: 'relative', left: 262, bottom: 32}} onClick={this.logout}><FontAwesomeIcon icon={Icons.faSignOutAlt} />&nbsp; Cerrar sesión </button>
            </div>
        )
    }
}

// Mapeo de states a props del componente
const mapStateToProps = (state) => {
    return {
      state: state
    };
};

export default withRouter(connect(mapStateToProps, null)(AdminDashboard));

