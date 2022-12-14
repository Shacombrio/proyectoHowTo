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
        }
        else  if ( array_filter( $arrayRutas )[ 2 ] == '?u=obtenerUsuarios' ) {
                //Post en Alumnos
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $objUsuarios = new userController();
                    $objUsuarios->obtenerUsuarios();
                }
        }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=mostrarCategria' ) {

                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $objUsuarios = new userController();
                    $objUsuarios->mostrarCat();
                }

            }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=mostrarCategriaAdmin' ) {

                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $objUsuarios = new userController();
                    $objUsuarios->mostrarCatAdmin();
                }

            }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=obtenerUsuariosAdmin' ) {

                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $objUsuarios = new adminController();
                    $objUsuarios->consultaUsers();
                }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=RegistrarCategoria' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new adminController();
            $objUsuarios->metercat($datosarrary);
            }
        
        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=buscarUser' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->buscarUser($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=obtenerChat' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->obtenerChat($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=ingresarChat' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->ingresarChat($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=Likes' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->sumaLikes($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=verificarReaccion' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->verificarReaccion($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=eliminarReaccion' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->eliminarReaccion($datosarrary);
            }
        
        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=consulReaccion' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->consulReaccion($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=conteoLikes' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->conteoLikes($datosarrary);
            }

        } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=actLikes' ) {
            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->actLikes($datosarrary);
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

        }  else if ( array_filter( $arrayRutas )[ 2 ] == '?u=DarAltaUsuario' ) {
          if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
          $json=file_get_contents('php://input');
          $datosarrary=json_decode($json,true);
          $objUsuarios = new userController();
          $objUsuarios->altaUser($datosarrary);
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
            $objUsuarios = new userController();
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

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=mostrarPostsAdmin' ) {

                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $objUsuarios = new userController();
                    $objUsuarios->showPostsAdmin();
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=ingresarPost' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->Posting($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=Buscar' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->Buscar($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=eliminarPost' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new adminController();
                $objUsuarios->deletePost($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=darAltaPost' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new adminController();
                $objUsuarios->darAltaPost($datosarrary);
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

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=modificarPostPagina' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->updatePostPagina($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=verPostEditar' ) {


                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objUsuarios = new userController();
                $objUsuarios->verPostEditar($datosarrary);
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

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=guardarPost' ) {

                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $json=file_get_contents('php://input');
                    $datosarrary=json_decode($json,true);
                    $objUsuarios = new userController();
                    $objUsuarios->guardarPost($datosarrary);
                }

            } else if ( array_filter( $arrayRutas )[ 2 ] == '?u=verPost' ) {

                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $json=file_get_contents('php://input');
                    $datosarrary=json_decode($json,true);
                    $objUsuarios = new userController();
                    $objUsuarios->verPost($datosarrary);
                }

            } else if (array_filter( $arrayRutas )[ 2 ] == '?u=misPost'){
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $json=file_get_contents('php://input');
                    $datosarrary=json_decode($json,true);
                    $objUsuarios = new userController();
                    $objUsuarios->misPost($datosarrary);
                }

            }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=registrarFavorito' ) {

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

            } else if( array_filter( $arrayRutas )[ 2 ] == '?u=MostrarmisCatposts'){
                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $json=file_get_contents('php://input');
                    $datosarrary=json_decode($json,true);
                    $objUsuarios = new userController();
                    $objUsuarios->showmisCatposts($datosarrary);
                }

            }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=eliminarFav' ) {

                if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                    $json=file_get_contents('php://input');
                    $datosarrary=json_decode($json,true);
                    $objUsuarios = new userController();
                    $objUsuarios->deleteFav($datosarrary);
                    }

            }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=Login' ) {

               if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
              $json=file_get_contents('php://input');
              $datosarrary=json_decode($json,true);
              $objUsuarios = new userController();
              $objUsuarios->login($datosarrary);
            }

            }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=comentarPost' ) {

        if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->comentarPost($datosarrary);
          }

    }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=verComentarios' ) {

        if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->verComentarios($datosarrary);
      }

    }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=eliminarComentario' ) {

        if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->eliminarComentario($datosarrary);
      }

    }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=postCategoria' ) {

        if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->postCategoria($datosarrary);
       }

    }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=validarFav' ) {

        if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
            $json=file_get_contents('php://input');
            $datosarrary=json_decode($json,true);
            $objUsuarios = new userController();
            $objUsuarios->validarFav($datosarrary);
       }
       
        }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=EnviarCorreoBan' ) {

          if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
              $json=file_get_contents('php://input');
              $datosarrary=json_decode($json,true);
              $objMail = new CorreoController();
              $objMail->sendcorreoban($datosarrary);
         }
          }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=EnviarCorreodesBan' ) {

            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
                $json=file_get_contents('php://input');
                $datosarrary=json_decode($json,true);
                $objMail = new CorreoController();
                $objMail->sendcorreodesban($datosarrary);
           }

           


          }else if ( array_filter( $arrayRutas )[ 2 ] == '?u=Login' ) {

            if ( isset( $_SERVER[ 'REQUEST_METHOD' ] ) && $_SERVER[ 'REQUEST_METHOD' ] == 'POST' ) {
           $json=file_get_contents('php://input');
           $datosarrary=json_decode($json,true);
           $objUsuarios = new userController();
           $objUsuarios->login($datosarrary);
            }
          }else {
            echo 'No existe la ruta especifica!';
        }
    }
}


?>
