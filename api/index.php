<?php

require_once "Controllers/rutas.controller.php";
require_once "Controllers/prueba.controller.php";
require_once "Controllers/admin.controller.php";
require_once "Controllers/user.controller.php";
require_once "Models/Cors.Model.php";
require_once "Models/prueba.model.php";
require_once "Models/admin.model.php";
require_once "Models/user.model.php";
require_once './libraries/src/JWT.php';
require_once './libraries/src/Key.php';
require_once 'models/Enviroment.php';
$objRuta = new  RutaController();
$objRuta->inicio(); //Nos redirijira al archivo page.php








?>
