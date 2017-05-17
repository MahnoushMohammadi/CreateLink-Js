<?php
session_start();
require("PHPMailer/PHPMailerAutoload.php");


    $url = $_POST['url'];
	$email = $_POST['email'];
    $key = $_POST['keyemail'];
	$website = (trim(file_get_contents("../../config/ChangePasswordWebsite.txt")));
  
   // Email the file
   // $data  = "fatmaaldabaa@gmail.com";
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
	$mail->Subject = "Reset Password";
    $mail->Body = "Please use this link to change your password. The link is valid for 24 hours.\r\n" .$website .$url;
	$mail->AddAddress($email);
	

	 if(!$mail->Send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	 } else {
	    echo "Message has been sent";
	 }

?>