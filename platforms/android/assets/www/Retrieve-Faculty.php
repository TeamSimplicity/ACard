<?php
	$server = "acardadmin.db.11988260.hostedresource.com";
	$username = "acardadmin";
	$password = "Hello123!";
	$database = "acardadmin";

	$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

	mysql_select_db($database, $con);

	$sql = "SELECT Faculty_Name FROM Faculty_Info";
	//$sqlold = "SELECT id, title FROM bugs WHERE open = TRUE ORDER BY priority, date_time_added";
	$result = mysql_query($sql) or die ("Query error: " . mysql_error());

	$faculty = array();

	while($row = mysql_fetch_assoc($result)) {
		$faculty[] = $row;
	}

	echo $_GET['jsoncallback'] . '(' . json_encode($faculty) . ');';

	mysql_close($con);
?>