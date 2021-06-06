<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
	use Notifiable;

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = [
		'firstname', 'lastname', 'phone_number', 'email', 'password', 'role'
	];

	/**
	 * The attributes that should be hidden for arrays.
	 *
	 * @var array
	 */
	protected $hidden = [
		'password', 'remember_token',
	];

	/**
	 * The attributes that should be cast to native types.
	 *
	 * @var array
	 */
	protected $casts = [
		'email_verified_at' => 'datetime',
	];



	//relationships
	public function skills()
	{
		return $this->hasMany('App\Models\UserSkill', 'owner');
	}



	/**
	 * Get the identifier that will be stored in the subject claim of the JWT.
	 *
	 * @return mixed
	 */
	public function getJWTIdentifier()
	{
		return $this->getKey();
	}

	/**
	 * Return a key value array, containing any custom claims to be added to the JWT.
	 *
	 * @return array
	 */
	public function getJWTCustomClaims()
	{
		return [
			'name' => $this->firstname . ' ' . $this->lastname,
			'email' => $this->email,
			'role' => $this->role,
			'phone_number' => $this->phone_number,
			'joined' => $this->created_at,
			'id' => $this->id

		];
	}
	public function sender()
	{
		return $this->hasMany(Chat::class, 'sender');
	}
	public function recipients()
	{
		return $this->hasMany(Chat::class, 'recipient');
	}
}
