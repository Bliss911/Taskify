<?php

namespace App\Http\Controllers;

use App\Models\Messages;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessagesController extends Controller
{
    public function fetch(Request $request)
    {
        $data =  Messages::where('sender', Auth::user()->id)->orWhere('recipient', Auth::user()->id)->with('user')->get();

        return $this->sendResult('messages fetched', $data, [], true);
    }

    public function create(Request $request)
    {
    }
}
