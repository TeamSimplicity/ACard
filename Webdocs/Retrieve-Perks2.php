<?php
	
	switch ($_POST[destination]){
		case "retrieve":
			pullPerks();
			break;
		case "deactivatePerk":
			deactivatePerk($_POST[perkID]);
			break;
		case "activatePerk":
			activatePerk($_POST[perkID]);
			break;
		case "deletePerk":
			deletePerk($_POST[perkID]);
			break;
		case "addPerk":
			addPerk();
			break;
		case "somethingelse";
			echo "somethingelse";
			break;
	}

function addPerk(){
	$server = "acardadmin.db.11988260.hostedresource.com";
	$username = "acardadmin";
	$password = "Hello123!";
	$database = "acardadmin";
	$test = $_POST[testData];

  $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

  mysql_select_db($database, $con);

  $sql = "INSERT INTO Perks (PerkCategory_ID, PerkContent, PerkActive) VALUES ('2', '".$_POST[testData]."', '1');";
  mysql_query($sql) or die ("Query error: " . mysql_error());

  mysql_close($con);


}

function deletePerk($perkID){
$server = "acardadmin.db.11988260.hostedresource.com";
	$username = "acardadmin";
	$password = "Hello123!";
	$database = "acardadmin";

  $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

  mysql_select_db($database, $con);

  $sql = "DELETE FROM Perks WHERE Perk_ID='".$perkID."';";
  mysql_query($sql) or die ("Query error: " . mysql_error());

  mysql_close($con);
}

function activatePerk($perkID){
$server = "acardadmin.db.11988260.hostedresource.com";
	$username = "acardadmin";
	$password = "Hello123!";
	$database = "acardadmin";

  $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

  mysql_select_db($database, $con);

  $sql = "UPDATE Perks SET PerkActive='1' WHERE Perk_ID='".$perkID."';";
  mysql_query($sql) or die ("Query error: " . mysql_error());
  mysql_close($con);
}

function deactivatePerk($perkID){


 	$server = "acardadmin.db.11988260.hostedresource.com";
	$username = "acardadmin";
	$password = "Hello123!";
	$database = "acardadmin";

  $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

  mysql_select_db($database, $con);

  $sql = "UPDATE Perks SET PerkActive='0' WHERE Perk_ID='".$perkID."';";
  mysql_query($sql) or die ("Query error: " . mysql_error());
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

	//echo $result;

	while($row = mysql_fetch_assoc($result)) {
		array_push($perks,$row);
	}

	//print_r($perks);

	echo $_GET['jsoncallback']  . json_encode($perks) ;

	mysql_close($con);
}
	
?>