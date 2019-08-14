    <?php
    class Ajax_Face_IndexController extends Mage_Core_Controller_Front_Action
    {
        public function indexAction()
        {
		
		$data = $_POST['dataString'];
		echo $data;
		
	  
	   
  
		require_once("Face.php");
		

		// basic instantiation. TODO Put your authentication keys here.

		$obj = new Face("6z1mstluneooiy1ulntokkfs08cd7w", "nirjdkl9hmqsh1cri0r3qeoklxrub9");

		$response = $obj->detect($data);

		
		$top = $response->body->photos[0]->tags[0]->eye_left->y;
		$left = $response->body->photos[0]->tags[0]->eye_left->x;		
		echo ",".$top.",";		
        echo $left.",";		
    }
	}
 
