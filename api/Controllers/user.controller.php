<?php
class userController {


  static function base64img($base64_image_string)
  {
      list($data, $base64_image_string) = explode(';', $base64_image_string);
      list(, $extension) = explode('/', $data);
      $output_file_with_extension = uniqid() . '.' . $extension;
      list(, $imageData)      = explode(',', $base64_image_string);
      file_put_contents('../api/api_recursos/fotos_perfil/' . $output_file_with_extension, base64_decode($imageData));
      return "http://$_SERVER[HTTP_HOST]/api/api_recursos/fotos_perfil/" . $output_file_with_extension;
  }
  static function base64imgPreview($base64_image_string)
  {
      list($data, $base64_image_string) = explode(';', $base64_image_string);
      list(, $extension) = explode('/', $data);
      $output_file_with_extension = uniqid() . '.' . $extension;
      list(, $imageData)      = explode(',', $base64_image_string);
      file_put_contents('../api/api_recursos/previewImg/' . $output_file_with_extension, base64_decode($imageData));
      return "http://$_SERVER[HTTP_HOST]/api/api_recursos/previewImg/" . $output_file_with_extension;
  }


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

      //en caso de que venga con algún dato la cabecera de imagen en el json


        if(isset($data["idUsuario"])){
          if(isset($data['Imagen'])){
            $rutaimg=self::base64img($data['Imagen']);
            $arrchimg=array('id_usuario'=>$data['idUsuario'],'urlimg'=>$rutaimg);
            userModel::ModificarImgUsuario($arrchimg);
          }
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


    public function altaUser($data){
      if(isset($data["idUsuario"])){

          $datos=userModel::altaUser($data);
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

    public function verificarReaccion($data){
        if(isset($data["idPost"])){

            $datos=userModel::verificarReaccion($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function eliminarReaccion($data){
        if(isset($data["idPost"])){

            $datos=userModel::eliminarReaccion($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function consulReaccion($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::consulReaccion($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function actLikes($data){
        if(isset($data["idPosts"])){
            if(($data["Reaccion"])==1){
                
                $datos=userModel::actLikes($data);
                $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
                echo json_encode($json);
                return;
            }else{
                
                $datos=userModel::actDislikes($data);
                $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
                echo json_encode($json);
                return;
            }
        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function obtenerChat($data){
        if(isset($data["idOrigen"])){

            $datos=userModel::obtenerChat($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function ingresarChat($data){
        if(isset($data["idOrigen"])){

            $datos=userModel::ingresarChat($data);
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

    public function showPostsAdmin(){

        try {

            $datos = userModel::GetPostsAdmin();

            $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> $datos );
            echo json_encode( $json );
            return;
        } catch( Exception $e1 ) {
            self::Error( $e1 );
        }
    }

    public function obtenerUsuarios(){

        try {

            $datos = userModel::GetUser();

            $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> $datos );
            echo json_encode( $json );
            return;
        } catch( Exception $e1 ) {
            self::Error( $e1 );
        }
    }

    public function mostrarCatAdmin(){

        try {

            $datos = userModel::getCatAdmin();

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

            $rutaimg=self::base64imgPreview($data['imagen']);
            //$arrchimg=array('id_Post'=>$data['idPosts'],'urlimg'=>$rutaimg);
            //userModel::ModificarImgPost($arrchimg);
            $datos=userModel::Postear($data,$rutaimg);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function guardarPost($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::guardarPost($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function buscarUser($data){
        if(isset($data["nombreUsuario"])){

            $datos=userModel::GetUserBuscar($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function Buscar($data){
        if(isset($data["Titulo"])){

            $datos=userModel::Buscar($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function verPost($data){
        if(isset($data["idPost"])){

            $datos=userModel::verPost($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function misPost($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::misPost($data);
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
        if(isset($data["idPosts"])){
            if(isset($data['imagen'])){
                $rutaimg=self::base64imgPreview($data['imagen']);
                $arrchimg=array('id_post'=>$data['idPosts'],'urlimg'=>$rutaimg);
                userModel::ModificarImgPost($arrchimg);
            }
           
            $datos=userModel::updatePostUser($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function updatePostPagina($data){
        if(isset($data["idPost"])){

            $datos=userModel::updatePostPagina($data);
            $json=array('message'=>'Operacion correcta','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function verPostEditar($data){
        if(isset($data["idPosts"])){

            $datos=userModel::verPostEditar($data);
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

    public function showmisCatposts($data){
        if(isset($data["idUsuario"])){

            $datos=userModel::showmisCatposts($data);
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

    public function verComentarios($data){
        if(isset($data["idPost"])){

            $datos=userModel::verComentarios($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function eliminarComentario($data){
        if(isset($data["idComentario"])){

            $datos=userModel::eliminarComentario($data);
            $json=array('message'=>'Operacion buena','status'=>200,'data'=>$datos);
            echo json_encode($json);
            return;


        }else{
            header('HTTP/1.0 500');
            echo 'compañero te falta un dato';
        }

    }

    public function postCategoria($data){
        if(isset($data["idCategoria"])){

            $datos=userModel::postCategoria($data);
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

