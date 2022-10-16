<?php
class userController {

    public function Error( $e ) {
        header( 'HTTP/1.0 500' );
        //Cabecera que Indica que hay un error en el Servidor
        $json = array( 'message' => '¡Hubo un Error!', 'status'=>500, 'data' => $e->getMessage() );
        echo json_encode( $json );
        return ;
    }

    public function ingresarUser($data){
        if(isset($data["Correo"])){

            $datos=userModel::addUser($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function eliminarUser($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::deleteUser($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function cambiarContra($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::updatePass($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function consultaPerso($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::selectPerso($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function showPosts(){

        try {

            $datos = userModel::GetPosts();

            $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> $datos );
            echo json_encode( $json );
            return;
        } catch( Exception $e1 ) {
            self::Error( $e1 );
        }
    }

    public function Posting($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::Postear($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function deletePost($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::bajaPost($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function updatePost($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::updatePostUser($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }


}
?>

