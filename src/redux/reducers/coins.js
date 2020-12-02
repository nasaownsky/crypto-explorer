const initialState = {
  items: [],
  page: 1,
}

const coins = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COINS":
      return {
        ...state,
        items: action.payload,
      }
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      }

    default:
      return state
  }
}

export default coins
