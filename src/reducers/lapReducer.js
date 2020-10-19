const lapReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_LAPS':
      return action.laps
    case 'ADD_LAP':
      return [
        ...state,
        {
          _id: action._id,
          run_id: action.runId,
          lapNo: action.lapNo,
          lapActive: action.lapActive,
          lapTime: action.lapTime,
          lapDistance: action.lapDistance
        }
      ]
    default:
      return state
  }
}

export default lapReducer
