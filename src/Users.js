
import React, { Component } from 'react';


export class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
        users: []
    };
    this.fetchUsers = this.fetchUsers.bind(this)
  }

  fetchUsers() {
    fetch('http://35.193.228.95:4000/users')
    .then(response=>response.json())
    .then(users=>{
        this.setState({users});
    })
    .catch(error => {
        console.error(`Fetch Error =\n`, error);
    });
  } 

 componentDidMount() {
    this.fetchUsers()
 }

 componentDidUpdate(prevProps, prevState, snapshot){
    prevProps.reload!==this.props.reload && this.fetchUsers()
 }

  render() {
    const { users } =  this.state;
    return (
      <div>
       {users.length === 0 && 'No Users Yet' }
       <div>{users.map((user, idx) => <div key={idx} className="user-row"><span>{user.name}</span><span>{user.age}</span></div>)}</div>
      </div>
    );
  }

}