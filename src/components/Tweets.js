import React, { Component } from 'react';
import Modal from 'antd/lib/modal'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Card from 'antd/lib/card'
import {connect} from 'react-redux'
import {addNewTweet} from '../redux/actions'
import moment from 'moment'
import Header from './Header'
import 'antd/dist/antd.css';
import '../styles/tweets.css'

class Tweets extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTweet: '',
      password: '',
      editModal: false,
      deleteModal: false,
      selectedTweet: '',
      selectedTweetId: 0
    }
  }

  componentWillMount() {
    var userId = localStorage.getItem("currentUserId")
    if (!userId) {
      this.props.history.push('/login')
    }
  }

  addTweet() {
    var tweetsList = []
    var userId = localStorage.getItem("currentUserId")
    if (this.state.newTweet) {
      var id = 1
      if (this.props.tweetsList.length > 0) {
        id = this.props.tweetsList[0].id+1
      }
      tweetsList.push({tweet: this.state.newTweet, ownerId: userId, time: new Date(), id: id})
    }
    var oldArray = this.props.tweetsList
    var newArray = tweetsList.concat(oldArray)
    this.props.addNewTweet(newArray)
  }

  editTweet() {
    var newArray = []
    this.props.tweetsList.map((item) => {
      if (parseInt(item.id) === parseInt(this.state.selectedTweetId)) {
        newArray.push({id: item.id, tweet: this.state.selectedTweet, time: item.time, ownerId: item.ownerId})
      }
      else {
        newArray.push(item)
      }
    })
    this.props.addNewTweet(newArray)
    this.setState({editModal:false, selectedTweet: '', selectedTweetId: 0})
  }

  deleteTweet() {
    var newArray = []
    this.props.tweetsList.map((item) => {
      if (parseInt(item.id) !== parseInt(this.state.selectedTweetId)) {
        newArray.push(item)
      }
    })
    this.props.addNewTweet(newArray)
    this.setState({deleteModal:false, selectedTweet: '', selectedTweetId: 0})
  }


  render() {
    var tweetsList;
    if (this.props.tweetsList) {
      var userId = localStorage.getItem("currentUserId")
      var userDetail
      tweetsList = this.props.tweetsList.map((item, index) => {
        userDetail = this.props.userDetail.filter((user) => {
          if (parseInt(user.id) === parseInt(item.ownerId)) {
            return user
          }
        })
        var editIcon, deleteIcon
        if (parseInt(userId) === parseInt(item.ownerId)) {
          editIcon = <Icon type="edit" style={{marginLeft: 10}} onClick={() => this.setState({editModal: true, selectedTweet: item.tweet, selectedTweetId: item.id})}/>
          deleteIcon = <Icon type="delete" style={{marginLeft: 10}} onClick={() => this.setState({deleteModal: true, selectedTweet: item.tweet, selectedTweetId: item.id})}/>
        }
        return(
          <Card className="card" key={index}>
            <div style={{display: 'flex', float: 'right'}}>
              {editIcon}
              {deleteIcon}
            </div>
            <div onClick={() => this.props.history.push('/tweet/'+item.id)}>
              <p>{item.tweet}</p>
              <p>Created by - {userDetail[0].firstName}</p>
              <p>Created at - {moment(item.time).format('DD-MM-YYYY, h:mm:ss a')}</p>
            </div>
          </Card>
        );
      })
    }
    var editFooter=[
          <Button key="edit" type="primary" onClick={() => this.editTweet()}>
            EDIT
          </Button>
        ]

    var deleteFooter=[
          <Button key="edit" type="primary" onClick={() => this.deleteTweet()}>
            Delete
          </Button>
        ]


    return (
      <div>
        <Header  history={this.props.history}/>
        <div className="tweets" >
          <div className="post-tweets">
            <Input.TextArea placeholder="Tweet away" value={this.state.newTweet} style={{resize: "none", height: 80}} className="tweets-textarea" onChange={(e) => this.setState({newTweet: e.target.value})} className="input-box"/>
            <Button className="post-button" onClick={() => this.addTweet()}>POST</Button>
          </div>
          <div className="tweets-heading">
            Tweets List
          </div>
          <div>
            {tweetsList}
          </div>
          <Modal visible={this.state.editModal} onCancel={() => this.setState({editModal: false})} title="Edit Tweet" footer={editFooter}>
            <Input.TextArea placeholder="Tweet away" value={this.state.selectedTweet} style={{width: 200, resize: "none"}} onChange={(e) => this.setState({selectedTweet: e.target.value})} className="input-box"/>
          </Modal>
          <Modal visible={this.state.deleteModal} onCancel={() => this.setState({deleteModal: false})} title="Delete Tweet" footer={deleteFooter}>
            Are you sure you want to delete this Tweet?
          </Modal>
        </div>
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
  addNewTweet,
}


export default connect(mapStateToProps, mapDispatchToProps)(Tweets);
