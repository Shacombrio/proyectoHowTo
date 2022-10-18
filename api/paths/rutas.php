<?php
$arrayRutas = explode( '/', $_SERVER[ 'REQUEST_URI' ] );
//Separa la ruta actual y lo guarda en un array

if ( count( array_filter( $arrayRutas ) ) == 1 ) {
    //Caso que no exista una ruta
    echo 'Ruta no Encontrada';
    return;

} else {
    //Sin Parametros
    if ( count( array_filter( $arrayRutas ) ) == 2 )
 {
        if ( array_filter( $arrayRutas )[ 2 ] == '?u=Prueba' ) {
            //Post en Alumnos
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $objUsuarios = new PruebaController();
                $objUsuarios->pruebita();
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=RegistrarCategoria' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new adminController();
            $objUsuarios->metercat($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=EliminarCategoria' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new adminController();
            $objUsuarios->eliminarCat($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=modificarCategoria' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new adminController();
            $objUsuarios->modificarCat($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=ingresarUsuario' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->ingresarUser($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=eliminarUsuario' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->eliminarUser($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=cambiarContra' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->cambiarContra($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=modificarUsuario' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new adminController();
            $objUsuarios->modificarUser($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=consultaUsuarios' ) {
                
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $objUsuarios = new adminController();
                    $objUsuarios->consultaUsers();
                }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=consultaPersonal' ) {

                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->consultaPerso($datosarrary);
                }
            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=mostrarPosts' ) {

                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $objUsuarios = new userController();
                    $objUsuarios->showPosts();
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=ingresarPost' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->Posting($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=eliminarPost' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->deletePost($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=eliminarPostAdmin' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new adminController();
                $objUsuarios->deletePostAdmin($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=modificarPost' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->updatePost($datosarrary);
                }
            
            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=GuardarChat' ) {
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->guardarchat($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=MostrarChat' ) {
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->mostrarchat($datosarrary);
                }
            
            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=EliminarMedia' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new adminController();
                $objUsuarios->deletemedia($datosarrary);
                }
            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=InsertarMediaUser' ) {
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->insertarmediausuario($datosarrary);
                }
            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=InsertarTipoUsuario' ) {
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new adminController();
                $objUsuarios->insertTipoUsuario($datosarrary);
                }
            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=consultaTipoUsuario' ) {
                
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $objUsuarios = new adminController();
                    $objUsuarios->consultaTipoUsers();
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=MostrarMedia' ) {
                
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $json=file_get_contents('php://input');
                    $datosarrary=json_decode($json,true);
                    $objUsuarios = new userController();
                    $objUsuarios->mostrarmedia($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=registrarFavorito' ) {
                
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $json=file_get_contents('php://input');
                    $datosarrary=json_decode($json,true);
                    $objUsuarios = new userController();
                    $objUsuarios->registrarFav($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=MostrarFav' ) {
                
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $json=file_get_contents('php://input');
                    $datosarrary=json_decode($json,true);
                    $objUsuarios = new userController();
                    $objUsuarios->showFav($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=eliminarFav' ) {
                
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $json=file_get_contents('php://input');
                    $datosarrary=json_decode($json,true);
                    $objUsuarios = new userController();
                    $objUsuarios->deleteFav($datosarrary);
                }

        } else {
            echo 'No existe la ruta especifica!';
        }
    }
}

?>
