<?php
require_once 'conexion.php';
class adminModel{

    static public function GetInfo() {
        $stmt = Connection::connect()->prepare( 'Select * from categorias' );
    
        $stmt->execute();
    
        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;
    
    }
    
    static public function addcat($data,$ruta){
        $stmt=Connection::connect()->prepare('insert into categorias values (null,:nombreCategoria,:Estatus,:Icono)');
        $stmt->bindParam(':nombreCategoria',$data['nombreCategoria']);
        $stmt->bindParam(':Estatus',$data['Estatus']);
        $stmt->bindParam(':Icono',$ruta);
        $stmt->execute();

        return 'categoria registrada';

    }

    static public function deletecat($data){
        $stmt=Connection::connect()->prepare('delete from categorias where idCategoria = :idCategoria');
        $stmt->bindParam(':idCategoria',$data['idCategoria']);
        $stmt->execute();

        return 'categoria Eliminada';

    }

    static public function updatecat($data){
        $stmt=Connection::connect()->prepare('update categorias set nombreCategoria = :desc where idCategoria = :idCat');
       
        $stmt->bindParam(':desc',$data['nombreCategoria']);
       // $stmt->bindParam(':estatus',$data['Estatus']);
        $stmt->bindParam(':idCat',$data['idCategoria']);

        $stmt->execute();

        return 'categoria Modificada';

    }

    static public function modificarEstatusCategoria($data){
        $stmt=Connection::connect()->prepare('update categorias set Estatus = :Estatus where idCategoria = :idCat');
       
        $stmt->bindParam(':Estatus',$data['Estatus']);
        $stmt->bindParam(':idCat',$data['idCategoria']);

        $stmt->execute();

        return 'categoria Modificada';

    }



    static public function selectUsers() {
        $stmt = Connection::connect()->prepare( 'Select * from usuarios' );
    
        $stmt->execute();
    
        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;
    
    }

    static public function bajaPostAdmin($data){
        $stmt=Connection::connect()->prepare('update posts set Estatus = 2 where idPosts = :idPosts');
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->execute();

        return 'Post Eliminado';

    }

    static public function bajaPost($data){
        $stmt=Connection::connect()->prepare('update posts set Estatus = 2 where idPosts = :idPosts');
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->execute();

        return 'Post Eliminado';

    }

    static public function darAltaPost($data){
        $stmt=Connection::connect()->prepare('update posts set Estatus = 1 where idPosts = :idPosts');
        $stmt->bindParam(':idPosts',$data['idPosts']);
        $stmt->execute();

        return 'Post Eliminado';

    }

    static public function bajaMediaAdmin($data){
        $stmt=Connection::connect()->prepare('update mediaposts set Estatus = 2 where idPost = :idPost');
        $stmt->bindParam(':idPost',$data['idPost']);
        $stmt->execute();

        return 'MediaPost Eliminado';

    }

    static public function addTipoUsuario($data){
        $stmt=Connection::connect()->prepare('insert into tipousuario values (null,:nombreTipo)');
        $stmt->bindParam(':nombreTipo',$data['nombreTipo']);
        
        $stmt->execute();

        return 'tipo de usuario registrado';

    }

    static public function selectTipoUsers() {
        $stmt = Connection::connect()->prepare( 'Select * from tipousuario' );
    
        $stmt->execute();
    
        return $stmt->fetchAll( PDO::FETCH_ASSOC );
        $stmt->close();
        $stmt=null;
    
    }

    static public function ModificarImgCat( $datos ) {

        $stmt = Connection::connect()->prepare( 'update categorias set Icono=:img where idCategoria=:idCategoria' );
        $stmt->bindParam( ':idCategoria', $datos[ 'id_cat' ] );
        $stmt->bindParam( ':img', $datos[ 'urlimg' ] );
        $stmt->execute();
  
        return '  Se modifico correctamente  la Imagen';
    }

}

?>

