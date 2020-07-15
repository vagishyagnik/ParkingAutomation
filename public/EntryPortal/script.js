$(()=>{
   let length_temp,slot_number;
   $('#submit')
      .click(()=>{

          let New_obj = {};
          New_obj.Name = $('#Name').val()
          New_obj.phoneNumber = $('#PhNum').val()
          New_obj.vehicleNumber = $('#CarNum').val().toUpperCase()
           console.log(New_obj);
          //check carNumber in police database
          $.post(
             '/theft_check/',
             {carNumber: New_obj.vehicleNumber},
             function(data){
                console.log(data);
                if(data == "found"){
                    $('#car_theft').show()
                }
             }
          )
               
          New_obj.slot_number = slot_number
          New_obj.length = length_temp
      
          $('#output').html('Slot Number Alloted: '+ New_obj.slot_number +'  <br><img src="parking_slot.jpg" alt="">  <br> Directions:<br> -> Go 100m straight.  <br> -> Turn left and climb up to the 2nd floor <br> -> Take right from there and Park your vehicle at the 3rd slot(' + New_obj.slot_number + ') there!! <br><br><button class="btn btn--radius btn--green" id="Add">Add Entry</button> <button class="btn btn--radius btn--green" id="Go_back">Go Back</button>');
          $('#output').show()
          $('input').prop("disabled",true)
          $('#submit').prop('disabled',true)
                
      
                $('#Go_back')
                  .click(()=>{
      
                   $('#output').hide();
                   $('input').prop("disabled",false);
                   $('#submit').prop('disabled',false);
                   $('#Name').val("");
                   $('#CarNum').val("");
                   $('#PhNum').val("");
                 })
      
                 $('#Add')
                   .click(()=>{
                     //    if(New_obj.slot_number.charAt(0) == 's'){
                     //       let slot = New_obj.slot_number
                     //       firebase.database().ref('small slots/' + slot).set('False');
                     // }
                     // else {
                     //    let slot = New_obj.slot_number
                     //    firebase.database().ref('large slots/' + slot).set('False');
                     // }
                     function makeid(length) {
                         var result           = '';
                         var characters       = 'ABCHIJFGOPQRSTUVWXYZabcdKLMNDEefghijklmnopqrst12345uvwxyz06789';
                         var charactersLength = characters.length;
                         for ( var i = 0; i < length; i++ ) {
                            result += characters.charAt(Math.floor(Math.random() * charactersLength));
                         }
                         return result;
                      }
                      
                      let key = makeid(7)
                       New_obj.key = key

                       let currentTime = new Date();
                       let currentOffset = currentTime.getTimezoneOffset();
                       let ISTOffset = 330;   // IST offset UTC +5:30 
                       let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
                       let hoursIST = ISTTime.getHours()
                       let minutesIST = ISTTime.getMinutes()
                       let timeIST = hoursIST + ":" + minutesIST;
                       let dateIST = ISTTime.getDate() + '-' + Number(ISTTime.getMonth()+1) + "-" + ISTTime.getFullYear()
      
                       //  New_obj.date = dateIST;
                       New_obj.Entry_time = timeIST;
                       
                        console.log("Entry portal script.js, Object pushed is"); 
                        console.log(New_obj);

                        firebase.database().ref('Car Parking/' + dateIST + '/' + key).set(New_obj);

                        // let auth_key = "xczHw6MdR4gAFjVGfei3lbpahOTvuQyCUDsZK7SWBo2q9E58nLfYjiktsDxLeXRNHMpIuGq34ACOKdWw"

                        // var settings = {
                        //    "async": true,
                        //    "crossDomain": true,
                        //    "url": "https://www.fast2sms.com/dev/bulk?authorization=" + auth_key + "&sender_id=FSTSMS&message=%0aMr." +New_obj.Name+ "!! Welcome to the Parking Portal %0aYour Vehicle No is: "+New_obj.vehicleNumber+"%0aSlot alloted to you is: " +New_obj.slot_number+" %0aYour security key is: "+New_obj.key+"%0a%0a Use this key to login into our Web/Android app for LIVE MONITORING OF YOUR VEHICLE!!. %0a%0aLink to our Android app : https:Googleplaystore/ParkingSystem/apk %0aLink to our Web portal: https:webPortal/UserLogin.gov &language=english&route=p&numbers=" + New_obj.phoneNumber,
                        //    "method": "GET"
                        //  }
                         
                        //  $.ajax(settings).done(function (response) {
                        //     console.log(response.val());
                        //    console.log('Message Sent to Mobile Phone number ' + New_obj.phoneNumber + '!!')
                        //  });   

                       $('#output').hide();
                       $('input').prop("disabled",false);
                       $('#submit').prop('disabled',false);
                       $('#Name').val("");
                       $('#CarNum').val("");
                       $('#PhNum').val("");
                       
                       $("#imgLocation").attr("src", "./progress-and-tick-icon-animation.gif")
                       $('#after_addEntry').show()
                        setTimeout(()=>{
                           $('#after_addEntry').hide()
                           $('#success').html('')
                           $("#imgLocation").attr("src", "")
                        },4500)
                        setTimeout(()=>{
                           $('#success').append('ENTRY ADDED SUCCESFULLY')
                        },4100)
                      })
      })
      
      $('#Done')
        .click(()=>{
           $('#output').hide();
           $('input').prop("disabled",false)
           $('#submit').prop('disabled',false)
           $('#car_theft').hide()
           $('#Name').val("")
           $('#CarNum').val("")
           $('#PhNum').val("")
        }) 
        
        var DATA = firebase.database().ref("alloted slot")
        DATA.on("child_changed",function(snapshot){
        //if the data is valid then print data send some part of the data to Entry portal
        if(snapshot.val() != undefined && snapshot.val() != null){
            firebase.database().ref("alloted slot").on("value",function(snapshot){
               console.log(snapshot.val())
               let Numb = snapshot.val().carNumber
               $('#CarNum').val(Numb)
               length_temp = snapshot.val().length
               slot_number = snapshot.val().slot
            }) 
        }
    })
})