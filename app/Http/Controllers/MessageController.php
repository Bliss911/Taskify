<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{
	public function fetch(Request $request)
	{
		// $data =  Message::where('sender', Auth::user()->id)->orWhere('recipient', Auth::user()->id)->with('recipient')->get();
		$data = Message::with('sender')->get();


		return $this->sendResult('message fetched', $data, [], true);
	}

	public function create(Request $request)
	{
		$message = new Message();
		$message->recipient = $request->recipient;
		$message->message = $request->message;
		$message->sender = Auth::user()->id;

		$message->save();

		$user = auth()->user();
		broadcast(new MessageSent($user, $message->load('recipient')))->toOthers();
	}
}
