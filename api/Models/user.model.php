<?php
require_once 'conexion.php';
use Firebase\JWT\JWT;
class userModel{

    static public function addUser($data){
        $stmt=Connection::connect()->prepare('insert into usuarios values (null,:Correo,:nombreUsuario,:Contra,:Estatus,:Imagen,:tipoUsuario)');
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

    static public function deleteUser($data){
        $stmt=Connection::connect()->prepare('update usuarios set Estatus = 2 where idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();

        return 'categoria Eliminada';

    }

    static public function updatePass($data){
        $stmt=Connection::connect()->prepare('update usuarios set Contraseña = :Contra where idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $pass = hash( 'sha512',$data['Contra']);
        $stmt->bindParam(':Contra',$pass);
        $stmt->execute();

        return 'categoria Eliminada';

    }

    static public function comentarPost($data){
        $stmt=Connection::connect()->prepare('insert into comentarios values (null,:idPost,:idUsuario,:Texto)');
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':Texto',$data['Texto']);        
        $stmt->execute();

        return 'categoria Eliminada';

    }

    static public function eliminarComentario($data){
        $stmt=Connection::connect()->prepare('delete from comenarios where idUsuario= :idUsuario and idPost = :idPost');
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);      
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

    static public function GetPosts() {
        $stmt = Connection::connect()->prepare( 'Select * from posts' );

        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function getCat() {
        $stmt = Connection::connect()->prepare( 'Select * from categorias' );

        $stmt->execute();

        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;

    }

    static public function Postear($data){
        $stmt=Connection::connect()->prepare('insert into posts values (null,:Titulo,:textoPost,:idUsuario,:idCategoria,:likes,:dislikes,:Estatus)');
        $stmt->bindParam(':Titulo',$data['Titulo']);
        $stmt->bindParam(':textoPost',$data['textoPost']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':idCategoria',$data['idCategoria']);
        $stmt->bindParam(':likes',$data['likes']);
        $stmt->bindParam(':dislikes',$data['dislikes']);
        $stmt->bindParam(':Estatus',$data['Estatus']);
        $stmt->execute();

        return 'Post registrado';

    }

    static public function bajaPost($data){
        $stmt=Connection::connect()->prepare('update posts set Estatus = 2 where idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();

        return 'Post Eliminado';

    }

    static public function updatePostUser($data){
        $stmt=Connection::connect()->prepare('update posts set Titulo = :Titulo, textoPost = :textoPost, idCategoria = :idCategoria where idUsuario = :idUsuario');
        $stmt->bindParam(':Titulo',$data['Titulo']);
        $stmt->bindParam(':textoPost',$data['textoPost']);
        $stmt->bindParam(':idCategoria',$data['idCategoria']);
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
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
        $stmt=Connection::connect()->prepare('insert into favoritos values (:idUsuario,:idPosts)');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':idPosts',$data['idPosts']);

        $stmt->execute();

        return 'Favorito Registrado';

    }

    static public function showFavoritos($data){
        $stmt=Connection::connect()->prepare('SELECT posts.idPosts, posts.Titulo, posts.textoPost, posts.likes, posts.dislikes FROM favoritos INNER JOIN posts INNER JOIN usuarios WHERE posts.idPosts = favoritos.idPost AND favoritos.idUsuario = usuarios.idUsuario AND usuarios.idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->execute();
        return $stmt->fetch( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;
    }

    static public function deleteFavorito($data){
        $stmt=Connection::connect()->prepare('delete from favoritos where idUsuario= :idUsuario and idPost = :idPosts');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->execute();
        return 'Favorito eliminado';
    }

    static public function login($datos){
      try {
        if ( isset( $datos[ 'Correo' ] ) && isset( $datos[ 'Password' ] ) ) {
            $pass = hash( 'sha512', $datos[ 'Password' ] );
            $stmt = Connection::connect()->prepare( 'select * from usuarios where Correo=:Correo and Contraseña=:Password ' );
            $stmt->bindParam( ':Correo', $datos[ 'Correo' ] );
            $stmt->bindParam( ':Password', $pass );
            $stmt->execute();

            if ( $stmt->rowCount()>0 ) {
                $datos2 = userModel::ObtenerIDUsuario( $datos[ 'Correo' ] );

                if ( !userModel::ExisteToken( $datos2[ 'idUsuario' ] ) ) {

                    $datos = userModel::MostrarUsuarioEspecifico( $datos[ 'Correo' ] );
                    $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> userModel::InsertarToken( $datos ) );
                    echo json_encode( $json );
                } else {

                    $datos = userModel::MostrarUsuarioEspecifico( $datos[ 'Correo' ] );

                    $json = array( 'message'=>'¡Operacion Exitosa!', 'status'=>200, 'data'=> userModel::ActualizarToken( $datos ) );
                    echo json_encode( $json );
                }

            } else {
                header( 'HTTP/1.0 401 Not Authorized ' );
                echo 'El Correo o la Contraseña no Coinciden!';
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

        $stmt = Connection::connect()->prepare( "select token from usuariostoken where id_usuario=:ID_USUARIO and estatus='A'" );
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
  $stmt = Connection::connect()->prepare( 'SELECT idUsuario,Correo,nombreUsuario,Estatus,Imagen,tipoUsuario FROM usuarios where Correo=:correo' );
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
      $token = array( 'message'=>'¡Operacion con Exito!', 'status'=>200, 'data'=>
      $datos );
      $jwt = JWT::encode( $token, Enviroment::getJWT_Key(), 'HS256' );

      $stmt = Connection::connect()->prepare( "insert into  usuariostoken values(:ID_USUARIO,:token,default,'A')" );

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
      $token = array( 'message'=>'¡Operacion con Exito!', 'status'=>200, 'data'=>
      $datos );
      $jwt = JWT::encode( $token, Enviroment::getJWT_Key(), 'HS256' );

      $stmt = Connection::connect()->prepare( "update usuariostoken set id_usuario=:ID_USUARIO,token=:token,Estatus='A' where id_usuario=:ID_USUARIO" );
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

