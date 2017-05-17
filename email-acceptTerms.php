<?php
//Mahnoush
session_start();
require("PHPMailer/PHPMailerAutoload.php");


	$email = $_POST['email'];
  
	$mail = new PHPMailer(); // create a new object
	$mail->IsSMTP(); // enable SMTP
	$mail->SMTPDebug = 1; // debugging: 1 = errors and messages, 2 = messages only
	$mail->SMTPAuth = true; // authentication enabled
	$mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for Gmail
	$mail->Host = trim(file_get_contents("../../config/host.txt"));
	$mail->Port = 587; // or 587
	$mail->IsHTML(true);
	$mail->Username = trim(file_get_contents("../../config/email_username.txt"));
	$mail->Password = trim(file_get_contents("../../config/email_password.txt"));
	$mail->SetFrom(trim(file_get_contents("../../config/email_username.txt")));
	$mail->Subject = "Access Password";
    $mail->Body = "A new user accepted terms and conditions and requested access code. Please send the access code to: " .$email ;
	$mail->AddAddress(trim(file_get_contents("../../config/email_accesscode.txt")));
	

	 if(!$mail->Send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	 } else {
	    echo "Message has been sent";
	 }

?>