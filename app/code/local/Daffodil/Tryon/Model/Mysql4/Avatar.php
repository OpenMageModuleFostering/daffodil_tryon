    <?php
     
    class Daffodil_Tryon_Model_Mysql4_Avatar extends Mage_Core_Model_Mysql4_Abstract
    {
        public function _construct()
        {   
            $this->_init('tryon/tryon', 'tryon_id');
        }
    }
