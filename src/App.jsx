import React, { Component } from 'react'
import Tool from './components/tool';
import { Route, Routes} from 'react-router-dom';
import { ToastContainer } from  'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import List from './components/list';
import NotFound from './components/not-found';
import Navbar from './components/navbar'
import Company from './components/company';
import Login from './components/login';
import SignUp from './components/signup';
import Logout from './components/logout';
import { getUser } from './services/authService';
import './App.css'

class App extends Component {
    state={}

    async componentDidMount() {
        const user = getUser();
        this.setState({user})
    }
    render() { 
        return (
            <>
            <ToastContainer />
            <Navbar user={this.state.user}/>
            <main className="container">
                <Routes>
                    <Route path='/' element={<Tool />}></Route>
                    <Route path='/tool/:id' element={<Company user={this.state.user}/> }></Route>
                    <Route path='/tool' element={<Tool />}></Route>
                    <Route path='/list' element={<List />}></Route>
                    <Route path='/sign-up' element={<SignUp />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/logout' element={<Logout />}></Route>
                    <Route path='/not-found' element={<NotFound />}></Route>
                    <Route path='*' element={<NotFound />}></Route>
                </Routes>
            </main>
            </>
        );
    }
}
 
export default App;