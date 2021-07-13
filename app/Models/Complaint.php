<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'message', 'email', 'complainer'];

    public function complainer()
    {
        return $this->belongsTo(User::class, 'sender');
    }
}
