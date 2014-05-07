document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        //checkConnection();
    

        function checkConnection() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN]  = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI]     = 'WiFi connection';
            states[Connection.CELL_2G]  = 'Cell 2G connection';
            states[Connection.CELL_3G]  = 'Cell 3G connection';
            states[Connection.CELL_4G]  = 'Cell 4G connection';
            states[Connection.CELL]     = 'Cell generic connection';
            states[Connection.NONE]     = 'No network connection';

            //return states[networkState]);
            //alert(networkState);
            if(networkState ="none"){
                return false;
            }
            else{
                return true;
            }
            
        }

//Not familliar with jQuery? Think of this as your MAIN class.

$( document ).ready(function() {
              populatePerks();
    //Check if there's anything in the phone memory.
    if(localStorage.userName!= undefined && localStorage.barcodeNumber != undefined ){
      //If there is a name and number in memory then do this.
      $("#bcTarget").barcode(localStorage.barcodeNumber, "codabar");
      $("#User_Name").append(localStorage.userName);
      $("#Name").append(localStorage.userName);

      //alert("There is stuff in local storage");
      $('#splashpage').hide();
      $('#signup-form').hide();
      $('#page1').show();
      $('#page2').hide();
      $('#page3').hide();

    }
    else {

      //Populate dat facultys dropdown
      //target element: select id="Faculty_ID"
      //API to access: http://tratnayake.me/Retrieve-Faculty.php  
      
      
    
      //Animations And Transitions
      $('#splashpage').show();
      $('#signup-form').hide();
      $('#page1').hide();
      $('#page2').hide();
      $('#page3').hide();

       }
});


      //Event Listeners

      //That MAIN "I want my perks!" BUTTON
      $('#splashenter').click(function(){
        
        $('#splashpage').fadeOut('');
        $('#signup-form').fadeIn('');
        //$('#page1').fadeIn('');
        //$('#page2').fadeIn('');

      });

      //Top button bar

      //A-Card button (value="acard-btn")

        //What it does is apply to every thing with value a-card btn
      $( "button[value='acard-btn']").click(function(){
        $('#page2').hide();
        $('#page3').hide();
        $('#page1').show();
        

      });

      //Perks button
      $( "button[value='perks-btn']").click(function(){
        
        $('#page1').hide();
        $('#page3').hide();
        $('#page2').show();
       
        


      });

      //About button
      $( "button[value='about-btn']").click(function(){
        $('#page1').hide();
        $('#page2').hide();
        $('#page3').show();

      });


        //Submit button on form
        $('#signup-form form').submit(function(){
          if(checkConnection()){
        //alert("invoked");
        var loading = $(this).find('input[type="submit"]');
        loading.addClass('loading');
        
        var postData = $(this).serialize();

            $.ajax({
                type: 'POST',
                data: postData,
                url: 'http://tratnayake.me/Assign-Barcode.php',
                success: function(data){
                 alert(data);
                 
                  var resultarray = data.split(".");
                  //alert("after split");

                  var barcodenum = resultarray[0].replace(/\D/g,'');
                  //alert(barcodenum);
                  //var res = data.replace(/\D/g,'')
                  var Name = resultarray[1];
                  //alert(Name);

                  //alert("Before display");

                    
                    $("#bcTarget").barcode(barcodenum, "codabar");
                    $("#User_Name").append(Name);
                    $("#Name").append(Name);    
                //alert ("after display");

                //STORE into LOCALSTORAGE
                localStorage.barcodeNumber = barcodenum;
                localStorage.userName = Name;

                    
                    console.log('Form Sent!');
                },
                error: function(){
                    loading.removeClass('loading');
                    console.log('There was an error');
                }
            });
            $('#signup-form').fadeOut();
            $('#page1').fadeIn();
            populatePerks();
            return false;
        }
        else{
          alert("You do not have internet connectivity right now, please re-attempt when you do.");
        }
      });


		//ACTUAL FUNCTIONS START NOW
		function populatePerks(){
			$.ajax({
					type: 'GET',
					  url: 'http://tratnayake.me/Retrieve-Perks.php?&jsoncallback=?',
					  dataType: 'JSONp',
					  timeout: 5000,
					  success: function(data) {
					  $.each(data, function(i,item){

						//This you can get different data by doing
						//item.Perk_ID, item.PerkCategory_ID, PerkContent, or Perk_Active (0 or 1);
					   $('#perkslist').append("<li>"+item.PerkContent+"</li>");
				  });
					},
					error: function(data) {
					  //do something if there is an error
					}
			});
		};
}


