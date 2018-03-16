import React, { Component } from 'react';
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Header from './Header'
import {connect} from 'react-redux'
import {setUserData} from '../redux/actions'
import 'antd/dist/antd.css';
import '../styles/addProductsModal.css'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      userName: '',
      firstName: '',
      password: '',
      checkUserName: false,
      checkUserNameButtonClicked: false,
    }
  }

  componentWillMount() {
    // var userId = localStorage.getItem("currentUserId")
  }

  checkForUserName() {
    if (this.state.userName) {
      var checkUserName = true
      this.props.userDetail.map((item, index) => {
        if (item.userName === this.state.userName) {
          checkUserName = false
        }
      })
      this.setState({checkUserName: checkUserName, checkUserNameButtonClicked: true})
    }
  }

  signUp() {
    // this.checkForUserName()
    var { firstName, userName, password, checkUserName } = this.state
    if (firstName && userName && password && checkUserName) {
      if (this.props.userDetail.length === 0) {
        var userDetail = this.props.userDetail
        userDetail.push({firstName: firstName, userName: userName, password: password, id: 1})
      }
      else {
        var userDetail = this.props.userDetail
        userDetail.push({firstName: firstName, userName: userName, password: password, id: this.props.userDetail.length+1})
      }
      this.props.setUserData(userDetail)
      this.props.history.push('/login')
    }
  }

  render() {
    return (
      <div>
        <Header  history={this.props.history}/>
        <div className="login" style={{ margin: 100}}>
          <h2 style={{width: 300, textAlign: 'center'}}>SIGN UP</h2>
          <div style={{paddingBottom: 30, width: 300}}>
            <div style={{marginBottom: 10}}>First Name</div>
            <Input placeholder="User name" value={this.state.firstName} onChange={(e) => this.setState({firstName: e.target.value})} className="input-box"/>
          </div>
          <div style={{paddingBottom: 30, width: 300}}>
            <div style={{marginBottom: 10}}>Username</div>
            <div style={{display: 'flex'}}>
              <Input placeholder="User name" value={this.state.userName} onChange={(e) => this.setState({userName: e.target.value})} className="input-box"/>
              <Button style={{width: 100, fontSize: 10, marginLeft: 20}} onClick={() => this.checkForUserName()}>Check if unique</Button>
            </div>
            {this.state.checkUserNameButtonClicked && !this.state.checkUserName && <div style={{fontSize: 10, color: 'red'}}>This userName is already taken</div>}
          </div>
          <div style={{paddingBottom: 30, width: 300}}>
            <div style={{marginBottom: 10}}>Password</div>
            <Input placeholder="Password" value={this.state.password} onChange={(e) => this.setState({password: e.target.value})} className="input-box"/>
          </div>
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button style={{width: 300}} onClick={() => this.signUp()}>Submit</Button>
            <Button style={{width: 300, marginTop: 30}} onClick={() => this.props.history.push('/login')}>Go to Login</Button>
          </div>
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


const mapDispatchToProps = {
  setUserData
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
