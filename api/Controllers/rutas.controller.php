<?php
 require "./Models/Cors.Model.php";
class RutaController {

    public function inicio() {

        Cors::useHeaders();  //Evitar Cors
        include '././paths/rutas.php';

    }

}

?>
