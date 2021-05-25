<?php

namespace App\Http\Controllers;

use App\Models\Bid;
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
        return $this->sendResult('bid created', [], [], true);
    }
}
