<?php
require_once 'conexion.php';
class PruebaModel{

    static public function GetInfo() {
        $stmt = Connection::connect()->prepare( 'Select * from categorias' );
    
        $stmt->execute();
    
        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;
    
    }
    
}

?>

