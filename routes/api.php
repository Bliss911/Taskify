<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BidController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\NotifController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WalletController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('jobslist', [SkillController::class, 'index']);

Route::prefix('auth')->group(function () {
	Route::post('enroll', [AuthController::class, 'enroll']);
	Route::post('join', [AuthController::class, 'join']);
	Route::post('login', [AuthController::class, 'login']);

	Route::middleware('auth:api')->group(function () {
		Route::get('logout', [AuthController::class, 'logout']);
		Route::get('dashboard', [AuthController::class, 'dashboard']);
	});
});
Route::prefix('tasks')->group(function () {
	Route::post('/', [TaskController::class, 'index']);

	Route::middleware('auth:api')->group(function () {
		Route::get('/mytasks', [TaskController::class, 'myTasks']);
		Route::post('create', [TaskController::class, 'create']);
		Route::post('done', [TaskController::class, 'done']);
		Route::post('cancel', [TaskController::class, 'cancel']);
		Route::get('mypendingtasks', [TaskController::class, 'mypendingtasks']);
		Route::get('mycompletedtasks', [TaskController::class, 'mycompletedtasks']);
		Route::get('mycancelledtasks', [TaskController::class, 'mycancelledtasks']);
	});
});
Route::prefix('bids')->group(function () {

	Route::middleware('auth:api')->group(function () {
		Route::post('create', [BidController::class, 'create']);
		Route::post('delete', [BidController::class, 'delete']);
		Route::post('accept', [BidController::class, 'accept']);
		Route::post('reject', [BidController::class, 'reject']);
	});
});
Route::prefix('messages')->group(function () {

	Route::middleware('auth:api')->group(function () {
		Route::get('/', [ChatController::class, 'index']);
		Route::post('/chat', [ChatController::class, 'all']);
		Route::post('send', [ChatController::class, 'send']);
	});
});
Route::prefix('wallet')->group(function () {

	Route::middleware('auth:api')->group(function () {
		Route::post('/add', [WalletController::class, 'add']);
		Route::get('/payments', [WalletController::class, 'payments']);
	});
});
Route::prefix('notifs')->group(function () {

	Route::middleware('auth:api')->group(function () {
		Route::get('/', [NotifController::class, 'index']);
	});
});
Route::prefix('admin')->group(function () {

	Route::middleware(['auth:api', 'admin'])->group(function () {
		Route::get('/users', [AuthController::class, 'users']);
		Route::get('/pending', [AuthController::class, 'pendingUsers']);
		Route::post('/verify', [AuthController::class, 'verify']);
	});
});
