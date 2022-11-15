<?php
class adminController {

    public function Error( $e ) {
        header( 'HTTP/1.0 500' );
        //Cabecera que Indica que hay un error en el Servidor
        $json = array( 'message' => '¡Hubo un Error!', 'status'=>500, 'data' => $e->getMessage() );
        echo json_encode( $json );
        return ;
    }

    public function metercat($data){
        if(isset($data["desc"])){

            $datos=adminModel::addcat($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function eliminarCat($data){
        if(isset($data["id"])){

            $datos=adminModel::deletecat($data);
            $json=array('message'=>'Operacion Exitosa','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function modificarCat($data){
        if(isset($data["idCategoria"])){

            $datos=adminModel::updatecat($data);
            $json=array('message'=>'Operacion Exitosa','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }



    public function consultaUsers(){

        try {

            $datos = adminModel::selectUsers();

            $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> $datos );
            echo json_encode( $json );
            return;
        } catch( Exception $e1 ) {
            self::Error( $e1 );
        }
    }

    public function deletePostAdmin($data){
        if(isset($data["idPosts"])){

            $datos=adminModel::bajaPostAdmin($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function deletemedia($data){
        if(isset($data["idPost"])){

            $datos=adminModel::bajaMediaAdmin($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'Error al eliminar media';
        }

    }

    public function insertTipoUsuario($data){
        if(isset($data["nombreTipo"])){

            $datos=adminModel::addTipoUsuario($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function consultaTipoUsers(){

        try {

            $datos = adminModel::selectTipoUsers();

            $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> $datos );
            echo json_encode( $json );
            return;
        } catch( Exception $e1 ) {
            self::Error( $e1 );
        }
    }

}
?>

