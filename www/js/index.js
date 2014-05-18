 /**
  * www/js/index.js
  *
  * JavaScript page for application
  *
  * @author	Simplicity
  * ------------------------------------------------------------------------
  */

document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
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
        
    //MAIN class.
    $( document ).ready(function() {

        //DEBUG alert("Check Connection START" +checkConnection());

        //Check if there's anything in the phone memory.
        if(localStorage.userName!= undefined && localStorage.barcodeNumber != undefined ){
          //If there is a name and number in memory then do this.
          displayBarcode(localStorage.barcodeNumber);

          pullPerks();
          displayPerksBadge();
          //displayFeaturedPerksBadge();
          $("#User_Name").append(localStorage.userName);
          $("#Name").append(localStorage.userName);
          $('#Faculty').append(localStorage.userFaculty);

          //alert("There is stuff in local storage");
          $('#splashpage').hide();
          $('#signup-form').hide();
          $('#page1').show();
          $('#page2').hide();
          $('#page3').hide();
          //var height = $( window ).height();
          //var width = $( window ).width();
          //alert("Window Height:"+ height + " Window Width "+width);
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

    //DEV ONLY: Clear Memory button. DELETE BEFORE DEPLOYMENT~
    $( "button[value='clearmem-btn']").click(function(){
        localStorage.clear();
    });


    $( "button[value='screensize-btn']").click(function(){
        height = $( window ).height();
        width = $( window ).width();
        alert("Window Height:"+ height + " Window Width "+width);
    });


    //That MAIN "Sign-Up!" BUTTON
    $('#splashenter').click(function(){
        $('#splashpage').fadeOut('');
        $('#signup-form').fadeIn('');
        //POPULATE the years dropdown. Function takes in starting year
        populateYears(1930);
        //POPULATE the faculties dropdown.
        populateFaculties();
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
            
            //Do a check, and if true only continue
        if (validate()){           
            var loading = $(this).find('input[type="submit"]');
            loading.addClass('loading');

            var postData = $(this).serialize();

            assignBarcode(postData);

            //Record the users Faculty
            var Faculty = $('#Faculty_ID option:selected').text();

            //Store in the localStorage so it can be retrieved later.
            localStorage.userFaculty = Faculty;
            $('#Faculty').append(localStorage.userFaculty);


            $('#signup-form').fadeOut();
            $('#page1').fadeIn();

            return false;
        }
        else{            
            return false;           
        }
    });
             


    //ACTUAL FUNCTIONS START NOW
 function displayPerksBadge(){

       var perksArray = JSON.parse(localStorage.perksContainer);

       
    }

    function validate() {
        var fname=document.forms["myForm"]["FName"].value;
        var lname=document.forms["myForm"]["LName"].value;
        var email=document.forms["myForm"]["Email"].value;
        var grad=document.forms["myForm"]["Grad_Year"].value;
        var faculty=document.forms["myForm"]["Faculty_ID"].value;
        var email2 = document.getElementById('Email');
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                
        if ((fname==null) || (fname==""))
        {
            alert("First name must be filled out");					
            return false;
        }
        
        else if (lname==null || lname=="")
        {
            alert("Last name must be filled out");					           
            return false;
        }
        
        else if (email==null || email=="")
        {
            alert("Email must be filled out");					        
            return false;
        }
        
        else if (!filter.test(email2.value))
        {
            alert('Please provide a valid email address');
            return false;
        }
        
        else if (grad==null || grad=="")
        {
            alert('Internet access is required to validate user');
            return false;
        }
        
        else if (faculty==null || faculty=="")
        {
            alert('Internet access is required to validate user');
            return false;
        }
        
        else
        {
            return true;
        }    
    }        
            
            
            

    function assignBarcode(postData){      
        $.ajax({
            type: 'POST',
            data: postData,
            url: 'http://ubcdae-swacd1.advancement.ubc.ca/Assign-Barcode.php',
            success: function(data){
             //alert(data);

              var resultarray = data.split(".");
              //alert("after split");

              if(resultarray[0]=="null"){
                alert("There are no more A-Cards available. Please contact UBC alumni");
                location.reload();
              }
              else {



              var barcodenum = resultarray[0].replace(/\D/g,'');
              //alert(barcodenum);
              var res = data.replace(/\D/g,'')
              var Name = resultarray[1];
              //alert(Name);
              var nameCleaned = Name.replace(/\"/g, "")
              //alert("Before display");


                displayBarcode(barcodenum);
                $("#User_Name").append(nameCleaned);
                $("#Name").append(nameCleaned);    
            //alert ("after display");

            //STORE into LOCALSTORAGE
            localStorage.barcodeNumber = barcodenum;
            localStorage.userName = nameCleaned;
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
    }

    function populateYears(startingYear){
      var currentYear = (new Date).getFullYear();
      var startYear = startingYear;

      for (var i = currentYear; i >= startYear; i--) {
        $('#Grad_Year').append("<option value="+i+">"+i+"</option>");
      };
    }

    function displayBarcode(barcodenumber){
        //alert("displayBarcode invoked");
        var height = $( window ).height();
        var width = $( window ).width();
        //alert(width);
        var bWidth = 1;
        var bHeight = 99;
        var bFontsize = 20;

        if(width >= 900){
          //alert("width above or equal to 900");
          bWidth = 3;
          bHeight= 200;  
          bFontsize = 40;    

        }
        else {
          if (width >= 700){
          //alert("width above or equal to 700");
          bWidth = 3;
          bHeight= 200;
          bFontsize = 40;      
     
        }
    }

        $("#bcTarget").barcode(barcodenumber, "codabar",{barWidth:bWidth, barHeight:bHeight, fontSize:bFontsize});

    }

    function populateFaculties(){
        var faculty = $('#Faculty_ID');

        $.ajax({
            type: 'GET',
            url: 'http://ubcdae-swacd1.advancement.ubc.ca/Retrieve-Faculty.php?&jsoncallback=?',
            dataType: 'JSONp',
            timeout: 5000,
            success: function(data) {
                $.each(data, function(i,item){
                  faculty.append("<option value=" + item.Faculty_ID + ">" + item.Faculty_Name)
            });
            },
            error: function (data) {
                bugs.append('<li>There was an error loading the bugs');
                faculty
            }
        });
    }

   

    function pullPerks(){
      
      //alert(checkConnection())
      //1. Check if there is internet connection
      if(checkConnection()){


            var perksArray = [];
      $.ajax({
        type: 'GET',
          url: 'http://ubcdae-swacd1.advancement.ubc.ca/Retrieve-Perks.php?&jsoncallback=?',
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
        alert("Internet access is required to update the Perks Table")

          
      }   
    }

    
    function displayPerksAccordian(){

      //Clear the accordian tabs:
      for ( var i = 1; i <= 6; i++ ) {
    
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
      //alert("before return");
      return;
    }


}

