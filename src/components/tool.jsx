import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCompanies } from '../services/companyService';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';
import { getSectors } from '../services/sectorService';
import ListGroup from './listGroup'
import { Link } from 'react-router-dom';
import SearchBar from './searchBar';
import Intro from './intro';
import Footer from './footer';

class Tool extends Component {
    state = {   
        companies: [],
        section: [],
        currentPage: 1,
        pageSize: 6,
        currentGroup: '',
        search: ''
    } 

    async componentDidMount() {
        const { data } = await getSectors();
        const section = [{ name: 'All'}, ...data]
        
        const { data: companies } = await getCompanies();

        this.setState({ companies, section});
    }

    handlePageChange = page => {
        this.setState({
            currentPage: page
        });
    }

    handleSectionSelect = section => {
        this.setState({
            currentGroup: section,
            currentPage: 1,
            search: ''
        });
    }

    handleSearch = query => {
        this.setState({
            search: query,
            currentGroup: null,
            currentPage: 1
        })
    }

    render() { 
        let filtered = this.state.companies;

        if(this.state.search) {
            filtered = this.state.companies.filter(c => c.name.toLowerCase().startsWith(this.state.search.toLowerCase()));
        } else if (this.state.currentGroup && this.state.currentGroup._id) {
            filtered = this.state.companies.filter(c => c.sector === this.state.currentGroup.name);
        }

        const tools = paginate(filtered, this.state.currentPage, this.state.pageSize);

        const count = filtered.length;

        return (
            <div>
                <Intro />
                <div className='row'>
                    <div className='col-3 col-3-style'>
                        <ListGroup currentGroup={this.state.currentGroup} items={this.state.section} onItemSelect={this.handleSectionSelect}/>
                    </div>
                    <div className="col">
                        <SearchBar value={this.state.search} onChange={this.handleSearch} />
                        <p>Showing {count} companies</p>
                        {tools.map(company => (
                                    <div key={company._id} className="card" style={{width: '20rem', height: '20rem',display: 'inline-block', border: 'solid 1px grey', margin: '3px'}}>
                                        <img src={require(`../images/${company.name.toLowerCase()}.jpeg`)} alt="company logo" style={{width: '15rem', height: '10rem', transform: 'translate(15%, 0%)'}}></img>
                                        <div className="card-body">
                                            <h5 className="card-title">{company.name}</h5>
                                            <Link to={`/tool/${company._id}`} className="btn btn-primary">Read More</Link>
                                        </div>
                                    </div>
                        ))}
                        <div style={{marginTop: '2rem', transform: 'translate(29%, 0%)'}}>
                            <Pagination itemsCount={count} currentPage={this.state.currentPage} pageSize={this.state.pageSize} onPageChange={this.handlePageChange}/>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
 
export default Tool;