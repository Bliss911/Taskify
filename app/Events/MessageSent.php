<?php

namespace App\Events;

use App\Models\Chat;
use App\Models\Message;
use App\Models\Messages;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use PhpParser\Node\Expr\Cast\Int_;

class MessageSent implements ShouldBroadcastNow
{
	use Dispatchable, InteractsWithSockets, SerializesModels;
	public $message;
	public $user;

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct(User $user, Chat $message, $reciever)
	{
		//
		$this->message = $message;
		$this->user = $user;
		$this->reciever = $reciever;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return \Illuminate\Broadcasting\Channel|array
	 */
	public function broadcastOn()
	{
		return new PrivateChannel('chat.' . $this->reciever);
	}
	public function broadcastAs()
	{
		return 'MessageSent';
	}
}
