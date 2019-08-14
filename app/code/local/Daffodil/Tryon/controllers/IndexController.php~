<?php
/*
*Tryon Extension by daffodil
*/
?>
<?php
    class Daffodil_Tryon_IndexController extends Mage_Core_Controller_Front_Action
    {
        public function indexAction()
        {
                $this->loadLayout();
                $this->renderLayout();
                                
                $dir = 'media/uploads/';
        foreach(glob($dir.'*.*') as $v)
                {
        unlink($v);
         }              
                                
                $uploaddir = 'media/uploads/' ; 
        $file = $uploaddir . basename($_FILES['uploadfile']['name']); 
        
 
    if (move_uploaded_file($_FILES['uploadfile']['tmp_name'], $file)) { 
         include('SimpleImage.php');
     $image = new SimpleImage();
     $image->load( $file);
     $image->resize(200,250);
     $image->save( $file);
       } else {
       }
           
                require_once("Face.php");
                

                // basic instantiation. TODO Put your authentication keys here.
                $baseImage = Mage::getBaseUrl(Mage_Core_Model_Store::URL_TYPE_WEB);
                $secondpath = $baseImage."".$file;
                $obj = new Face("6z1mstluneooiy1ulntokkfs08cd7w", "nirjdkl9hmqsh1cri0r3qeoklxrub9");
                $response = $obj->detect($secondpath);
                $top = $response->body->photos[0]->tags[0]->eye_left->y;
                $left = $response->body->photos[0]->tags[0]->eye_left->x;               
                echo $top.',';          
        echo $left.',';         
        }
    }
