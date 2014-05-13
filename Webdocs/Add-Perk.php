<?PHP

$server = "acardadmin.db.11988260.hostedresource.com";
	$username = "acardadmin";
	$password = "Hello123!";
	$database = "acardadmin";

	//echo $Perk_Category = $_POST['PerkCategory_ID'];
	

  $con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

  mysql_select_db($database, $con);

    $sql = "INSERT INTO Perks (Perk_ID,PerkCategory_ID, PerkContent, PerkActive) VALUES (NULL,'".$_POST['PerkCategory_ID']."', '".$_POST['perkContent']."', '1');";
   mysql_query($sql) or die ("Query error: " . mysql_error());


  mysql_close($con);

if( !headers_sent() ){
  header("Location: http://tratnayake.me/Webdocs/acardadmin.php");
}else{
  ?>
  <script type="text/javascript">
  document.location.href="http://tratnayake.me/Webdocs/acardadmin.php";
  </script>
  Redirecting to <a href="http://tratnayake.me/Webdocs/acardadmin.php">http://www.google.com/</a>
  <?php
}
die();

  

 
/* Make sure that code below does not get executed when we redirect. */
	exit;



?>