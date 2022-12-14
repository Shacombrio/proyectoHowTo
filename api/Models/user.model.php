<?php
require_once 'conexion.php';
use Firebase\JWT\JWT;
class userModel{

    static public function addUser($data){
        $stmt=Connection::connect()->prepare('insert into usuarios values (null,:Correo,:nombreUsuario,:Contra,:Estatus,:Imagen,:tipoUsuario,:Nombre)');
        $stmt->bindParam(':Nombre',$data['Nombre']);
        $stmt->bindParam(':Correo',$data['Correo']);
        $stmt->bindParam(':nombreUsuario',$data['nombreUsuario']);
        $pass = hash( 'sha512',$data['Contra']);
        $stmt->bindParam(':Contra',$pass);
        $stmt->bindParam(':Estatus',$data['Estatus']);
        $stmt->bindParam(':Imagen',$data['Imagen']);
        $stmt->bindParam(':tipoUsuario',$data['tipoUsuario']);
        $stmt->execute();

        return 'Usuario registrado';

    }

    static public function updateUser($data){
        $stmt=Connection::connect()->prepare('update usuarios set  Nombre = :Nombre, Correo = :Correo, nombreUsuario = :nombreUsuario where idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':Nombre',$data['Nombre']);
        $stmt->bindParam(':Correo',$data['Correo']);
        $stmt->bindParam(':nombreUsuario',$data['nombreUsuario']);
        $stmt->execute();

        $datosUser = UserModel::MostrarUsuarioEspecifico( $data[ 'Correo' ] );

        return userModel::ActualizarToken( $datosUser );

    }

    static public function ModificarImgUsuario( $datos ) {

      $stmt = Connection::connect()->prepare( 'update usuarios set Imagen=:img where idUsuario=:ID_USUARIO' );
      $stmt->bindParam( ':ID_USUARIO', $datos[ 'id_usuario' ] );
      $stmt->bindParam( ':img', $datos[ 'urlimg' ] );
      $stmt->execute();

      return '  Se modifico correctamente  la Imagen';
  }

  
  static public function ModificarImgPost( $datos ) {

    $stmt = Connection::connect()->prepare( 'update posts set imagen=:img where idPosts=:idPosts' );
    $stmt->bindParam( ':idPosts', $datos[ 'id_post' ] );
    $stmt->bindParam( ':img', $datos[ 'urlimg' ] );
    $stmt->execute();

    return '  Se modifico correctamente  la Imagen';
}



    static public function deleteUser($data){
        $stmt=Connection::connect()->prepare('update usuarios set Estatus = 2 where idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();

        return 'categoria Eliminada';

    }



    static public function altaUser($data){
      $stmt=Connection::connect()->prepare('update usuarios set Estatus = 1 where idUsuario = :idUsuario');
      $stmt->bindParam(':idUsuario',$data['idUsuario']);
      $stmt->execute();

      return 'categoria Eliminada';

  }

    static public function updatePass($data){
        $stmt=Connection::connect()->prepare('update usuarios set Contrase??a = :Contra where idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $pass = hash('sha512',$data['Contra']);
        $stmt->bindParam(':Contra',$pass);
        $stmt->execute();

        return 'contrase??a actualizada';

    }

    static public function comentarPost($data){
        $stmt=Connection::connect()->prepare('insert into comentarios values (null,:texto,:idUsuario,:idPost)');
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':texto',$data['texto']);
        $stmt->execute();

        return 'comentario a??adido';

    }

    static public function verComentarios($data){
        $stmt=Connection::connect()->prepare('select * from comentarios inner join usuarios on comentarios.idUsuario = usuarios.idUsuario where idPost = :idPost and usuarios.Estatus = 1');
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt->close();
        $stmt=null;

    }

    static public function guardarPost($data){
        $stmt=Connection::connect()->prepare('insert into postspagina values (null,:Contenido,:idUsuario)');
        $stmt->bindParam(':Contenido',$data['Contenido']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();

        return 'Post publicado';

    }

    static public function verPost($data){
        $stmt=Connection::connect()->prepare('Select * from postspagina where idPost = :idPost');
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt->close();
        $stmt=null;

    }

    static public function misPost($data){
        $stmt=Connection::connect()->prepare('Select * from posts where idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
        $stmt->close();
        $stmt=null;

    }

    static public function eliminarComentario($data){
        $stmt=Connection::connect()->prepare('delete from comentarios where idComentario=:idComentario');
        $stmt->bindParam(':idComentario',$data['idComentario']);
      
        $stmt->execute();

        return 'comentario Eliminado';

    }

    static public function selectPerso($data) {
    try{
        $stmt = Connection::connect()->prepare( 'Select * from usuarios where idUsuario = :idUsuario' );

        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();
        if($stmt != null)
        return $stmt->fetch(PDO::FETCH_ASSOC);
        return null;
    }
        catch(Exception $e1){
            return 'Error'.$e1->getMessage();
        }
    }

    static public function obtenerChat($data) {

            $stmt = Connection::connect()->prepare( 'SELECT * FROM chat LEFT JOIN usuarios ON usuarios.idUsuario = chat.idOrigen WHERE (idOrigen = :idOrigen AND idDestino = :idDestino) OR (idOrigen = :idDestino AND idDestino = :idOrigen) ORDER BY idChat' );

            $stmt->bindParam(':idOrigen',$data['idOrigen']);
            $stmt->bindParam(':idDestino',$data['idDestino']);
            $stmt->execute();

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
            $stmt->close();
            $stmt=null;

        }

        static public function ingresarChat($data){
            $stmt=Connection::connect()->prepare('insert into chat values (null,:idOrigen,:idDestino,:mensaje,NOW())');
            $stmt->bindParam(':idOrigen',$data['idOrigen']);
            $stmt->bindParam(':idDestino',$data['idDestino']);
            $stmt->bindParam(':mensaje',$data['mensaje']);


            $stmt->execute();

            return 'mensaje ingresado';

        }

    static public function GetPosts() {
        $stmt = Connection::connect()->prepare( 'Select * from posts where Estatus = 1 ORDER BY idPosts DESC' );

        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function GetPostsAdmin() {
        $stmt = Connection::connect()->prepare( 'Select * from posts' );

        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function postCategoria($data) {
        
        $stmt = Connection::connect()->prepare( 'Select * from posts where idCategoria=:idCategoria and Estatus = 1 ORDER BY idPosts DESC ' );
        $stmt->bindParam(':idCategoria',$data['idCategoria']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function Buscar($data) {
        
        $stmt = Connection::connect()->prepare( 'Select * from posts where Titulo LIKE "%":Titulo"%" ORDER BY idPosts DESC' );
        $stmt->bindParam(':Titulo',$data['Titulo']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function verPostEditar($data) {
        $stmt = Connection::connect()->prepare( 'Select * from posts where idPosts = :idPosts' );
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function GetUser() {
        $stmt = Connection::connect()->prepare( 'select idUsuario,Imagen,Correo,nombreUsuario,Nombre,Estatus, tipousuario.nombreTipo from usuarios INNER join tipousuario on usuarios.tipoUsuario=tipoUsuario.idTipo where usuarios.Estatus = 1' );

        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function GetUserBuscar($data) {
        $stmt = Connection::connect()->prepare( 'select idUsuario,Imagen,Correo,nombreUsuario,Nombre,Estatus, tipousuario.nombreTipo from usuarios INNER join tipousuario on usuarios.tipoUsuario=tipoUsuario.idTipo where usuarios.Estatus = 1 and usuarios.nombreUsuario Like "%":nombreUsuario"%"' );
        $stmt->bindParam(':nombreUsuario',$data['nombreUsuario']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function GetUserAdmin() {
        $stmt = Connection::connect()->prepare( 'select * from usuarios' );
        
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function getCat() {
        $stmt = Connection::connect()->prepare( 'Select * from categorias where Estatus = 1' );

        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function getCatAdmin() {
        $stmt = Connection::connect()->prepare( 'Select * from categorias' );

        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function Postear($data,$ruta){
        $stmt=Connection::connect()->prepare('insert into posts values (null,:Titulo,:textoPost,:idUsuario,:idCategoria,:likes,:dislikes,:Estatus,:imagen)');
        $stmt->bindParam(':Titulo',$data['Titulo']);
        $stmt->bindParam(':textoPost',$data['textoPost']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':idCategoria',$data['idCategoria']);
        $stmt->bindParam(':likes',$data['likes']);
        $stmt->bindParam(':dislikes',$data['dislikes']);
        $stmt->bindParam(':Estatus',$data['Estatus']);
        $stmt->bindParam(':imagen',$ruta);
        
        $stmt->execute();

        return 'Post registrado';

    }

    static public function bajaPost($data){
        $stmt=Connection::connect()->prepare('update posts set Estatus = 2 where idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();

        return 'Post Eliminado';

    }

    static public function verificarReaccion($data){
        $stmt=Connection::connect()->prepare('SELECT * FROM reaccion WHERE idUsuario = :idUsuario AND Reaccion = :Reaccion AND idPost = :idPost');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':Reaccion',$data['Reaccion']);
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function sumaLikes($data){
        try{
        $stmt=Connection::connect()->prepare('insert into reaccion values (:idUsuario,:Reaccion,:idPost,null)');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':Reaccion',$data['Reaccion']);
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->execute();

        if( $data['Reaccion'] == 1 ){
            $stmt=Connection::connect()->prepare('select count(idPost) from reaccion where idPost = :idPost and Reaccion = 1');
        }
        if( $data['Reaccion'] == 2 ){
            $stmt=Connection::connect()->prepare('select count(idPost) from reaccion where idPost = :idPost and Reaccion = 2');
        }

        return 'Reaccion capturada';
        }catch(Exception $e1 ){
            print($e1);
        }
    }

    static public function conteoLikes($data){
        $stmt=Connection::connect()->prepare('select count(idPost) as conteo from reaccion where idPost = :idPost and Reaccion = :Reaccion');
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->bindParam(':Reaccion',$data['Reaccion']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function consulReaccion($data){
        $stmt=Connection::connect()->prepare('select idPost from reaccion where idUsuario=:idUsuario and Reaccion = :Reaccion');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':Reaccion',$data['Reaccion']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function actLikes($data){
        $stmt=Connection::connect()->prepare('update posts set likes = :likes where idPosts = :idPosts');
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->bindParam(':likes',$data['likes']);
        $stmt->execute();

        return 'likes a??adidos';

    }

    static public function eliminarReaccion($data){
        $stmt=Connection::connect()->prepare('delete from reaccion where idPost= :idPost and idUsuario = :idUsuario and Reaccion = :Reaccion');
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':Reaccion',$data['Reaccion']);
        $stmt->execute();

        return 'Reaccion eliminada';

    }

    static public function actDislikes($data){
        $stmt=Connection::connect()->prepare('update posts set dislikes = :likes where idPosts = :idPosts');
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->bindParam(':likes',$data['likes']);
        $stmt->execute();

        return 'dislikes a??adidos';

    }

    static public function validarFav($data){
        $stmt=Connection::connect()->prepare('select * from favoritos where idPosts = :idPosts and idUsuario = :idUsuario');
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function updatePostUser($data){
        $stmt=Connection::connect()->prepare('update posts set Titulo = :Titulo, textoPost = :textoPost, idCategoria = :idCategoria where idPosts = :idPosts');
        $stmt->bindParam(':Titulo',$data['Titulo']);
        $stmt->bindParam(':textoPost',$data['textoPost']);
        $stmt->bindParam(':idCategoria',$data['idCategoria']);
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->execute();

        return 'Post Modificado';

    }

    static public function updatePostPagina($data){
        $stmt=Connection::connect()->prepare('update postspagina set Contenido = :Contenido where idPost = :idPost');
        $stmt->bindParam(':Contenido',$data['Contenido']);
        $stmt->bindParam(':idPost',$data['idPost']);

        $stmt->execute();

        return 'Post Modificado';

    }

    static public function grdchat($data){
        $stmt=Connection::connect()->prepare('insert into chat values (:idChat,:idUsuario,:fechaYhora,:Mensaje)');
        $stmt->bindParam(':idChat',$data['idChat']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':fechaYhora',$data['fechaYhora']);
        $stmt->bindParam(':Mensaje',$data['Mensaje']);
        $stmt->execute();

        return 'chat almacenado';

    }

    static public function mstchat($data) {

        $stmt = Connection::connect()->prepare( 'Select Mensaje, fechaYhora from chat where idUsuario = :idUsuario' );
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
       // $stmt->bindParam(':fechaYhora',$data['fechaYhora']);
        $stmt->execute();

        return $stmt->fetch( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function mstmedia($data){
        $stmt=Connection::connect()->prepare('select link from mediaposts where idPost = :idPost');
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->execute();
        return $stmt->fetch( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;
    }

    static public function addFav($data){
        $stmt=Connection::connect()->prepare('insert into favoritos values (null,:idUsuario,:idPosts)');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':idPosts',$data['idPosts']);

        $stmt->execute();

        return 'Favorito Registrado';

    }

    static public function showFavoritos($data){
        if( isset($data['idCat']) ){
            $stmt=Connection::connect()->prepare('SELECT posts.* FROM posts INNER JOIN favoritos on posts.idPosts = favoritos.idPosts AND favoritos.idUsuario = :idUsuario AND posts.idCategoria = :idCat');
            $stmt -> bindParam(':idCat', $data['idCat']);
        }
        else {
            $stmt=Connection::connect()->prepare('SELECT posts.* FROM posts INNER JOIN favoritos on posts.idPosts = favoritos.idPosts AND favoritos.idUsuario = :idUsuario');
        }
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
       
    }

    static public function showmisCatposts($data){
        if( isset($data['idCat']) ){
            $stmt=Connection::connect()->prepare('SELECT  posts.* FROM posts where idUsuario = :idUsuario and idCategoria = :idCat');
            $stmt -> bindParam(':idCat', $data['idCat']);
        }
        else {
            $stmt=Connection::connect()->prepare('SELECT posts.* FROM posts INNER JOIN favoritos on posts.idPosts = favoritos.idPosts AND favoritos.idUsuario = :idUsuario');
        }
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
       
    }

    

    static public function deleteFavorito($data){
        $stmt=Connection::connect()->prepare('delete from favoritos where idUsuario= :idUsuario and idPosts = :idPosts');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->execute();
        return 'Favorito eliminado';
    }

    static public function login($datos){
      try {
        if ( isset( $datos[ 'Correo' ] ) && isset( $datos[ 'Password' ] ) ) {
            $pass = hash( 'sha512', $datos[ 'Password' ] );
            $stmt = Connection::connect()->prepare( 'select * from usuarios where Correo=:Correo and Contrase??a=:Password and Estatus=1 ' );
            $stmt->bindParam( ':Correo', $datos[ 'Correo' ] );
            $stmt->bindParam( ':Password', $pass );
            $stmt->execute();

            if ( $stmt->rowCount()>0 ) {
                $datos2 = userModel::ObtenerIDUsuario( $datos[ 'Correo' ] );

                if ( !userModel::ExisteToken( $datos2[ 'idUsuario' ] ) ) {

                    $datos = userModel::MostrarUsuarioEspecifico( $datos[ 'Correo' ] );
                    $json = array( 'message'=>'??Operacion Exitosa!', 'status'=>200, 'data'=> userModel::InsertarToken( $datos ) );
                    echo json_encode( $json );
                } else {

                    $datos = userModel::MostrarUsuarioEspecifico( $datos[ 'Correo' ] );

                    $json = array( 'message'=>'??Operacion Exitosa!', 'status'=>200, 'data'=> userModel::ActualizarToken( $datos ) );
                    echo json_encode( $json );
                }

            } else {
                header( 'HTTP/1.0 401 Not Authorized ' );
                echo 'El Correo o la Contrase??a no Coinciden!';
            }
        } else {
            header( 'HTTP/1.0 401 Not Authorized ' );
            echo 'No deje los Campos Vacios!';
        }

    } catch( Exception $e1 ) {
        return 'Error'.$e1->getMessage();
    }
    }
    static public function ObtenerIDUsuario( $data ) {
      try {

          $stmt = Connection::connect()->prepare( 'select idUsuario from usuarios where Correo=:Correo' );
          $stmt->bindParam( ':Correo', $data );
          $stmt->execute();
          if ( $stmt != null )
          return $stmt->fetch();
          return null;

      } catch( Exception $e1 ) {
          return 'Error'.$e1->getMessage();
      }

  }

  static public function ExisteToken( $datos ) {
    try {

        $stmt = Connection::connect()->prepare( "select token from usuariostoken where idUsuario=:ID_USUARIO and estatus=1" );
        $stmt->bindParam( ':ID_USUARIO', $datos );
        $stmt->execute();

        if ( $stmt->rowCount()>0 ) {

            return true;

        } else {
            return false;
        }
    } catch( Exception $e1 ) {
        return 'Error'.$e1->getMessage();
    }

}

//Mostrar Usuario Especifico
static  public function MostrarUsuarioEspecifico( $id ) {
  $stmt = Connection::connect()->prepare( 'SELECT idUsuario,Correo,Nombre,nombreUsuario,Estatus,Imagen,tipoUsuario FROM usuarios where Correo=:correo' );
  $stmt->bindParam( ':correo', $id );
  $stmt->execute();
  if ( $stmt != null )

  return $stmt->fetch( PDO::FETCH_ASSOC );

  return null;
  $stmt->close();
  $stmt = null;

}

static public function InsertarToken( $datos ) {
  try {

      $time = time();
      $token = array( 'message'=>'??Operacion con Exito!', 'status'=>200, 'data'=>
      $datos );
      $jwt = JWT::encode( $token, Enviroment::getJWT_Key(), 'HS256' );

      $stmt = Connection::connect()->prepare( "insert into  usuariostoken values(:ID_USUARIO,:token,default,1)" );

      $stmt->bindParam( ':ID_USUARIO', $datos[ 'idUsuario' ] );

      $stmt->bindParam( ':token', $jwt );
      $stmt->execute();
      return $jwt;
  } catch( Exception $e1 ) {
      return 'Error:'.$e1->getMessage();
  }

}

static public function ActualizarToken( $datos ) {
  try {

      $time = time();
      $token = array( 'message'=>'??Operacion con Exito!', 'status'=>200, 'data'=>
      $datos );
      $jwt = JWT::encode( $token, Enviroment::getJWT_Key(), 'HS256' );

      $stmt = Connection::connect()->prepare( "update usuariostoken set idUsuario=:ID_USUARIO,token=:token,Estatus=1 where idUsuario=:ID_USUARIO" );
      $stmt->bindParam( ':ID_USUARIO', $datos[ 'idUsuario' ] );

      $stmt->bindParam( ':token', $jwt );
      $stmt->execute();
      return $jwt;
  } catch( Exception $e1 ) {
      return 'Error:'.$e1->getMessage();
  }
}




}

?>

