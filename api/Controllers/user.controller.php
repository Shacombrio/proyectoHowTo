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
    public function modificarUser($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::updateUser($data);
            $json=array('message'=>'Operacion Exitosa','status'=>200,'data'=>$datos);
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

    public function sumaLikes($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::sumaLikes($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    
    public function conteoLikes($data){
        if(isset($data["idPost"])){

            $datos=userModel::conteoLikes($data);
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

    public function mostrarCat(){

        try {

            $datos = userModel::getCat();

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

    public function guardarchat($data){
        if(isset($data["Mensaje"])){

            $datos=userModel::grdchat($data);
            $json=array('message'=>'Chat almacenado','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


         }else{
            header('HTTP/1.0 500');
            echo 'Error al guardar el chat';
        }

    }

    public function mostrarchat($data){

        try {

            $datos = userModel::mstchat($data);

            $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> $datos );
            echo json_encode( $json );
            return;
        } catch( Exception $e1 ) {
            self::Error( $e1 );
        }
    }

    public function insertarmediausuario($data){
        if(isset($data["idPost"])){

            $datos=userModel::addMediaUser($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function mostrarmedia($data){

        try {

            $datos = userModel::mstmedia($data);

            $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> $datos );
            echo json_encode( $json );
            return;
        } catch( Exception $e1 ) {
            self::Error( $e1 );
        }
    }

    public function registrarFav($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::addFav($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function showFav($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::showFavoritos($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function deleteFav($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::deleteFavorito($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function comentarPost($data){
        if(isset($data["idPost"])){

            $datos=userModel::comentarPost($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function eliminarComentario($data){
        if(isset($data["idPost"])){

            $datos=userModel::eliminarComentario($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function login($data){

      $datos=userModel::login($data);



    }

}
?>

