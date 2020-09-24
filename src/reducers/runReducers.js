const runReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_RUNS':
      return action.runs.sort((a, b) => {
        return a.runDate < b.runDate ? 1 : -1
      })
    case 'POPULATE_LAPS':
      return action.laps
    case 'POPULATE_TOTALS':
      return action.totals
    case 'ADD_RUN':
      return [
        ...state,
        {
          _id: action._id,
          description: action.description,
          runDate: action.runDate
        }
      ].sort((a, b) => {
        return a.runDate < b.runDate ? 1 : -1
      })
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
    case 'EDIT_LAP_STATUS':
      return state.map((laps) => {
        console.log('what a a state', ...state)
        console.log('reducer', laps._id, action._id)
        if (laps._id === action._id) {
          console.log('GOT THE BLOODY LAP', laps._id, action._id)
          return {
            ...laps,
            ...action.lapActive
          }
        } else {
          return laps
        }
      });
    case 'REMOVE_RUN':
      return state.filter((run) => run._id !== action._id)
    default:
      return state
  }
}

export default runReducer
