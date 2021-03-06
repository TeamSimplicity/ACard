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
            if(networkState =="none"){
                return false;
            }
            else{
                return true;
            }
            
        }
//Not familliar with jQuery? Think of this as your MAIN class.

$( document ).ready(function() {
  height = $( window ).height();
  width = $( window ).width();
  alert("Window Height:"+ height + " Window Width "+width);
              //alert("Check Connection START" +checkConnection());
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
      var height = $( window ).height();
      var width = $( window ).width();
      alert("Window Height:"+ height + " Window Width "+width);

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

      //That MAIN "Sign-Up!" BUTTON
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
        
        
        pullPerks();
        
        //displayPerksAccordian();
        //alert("this fires");
        
       $('#page1').hide();
        $('#page3').hide();
        $('#page2').show();
        displayPerksAccordian();
       
        


      });

      //About button
      $( "button[value='about-btn']").click(function(){
        $('#page1').hide();
        $('#page2').hide();
        $('#page3').show();

      });


        //Submit button on form
        $('#signup-form form').submit(function(){
        //alert("invoked");
        var loading = $(this).find('input[type="submit"]');
        loading.addClass('loading');
        
        var postData = $(this).serialize();

            $.ajax({
                type: 'POST',
                data: postData,
                url: 'http://tratnayake.me/Assign-Barcode.php',
                success: function(data){
                 //alert(data);
                 
                  var resultarray = data.split(".");
                  //alert("after split");

                  if(resultarray[0]=="null"){
                    alert("There are no more barcodes to assign, please inform UBC alumni");
                    return;
                  }
                  else {



                  var barcodenum = resultarray[0].replace(/\D/g,'');
                  //alert(barcodenum);
                  var res = data.replace(/\D/g,'')
                  var Name = resultarray[1];
                  //alert(Name);

                  //alert("Before display");

                  
                    $("#bcTarget").barcode(barcodenum, "codabar",{barWidth:2, barHeight:30});
                    $("#User_Name").append(Name);
                    $("#Name").append(Name);    
                //alert ("after display");

                //STORE into LOCALSTORAGE
                localStorage.barcodeNumber = barcodenum;
                localStorage.userName = Name;
                pullPerks();
                displayPerksAccordian();

                    
                    console.log('Form Sent!');
                  }
                },
                error: function(){
                    loading.removeClass('loading');
                    console.log('There was an error');
                }
            });
            $('#signup-form').fadeOut();
            $('#page1').fadeIn();

            return false;

            var height = $( window ).height();
            var width = $( window ).width();
             alert("Window Height:"+ height + " Window Width "+width);
        });


    //ACTUAL FUNCTIONS START NOW
    function pullPerks(){
      
      //alert(checkConnection())
      //1. Check if there is internet connection
      if(checkConnection()){


            var perksArray = [];
      $.ajax({
        type: 'GET',
          url: 'http://tratnayake.me/Retrieve-Perks.php?&jsoncallback=?',
          dataType: 'JSONp',
          timeout: 5000,
          success: function(data) {
          $.each(data, function(i,item){
            //console.log(item);
            perksArray.push(item);
            

            });
        localStorage.perksContainer = JSON.stringify(perksArray);
        //console.log("Stored in localStorage is:" +localStorage.perksContainer);

        },
        error: function(data) {
          //do something if there is an error
        }
        });
      }
      else{
        alert("You need internet access to pull from the Perks Table")

          
      }




      
    }

    function displayPerksAccordian(){

      //Clear the accordian tabs:
      for ( var i = 1; i < 5; i++ ) {
    
      $('#PerkCategory'+i+" div").empty();
      }


      //NOW start
      var perksArray = JSON.parse(localStorage.perksContainer);
      
        //alert("Display perks invoked");
        
      jQuery.each(perksArray,function(i,val){
        if(val.PerkActive=="1"){
          console.log(val.PerkContent);
          var perkCatNum = val.PerkCategory_ID;
          //var nameValue = $('# > div').attr('name');
          $('#PerkCategory'+perkCatNum+' div').append("<li>"+val.PerkContent+"</li>");
          //alert('#PerkCategory'+perkCatNum+' div');
          }
        });
      alert("before return");
      return;
    }


}

