<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Payment;
use App\Models\Task;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class WalletController extends Controller
{
	public function add(Request $request)
	{
		$wallet = Wallet::where('id', $request->id)->where('user', Auth::user()->id)->first();

		$wallet->increment('amount', $request->amount);
		Payment::create(['sender' => $wallet->id, 'reciever' => $wallet->id, 'amount' => $request->amount, 'type' => 'DEPOSIT']);


		$wallet = Wallet::where('user', Auth::user()->id)->first();
		if (Auth::user()->role == 'VENDOR') {
			$pending = Bid::where('status', 'PENDING')->where('vendor', Auth::user()->id)->count();
			$accepted = Bid::where('status', 'ACCEPTED')->where('vendor', Auth::user()->id)->count();
			$cancelled = Bid::where('status', 'CANCELLED')->where('vendor', Auth::user()->id)->count();
			return $this->sendResult('fetched', ['wallet' => $wallet, 'pending_bids' => $pending, 'cancelled_bids' => $cancelled, 'accepted_bids' => $accepted], [], true);
		} else if (Auth::user()->role == 'CLIENT') {
			$pending = Task::where('status', 'PENDING')->where('client', Auth::user()->id)->count();
			$accepted = Task::where('status', 'DONE')->where('client', Auth::user()->id)->count();
			$cancelled = Task::where('status', 'CANCELLED')->where('client', Auth::user()->id)->count();
			return $this->sendResult('fetched', ['wallet' => $wallet, 'pending_tasks' => $pending, 'cancelled_tasks' => $cancelled, 'accepted_tasks' => $accepted], [], true);
		}
	}

	public function payments()
	{
		$wallet = Wallet::where('user', Auth::user()->id)->first();
		$payments = Payment::with('sender.user', 'reciever.user')->where('reciever', $wallet->id)->orWhere('sender', $wallet->id)->get();

		return $this->sendResult('payment fetched', $payments, [], true);
	}
}
