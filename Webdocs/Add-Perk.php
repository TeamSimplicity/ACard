<?PHP

$server = "acardadmin.db.11988260.hostedresource.com";
	$username = "acardadmin";
	$password = "Hello123!";
	$database = "acardadmin";

  $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

  mysql_select_db($database, $con);

    $sql = "INSERT INTO Perks (PerkCategory_ID, PerkContent, PerkActive) VALUES ('2', '".$_POST['perkContent']."', '1');";
  mysql_query($sql) or die ("Query error: " . mysql_error());

  mysql_close($con);



?>