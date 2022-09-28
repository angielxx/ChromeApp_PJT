const API_KEY = "56c6d9f558c87d3bd26d55e54d49b000";

function onGeoOk(position) {
    
}

function onGeoError() {
    
}

navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError)