<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\SkillController;
use Illuminate\Http\Request;
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
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth.api'])->group(function () {
});
