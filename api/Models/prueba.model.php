<?php
require_once 'conexion.php';
class PruebaModel{

    static public function GetInfo() {
        $stmt = Connection::connect()->prepare( 'Select * from roles' );
    
        $stmt->execute();
    
        return $stmt->fetch( PDO::FETCH_ASSOC );
    
    }
    


}

?>

