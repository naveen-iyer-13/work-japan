import React, { Component } from 'react';
import '../styles/header.css';

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      showLogout: false,
    }
  }

  componentWillMount() {
    var userId = localStorage.getItem("currentUserId")
    if (userId) {
      this.setState({showLogout: true})
    }
  }

  logout() {
    localStorage.removeItem("currentUserId")
    this.setState({showLogout: false})
    this.props.history.push('/login')
  }

  render() {
    return (
      <div className="header">
        Work Japan
        {this.state.showLogout && <span style={{float: 'right', cursor: 'pointer'}} onClick={() => this.logout()}>Logout</span>}
      </div>
    );
  }
}

export default Header;
