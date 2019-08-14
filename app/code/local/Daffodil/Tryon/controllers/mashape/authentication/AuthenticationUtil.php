<?php
/*
*Tryon Extension by daffodil
*/
?>
<?php
class AuthenticationUtil {

	public static function generateAuthenticationHeader($publicKey, $privateKey) {
		$header = "";
		if (!($publicKey == null || $privateKey == null)) {
			$hash = hash_hmac("sha1", $publicKey, $privateKey);
			$header = "X-Mashape-Authorization: " . base64_encode($publicKey . ":" . $hash);
		}
		return $header;
	}

}

?>
