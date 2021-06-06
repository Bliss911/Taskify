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

			$data = Task::with(['skill', 'user', 'bids.vendor'])->whereHas('skill', function ($query) use ($request) {
				$query->where('skill', $request->id);
			})->orderByDesc('created_at')->get();
		} else {

			$data = Task::with(['skill', 'user', 'bids.vendor'])->orderByDesc('created_at')->get();
		}
		return $this->sendResult('tasks fetched', $data, [], true);
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

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Task  $task
	 * @return \Illuminate\Http\Response
	 */
	public function show(Task $task)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Models\Task  $task
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Task $task)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \App\Models\Task  $task
	 * @return \Illuminate\Http\Response
	 */
	public function update(Request $request, Task $task)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Task  $task
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Task $task)
	{
		//
	}
}
