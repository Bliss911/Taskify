<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    use HasFactory;
    protected $fillable = ['sender', 'message', 'recipient'];

    public function user()
    {
        return $this->belongsTo(User::class());
    }
}
