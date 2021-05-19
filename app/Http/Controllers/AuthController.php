<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        ]);


        try {
            DB::beginTransaction();
            $user->save();
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
        ]);

        try {
            $user->save();


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
}
