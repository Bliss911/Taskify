<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = ['client', 'title', 'description', 'offer', 'location'];
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'client');
    }


    public function skill()
    {
        return $this->belongsToMany(Skill::class, 'task_skills', 'task', 'skill');
    }

    public function bids()
    {
        return $this->hasMany(Bid::class, 'task');
    }
}
