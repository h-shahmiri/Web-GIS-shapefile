//Start Jquer v3.3 ------------------------------------------------------------------------------------------

$(document).ready(function(){
  //Hostpital
  $("#locat").click(function(){
    $("#tehran").slideToggle("slow");
    $("#mashhad").slideToggle("slow");
    $("#sanandaj").slideToggle("slow");
    $("#4").slideToggle("slow");
  });
// Locationa menu
  $("#layer").click(function(){
    $("#gohost").slideToggle("slow");
    $("#hostlayer").slideToggle("slow");
    $("#creatpoint").slideToggle("slow");
    $("#fence").slideToggle("slow");
    $("#gomine").slideToggle("slow");
    $("#minelayer").slideToggle("slow");
    $("#minefence").slideToggle("slow");
    $("#hydro").slideToggle("slow");
  });
// Tools
  $("#tools").click(function(){
    $("#admin").slideToggle("slow");
    $("#coord").slideToggle("slow");
    $("#route").slideToggle("slow");
  });
});

//-----------------------------------------------------------------------------------------------------
$(document).ready(function(){
  //lan text
  $('#lan').blur(function(){  // or focusout
    $('#long').attr("placeholder" , "Next step")
  })

  //long text
  $('#long').focus(function(){  // or focusin
    $('#range').attr("placeholder" , "Next step")
    //$('#range').val("Next step")
  })
  
  $('#long').change(function(){})
  $('#long').select(function(){})  // select a text

})