$(()=>{
   //  $('#after-login').hide();

    $('#click')
      .click(()=>{
          console.log('In combined script')
          let vehicle_num = $('#vehicle_num').val()
          let sec_key = $('#sec_key').val()
          console.log("vehicle_num" + vehicle_num)
          $('#vehicle_num').val('')
          $('#sec_key').val('')
              let currentTime = new Date();

              let currentOffset = currentTime.getTimezoneOffset();
      
              let ISTOffset = 330;   // IST offset UTC +5:30 
      
              let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000);
      
              let dateIST = ISTTime.getDate() + '-' + Number(ISTTime.getMonth()+1) + "-" + ISTTime.getFullYear()
              firebase.database().ref('Car Parking/' + dateIST + '/' + sec_key).once('value')
              .then(function(snapshot){
                 let data = snapshot.val()
                  if(data == null){
                    alert("DETAILS DON'T MATCH, Re-Enter Details")
                  }
                  else if(data.vehicleNumber == vehicle_num){
                    $('#edit1').append(' ' + data.vehicleNumber)
                    $('#edit2').append(' ' + data.phoneNumber)
                     $('#edit3').append(' ' + data.slot_number)//slot to be decided about
                    $('#edit4').append(' ' + data.Entry_time)
                    $('#after-login').show();
                    $('#before_login').hide();
                 }
                 else {
                    alert("DETAILS DON'T MATCH, Re-Enter Details")
                 } 
         }) 
      }) 
})