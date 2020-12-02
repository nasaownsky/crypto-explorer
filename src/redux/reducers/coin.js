const initialState = {
  coin: [],
  chart: [],
}

const coin = (state = initialState, action) => {
  switch (action.type) {
    case "SET_COIN":
      return {
        ...state,
        coin: action.payload,
      }

    case "SET_CHART":
      return {
        ...state,
        chart: action.payload,
      }

    default:
      return state
  }
}

export default coin
