<?php
require_once 'conexion.php';
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

    
}

?>

