const runReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_RUNS':
      return action.runs.sort((a, b) => {
        return a.runDate < b.runDate ? 1 : -1
      })
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
    case 'REMOVE_RUN':
      return state.filter((run) => run._id !== action._id)
    case 'EDIT_RUN':
      return state.map((run) => {
        if (run._id === action._id) {
          return {
            ...run, ...{
              description: action.description,
              runDate: action.runDate
            }
          }
        } else {
            return run
        }

      });
    case 'SORT_RUNS':
      return state.sort((a, b) => {
        return a.runDate < b.runDate ? 1 : -1
      })
    default:
      return state
  }
}

export default runReducer
