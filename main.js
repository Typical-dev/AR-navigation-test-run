var longitude = ""
var latitude = ""
var destination;
$(document).ready(function(){
    alert("Please enable location services")
    initGeolocation();
})
function initGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success)
    }else{
        alert("Sorry your browser does not support geolocation")
    }
}

function success(position){
    console.log(position)
    longitude = position.coords.longitude
    latitude = position.coords.latitude
    mapboxgl.accessToken = 'pk.eyJ1IjoidHlwaWN4IiwiYSI6ImNrd3VwdGk4NjBsOWwybnFuNHY0bWhzdmQifQ.LwdgMLqML9Gn69uSjouEzg'
var map = new mapboxgl.Map({
    container:"map",
    style:'mapbox://styles/mapbox/streets-v11',
    center:[longitude,latitude],
    zoom:16,
})
map.addControl(new mapboxgl.GeolocateControl({
    positionOptions:{
        enableHighAccuracy:true
    },
    trackUserLocation:true,
}))
map.addControl(new MapboxDirections({
    accessToken:mapboxgl.accessToken
}),"top-left")
map.on("click",function(e){
    console.log(e)
    destination = e.lngLat
})
}

$(function(){
    $("#navigate-button").click(function(){
        console.log(destination)
        window.location.href = `ar_navigation.html?source=${latitude};${longitude}&destination=${destination.lat};${destination.lng}`
    })
})
