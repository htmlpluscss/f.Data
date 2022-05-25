<?php

// reCAPTCHA v3
// https://www.google.com/recaptcha/admin/

$g_recaptcha_response = $_POST['g_recaptcha_response'];
$g_recaptcha_response_check = false;
$PRIVATE_KEY = '';

if (!empty($g_recaptcha_response)) {

	$response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$PRIVATE_KEY."&response=".$g_recaptcha_response."&remoteip=".$_SERVER["REMOTE_ADDR"]),true);

	if ($response["success"] and $response["score"] >= 0.5) {

		$g_recaptcha_response_check = true;

	}

}

// логируем письма

$mytext = date('d.m.y H:i') . "\r\n";
$mytext .= $_POST['name'] . "\r\n";
$mytext .= $_POST['phone'] . "\r\n";
$mytext .= $_POST['email'] . "\r\n";
$mytext .= "___________\r\n";

if (!$g_recaptcha_response_check) {

	$fp = fopen('../log-invalid-recaptcha.txt', "a");
	fwrite($fp, $mytext);
	fclose($fp);

//	echo '{"recaptcha":"false"}';

//	exit;

} else {

	$fp = fopen('../log-mail.txt', "a");
	fwrite($fp, $mytext);
	fclose($fp);

}

use PHPMailer\PHPMailer\PHPMailer;

require 'PHPMailer/PHPMailer.php';

$mail = new PHPMailer(true);

try {

	//Recipients
	$mail->setFrom('hellopeople@fdata.tech', 'f.Data');
	$mail->addAddress('79198889134@ya.ru');
	$mail->addAddress('aabramov74@gmail.com');
	$mail->addAddress('slezin.i@gmail.com');
	$mail->addAddress('ustinov00@gmail.com');

	//Content
	$html  = '<b>Имя:</b> ' . $_POST['name'];
	$html .= '<br><b>Телефон:</b> ' . $_POST['phone'];
	$html .= '<br><b>E-mail:</b> ' . $_POST['email'];

	$mail->CharSet  = 'UTF-8';
	$mail->Subject = $_POST['subject'];
	$mail->msgHTML($html);
	$mail->send();

	$success = new class{};

	$success->title = "Отправлено";
	$success->text  = "Мы получили ваше письмо. В скором времени менеджер вам ответит. Спасибо!";

	echo json_encode( $success );

}
catch (Exception $e) {
	echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
}