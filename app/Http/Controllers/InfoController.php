<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\Info;
use Vendors\PHPMailer\PHPMailer\PHPMailer;
use Vendors\PHPMailer\PHPMailer\SMTP;
use Vendors\PHPMailer\PHPMailer\Exception;



class InfoController extends Controller
{
    public function index(Request $request)
    {
       
        $post = new Info;
        $post->tshirt = $request->selectshirt;
        $post->cap = $request->selectcap;
        $post->size=$request->selectsize;
        $post->name = $request->name;
        $post->surname = $request->surname;
        $post->address = $request->address;
        $post->email = $request->email;
        $post->zip = $request->zip;
        $post->city = $request->city;
        $post->country=$request->country;
        $post->save();
        echo $post;
        //return redirect('/');
       
      
    }
     public function send_email($email_body, $key){
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);
        
        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'premium143.web-hosting.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'clients@reactor.pk';                     //SMTP username
            $mail->Password   = 'iq@Cwfp0n*%g';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
            //Recipients
            $mail->setFrom('clients@reactor.pk', 'MAK M');
            $mail->addAddress('highfly198825@gmail.com', 'Vasile');     //Add a recipient
            $mail->addAddress('vasiledarmaz@hotmail.com', 'Vasile');     //Add a recipient
            $mail->addAddress('clickavenaz@gmail.com', 'Azhar Kamal');               //Name is optional
    
            $mail->isHTML(false);                                  //Set email format to HTML
            $mail->Subject = $key . ' - New Entry';
            $mail->Body    = $email_body;
    
            $mail->send();
            echo 'Message has been sent';
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    
    }
    //
}
