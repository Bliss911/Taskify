<?php

namespace App\Http\Controllers;

use App\Models\Notif;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotifController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$data = Notif::where('user', Auth::user()->id)->get();
		$notifCount = Notif::where('user', Auth::user()->id)->count();

		return $this->sendResult('notifs fetched', ['notifs' => $data, 'unreadCount' => $notifCount], [], true);
	}
}
