$(()=>{
  //  $('#parking').prop("disabled", "true")
   $('#two').hide()
   $('#Live').click(()=>{
    $('#two').show()
    // $('#parking').prop("disabled", "false")
    // $('#Live').prop("disabled", "true")
    $('#one').hide()
   })

   $('#parking').click(()=>{
    $('#two').hide()
    $('#one').show()
    // $('#Live').prop("disabled", "false")
    // $('#parking').prop("disabled", "true")
   })
})   