import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';

class TableEntryByEmployee extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: null
        }
    }

    componentWillMount(){
        let userData = JSON.parse(localStorage.getItem('employee'));
        let user = JSON.parse(localStorage.getItem('user'));

        if(!user){
            this.props.history.push('/login');
        }
        else {
            this.setState({
                user: userData
            })
        }

    }

    componentWillUnmount(){
        localStorage.removeItem('employee');
    }

    render(){
        return (
            <div className="pt-4" style={{display: 'flex', alignItems: 'center',width: '100%', height: '100%', position: 'absolute', flexDirection: 'column'}}>
                <h4>Fechas de entrada/salida de <b>{this.state.user.first_name}</b></h4><br />
                <table className="table table-bordered" style={{width: '60%'}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Fecha de entrada</th>
                            <th scope="col">Fecha de salida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            /* this.state.users.map(user => {
                                return <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td style={{cursor: 'pointer'}}>
                                        <span><FontAwesomeIcon icon={Icons.faEdit} /></span>&nbsp;&nbsp;&nbsp;
                                        <span onClick={() => this.onDeleteUser(user.id)}><FontAwesomeIcon icon={Icons.faTrashAlt} /></span>&nbsp;&nbsp;&nbsp;
                                        <span><FontAwesomeIcon icon={Icons.faExchangeAlt}/></span>
                                    </td>
                                </tr>
                            }) */
                        }
                    </tbody>
                </table><br /><br />
                <button className="btn btn-primary bt-lg ml-5" style={{width: '10%'}} onClick={() => this.props.history.goBack()}> Volver atrás </button>
            </div>
        )
    }

}

export default withRouter(connect(null, null)(TableEntryByEmployee));
