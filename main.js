var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const db = firebase.database();

// Initialize Google Map and Marker
const basicLocation = new google.maps.LatLng(7.857685, 80.70625);
const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 6,
    center: basicLocation,
});
const marker = new google.maps.Marker({
    position: basicLocation,
    map,
    animation: google.maps.Animation.DROP,
    title: "Your Location",
});

// Get Data from firebase realtime database
const getLocation = db.ref("locations");
getLocation.on("value", doc => {
    let value = doc.val();
    console.log(value);
    console.log(value.latitude, value.longitude);
    const currentLocation = new google.maps.LatLng(value.latitude, value.longitude);
    marker.setPosition(currentLocation);
    map.setCenter(currentLocation);
});
