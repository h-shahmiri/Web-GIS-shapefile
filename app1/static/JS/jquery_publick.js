//-----------------------------------------------------------------------------------------------------
$(document).ready(function(){
  
  $('#xx').fadeOut(3000);


//===================================  Movies  =============================================================


  $(window).scroll(function(){
    if ($(window).scrollTop() > 40) {
      document.getElementById("yellnav").style.fontSize = "20px"
    } else{
      document.getElementById("yellnav").style.fontSize = "26px"
    }
  
  })

})