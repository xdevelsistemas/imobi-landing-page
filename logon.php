<?php

 	$username = $_GET["username"];
 	$password = $_GET["password"];

 	//$host = "http://default-environment-qdtv2kwp4n.elasticbeanstalk.com/Account/Logon";
    $host = "http://192.168.2.105/ImobiApp";
    $host_func = "/Account/LogonExt";
 	$postData = array(Username => $username, Password => $password, ReturnUrl => $host);


 	$ch = curl_init($host+$host_func);
	curl_setopt_array($ch, 
		array(  CURLOPT_POST => TRUE,
			    CURLOPT_RETURNTRANSFER => TRUE,
			    CURLOPT_HTTPHEADER => array('Content-Type: application/json'),
    			CURLOPT_POSTFIELDS => json_encode($postData)
			 )
		);

	// Send the request
	$response = curl_exec($ch);


	// Check for errors
	if($response === FALSE){
	    die(curl_error($ch));
	}

	// Decode the response
	$responseData = json_decode($response, TRUE);

	// Print the date from the response
	echo $responseData['mensagem'];


?>