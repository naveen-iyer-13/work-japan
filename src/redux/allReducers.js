import { combineReducers } from 'redux'
import tweetsList from './tweetsReducers'
import userDetail from './userDetailReducers'

const eventApp = combineReducers({
  userDetail : userDetail,
  tweetsList : tweetsList
})

export default eventApp
