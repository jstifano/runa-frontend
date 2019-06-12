import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router';
import { getEntriesByEmployee } from '../../ducks/modules/entry';

class TableEntryByEmployee extends Component {

    constructor(props){
        super(props);
        this.state = {
            user: null,
            entries: []
        }
    }

    componentWillMount = () => {
        let employeeData = JSON.parse(localStorage.getItem('employee'));
        let userData = JSON.parse(localStorage.getItem('user'));

        if(!userData){
            this.props.history.push('/login');
        }
        else {
            this.setState({
                employee: employeeData,
                user: userData
            })
        }
    }

    componentWillUnmount = () => {
        localStorage.removeItem('employee');
    }

    componentDidMount = () => {
        getEntriesByEmployee(this.state.employee.id, (response) => {
            console.log("jii", response);
            this.setState({
                entries: response.entries
            })
        })
    }

    render(){
        return (
            <div className="pt-4" style={{display: 'flex', alignItems: 'center',width: '100%', height: '100%', position: 'absolute', flexDirection: 'column'}}>
                <h6>Fechas de entrada/salida | <b>{this.state.employee.first_name}</b></h6><br />
                <table className="table table-bordered" style={{width: '60%'}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Fecha de entrada</th>
                            <th scope="col">Hora de entrada</th>
                            <th scope="col">Fecha de salida</th>
                            <th scope="col">Hora de salida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.entries.map((entry, index) => {
                                return <tr key={entry.id}>
                                    <td>{index+1}</td>
                                    <td>{entry.arrival_date.split(' ')[0]}</td>
                                    <td>{entry.arrival_date.split(' ')[1]}</td>
                                    <td>{entry.departure_date.split(' ')[0]}</td>
                                    <td>{entry.departure_date.split(' ')[1]}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table><br /><br />
                <button className="btn btn-danger bt-lg ml-5" style={{width: '10%'}} onClick={() => this.props.history.goBack()}> Volver atrás </button>
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

export default withRouter(connect(mapStateToProps, null)(TableEntryByEmployee));
