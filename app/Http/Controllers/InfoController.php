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
        $post->walletaddress=$request->walletaddress;
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
        $name=$request->name;
        $email=$request->email;

        $post->save();
        $clientmessage="Hi Welcome ! you have claimed sucessfully";
        $servermessage="Hi Shazane Nazaraly " .$name. " have claimed";
         send_email($email,$name.$servermessage);
         send_email($email,$name.$clientmessage);
        return $servermessage;







       
      
    }

    public function create(Request $request){
        $bodyContent = $request->getContent();
        $data=1;
        $walletaddress = DB::select('select walletaddress from infos');
        foreach($walletaddress as $wallet)
            {
               if($wallet==$bodyContent)
               {
                $data=1;
              
               }
               else {
                $data=0;
               }
            }
        
      return $walletaddress;  
    }



     public function send_email($to, $to_name, $message){
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);
        
        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.mailgun.org';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'postmaster@sandboxc73abc2df7a54082a8293f7c4472e2f9.mailgun.org';                     //SMTP username
            $mail->Password   = '1c024a6ac1db9fdd365afffeb8ead8bf-2de3d545-f290ca98';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
            //Recipients
            $mail->setFrom('info@ares-corporation.com', 'Shazane Nazaraly');
            $mail->addAddress('vasiledarmaz@hotmail.com', 'Vasile Darmaz');     //Add a recipient
            $mail->addAddress($to, $to_name);     //Add a recipient
    
            $mail->isHTML(false);                                  //Set email format to HTML
            $mail->Subject ='New Merch Claimed';
            $mail->Body    = $message;
    
            $mail->send();
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    
    }
    //
}
