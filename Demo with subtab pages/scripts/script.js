// alert();
var clickHandler = 'tap';
$(document).ready(function(){

	$('body').bind("touchmove", function(e) {
           e.preventDefault();
	});



  // popups
   $('#ref_btn').bind(clickHandler,function(event){
      $('#popup-mask, #ref').css('visibility','visible');
	});

	$('#close-popup,#popup-mask').bind(clickHandler,function(event){
	   $('#popup-mask, #ref').css('visibility','hidden');
	});

   

	// center hexapopups

	  $('#tab1_active').bind(clickHandler,function(event){
	  	// alert(1);
		$('#tab1').css('visibility','visible').show();
		$('#tab2,#tab3,#tab4').css('visibility','visible').hide();
      });

  	$('#tab2_active').bind(clickHandler,function(event){
  		// alert(2);
		$('#tab2').css('visibility','visible').show();
		$('#tab1,#tab3,#tab4').css('visibility','visible').hide();
      });

 	 $('#tab3_active').bind(clickHandler,function(event){
 	 	// alert(3);
		$('#tab3').css('visibility','visible').show();
		$('#tab2,#tab1,#tab4').css('visibility','visible').hide();
      });
  	$('#tab4_active').bind(clickHandler,function(event){
  		// alert(4);
		$('#tab4').css('visibility','visible').show();
		$('#tab2,#tab3,#tab1').css('visibility','visible').hide();
      });



	 


	  
	
	// Page1 tab
	 



	 // menu navigation

	 $("#home").on("touchstart", function(event){
		// alert(2);
		veeva.gotoSlide('Precedex_EN_1.0_00.00');
	});
	$("#summary").on("touchstart", function(event){
		// alert(2);
		veeva.gotoSlide('Precedex_EN_1.0_60.00');
	});
	$("#pm_btn").bind(clickHandler,function(e){
		 window.open('pdf/Precedex_June2016 PM.pdf');
				 
	});
});


