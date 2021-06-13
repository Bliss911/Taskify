<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
	use HasFactory;
	protected $fillable = ['sender', 'reciever', 'amount', 'type'];

	public function sender()
	{
		return $this->belongsTo(Wallet::class, 'sender');
	}
	public function reciever()
	{
		return $this->belongsTo(Wallet::class, 'reciever');
	}
}
