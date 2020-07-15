$(()=>{
    // let length_temp,slot_number
    function GETTIME(){
        let currentTime = new Date();

        let currentOffset = currentTime.getTimezoneOffset();

        let ISTOffset = 330;   // IST offset UTC +5:30 

        let ISTTime = new Date(currentTime.getTime() + (ISTOffset + currentOffset)*60000)
        let hoursIST = ISTTime.getHours()
        let minutesIST = ISTTime.getMinutes()
        let timeIST = hoursIST + ":" + minutesIST;
        let dateIST = ISTTime.getDate() + '-' + Number(ISTTime.getMonth()+1) + "-" + ISTTime.getFullYear()
        return (dateIST + ' ' + timeIST)
    }
    $('#bill_details').hide()
    $('#after_delEntry').hide()

    let Sec_key,amount_paid;
    $('#submit')
    .click(()=>{
        let vehicle_num = $('#VehicleNum').val().toUpperCase()
        Sec_key = $('#Sec_Key').val()
        let date = GETTIME()
        console.log(date.split(' ')[0])
        console.log(Sec_key)
        firebase.database().ref('Car Parking/' + date.split(' ')[0] +'/' + Sec_key).once('value')
         .then(function(snapshot){
            let obj = snapshot.val()    
             console.log(snapshot.val()) 
            if(obj.vehicleNumber == vehicle_num){

            //This temporarily saves exit time into obj and not in database
                obj.Exit_time = date.split(" ")[1]
                let entry_time = obj.Entry_time.split(':')
                let exit_time = obj.Exit_time.split(':')
                amount_paid = Math.floor(Number(20 * (exit_time[0]*60 + Number(exit_time[1]) - entry_time[0]*60 - Number(entry_time[1]))/60)) 
                
                $('#amount1').append("Rs "+amount_paid)
                //Add GST
                amount_paid = Math.floor(amount_paid*(118)/100)
                $('#add_cost').append("Rs " + amount_paid)
                $('#EntrydatenTime').html(date.split(' ')[0] + ' ' + obj.Entry_time)
                $('#ExitdatenTime').html(date.split(' ')[0] + ' ' + date.split(' ')[1])

                $('#bill_details').show()
                $('#Sec_Key').val('')
                $('#VehicleNum').val('')
            }
            else {
                alert('Vehicle Number and Security key Did Not Match!!!!')
            }
         }) ;      
    })

    $('#billPaid')
       .click(()=>{
         let date = GETTIME()
         firebase.database().ref('Car Parking/' + date.split(' ')[0] + '/' + Sec_key).once('value')
           .then(function(snapshot){
               let obj = snapshot.val()
               obj.Exit_time = date.split(' ')[1]
               obj.bill_paid = amount_paid 
               firebase.database().ref('incoming/' + date.split(' ')[0] + '/' + Sec_key).set(obj)
               firebase.database().ref('Car Parking/' + date.split(' ')[0] + '/' + Sec_key).set(null)
            })

         $('#bill_details').hide()
        $("#imgLocation").attr("src", "./progress-and-tick-icon-animation.gif")
            $('#after_delEntry').show()
            setTimeout(()=>{
                $('#after_delEntry').hide()
                $('#success').html('')
                $("#imgLocation").attr("src", "")
            },4500)
            setTimeout(()=>{
               $('#success').append('ENTRY DELETED SUCCESFULLY')
            },3900)
        })

    var DATA = firebase.database().ref("exit")
        DATA.on("child_changed",function(snapshot){
        //if the data is valid then print data send data to Entry portal
        if(snapshot.val() != undefined && snapshot.val() != null){
             $('#VehicleNum').val(snapshot.val())
        }
    })
})

// JOISeSV