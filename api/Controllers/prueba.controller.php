<?php
class PruebaController {

    public function Error( $e ) {
        header( 'HTTP/1.0 500' );
        //Cabecera que Indica que hay un error en el Servidor
        $json = array( 'message' => '¡Hubo un Error!', 'status'=>500, 'data' => $e->getMessage() );
        echo json_encode( $json );
        return ;
    }
    public function pruebita(){

        try {

            $datos = PruebaModel::GetInfo();

            $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> $datos );
            echo json_encode( $json );
            return ;
        } catch( Exception $e1 ) {
            self::Error( $e1 );
        }
    }
}
?>

