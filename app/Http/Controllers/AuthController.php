<?php

namespace App\Http\Controllers;

use App\Models\Bid;
use App\Models\Complaint;
use App\Models\Notif;
use App\Models\Task;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
	public function enroll(Request $request)
	{
		$data = $request->all();

		$validator = Validator::make($data, [
			'firstname' => 'required|string',
			'lastname' => 'required|string',
			'email' => 'required|string|email|unique:users',
			'password' => 'required|string',
			'jobs' => 'required|array',
		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Registration Failed";
			return $this->sendResult($message, [], $errors, $status);
		}

		$user = new User([
			'password' => bcrypt($request->password),
			'firstname' => $request->firstname,
			'lastname' => $request->lastname,
			'email' => $request->email,
			'role' => 'VENDOR'
		]);


		try {
			DB::beginTransaction();
			$user->save();
			$wallet = new Wallet();
			$wallet->amount = 0;
			$wallet->user = $user->id;

			$wallet->save();
			$jobs = $request->jobs;

			$jobsToDB = [];

			foreach ($jobs as $job) {
				array_push($jobsToDB, ['vendor' => $user->id, 'skill' => $job]);
			}

			DB::table('user_skills')->insert($jobsToDB);

			DB::commit();
			return $this->sendResult('Registration Successful', [], [], true);
		} catch (\Exception $e) {

			DB::rollback();
			return $this->sendResult('Registration unsuccessful', [], ['error' => $e->getMessage()], false);
		}
	}
	public function join(Request $request)
	{
		$data = $request->all();

		$validator = Validator::make($data, [
			'firstname' => 'required|string',
			'lastname' => 'required|string',
			'email' => 'required|string|email|unique:users',
			'password' => 'required|string',
		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Registration Failed";
			return $this->sendResult($message, [], $errors, $status);
		}

		$user = new User([
			'password' => bcrypt($request->password),
			'firstname' => $request->firstname,
			'lastname' => $request->lastname,
			'email' => $request->email,
			'status' => 'VERIFIED',
		]);


		try {
			$user->save();
			$wallet = new Wallet();
			$wallet->amount = 0;
			$wallet->user = $user->id;

			$wallet->save();


			return $this->sendResult('Registration Successful', [], [], true);
		} catch (\Exception $e) {

			return $this->sendResult('Registration unsuccessful', [], ['error' => $e->getMessage()], false);
		}
	}
	public function login(Request $request)
	{
		$data = $request->all();
		$validator = Validator::make($data, [
			'email' => 'required|email',
			'password' => 'required',
		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "Login Failed";
			return $this->sendResult($message, [], $errors, $status);
		}
		$credentials = $request->only("email", "password");
		Auth::guard('api');
		if (!$token = Auth::attempt($credentials)) {
			$status = false;
			$errors = [
				"login" => "Invalid username or password",
			];
			$message = "Login Failed";
			return $this->sendResult($message, [], $errors, $status);
		} else {
			$message = "Login Successful";
			$data = [
				'access_token' => $token,
				'token_type' => 'bearer',
			];
			$status = true;
			$errors = [];
			return $this->sendResult($message, $data, $errors, $status);
		}
	}
	public function logout()
	{
		Auth::logout();
		return $this->sendResult('logout successful', [], [], true);
	}

	public function dashboard()
	{
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
		} else if (Auth::user()->role == 'ADMIN') {
			$pending = Task::where('status', 'PENDING')->count();
			$accepted = Task::where('status', 'DONE')->count();
			$cancelled = Task::count();
			$wallet = User::where('role', '!=', 'ADMIN')->count();
			return $this->sendResult('fetched', ['wallet' => $wallet, 'pending_tasks' => $pending, 'cancelled_tasks' => $cancelled, 'accepted_tasks' => $accepted], [], true);
		}
	}
	public function users()
	{
		$verified = User::with('skills')->where('status', 'VERIFIED')->where('role', '!=', 'ADMIN')->orderByDesc('updated_at')->get();
		return $this->sendResult('fetched', ['pending' => $verified], [], true);
	}
	public function pendingUsers()
	{
		$unverified = User::where('status', 'UNVERIFIED')->with('skills')->orderByDesc('created_at')->get();
		return $this->sendResult('fetched', ['pending' => $unverified], [], true);
	}
	public function verify(Request $request)
	{
		$data = $request->all();
		$validator = Validator::make($data, [
			'user' => 'required',
		]);
		if ($validator->fails()) {
			$status = false;
			$errors = $validator->errors();
			$message = "User not found";
			return $this->sendResult($message, [], $errors, $status);
		}

		User::where('id', $request->user)->update(['status' => 'VERIFIED']);
		$user = 		User::with('skills')->where('id', $request->user)->first();
		Notif::create(['user' => $user->id, 'message' => 'Your Account has been verified. Logout and login again to start a new session. Get Tasking!', 'status' => 'UNREAD']);

		$m = 'Your Account has been verified. Logout and login again to start a new session. Get Tasking!';
		$this->sendNotif($m, $user->id);


		return $this->sendResult('fetched', ['user' => $user], [], true);
	}


	public function imageUploadPost(Request $request)
	{
		$request->validate([
			'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
		]);

		$imageName = time() . '.' . $request->image->extension();

		$request->image->move(public_path('images'), $imageName);

		/* Store $imageName name in DATABASE from HERE */
		User::where('id', Auth::user()->id)->update(['image' => $imageName]);

		$status = true;
		$errors = [];
		return $this->sendResult('done', [], $errors, $status);
	}

	public function user()
	{
		$user = Auth::user();
		return $this->sendResult('fetched', $user, [], true);
	}
	public function firstname(Request $request)
	{
		$user = User::where('id', Auth::user()->id)->update(['firstname' => $request->firstname]);
		return $this->sendResult('fetched', $user, [], true);
	}
	public function lastname(Request $request)
	{
		$user = User::where('id', Auth::user()->id)->update(['lastname' => $request->lastname]);
		return $this->sendResult('done', $user, [], true);
	}
	public function complaints(Request $request)
	{
		$name = $request->name;
		$email = $request->email;
		$message = $request->message;
		Complaint::create(['name' => $name, 'email' => $email, 'message' => $message, 'complainer' => Auth::user()->id]);
		return $this->sendResult('done', [], [], true);
	}
}
