<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Notif;
use App\Models\Task;
use App\Events\Notify;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BidController extends Controller
{
	public function create(Request $request)
	{

		$data = $request->all();

		$validator = Validator::make($data, [
			'bid' => 'required|integer',
			'comment' => 'required|string',
			'task' => 'required|exists:tasks,id'

		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Task submission Failed";
			return $this->sendResult($message, [], $errors, $status);
		}


		$bid = new Bid([
			'vendor' => Auth::user()->id,
			'task' => $request->task,
			'bid' => $request->bid,
			'comment' => $request->comment

		]);

		$bid->save();
		$task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
			->get();
		Notif::create(['user' => $task[0]->client, 'message' => Auth::user()->firstname . ' ' . Auth::user()->lastname . ' ' . 'has submitted a bid for your task' . ' ' . '"' . $task[0]->title . '" ' . '@ $' . $request->bid, 'status' => 'UNREAD']);

		$m = Auth::user()->firstname . ' ' . Auth::user()->lastname . ' ' . ' has submitted a bid for your task' . ' ' . '"' . $task[0]->title . '" ' . '@ $' . $request->bid;

		// broadcast(new Notify($m, $task[0]->client))->toOthers();
		$this->sendNotif($m, $task[0]->client);


		return $this->sendResult('bid created', $task, [], true);
	}
	public function delete(Request $request)
	{

		$data = $request->all();

		$validator = Validator::make($data, [
			'bid' => 'required|integer',
			'task' => 'required|exists:tasks,id'

		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Task submission Failed";
			return $this->sendResult($message, [], $errors, $status);
		}



		Bid::where('id', $request->bid)->where('task', $request->task)->where('vendor', Auth::user()->id)->delete();

		$task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
			->get();

		Notif::create(['user' => $task[0]->client, 'message' => Auth::user()->firstname . ' ' . Auth::user()->lastname . ' ' . 'has deleted bid for your task' . ' ' . '"' . $task[0]->title, 'status' => 'UNREAD']);

		$m = Auth::user()->firstname . ' ' . Auth::user()->lastname . ' ' . 'has deleted bid for your task' . ' ' . '"' . $task[0]->title;

		// broadcast(new Notify($m, $task[0]->client))->toOthers();
		$this->sendNotif($m, $task[0]->client);
		return $this->sendResult('bid deleted', $task, [], true);
	}
	public function accept(Request $request)
	{

		$data = $request->all();

		$validator = Validator::make($data, [
			'bid' => 'required|integer',
			'task' => 'required|exists:tasks,id'

		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Task submission Failed";
			return $this->sendResult($message, [], $errors, $status);
		}



		$bid = Bid::where('id', $request->bid)->first();
		Bid::where('id', $request->bid)->update(['status' => 'ACCEPTED']);

		Notif::create(['user' => $bid->vendor, 'message' => Auth::user()->firstname . ' ' . Auth::user()->lastname . ' ' . 'accepted your bid', 'status' => 'UNREAD']);

		$m = Auth::user()->firstname . ' ' . Auth::user()->lastname . ' ' . 'accepted your bid';

		// broadcast(new Notify($m, $task[0]->client))->toOthers();
		$this->sendNotif($m, $bid->vendor);



		$task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
			->get();

		return $this->sendResult('bid accepted', $task, [], true);
	}
	public function reject(Request $request)
	{

		$data = $request->all();

		$validator = Validator::make($data, [
			'bid' => 'required|integer',
			'task' => 'required|exists:tasks,id'

		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Task submission Failed";
			return $this->sendResult($message, [], $errors, $status);
		}



		Bid::where('id', $request->bid)->update(['status' => 'CANCELLED']);
		$bid = Bid::where('id', $request->bid)->first();

		Notif::create(['user' => $bid->vendor, 'message' => Auth::user()->firstname . ' ' . Auth::user()->lastname . ' ' . 'rejected your bid', 'status' => 'UNREAD']);

		$m = Auth::user()->firstname . ' ' . Auth::user()->lastname . ' ' . 'rejected your bid';

		// broadcast(new Notify($m, $task[0]->client))->toOthers();
		$this->sendNotif($m, $bid->vendor);

		$task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
			->get();

		return $this->sendResult('bid rejected', $task, [], true);
	}
}
