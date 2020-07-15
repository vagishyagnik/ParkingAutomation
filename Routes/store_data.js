console.log('in store data')
const route = require('express').Router()
var firebase = require('firebase/app');
require('firebase/database')

const firebaseConfig = {
    apiKey: "AIzaSyDL1yYPQ8Ntigkdjv4qymkqhoQ8YfhQjVU",
    authDomain: "hackitout-6ee0b.firebaseapp.com",
    databaseURL: "https://hackitout-6ee0b.firebaseio.com",
    projectId: "hackitout-6ee0b",
    storageBucket: "hackitout-6ee0b.appspot.com",
    messagingSenderId: "604967948481",
    appId: "1:604967948481:web:09206a85c683658177c440",
    measurementId: "G-2RE3JZPRJ8"
};
var appConfig=firebase.initializeApp(firebaseConfig);

//in which path the object will be added
route.post('/givedata',(req,res)=>{
      //   let database = firebase.database();
      //   let currentTime = new Date();

      //   let currentOffset = currentTime.getTimezoneOffset();

      //   let ISTOffset = 330;   // IST offset UTC +5:30 

      //   let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

      //   let hoursIST = ISTTime.getHours()
      //   let minutesIST = ISTTime.getMinutes()
      //   let timeIST = hoursIST + ":" + minutesIST;
      //   let dateIST = ISTTime.getDate() + '-' + Number(ISTTime.getMonth()+1) + "-" + ISTTime.getFullYear()
        console.log("from store_data.js " + dateIST)
        console.log(req.body)
        let new_obj
         firebase.database().ref('Car Parking/' + dateIST + '/' + req.body.sec_key).once('value')
         .then(function(snapshot){
            console.log('debugging')
            console.log(snapshot.val())
            new_obj = snapshot.val()
            new_obj.Exit_time = timeIST
            
            res.send(new_obj)
         }) ;
})

route.post('/delete',(req,res)=>{
        let database = firebase.database();
        let currentTime = new Date();

        let currentOffset = currentTime.getTimezoneOffset();

        let ISTOffset = 330;   // IST offset UTC +5:30 

        let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

        let hoursIST = ISTTime.getHours()
        let minutesIST = ISTTime.getMinutes()
        let timeIST = hoursIST + ":" + minutesIST;
        let dateIST = ISTTime.getDate() + '-' + Number(ISTTime.getMonth()+1) + "-" + ISTTime.getFullYear()
        firebase.database().ref('Car Parking/' + dateIST + '/' + req.body.sec_key).once('value')
          .then(function(snapshot){
             // console.log(snapshot.val());
              let obj = snapshot.val()
              obj.amount_paid = req.body.amount_paid
              obj.Exit_time = timeIST  
              firebase.database().ref('incoming/' + dateIST + '/' + obj.vehicleNumber).set(obj);
         }) ;
         firebase.database().ref('Car Parking/' + dateIST + '/' + req.body.sec_key).set(null);
})

// route.post('/',(req,res)=>{
//         let database = firebase.database();
//         let currentTime = new Date();

//         let currentOffset = currentTime.getTimezoneOffset();

//         let ISTOffset = 330;   // IST offset UTC +5:30 

//         let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);

//         let hoursIST = ISTTime.getHours()
//         let minutesIST = ISTTime.getMinutes()
//         let timeIST = hoursIST + ":" + minutesIST;
//         let dateIST = ISTTime.getDate() + '-' + Number(ISTTime.getMonth()+1) + "-" + ISTTime.getFullYear()
//     var new_obj = {
//        Name: req.body.Name,
//        phoneNumber: req.body.phoneNumber,
//        vehicleNumber: req.body.carNumber,
//        Entry_time: req.body.time
//     }
    
//       firebase.database().ref('Car Parking/' + req.body.date + '/' + req.body.key).set(new_obj);
//       res.send('True');
// })

module.exports = route