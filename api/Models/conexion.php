<?php

class Connection {
    //Conecta ala Base  de Datos
    static public function connect() {
        $link = new PDO( 'mysql:host=localhost;dbname=howto', 'root', '' );
        $link->exec( 'set names utf8' );
        return $link;
    }

}
?>