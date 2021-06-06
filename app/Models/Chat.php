<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
	use HasFactory;
	protected $fillable = ['sender', 'message', 'recipient'];

	public function sender()
	{
		return $this->belongsTo(User::class, 'sender');
	}
	public function recipient()
	{
		return $this->belongsTo(User::class, 'recipient');
	}
	public function messages()
	{
		return $this->hasMany(Message::class, 'chat');
	}
}
