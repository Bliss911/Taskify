<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		if ($request->id) {

			$data = Task::where('status', 'PENDING')->with(['skill', 'user', 'bids.vendor'])->whereHas('skill', function ($query) use ($request) {
				$query->where('skill', $request->id);
			})->orderByDesc('created_at')->get();
		} else {

			$data = Task::where('status', 'PENDING')->with(['skill', 'user', 'bids.vendor'])->orderByDesc('created_at')->get();
		}
		return $this->sendResult('tasks fetched', $data, [], true);
	}




	public function mypendingtasks(Request $request)
	{

		if (Auth::user()->role == 'CLIENT') {

			$data = Task::where('status', 'PENDING')->where('client', Auth::user()->id)->with(['skill', 'user', 'bids.vendor'])->orderByDesc('created_at')->get();

			return $this->sendResult('tasks fetched', $data, [], true);
		} else {
			$user = Auth::user()->id;

			$data = Task::with(['skill', 'user', 'bids.vendor'])->whereHas('bids', function ($query) use ($user) {
				$query->where('vendor', $user)->where('status', 'PENDING');
			})->orderByDesc('created_at')->get();
			return $this->sendResult('tasks fetched', $data, [], true);
		}
	}

	public function mycompletedtasks(Request $request)
	{

		if (Auth::user()->role == 'CLIENT') {

			$data = Task::where('status', 'COMPLETED')->where('client', Auth::user()->id)->with(['skill', 'user', 'bids.vendor'])->orderByDesc('created_at')->get();

			return $this->sendResult('tasks fetched', $data, [], true);
		} else {
			$user = Auth::user()->id;

			$data = Task::with(['skill', 'user', 'bids.vendor'])->whereHas('bids', function ($query) use ($user) {
				$query->where('vendor', $user)->where('status', 'ACCEPTED');
			})->orderByDesc('created_at')->get();
			return $this->sendResult('tasks fetched', $data, [], true);
		}
	}






	public function mycancelledtasks(Request $request)
	{

		if (Auth::user()->role == 'CLIENT') {

			$data = Task::where('status', 'CANCELLED')->where('client', Auth::user()->id)->with(['skill', 'user', 'bids.vendor'])->orderByDesc('created_at')->get();

			return $this->sendResult('tasks fetched', $data, [], true);
		} else {
			$user = Auth::user()->id;

			$data = Task::with(['skill', 'user', 'bids.vendor'])->whereHas('bids', function ($query) use ($user) {
				$query->where('vendor', $user)->where('status', 'CANCELLED');
			})->orderByDesc('created_at')->get();
			return $this->sendResult('tasks fetched', $data, [], true);
		}
	}


	public function myTasks()
	{
		if (Auth::user()->role == 'CLIENT') {

			$data = Task::with(['skill', 'user', 'bids.vendor'])->where('client', Auth::user()->id)->orderByDesc('created_at')->get();
			return $this->sendResult('tasks fetched', $data, [], true);
		} else {
			$user = Auth::user()->id;
			$data = Task::with(['skill', 'user', 'bids.vendor'])->whereHas('bids', function ($query) use ($user) {
				$query->where('vendor', $user)->where('status', 'ACCEPTED');
			})->orderByDesc('created_at')->get();
			return $this->sendResult('tasks fetched', $data, [], true);
		}
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create(Request $request)
	{
		$data = $request->all();

		$validator = Validator::make($data, [
			'title' => 'required|string',
			'description' => 'required|string',
			'offer' => 'required',
			'location' => 'required|string',
			'job' => 'required',
		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Task submission Failed";
			return $this->sendResult($message, [], $errors, $status);
		}

		$task = new Task([
			'client' => Auth::user()->id,
			'title' => $request->title,
			'description' => $request->description,
			'offer' => $request->offer,
			'location' => $request->location,
		]);

		$task->save();

		try {
			DB::beginTransaction();
			$job = $request->job;

			$jobsToDB = [];
			array_push($jobsToDB, ['task' => $task->id, 'skill' => $job]);



			DB::table('task_skills')->insert($jobsToDB);

			DB::commit();
			return $this->sendResult('Task submitted Successfully', [], [], true);
		} catch (\Exception $e) {

			DB::rollback();
			return $this->sendResult('Task sumission unsuccessful', [], ['error' => $e->getMessage()], false);
		}
	}

	public function done(Request $request)
	{
		$data = $request->all();

		$validator = Validator::make($data, [
			'task' => 'required|exists:tasks,id'

		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Task submission Failed";
			return $this->sendResult($message, [], $errors, $status);
		}

		Task::where('id', $request->task)->where('client', Auth::user()->id)->update(['status' => 'DONE']);

		$task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
			->get();

		return $this->sendResult('Task completed', $task, [], true);
	}
	public function cancel(Request $request)
	{
		$data = $request->all();

		$validator = Validator::make($data, [
			'task' => 'required|exists:tasks,id'

		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Task submission Failed";
			return $this->sendResult($message, [], $errors, $status);
		}

		Task::where('id', $request->task)->where('client', Auth::user()->id)->update(['status' => 'CANCELLED']);

		$task = Task::where('id', $request->task)->with(['skill', 'user', 'bids.vendor'])
			->get();

		return $this->sendResult('Task cancelled', $task, [], true);
	}
}
