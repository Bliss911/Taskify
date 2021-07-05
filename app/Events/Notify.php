<?php

namespace App\Events;

use App\Models\Notif;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use PhpParser\Node\Expr\Cast\Int_;

class Notify implements ShouldBroadcastNow
{
	use Dispatchable, InteractsWithSockets, SerializesModels;
	public $notif;

	/**
	 * Create a new event instance.
	 *
	 * @return void
	 */
	public function __construct($notif, $reciever)
	{
		$this->notif = $notif;
		$this->reciever = $reciever;
	}

	/**
	 * Get the channels the event should broadcast on.
	 *
	 * @return \Illuminate\Broadcasting\Channel|array
	 */
	public function broadcastOn()
	{
		return new PrivateChannel('notif.' . $this->reciever);
	}
	public function broadcastAs()
	{
		return 'Notif';
	}
}
