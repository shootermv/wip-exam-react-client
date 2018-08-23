import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Users} from './Users.js'
class App extends Component {
  constructor(props) {
    super(props);
    this.reload = false;
    this.state = {
      name: '',
      age:''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.send = this.send.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  send(e) {
    e.preventDefault();
    // validation
    if ( this.state.name.trim() === '' || !this.state.age ) { return; }
    this.reload = true;

    fetch('http://35.193.228.95:4000/users', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify( this.state ) // body data type must match "Content-Type" header
    })
    .then(response => {
      response.json();
      this.setState({
        name: '',
        age:''
      });
      this.reload = false;
    }) // parses response to JSON
    .catch(error => console.error(`Fetch Error =\n`, error));
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
         <input name="name" value={this.state.name} placeholder="name"
         onChange={this.handleInputChange}/><br/>
         <input name="age" type="number" value={this.state.age} placeholder="age"
         onChange={this.handleInputChange}/><br/>
         <button onClick={this.send}>submit</button>
        </p>
        <hr/>
        <div>
          <Users reload={this.reload}/>
        </div>
      </div>
    );
  }
}

export default App;
