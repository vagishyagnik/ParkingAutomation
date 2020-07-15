console.log('in parking data')

const route = require('express').Router()
var firebase = require('firebase/app');
require('firebase/database')

var firebaseConfig = {
    apiKey: "AIzaSyDL1yYPQ8Ntigkdjv4qymkqhoQ8YfhQjVU",
    authDomain: "hackitout-6ee0b.firebaseapp.com",
    databaseURL: "https://hackitout-6ee0b.firebaseio.com",
    projectId: "hackitout-6ee0b",
    storageBucket: "hackitout-6ee0b.appspot.com",
    messagingSenderId: "604967948481",
    appId: "1:604967948481:web:09206a85c683658177c440",
    measurementId: "G-2RE3JZPRJ8"
};
  // Initialize Firebase
 var secondary = firebase.initializeApp(firebaseConfig);

route.post('/',(req,res)=>{
    var ref = firebase.database().ref();
    var slot1 = ref.child("large slots")
    var slot2 = ref.child("small slots")

    var s,temp;
    slot1.on("value", function(snapshot) {
        s = Object.entries(snapshot.val());
        // console.log(s);
    }, function (error) {
    console.log("Error: " + error.code);
    });
    
    slot2.on("value", function(snapshot) {
        temp = Object.entries(snapshot.val());
        temp.forEach(([key,value])=>{
            s.push([key,value])
        })
        // console.log(s)
    }, function (error) {
    console.log("Error: " + error.code);
    });
    res.send(s);

})

module.exports = route