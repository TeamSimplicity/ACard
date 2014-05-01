<?php

$server = "acardadmin.db.11988260.hostedresource.com";
$username = "acardadmin";
$password = "Hello123!";
$database = "acardadmin";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

mysql_select_db($database, $con);

//FRONT END< MAKE SURE THE KEYS FOR THE VALUES ARE, EMail, FName, LName, Faculty_ID and Grad_Year

//1. Grab user information form form
$Email = mysql_real_escape_string($_POST["EMail"]);
$FName = mysql_real_escape_string($_POST["FName"]);
$LName = mysql_real_escape_string($_POST["LName"]);
$Faculty_ID = mysql_real_escape_string($_POST["Faculty_ID"]);
$Grad_Year = mysql_real_escape_string($_POST["Grad_Year"]);


//2. Pull next unassigned barcode to register

		//Get all the barcodes that have not been assigned yet
$sql = "SELECT Barcode FROM Barcodes WHERE Assigned = '0' ";
$result = mysql_query($sql) or die ("Query error: " . mysql_error());

		//Array to hold all unassigned barcodes
$resultset = array();

		//Add every unassigned barcode to array
while ($row = mysql_fetch_assoc($result)) {
    array_push($resultset,$row["Barcode"]);
}

		//Pick the first available barcode to assign
$BarcodeNum = array_shift($resultset);


//3. Insert into User_Info Table
$assignmentsql = "INSERT INTO User_Info (User_ID, Barcode, User_Email, User_FName, User_LName, User_Faculty_ID, User_GradYear, Verified) ";
$assignmentsql .= "VALUES ('NULL', '$BarcodeNum', '$Email','$FName','$LName','$Faculty_ID','$Grad_Year','0')";

//Execute input


mysql_query($assignmentsql);

			//if (!mysql_query($sql, $con)) {
				//die('Error: ' . mysql_error());
			//} else {
				//echo "Bug added";
			//}

//4. Change Barcode to assigned
$updatesql = "UPDATE Barcodes SET Assigned='1' WHERE Barcode ='$BarcodeNum'";
mysql_query($updatesql);

//5. Send assigned barcode to App
$Name = $FName." ".$LName;
echo $_GET['jsoncallback']  . json_encode($BarcodeNum) .'.'.json_encode($Name);

mysql_close($con);
?>