<!DOCTYPE html>
<?PHP 
  //switch($_POST['destination']){
    //case deactivatePerk:
     //function deactivatePerk($_POST['value']);
     //break;
  //}
 
?>


<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title></title>

    <!-- Bootstrap -->
    <link href="bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="Stylesheets/main.css" rel="stylesheet">

    

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
<body>

  

    <div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">A-Card App Administration</a>
        </div>
        <div class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
           
            <li><a href="">Contact</a></li>
            <li><a href=""> <span class="glyphicon glyphicon-download-alt"></span></a></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>

    <div class="container">

          <div><?php
  echo "test";
 ?></div>
      <div class="starter-template">
        <h1>A-Card App Admin Menu  <span class="glyphicon glyphicon-ok"></span> </h1>
        <p class="lead"> Allows you administrate the perks database without the pesky PHPMyAdmin
      </div>
          <div>
            <?PHP 
              $InitialNumber= 29424301000000;

              echo "Initial number: $InitialNumber";

              $CheckDigit = substr($InitialNumber, -1);
              $SecondLastDigit = substr($InitialNumber, -2, 1);
              $StartNumber = substr_replace($InitialNumber ,"",-1);

              echo "<br>StartNumber (missing check digit): $StartNumber";
              echo "<br> Start Check Digit: $CheckDigit";

              $numCodesToGenerate = 100000;

              //1. Create array
              $barcodeArray = array();
              $barcodeArray[] = $InitialNumber;

              for ($x=$StartNumber; $x<=$StartNumber+$numCodesToGenerate; $x++) {
                          //Check Tthe previous check digit, if 4 do something else
                          //$SecondLastDigit = substr($newNumber, -2, 1);
                          //echo "The second last digit is: ".$SecondLastDigit." <br>";
                          //echo "the type of variable is ".gettype($SecondLastDigit);
                          //settype($SecondLastDigit,"integer");
                          //echo "<br>the type of variable is NOW ".gettype($SecondLastDigit);
                          //echo "START Number = ".$x;

                if ($x ==$StartNumber){
                  $x++; //NOT SURE WHY THIS FIXES IT BUT IM SURE WE'LL FIND OUT
                }
                if($SecondLastDigit != '4') {
                  $CheckDigit -= 2;
                  //echo "NOT 4! <br>";
                }
                if($SecondLastDigit == '4') {
                  $CheckDigit -= 3;
                  //echo "IT's 4! <br>";
                }

                if($CheckDigit < 0) {
                  $CheckDigit += 10;
                }
                $barcodeNumber = $x . $CheckDigit;
                $SecondLastDigit = substr($barcodeNumber, -2, 1);
                
                //2. Put element into $barcodeArray
                $barcodeArray[] = $barcodeNumber;
                
              }


              //3. INSERT INTO DB
              echo "<br><br>ARRAY BEGINS HERE:<br><br>";
              for($i = 0; $i < count($barcodeArray); $i++) {
                print_r($barcodeArray[$i]);
                echo "<br>";
              }

              //4. DB Insert
              $server = "acardadmin.db.11988260.hostedresource.com";
              $username = "acardadmin";
              $password = "Hello123!";
              $database = "acardadmin";

              $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
              mysql_select_db($database, $con);

              for($j = 0; $j < count($barcodeArray); $j++) {
                //$sql = "INSERT INTO Barcodes(Barcode, Assigned) VALUES('". $barcodeArray[$j] ."', '0')";
                //UNCOMMENT THE ABOVE IF YOU WANT TO INSERT BARCODES
                mysql_query($sql) or die ("Query error: " . mysql_error());
              }
              mysql_close($con);
            ?>
          </div>
    </div>
          
    

<div id="footer">
      <div class="container">
        <p class="text-muted">Created by <a href="http://tratnayake.me">T Ratnayake</a></p>
      </div>
    </div>


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="Scripts/jquery-2.1.0.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap/dist/js/bootstrap.min.js"></script>
    <script src="Scripts/jquery.csv.js"></script>
     <script src="Scripts/table2CSV.js"></script>
    <script src="Scripts/index.js"></script>
    
    <script type="text/javascript">
console.log("invokedSTARt");

$("#AddPerk-Form").submit(function(){
  //var PerkID= $(this).val();
  var PerkID= $("#perkContent").val();
  alert(PerkID);
  var PerkCatID= 14;
  var perkContent = "testPERKBOIIII";

  $.ajax({
  type: "POST",
  url: "http://localhost:8888/Add-Perk.php",
  data: { destination: "addPerk", perkContent: PerkID},
  success: function(data) {
            // Run the code here that needs
            //    to access the data returned
            alert(data);
        },
        error: function(data) {
            alert('Error occured');
        }
    });

  //alert("reached");
  location.reload();
});


  


$("button[name='Delete']").click(function(){
  var PerkID= $(this).val();

  $.ajax({
  type: "POST",
  url: "http://tratnayake.me/Retrieve-Perks2.php",
  data: { destination: "deletePerk", perkID: PerkID},
  success: function(data) {
            // Run the code here that needs
            //    to access the data returned
            alert(data);
        },
        error: function(data) {
            alert('Error occured');
        }
    });

  //alert("reached");
  location.reload();
});

$("button[name='Deactivate']").click(function(){
  //alert($(this).val());
  var PerkID= $(this).val();

  $.ajax({
  type: "POST",
  url: "http://tratnayake.me/Retrieve-Perks2.php",
  data: { destination: "deactivatePerk", perkID: PerkID},
  success: function(data) {
            // Run the code here that needs
            //    to access the data returned
            alert(data);
        },
        error: function(data) {
            alert('Error occured');
        }
    });

  //alert("reached");
  location.reload();
  
  //alert("Here");
});

$("button[name='Activate']").click(function(){
  var PerkID= $(this).val();

  $.ajax({
  type: "POST",
  url: "http://tratnayake.me/Retrieve-Perks2.php",
  data: { destination: "activatePerk"},
  success: function(data) {
            // Run the code here that needs
            //    to access the data returned
            alert(data);
        },
        error: function(data) {
            alert('Error occured');
        }
    });

  //alert("reached");
  location.reload();
});


    </script>

  </body>

</html>

<?PHP 

function perkCategoryDDL(){
   $server = "acardadmin.db.11988260.hostedresource.com";
  $username = "acardadmin";
  $password = "Hello123!";
  $database = "acardadmin";

  $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

  mysql_select_db($database, $con);

  $sql = "SELECT * FROM Perk_Categories;";

  $result = mysql_query($sql) or die ("Query error: " . mysql_error());

  //$perkCategories = array();

  while($row = mysql_fetch_assoc($result)) {
    //print_r($row);
    //$printOut .="<tr>";
   $PerkCategoryID = $row['PerkCategory_ID'];
   $Category=$row['Category'];
   //$Content =$row['PerkContent'];
   //$Status = $row['PerkActive'];

   
   

   $printOut .="<option value='".$PerkCategoryID."''>".$Category."</option>";
  }

  //print_r($perks);

  echo $printOut;
  mysql_close($con);

}

function pullPerks(){
  $server = "acardadmin.db.11988260.hostedresource.com";
  $username = "acardadmin";
  $password = "Hello123!";
  $database = "acardadmin";

  $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

  mysql_select_db($database, $con);

  $sql = "SELECT Perks.Perk_ID,Perk_Categories.Category,Perks.PerkContent,Perks.PerkActive FROM Perks INNER JOIN Perk_Categories ON Perks.PerkCategory_ID=Perk_Categories.PerkCategory_ID ORDER BY Perks.PerkActive DESC,Perks.PerkCategory_ID,Perks.Perk_ID;";
  //$sqlold = "SELECT id, title FROM bugs WHERE open = TRUE ORDER BY priority, date_time_added";
  $result = mysql_query($sql) or die ("Query error: " . mysql_error());

  $perks = array();

  while($row = mysql_fetch_assoc($result)) {
    //print_r($row);
    $printOut .="<tr>";
   $PerkID = $row['Perk_ID'];
   $Category=$row['Category'];
   $Content =$row['PerkContent'];
   $Status = $row['PerkActive'];

   // If the Perk = 1, that means it's active. If the perk 
   //is 0, show that as inactive
   if($Status =='1'){
    $Status ="Yes";
    $Button ="<td><button name='Deactivate' value=".$PerkID." type='button' class='btn btn-warning'>Deactivate</button></td>";
   }
   else{
    $Status="No";
    $Button ="<td><button name='Activate' value=".$PerkID." type='button' class='btn btn-info'>Activate</button></td>";

   }
   $deleteButton ="<td><button name='Delete' value=".$PerkID." type='button' class='btn btn-danger'>Delete</button></td>";

   $printOut .="<td>".$PerkID."</td>"."<td>".$Category."</td><td>".$Content."</td><td>".$Status."</td><td>".$Button."</td><td>".$deleteButton."</td></tr>";
   
  }

  //print_r($perks);

  echo $printOut;
  mysql_close($con);
}

function connectionInfo(){

}
?>