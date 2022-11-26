<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require './libraries/src/Exception.php';
require './libraries/src/PHPMailer.php';
require './libraries/src/SMTP.php';
require_once './Models/conexion.php';
//Modelo de la Tabla Correo
class CorreoModel{
    //Atributo del correo que contendra la conexion
     private $mail;
    //Constructor que inicializa el Servidor de Correo
    function __construct(){
        $this->mail = new PHPMailer(true);
        try {
            //Server settings
            $this->mail->SMTPDebug = 0;                      //Enable verbose debug output
            $this->mail->isSMTP();                                            //Send using SMTP
            $this->mail->Host       = 'smtp-mail.outlook.com';                     //Set the SMTP server to send through
            $this->mail->SMTPAuth   = true;
            //$this->mail->SMTPSecure = "ssl";                                 //Enable SMTP authentication
            $this->mail->Username   = 'howtosadecv@outlook.com';                     //SMTP username
            $this->mail->Password  ='howto123!';                               //SMTP password
            $this->mail->SMTPSecure = "STARTTLS";            //Enable implicit TLS encryption
            $this->mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        } catch (Exception $e) {
            echo "Error".$e->getMessage();
        }
    }




    //Funcion para enviar correo
     function EnviarCorreoban($correo,$motivo){

    //Recipients
    $this->mail->setFrom( $this->mail->Username , 'Usuario howto');
      //Add a recipient
    $this->mail->addAddress($correo);               //Name is optional

    //Content
    $this->mail->isHTML(true);                                  //Set email format to HTML
    $this->mail->Subject = 'TRISTES NOTICIAS';
    $this->mail->Body    = "LAMENTAMOS DECIRTE QUE TU CUENTA HA SIDO BANEADA POR UN ADMINISTRADOR :( <br> si crees que esto es un error o quieres apelar a esta decisión, por favor envía un correo de vuelta explicando la situación...<br><b>Motivo</b>:<p style='color:red;display:block'>$motivo</p>";
    $this->mail->CharSet = 'UTF-8';
    $this->mail->AltBody = 'Has sido baneado amigo:('.$motivo;

    $this->mail->send();
    return  'El correo se envio correctamente';
    }
    function EnviarCorreodesban($correo){

      //Recipients
      $this->mail->setFrom( $this->mail->Username , 'Equipo de Howto');
        //Add a recipient
      $this->mail->addAddress($correo);               //Name is optional

      //Content
      $this->mail->isHTML(true);                                  //Set email format to HTML
      $this->mail->Subject = 'FELICES NOTICIAS';
      $this->mail->Body    = "Tu correo ha sido evaluado por un administrador y ha visto correcto regresarte tu cuenta :) lamentamos los inconvenientes.";
      $this->mail->CharSet = 'UTF-8';
      $this->mail->AltBody = 'Has sido desbaneado amigo:)';

      $this->mail->send();
      return  'El correo se envio correctamente';
      }
}
