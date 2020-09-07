const runReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_RUNS':
      return action.runs
    case 'POPULATE_LAPS':
      return action.laps
    case 'ADD_RUN':
      return [
        ...state,
        {
          _id: action._id,
          description: action.description,
          date: action.date
        }
      ]
    case 'ADD_LAP':
      return [
        ...state,
        {
          _id: action._id,
          run_id: action.runId,
          lapNo: action.lapNo,
          active: action.active,
          lapTime: action.lapTime,
          lapDistance: action.lapDistance
        }
      ]
    case 'REMOVE_RUN':
      return state.filter((run) => run._id !== action._id)
    default:
      return state
  }
}

export default runReducer
