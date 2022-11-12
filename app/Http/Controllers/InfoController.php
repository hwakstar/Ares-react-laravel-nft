<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\Info;
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
    //
}
