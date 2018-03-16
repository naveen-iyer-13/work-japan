const updatingData = (state = [], action) => {
  switch (action.type) {
    case 'ADD_NEW_TWEET':
      return (
        action.tweetsList
      )
    default:
      return state
  }
}

export default updatingData
