$( document ).ready(function() {
            

      $('#splashpage').show();
      $('#signupform').hide();
      $('#page1').hide();
      $('#page2').hide();

      $('#signup').click(function(){
        
        $('#splashpage').fadeOut('slow');
        $('#signupform').fadeIn('');
        $('#page1').fadeIn('');
        $('#page2').fadeIn('');

      });



        



        //Submit button on form
        $('#signup-form form').submit(function(){
        alert("invoked");
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
              alert("after split");

              var barcodenum = resultarray[0].replace(/\D/g,'');
              alert(barcodenum);
              //var res = data.replace(/\D/g,'')
              var Name = resultarray[1];
              alert(Name);

              alert("Before display");

                
                $("#bcTarget").barcode(barcodenum, "codabar");
                $("#User_Name").val(Name);   
            alert ("after display");

                
                console.log('Form Sent!');
            },
            error: function(){
                loading.removeClass('loading');
                console.log('There was an error');
            }
        });

        return false;
    });

});