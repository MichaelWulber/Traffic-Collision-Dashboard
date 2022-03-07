const initialState = {
  filters: {
    low: true,
    medium: true,
    high: true,
  },
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_FILTERS':
      return {filters: action.payload};
    default:
      return state;
  }
}

export default rootReducer;