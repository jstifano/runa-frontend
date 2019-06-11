import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';

class AdminDashboardComponent extends Component {
    componentWillMount = () => {
        let session = localStorage.getItem('user');
        if(!session) this.props.history.push('/login');
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
                        <tr>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>otto@gmail.com</td>
                            <td>admin</td>
                        </tr>
                    </tbody>
                </table>
                <button className="btn btn-info ml-5" style={{width: '10%'}} onClick={this.logout}> Cerrar sesión </button>
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

export default withRouter(connect(mapStateToProps, null)(AdminDashboardComponent));

