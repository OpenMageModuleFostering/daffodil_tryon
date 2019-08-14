<?php
require_once("mashape/MashapeClient.php");


class Face {
	const PUBLIC_DNS = "lambda-face-detection-and-recognition.p.mashape.com";
	private $authHandlers;

	function __construct($publicKey, $privateKey) {
		$this->authHandlers = array();
		$this->authHandlers[] = new MashapeAuthentication($publicKey, $privateKey);
		
	}
	public function detect($images) {
		$parameters = array(
				"images" => $images);

		$response = HttpClient::doRequest(
				HttpMethod::GET,
				"https://" . self::PUBLIC_DNS . "/detect",
				$parameters,
				$this->authHandlers,
				ContentType::FORM,
				true);
		return $response;
	}
	

	
}
?>