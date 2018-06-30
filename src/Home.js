import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './Home.css'

class Home extends Component {

    constructor(){
        super();

        this.state = {
            notification: ''
        }
    }

    onClick(){
        axios.get('/api/notification')
            .then(res=>{
                console.log(res.data);
                this.setState({notification:res.data})
            })
            .catch(err=>{
                console.log(err.response.data);
            })
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 style={{ color: 'white'}}>E-Boighor</h1>
                                <p style={{ color: 'white'}}>
                                    {' '}
                                    Welcome to Our Online BookStore
                                </p>
                                <hr />
                                <Link style ={{marginRight:'5px'}} to="/register" className="btn btn-lg btn-info mr-2">
                                    Sign Up
                                </Link>
                                <Link to="/login" className="btn btn-lg btn-success mr-2">
                                    Login
                                </Link>
                                <br/>
                                <button style={{marginTop:'10px'}} className="btn btn-lg btn-default" onClick={this.onClick.bind(this)}>Get Notifications</button>
                                <h2  style={{ color: 'white', marginTop:'10px'}}>{this.state.notification}</h2>
                                {this.state.notification ?
                                    <Link style ={{marginRight:'5px'}} to="/booklist" className="btn btn-lg btn-info mr-2">
                                    Go To Booklist
                                </Link>:''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
