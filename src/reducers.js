import _ from 'lodash';

const initialState = {
  locations: []
}

function locationListReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_LOCATION':
      return Object.assign({}, state, {
        locations: [
          ...state.locations,
          {
            latitude: action.latitude,
            longitude: action.longitude,
            id: state.locations.length === 0 ? 1 : _.last(state.locations).id + 1
          }
        ]
      });
    case 'REMOVE_LOCATION':
      return Object.assign({}, state, {
        locations: state.locations.filter((location) => location.id !== action.id )
      });
    default:
      return state;
  }
}

export default locationListReducer;
