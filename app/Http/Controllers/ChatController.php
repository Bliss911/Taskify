<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Models\Chat;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$data = Chat::select('*')->where(
			[
				['sender', Auth::user()->id],
			]
		)->orWhere([
			['recipient', Auth::user()->id]
		])->with(['sender', 'recipient', 'messages'])->get();

		//  => function ($query) {
		// 			$query->select('*')->latest()->limit(1);}
		return $this->sendResult('message fetched', $data, [], true);
	}
	public function all(Request $request)
	{
		$data = Chat::where('id', $request->id)->with(['sender', 'recipient', 'messages', 'messages.sender', 'messages.recipient'])->get();


		return $this->sendResult('message fetched', $data[0], [], true);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function send(Request $request)
	{
		$chat = Chat::where('sender', Auth::user()->id)
			->where('recipient', $request->recipient)->first();

		if ($chat) {
			$chat = $chat;
		} else {
			$chat = Chat::where('recipient', Auth::user()->id)->where('sender', $request->recipient)
				->first();
			if ($chat) {
				$chat = $chat;
			} else {
				$chat = new Chat();
				$chat->recipient = $request->recipient;
				$chat->sender = Auth::user()->id;
				$chat->save();
			}
		}
		$message = new Message();
		$message->recipient = $request->recipient;
		$message->chat = $chat->id;
		$message->sender = Auth::user()->id;
		$message->message = $request->message;

		$message->save();

		$data = Chat::where('id', $chat->id)->with(['sender', 'recipient', 'messages', 'messages.sender', 'messages.recipient'])->get();
		$user = auth()->user();
		// broadcast(new MessageSent($user, $message->load(['chat', 'sender', 'recipient'])))->toOthers();
		broadcast(new MessageSent($user, $data[0], $request->recipient))->toOthers();



		return $this->sendResult('message fetched', $data[0], [], true);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Chat  $chat
	 * @return \Illuminate\Http\Response
	 */
	public function show(Chat $chat)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Models\Chat  $chat
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Chat $chat)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Chat  $chat
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Chat $chat)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Chat  $chat
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Chat $chat)
	{
		//
	}
}
