<?php
	$server = "acardadmin.db.11988260.hostedresource.com";
	$username = "acardadmin";
	$password = "Hello123!";
	$database = "acardadmin";

	$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

	mysql_select_db($database, $con);

	$sql = "SELECT * FROM User_Info";
	//$sqlold = "SELECT id, title FROM bugs WHERE open = TRUE ORDER BY priority, date_time_added";
	$result = mysql_query($sql) or die ("Query error: " . mysql_error());

	$Users = array();

	//echo $result;

	while($row = mysql_fetch_assoc($result)) {
		$Users[] = $row;
	}

	echo $_GET['jsoncallback'] . '(' . json_encode($Users) . ');';

	mysql_close($con);
?>