<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
	use HasFactory;
	protected $fillable = ['sender', 'message', 'recipient', 'chat'];

	public function sender()
	{
		return $this->belongsTo(User::class, 'sender');
	}
	public function recipient()
	{
		return $this->belongsTo(User::class, 'recipient');
	}
	public function chat()
	{
		return $this->belongsTo(Chat::class, 'chat');
	}
}
