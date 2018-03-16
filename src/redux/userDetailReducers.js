const updatingData = (state = [], action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return (
        action.userDetail
      )
    default:
      return state
  }
}

export default updatingData
