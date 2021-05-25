<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bid extends Model
{
    use HasFactory;
    protected $fillable = ['bid', 'comment', 'vendor', 'task'];

    public function vendor()
    {
        return $this->belongsTo(User::class, 'vendor');
    }
    public function task()
    {
        return  $this->belongsTo(Task::class, 'task');
    }
}
