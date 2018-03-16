export const setUserDetails = (userDetail) => {
  return {
    type: 'SET_USER_DATA',
    userDetail: userDetail
  }
}

export const setUserData = (userDetail) => {
  return (dispatch) =>{
    dispatch(setUserDetails(userDetail))
  }
}


export const addTweet = (tweetsList) => {
  return {
    type: 'ADD_NEW_TWEET',
    tweetsList: tweetsList
  }
}

export const addNewTweet = (tweetsList) => {
  return (dispatch) =>{
    dispatch(addTweet(tweetsList))
  }
}
