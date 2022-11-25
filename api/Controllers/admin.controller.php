<?php
class adminController {

    static function base64imgCat($base64_image_string)
    {
        list($data, $base64_image_string) = explode(';', $base64_image_string);
        list(, $extension) = explode('/', $data);
        $output_file_with_extension = uniqid() . '.' . $extension;
        list(, $imageData)      = explode(',', $base64_image_string);
        file_put_contents('../api/api_recursos/catIcon/' . $output_file_with_extension, base64_decode($imageData));
        return "http://$_SERVER[HTTP_HOST]/api/api_recursos/catIcon/" . $output_file_with_extension;
    }

    public function Error( $e ) {
        header( 'HTTP/1.0 500' );
        //Cabecera que Indica que hay un error en el Servidor
        $json = array( 'message' => '¡Hubo un Error!', 'status'=>500, 'data' => $e->getMessage() );
        echo json_encode( $json );
        return ;
    }

    public function metercat($data){
        if(isset($data["nombreCategoria"])){

            $rutaimg=self::base64imgCat($data['Icono']);
            //$arrchimg=array('id_cat'=>$data['idCategoria'],'urlimg'=>$rutaimg);
            $datos=adminModel::addcat($data, $rutaimg);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function eliminarCat($data){
        if(isset($data["idCategoria"])){

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
            if(isset($data['Icono'])){
                $rutaimg=self::base64imgCat($data['Icono']);
                $arrchimg=array('id_cat'=>$data['idCategoria'],'urlimg'=>$rutaimg);
                adminModel::ModificarImgCat($arrchimg);
              }
            if(isset($data['Estatus'])){
                adminModel::modificarEstatusCategoria($data);
            }
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

