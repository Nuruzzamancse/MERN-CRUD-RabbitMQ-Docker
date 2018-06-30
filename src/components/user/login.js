import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Create extends Component {

    constructor() {
        super();
        this.state = {
            password: '',
            username: ''
        };
    }
    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { password, username} = this.state;

        axios.post('/api/auth/login', { password, username })
            .then((result) => {
                console.log(result.data);
                this.props.history.push("/booklist")
            });
    }

    render() {
        const { password, username } = this.state;
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            LOGIN USER
                        </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to="/"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Home</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="author">User:</label>
                                <input type="text" class="form-control" name="username" value={username} onChange={this.onChange} placeholder="User" />
                            </div>
                            <div class="form-group">
                                <label for="description">Password:</label>
                                <input type="password" class="form-control" name="password" onChange={this.onChange} placeholder="Password" />
                            </div>
                            <button type="submit" class="btn btn-default">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Create;
