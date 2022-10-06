<?php
$arrayRutas = explode( '/', $_SERVER[ 'REQUEST_URI' ] );
//Separa la ruta actual y lo guarda en un array

if ( count( array_filter( $arrayRutas ) ) == 1 ) {
    //Caso que no exista una ruta
    echo 'Ruta no Encontrada';
    return;

} else {
    //Sin Parametros
    if ( count( array_filter( $arrayRutas ) ) == 2 )
 {

        if ( array_filter( $arrayRutas )[ 2 ] == '?u=ObtenerUsuarios' ) {
            //Post en Alumnos
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $objUsuarios = new AdministradorController();
                $objUsuarios->index();

            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=RegistrarUsuario' ) {

           
        } else {
            echo 'No existe la ruta especifica!';
        }
    }


?>
