function removeLocation(id) {
  return { type: 'REMOVE_LOCATION', id };
}

function addLocation({longitude, latitude, zip, name}) {
  return {
    type: 'ADD_LOCATION',
    longitude,
    latitude,
    zip,
    name
  };
}

export { addLocation, removeLocation };
