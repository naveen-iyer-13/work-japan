import React, { Component } from 'react';
import Card from 'antd/lib/card'
import {connect} from 'react-redux'
import {addNewTweet} from '../redux/actions'
import moment from 'moment'
import 'antd/dist/antd.css';
import '../styles/addProductsModal.css'

class Tweets extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTweet: '',
      password: '',
    }
  }

  componentWillMount() {
    var userId = localStorage.getItem("currentUserId")
    if (!userId) {
      this.props.history.push('/login')
    }
  }

  render() {
    var tweet;
    if (this.props.tweetsList) {
      tweet = this.props.tweetsList.map((item, index) => {
        if (parseInt(item.id) === parseInt(this.props.match.params.id)) {
          var userDetail = this.props.userDetail.filter((user) => {
            var userId = localStorage.getItem("currentUserId")
            if (parseInt(user.id) === parseInt(userId)) {
              return user
            }
          })
          return(
            <Card style={{ width: 300, cursor: 'pointer' }} key={index}>
              <p>{item.tweet}</p>
              <p>Tweet ID - {item.id}</p>
              <p>Created at - {moment(item.time).format('DD-MM-YYYY, h:mm:ss a')}</p>
              <p>Created By - {userDetail[0].firstName}</p>
              <p>User ID - {userDetail[0].id}</p>
            </Card>
          );
        }
      })
    }
    return (
      <div className="login" style={{ margin: 100}}>
        <div>
          Single Tweet
        </div>
          {tweet}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return(
    {
      userDetail: state.userDetail,
      tweetsList: state.tweetsList
    }
  )
}

const mapDispatchToProps = {
  addNewTweet
}


export default connect(mapStateToProps, mapDispatchToProps)(Tweets);
