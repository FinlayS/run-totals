const runReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_RUNS':
      return action.runs
    case 'ADD_RUN':
      return [
        ...state,
        { _id: action._id,
          description: action.description,
          date: action.date
        }
      ]
    case 'REMOVE_RUN':
      return state.filter((run) => run._id !== run._id)
    default:
      return state
  }
}

export default runReducer
