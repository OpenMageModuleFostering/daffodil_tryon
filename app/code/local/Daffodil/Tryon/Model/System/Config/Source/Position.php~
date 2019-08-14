<?php

class Daffodil_Tryon_Model_System_Config_Source_Position
{
    
    protected $_helper;

    public function getHelper()
    {
        if (is_null($this->_helper)) {
            $this->_helper = Mage::helper('daffodil_tryon');
        }
        return $this->_helper;
    }

   public function toOptionArray()
    {
        $helper = $this->getHelper();
        return array(
            'right'  => $helper->__('Right'),
            'left'   => $helper->__('Left'),
            'top'    => $helper->__('Top'),
            'bottom' => $helper->__('Bottom'),
            'inside' => $helper->__('Inside')
        );
    }
}
