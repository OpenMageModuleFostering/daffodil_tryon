<?php
/*
*Tryon Extension by daffodil
*/
?>
<?php
class HttpUtils {

	public static function cleanParameters(&$parameters) {
        if ($parameters == null) {
            $parameters = array();
        } else if (is_array($parameters)) {
            // Remove null parameters
            $keys = array_keys($parameters);
            for ($i = 0;$i<count($keys);$i++) {
                $key = $keys[$i];
                if ($parameters[$key] === null) {
                    unset($parameters[$key]);
                } else {
                    $parameters[$key] = (string)$parameters[$key];
                }
            }
        }
	}

	public static function buildDataForContentType($contentType, $parameters, &$headers) {
		$data = null;
		switch ($contentType) {
		case ContentType::FORM:
			$data = http_build_query($parameters);
			break;
		case ContentType::MULTIPART:
			$data = $parameters;
			break;
		case ContentType::JSON:
			$headers[] = "Content-Type: application/json";
			$data = $parameters;
			break;
		default:
			throw new MashapeClientException(
				EXCEPTION_NOTSUPPORTED_CONTENTTYPE,
				EXCEPTION_NOTSUPPORTED_CONTENTTYPE_CODE);
		}
		return $data;
	}

	public static function handleAuthentication($authHandlers) {
		$headers = array();
		$parameters = array();
		$headers[] = self::generateClientHeaders();
		// Authentication
		foreach($authHandlers as $handler) {
			if ($handler instanceof QueryAuthentication) {
				$parameters = array_merge($parameters, $handler->handleParams());
			} else if ($handler instanceof HeaderAuthentication) {
				$headers = array_merge($headers, $handler->handleHeaders());
			} else if ($handler instanceof Oauth10aAuthentication) {
				$headers = array_merge($headers, $handler->handleHeaders());
			} else if ($handler instanceof Oauth2Authentication) {
				$parameters = array_merge($parameters, $handler->handleParams());
			}
		}
		return array($headers, $parameters);
	}

	public static function generateClientHeaders() {
		$headers = "User-Agent: mashape-php/1.0: ";
		return $headers;
	}
}

?>
