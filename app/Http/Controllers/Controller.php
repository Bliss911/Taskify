<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    protected function sendResult($message, $data, $errors = [], $status = true)
    {
        $errorCode = $status ? 200 : 422;
        $result = [
            "message" => $message,
            "status" => $status,
            "data" => $data,
            "errors" => $errors
        ];
        return response()->json($result, $errorCode);
    }
}
