function removeLocation(id) {
  return { type: 'REMOVE_LOCATION', id };
}

function addLocation({longitude, latitude}) {
  return { type: 'ADD_LOCATION', longitude, latitude };
}

export { addLocation, removeLocation };
