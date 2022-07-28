import React, { Component } from 'react'
import { getCompanies } from '../services/companyService';
import Intro from './intro';

class List extends Component {
    state = { 
        companies: []
    }
    async componentDidMount() {
        const { data: companies } = await getCompanies();
        this.setState({ companies});
    } 
    render() { 
        return (
            <div>
                <Intro />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sector</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.companies.map(company => (
                        <tr key={company._id}>
                            <td>{company.name}</td>
                            <td>{company.sector}</td>
                            <td>{company.description}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default List;