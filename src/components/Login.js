import React, { Component } from 'react';
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import {connect} from 'react-redux'
import Header from './Header'
import 'antd/dist/antd.css';
import '../styles/addProductsModal.css'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      userName: '',
      password: '',
      loginSuccess: false,
      loginClicked: false,
    }
  }

  onLoginClicked() {
    if (this.state.userName && this.state.password) {
      var loginSuccess = false
      this.props.userDetail.map((item, index) => {
        if (item.userName === this.state.userName && item.password === this.state.password) {
          loginSuccess = true
          localStorage.setItem("currentUserId", item.id)
          this.props.history.push('/tweets')
        }
      })
      this.setState({loginSuccess: loginSuccess, loginClicked: true})
    }
  }


  render() {
    return (
      <div>
        <Header history={this.props.history}/>
        <div className="login" style={{ margin: "100px auto", width: 300}}>
          <h2 style={{width: 300, textAlign: 'center'}}>LOGIN</h2>
          <div style={{paddingBottom: 30, width: 300}}>
            <div style={{marginBottom: 10}}>Username</div>
            <Input placeholder="User name" value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} className="input-box"/>
          </div>
          <div style={{paddingBottom: 30, width: 300}}>
            <div style={{marginBottom: 10}}>Password</div>
            <Input placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} className="input-box"/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button style={{width: 300}} onClick={() => this.onLoginClicked()}>Submit</Button>
            <Button style={{width: 300, marginTop: 30}} onClick={() => this.props.history.push('/signup')}>Sign Up first</Button>
          </div>
          {!this.state.loginSuccess && this.state.loginClicked && <span style={{fontSize: 10, color: 'red', textAlign: 'center', marginTop: 10}}> Invalid username or password </span>}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return(
    {userDetail: state.userDetail}
  )
}


export default connect(mapStateToProps)(Login);
