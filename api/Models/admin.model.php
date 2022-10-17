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
    
    static public function addcat($data){
        $stmt=Connection::connect()->prepare('insert into categorias values (null,:desc,:estatus,:img)');
        $stmt->bindParam(':desc',$data['desc']);
        $stmt->bindParam(':estatus',$data['estatus']);
        $stmt->bindParam(':img',$data['img']);
        $stmt->execute();

        return 'categoria registrada';

    }

    static public function deletecat($data){
        $stmt=Connection::connect()->prepare('delete from categorias where idCategoria = :idCat');
        $stmt->bindParam(':idCat',$data['id']);
        $stmt->execute();

        return 'categoria Eliminada';

    }

    static public function updatecat($data){
        $stmt=Connection::connect()->prepare('update categorias set nombreCategoria = :desc, Estatus = :estatus, Icono = :img where idCategoria = :idCat');
        $stmt->bindParam(':idCat',$data['idCategoria']);
        $stmt->bindParam(':desc',$data['nombreCategoria']);
        $stmt->bindParam(':estatus',$data['Estatus']);
        $stmt->bindParam(':img',$data['Icono']);
        $stmt->execute();

        return 'categoria Modificada';

    }

    static public function updateUser($data){
        $stmt=Connection::connect()->prepare('update usuarios set Correo = :Correo, NombreUsuario = :NombreUsuario, Contraseña = :Contra, Estatus = :Estatus, Imagen = :Imagen, tipoUsusario = :Tipo where idUsuario = :idUsuario');
        $stmt->bindParam(':idUsuario',$data['idUsuario']);
        $stmt->bindParam(':Correo',$data['Correo']);
        $stmt->bindParam(':NombreUsuario',$data['NombreUsuario']);
        $pass = hash( 'sha512',$data['Contra']);
        $stmt->bindParam(':Contra',$pass);
        $stmt->bindParam(':Estatus',$data['Estatus']);
        $stmt->bindParam(':Imagen',$data['Imagen']);
        $stmt->bindParam(':Tipo',$data['tipoUsusario']);
        $stmt->execute();

        return 'Usuario Modificado';

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

}

?>

