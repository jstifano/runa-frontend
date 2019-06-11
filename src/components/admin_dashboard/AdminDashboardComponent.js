import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { getUsers } from '../../ducks/modules/users';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

class AdminDashboardComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            users: []
        };
    }

    componentWillMount = () => {
        let session = localStorage.getItem('user'); // Obtengo la sesion del localStorage
        if(!session) this.props.history.push('/login'); // Si no estoy autenticado, mando a login
    }

    componentDidMount = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        getUsers(user.id, response => {
            this.setState({
                users: response.users
            })
        }, error => {
            console.log(error);
        })
    }

    logout = () => {
        localStorage.removeItem('user');
        this.props.history.push('/login');
    }

    render(){
        return(
            <div className="pt-4" style={{display: 'flex', alignItems: 'center',width: '100%', height: '100%', position: 'absolute', flexDirection: 'column'}}>
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
                                    <td>
                                        <FontAwesomeIcon icon={Icons.faEdit} />
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <button className="btn btn-primary ml-5" style={{width: '10%'}} onClick={this.logout}> Cerrar sesión </button>
            </div>
        )
    }
}

export default withRouter(connect(null, null)(AdminDashboardComponent));

