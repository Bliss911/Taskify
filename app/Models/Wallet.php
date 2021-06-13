<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
	use HasFactory;

	public function sender()
	{
		return $this->hasMany(Payment::class, 'sender');
	}
	public function reciever()
	{
		return $this->hasMany(Payment::class, 'reciever');
	}
	public function user()
	{
		return $this->belongsTo(User::class, 'user');
	}
}
